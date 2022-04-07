import React, {useState} from "react";
import Head from "next/head";
import {CssBaseline} from "@material-ui/core";
import {ThemeProvider, createTheme} from "@material-ui/core/styles"
import {Provider} from "react-redux";
import Header from "../components/Header";
import {SessionProvider} from "next-auth/react";
import {store, wrapper} from "../store/store";
import useAuth from "../hooks/useAuth";

function MyApp({Component, pageProps}) {
    const [interval, setInterval] = useState(0);
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);


    return (
        <>
            <Head>
                <title>My page</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
            </Head>
            <SessionProvider session={pageProps.session} refetchInterval={interval}>
                <ThemeProvider theme={createTheme({})}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline/>
                    <Provider store={store}>
                        <Header/>
                        <Component {...pageProps} />
                    </Provider>
                </ThemeProvider>
            </SessionProvider>
        </>
    )
}

export default wrapper.withRedux(MyApp);
