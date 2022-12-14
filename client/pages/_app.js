import React, {useContext, useEffect, useState} from "react";
import Head from "next/head";
import {CssBaseline} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles"
import {Provider, useDispatch, useSelector} from "react-redux";
import {SessionProvider} from "next-auth/react";
import {store, wrapper} from "@/store/store.js";
import createEmotionCache from "../utils/createEmotionCache";
import {CacheProvider} from "@emotion/react";
import RefreshTokenHandler from "../components/RefreshTokenHandler";
import {Context} from '@/root/context.js';
import myTheme from "../utils/myTheme";
import sel from '@/store/user/selectors';
import {Client} from '@stomp/stompjs';
import userTypes from "@/store/user/types";
import datingTypes from "@/store/datingChats/types";
import './_app.css';
import destinations from '../../src/main/resources/destinations.json';
import {StylesProvider} from "@material-ui/core/styles"
import {ACTIONS, ACTIONS_Cust} from "@/store/datingChats"; // <-- import this component, and wrap your App.
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
                // console.log(message);
                if (message.subject.includes(`${destinations.likedSubject}`)) {
                    // console.log("datingTypes.ADD_DATING_LIKED_NOTIFICATIONS");
                    dispatch({type: datingTypes.ADD_DATING_LIKED_NOTIFICATIONS, payload: message});
                } else if (message.subject.includes(`${destinations.unlikedSubject}`)) {
                    // console.log("datingTypes.ADD_DATING_UNLIKED_NOTIFICATIONS");
                    dispatch({type: datingTypes.ADD_DATING_UNLIKED_NOTIFICATIONS, payload: message});
                }


            }
        }

        const datingPrivateMessageCB = (json) => {
            console.log("datingPrivateMessageCB-> , userId: ", user.id)
            if (json.body) {
                const message = JSON.parse(json.body);
                // console.log(message.value);
                dispatch(ACTIONS_Cust.getUnseenMessages(user.id));
                dispatch(ACTIONS.addSendMessageNotification({notification: message, userId: user.id}));
            }
        }


        const subscribeMe = (destination, cb) => {
            stompClient.subscribe(destination, cb);
        };

        currentSubscriptions.forEach(destination => {
            // console.log("subscribed to: ", destination);
            let cb = {};
            switch (destination) {
                case `${destinations.likesNotifications}${user.id}`:
                    cb = datingLikeNotificationCB;
                    break;
                case `${destinations.datingMessageSentNotifications}${user.id}`:
                    cb = datingPrivateMessageCB;
                    break;
                default:
                    // console.log("case: default")
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
        dispatch({type: userTypes.SET_STOMP_CLIENT, payload: client});
        // console.log("stompClient: ", stompClient)
    }, [])

    useEffect(() => {
        if (!isUserAppliedHisSubscriptions && subscriptions.length > 0) {
            setSubscriptions(stompClient, subscriptions);
            dispatch({type: userTypes.SET_USER_SUBSCRIPTIONS_APPLIED, payload: null});
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
