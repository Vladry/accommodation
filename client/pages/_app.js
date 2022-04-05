import React from "react";
import Head from "next/head";
import {CssBaseline} from "@material-ui/core";
import {ThemeProvider, createTheme} from "@material-ui/core/styles"

function MyApp({Component, pageProps}) {
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
            <ThemeProvider theme={createTheme({})}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline/>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
)
}

export default MyApp
