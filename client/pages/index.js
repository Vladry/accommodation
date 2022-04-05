import Head from 'next/head'
import {Button, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {decrement, increment} from "../redux/actions/sampleAction";

export default function Home() {
    const counter = useSelector(state => state.sampleData.counter)
    const dispatch = useDispatch();

    return (
        <div>
            <Head>
                <title>Home page</title>
                <meta name="description" content="Home page"/>
            </Head>
            <main>
                <Typography>Counter: {counter}</Typography>
                <Button onClick={() => dispatch(decrement())}>-</Button>
                <Button onClick={() => dispatch(increment())}>+</Button>
            </main>
        </div>
    )
}
