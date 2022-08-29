import Head from 'next/head'
import {Container} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import Layout from "../components/Layout";
import About from "../components/About";


import SwiperCarousel from "../components/SwiperCarousel";
import {getDatingProfile} from "../store/actions/userAction";
import types from "../store/types";


export default function Home() {
    const dispatch = useDispatch();
    //получим datingProfile текущего currentUser чтобы определить его isCurrUserRegisteredInDating:
    // dispatch(getDatingProfile(user.id, types.GET_USER_DATING_PROFILE, types.SET_USER_DATING_PROFILE_SUCCESS));


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
