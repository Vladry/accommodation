import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import Head from "next/head";
import {CssBaseline} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles"
import {Provider} from "react-redux";
import {SessionProvider} from "next-auth/react";
import {store, wrapper} from "../store/store";
import createEmotionCache from "../utils/createEmotionCache";
import {CacheProvider} from "@emotion/react";
import RefreshTokenHandler from "../components/RefreshTokenHandler";
import {Context} from '../context';
import './_app.css';
import myTheme from "../utils/myTheme";


import {Client} from '@stomp/stompjs';

const SOCKET_URL = "ws://localhost:8000/ws";
import MessageCreator from "../components/MessageCreator";
export let client;

const theme = createTheme(myTheme);
const clientSideEmotionCache = createEmotionCache();

function MyApp({Component, pageProps, emotionCache = clientSideEmotionCache}) {
    const context = useContext(Context);
    const [interval, setInterval] = useState(0);


    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);


    //***************** WebSockets **********************//
    const [messages, setMessages] = useState([]);
    const onConnected = () => {
        console.log("Connected websocket")
        console.log("Subscribed on /queue/dating");
        client.subscribe('/queue/dating', function (msg) {
            console.log("Received message: ", JSON.parse(msg.body))
            if (msg.body) {
                const jsonBody = JSON.parse(msg.body);
                if (jsonBody.message) {
                    setMessages(prev => [...prev, jsonBody.message])
                }
            }
        });
    }

    const onDisconnected = () => {
        console.log("Disconnected websocket!")
    }
    useEffect(() => {
        if (client != null) return;

        client = new Client({
            brokerURL: SOCKET_URL,
            reconnectDelay: 5000,
            heartbeatIncoming: 2000,
            heartbeatOutgoing: 2000,
            onConnect: onConnected,
            onDisconnect: onDisconnected
        });
        client.activate();
        // console.log("client: ", client)
    }, [])


    return (
        <>
            <CacheProvider value={emotionCache}>
                <Head>
                    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
                    <title>My Page</title>
                </Head>
                <SessionProvider session={pageProps.session} refetchInterval={interval}>
                    <Context.Provider value={context}>
                        <ThemeProvider theme={theme}>
                            <Provider store={store}>
                                <CssBaseline/>


                                <div className="App">
                                    <MessageCreator/>
                                    <ul>
                                        {messages.map((m, index) => (
                                            <li key={index}>{m}</li>
                                        ))}
                                    </ul>
                                </div>



                                {
                                    Component.getLayout ?
                                        Component.getLayout(<Component {...pageProps} />) :
                                        <Component {...pageProps} />
                                }
                            </Provider>
                        </ThemeProvider>
                    </Context.Provider>
                    <RefreshTokenHandler setInterval={setInterval}/>
                </SessionProvider>
            </CacheProvider>
        </>
    )
}

export default wrapper.withRedux(MyApp);
