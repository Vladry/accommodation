import React, {useState} from "react";
import Head from "next/head";
import {CssBaseline} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles"
import {Provider} from "react-redux";
import Header from "../components/Header";
import {SessionProvider} from "next-auth/react";
import {store, wrapper} from "../store/store";
import createEmotionCache from "../utils/createEmotionCache";
import {CacheProvider} from "@emotion/react";
import theme from "../utils/theme";
import RefreshTokenHandler from "../components/RefreshTokenHandler";
import Layout from "../components/Layout";

const clientSideEmotionCache = createEmotionCache();

function MyApp({Component, pageProps, emotionCache = clientSideEmotionCache}) {
    const [interval, setInterval] = useState(0);
    console.log(interval)
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <>
            <CacheProvider value={emotionCache}>
                <Head>
                    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
                    <title>My Page</title>
                </Head>
                <SessionProvider session={pageProps.session} refetchInterval={interval}>
                    <ThemeProvider theme={theme}>
                        <Provider store={store}>
                            <CssBaseline/>
                            {
                                Component.getLayout?
                                Component.getLayout(<Component {...pageProps} />) :
                                <Component {...pageProps} />
                            }

                        </Provider>
                    </ThemeProvider>
                    <RefreshTokenHandler setInterval={setInterval} />
                </SessionProvider>
            </CacheProvider>
        </>
    )
}

export default wrapper.withRedux(MyApp);
