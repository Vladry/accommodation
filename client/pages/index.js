import Head from 'next/head'
import {Container} from "@mui/material";
import Layout from "../components/Layout";
import About from "../components/About";


import SwiperCarousel from "../components/SwiperCarousel";


export default function Home() {


    return (
        <Container>
            <Head>

            </Head>

            <main>

                <title>Home page</title>
                <meta name="description" content="Home page"/>

                <SwiperCarousel/>

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
