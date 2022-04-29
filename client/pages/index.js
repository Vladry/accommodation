import Head from 'next/head'
import {Container} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import Layout from "../components/Layout";
import Carousel from '@mui/material/Slider';
import About from "../components/About";

export default function Home() {
    const counter = useSelector(state => state.sampleData.counter)
    const dispatch = useDispatch();


    return (
        <Container>
            <Head>

            </Head>

            <main>

                <title>Home page</title>
                <meta name="description" content="Home page"/>

                <Carousel/>

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
