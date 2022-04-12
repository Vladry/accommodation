import Head from 'next/head'
import {Button, Container, TextField, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {decrement, increment} from "../store/actions/sampleAction";
import {useFetch} from "../hooks/useFetch";
import {useEffect, useRef, useState} from "react";
import UserForm from "../components/forms/UserForm";
import AccommodationForm from "../components/forms/AccommodationForm";
import TenantForm from "../components/forms/TenantForm";

export default function Home() {
    const counter = useSelector(state => state.sampleData.counter)
    const dispatch = useDispatch();


    return (
        <Container>
            <Head>
                <title>Home page</title>
                <meta name="description" content="Home page"/>
            </Head>

            <main>
                <Typography>Counter: {counter}</Typography>
                <Button onClick={() => dispatch(decrement())}>-</Button>
                <Button onClick={() => dispatch(increment())}>+</Button>
            </main>

            <UserForm/>
            <AccommodationForm/>
            <TenantForm/>

        </Container>
    )
}
