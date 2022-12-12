import React, {useContext, useEffect, useState} from "react";
import Head from "next/head";
import {CssBaseline} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles"
import {Provider, useDispatch, useSelector} from "react-redux";
import {SessionProvider} from "next-auth/react";
import {store, wrapper} from "../store/store";
import createEmotionCache from "../utils/createEmotionCache";
import {CacheProvider} from "@emotion/react";
import RefreshTokenHandler from "../components/RefreshTokenHandler";
import {Context} from '../context';
import myTheme from "../utils/myTheme";
import sel from '@/store/user/selectors';
import {Client} from '@stomp/stompjs';
import types from "@/store/user/types";
import {StylesProvider} from "@material-ui/core/styles" // <-- import this component, and wrap your App.
import './_app.css';
import destinations from '../../src/main/resources/destinations.json'

const SOCKET_URL = "ws://localhost:8000/ws";

const theme = createTheme(myTheme);
const clientSideEmotionCache = createEmotionCache();

function MyApp({Component, pageProps, emotionCache = clientSideEmotionCache}) {
    const context = useContext(Context);
    const [interval, setInterval] = useState(0);
    const subscriptions = useSelector(sel.subscriptions);
    const isUserAppliedHisSubscriptions = useSelector(sel.isUserAppliedHisSubscriptions);
    const user = useSelector(sel.user);
    const dispatch = useDispatch();
    const stompClient = useSelector(sel.stompClient);

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);


    //***************** WebSockets **********************//
    //   https://www.npmjs.com/package/@stomp/stompjs
    //   https://stomp-js.github.io/guide/stompjs/using-stompjs-v5.html#send-messages
    const setSubscriptions = (stompClient, currentSubscriptions) => {

        const datingLikeNotificationCB = (json) => {
            console.log("datingLikeNotificationCB->")
            if (json.body) {
                const message = JSON.parse(json.body);
                    // alert(message.value)
                    dispatch({type: types.SET_DATING_NOTIFICATIONS, payload: message});
            }
        }

        const datingPrivateMessageCB = (json) => {
            console.log("datingPrivateMessageCB->")
            if (json.body) {
                const message = JSON.parse(json.body);
                    // alert(message.value)
                    dispatch({type: types.SET_DATING_MESSAGES, payload: message});
            }
        }


        const subscribeMe = (destination, cb) => {
            stompClient.subscribe(destination, cb);
        };

        currentSubscriptions.forEach(destination => {
            // console.log("subscribed to: ", destination);
            let cb = {};
            switch (destination){
                case `${destinations.likesNotifications}${user.id}`:
                    cb= datingLikeNotificationCB;
                    break;
                    case `${destinations.privateNotifications}${user.id}`:
                    cb= datingPrivateMessageCB;
                        break;
                default:
            }

            subscribeMe(destination, cb);
        });
    };


    const onConnected = () => {
        console.log("Connected websocket");
    }

    const onDisconnected = () => {
        console.log("Disconnected websocket!")
    }
    useEffect(() => {
        if (stompClient != null) return;

        const client = new Client({
            brokerURL: SOCKET_URL,
            reconnectDelay: 5000,
            heartbeatIncoming: 2000,
            heartbeatOutgoing: 2000,
            onConnect: onConnected,
            onDisconnect: onDisconnected
// либо можно было создать client так:  stompClient = new StompJs.Client(stompConfig);
//см. пример:  https://github.com/stomp-js/samples/blob/master/stompjs/chat/chat.html
        });
        client.activate();
        dispatch({type: types.SET_STOMP_CLIENT, payload: client});
        // console.log("stompClient: ", stompClient)
    }, [])

    useEffect(() => {
        if (!isUserAppliedHisSubscriptions && subscriptions.length > 0) {
            setSubscriptions(stompClient, subscriptions);
            dispatch({type: types.SET_USER_SUBSCRIPTIONS_APPLIED, payload: null});
        }
    }, [subscriptions, user])


    return (
        <>
            <CacheProvider value={emotionCache}>
                <Head>
                    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
                    <title>My Page</title>
                </Head>
                <SessionProvider session={pageProps.session} refetchInterval={interval}>
                    <Context.Provider value={context}>
                        <StylesProvider injectFirst={true}>
                            <ThemeProvider theme={theme}>
                                <Provider store={store}>
                                    <CssBaseline/>

                                    {
                                        Component.getLayout ?
                                            Component.getLayout(<Component {...pageProps} />) :
                                            <Component {...pageProps} />
                                    }
                                </Provider>
                            </ThemeProvider>
                        </StylesProvider>
                    </Context.Provider>
                    <RefreshTokenHandler setInterval={setInterval}/>
                </SessionProvider>
            </CacheProvider>
        </>
    )
}

export default wrapper.withRedux(MyApp);
