import Head from 'next/head'
import {Container} from "@mui/material";
import Layout from "../components/Layout";
import About from "../components/About";
import {useEffect, useRef} from "react";
import SwiperCarousel from "../components/SwiperCarousel";
import api from "../lib/API";

export default function Home() {

/*

const flag = useRef({done: false});
    useEffect(()=>{

        if(!flag.current["done"]){
            flag.current["done"] = true;

            api.post("http://localhost:3000/api/v1/auth/register",

                {
                    "email": "vlad@ukr.net",
                    "password": "123",
                    "name": "Влад",
                    "lastName" :"Рябушкин",
                    "avatar": "https://res.cloudinary.com/vladry/image/upload/v1628498611/vlad_shrunk/vlad_in_car_rtzqzp.jpg"
                }).then(()=>console.log("default user loggedIn"));
        }
    },[]);

*/


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
