import Head from 'next/head'
import {Button, Container, TextField, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {decrement, increment} from "../store/actions/sampleAction";
import {useFetch} from "../hooks/useFetch";
import {useEffect, useRef, useState} from "react";
import {signIn} from "next-auth/react";

export default function Home() {
    const counter = useSelector(state => state.sampleData.counter)
    const dispatch = useDispatch();
    const timer = useRef(null);

    const [city, setCity] = useState("");

    const [{data, loading, modifyData}, getData] = useFetch({
        method: "GET",
        instant: false,
        initData: {features: []},
        url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1IjoidmFkeW0tdGFydGFrb3Zza3lpIiwiYSI6ImNraHo4bmt1ZzB2MGszMGx0dDNqZHdmaWUifQ.VVvuIigxHHYEJiQZlWItsQ`
    })

    useEffect(() => {
        clearTimeout(timer.current)
        if (city) {
            timer.current = setTimeout(() => {
                getData();
            }, 800)
        } else {
            modifyData({features: []})
        }
    }, [city])

    console.log(data)

    const handleChange = (e) => {
        setCity(e.target.value);
    }

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

            <TextField onChange={handleChange} value={city} placeholder="Enter your city"/>

            <ul>
                {data.features.map((f, index) => (
                    <li key={index}>{f.place_name}</li>
                ))}
            </ul>

        </Container>
    )
}
