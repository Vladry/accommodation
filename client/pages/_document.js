/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Document, {
    Html, Main, NextScript, Head
} from 'next/document';
import createEmotionCache from "../utils/createEmotionCache";
import createEmotionServer from "@emotion/server/create-instance";
import theme from "../utils/theme";

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* PWA primary color */}
                    <meta name="theme-color" content={theme.palette.primary.main}/>

                    <link rel="icon" type="image/png" sizes="16x16" href="../favicons/favicon-16x16.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="../favicons/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="192x192" href="../favicons/android-chrome-192x192.png" />
                    <link rel="icon" type="image/png" sizes="512x512" href="../favicons/android-chrome-512x512.png" />
                    <link rel="shortcut icon" type="text/x-icon" href="/favicons/favicon.ico" />



                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>


                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />

                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css2?family=Tapestry&display=swap"
                        as="fonts"
                    />

                    <link
                        href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;600;700;800;900&family=RobotoSlab&display=swap"
                        rel="stylesheet"
                    />


                    {/* Inject MUI styles first to match with the prepend: true configuration. */}
                    {this.props.emotionStyleTags}
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
    const originalRenderPage = ctx.renderPage;
    const cache = createEmotionCache();
    const {extractCriticalToChunks} = createEmotionServer(cache);

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) =>
                function EnhanceApp(props) {
                    return <App emotionCache={cache} {...props} />;
                },
        });

    const initialProps = await Document.getInitialProps(ctx);
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            key={style.key}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{__html: style.css}}
        />
    ));

    return {
        ...initialProps,
        emotionStyleTags,
    };
};