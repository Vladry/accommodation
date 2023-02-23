import Head from 'next/head'
import {Container} from "@mui/material";
import Layout from "../components/Layout";
import About from "../components/About";
import {useEffect, useRef} from "react";
import SwiperCarouselMain from "../components/SwiperCarouselMain";
import api from "../lib/API";

export default function Home() {


    return (
        <Container>
            <Head>

            </Head>

            <main>

                <title>Home page</title>
                <meta name="description" content="Home page"/>

                <SwiperCarouselMain/>

                <About/>



            </main>
        </Container>
    )
}

Home.getLayout = data => {
    return (
        <Layout>
            {data}
        </Layout>
    )
}
