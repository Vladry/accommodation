import Head from 'next/head'
import {Button, Container, TextField, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {decrement, increment} from "../store/actions/sampleAction";
import {useFetch} from "../hooks/useFetch";
import {useEffect, useRef, useState} from "react";
import UserForm from "../components/forms/UserForm";
import AccommodationForm from "../components/forms/AccommodationForm";
import TenantForm from "../components/forms/TenantForm";
import Layout from "../components/Layout";

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

                <div>
                    <p>
                        Мы - гуманитарный волонтёрский проект, цель которого - максимально ускорить и облегчить
                        возвращение наших славных Украинцев к безопасной и счастливой жизни.
                        Мы -международный ресурс и мы оформлены сейчас на языке врага для более обширного понимания во
                        всём Мире, но мы украинцы! Слава Украине!

                    </p>
                    <p>
                        Наш сервис позволяет быстро и удобно находить жильё и гостепреимство хозяев для переселенцев и
                        потерявших свой дом. Для этого, мы предлагаем и хозяевам жилья соискателям заполнять подробные
                        анкеты. Обратите внимание: чем более подробно Вы заполните наши формы заявок и расскажете о
                        себе, тем более эффективно будут работать наши поисковые алгоритмы, сопоставляя потребности
                        соискателей с возможностями хозяев льготного жилья. Поэтому призываем владельцев жилья делиться
                        фотографиями и описанием условий, а соискателей - Вашими фотографиями и подробным заполнением
                        анкет. Это позволит хозяевам лучше оценить ситуацию как Вам помочь так, чтобы Ваше проживание
                        потом оказалось наиболее комфортным для Вас.
                    </p>
                    <p>
                        Враг наш подлый и коварный, желает видеть украинцев несчастными, поэтому еще один сервис,
                        который мы скоро запускаем: это служба <span>военных знакомств</span>, цель которого: знакомства
                        созидательного характера ведущие к счастью наших украинцев (будь то брак, семья, волонтерская
                        поддержка, совместное проживание и отношения - всё личное, что может перерости в счастье и
                        радость для Украинцев).
                    </p>
                    <p>
                        Ещё один новый сервис - это психологическая, дружеское тепло и волонтерская поддержка тем, кто
                        испытал на себе насилие рашистов. Мы хотим , чтобы вы знали, что вы -часть нас, украинцев и мы
                        вас любим и поддерживаем! Пока наша команда обдумывает организационные моменты, Вы можете
                        отсылать нам свои предложение по партнерству. Мы работаем без бюджета, поэтому нам так же нужны
                        идеи и поддержка всех не безразличных в их реализации.
                    </p>
                </div>


                {/*<Typography>Counter: {counter}</Typography>*/}
                {/*<Button onClick={() => dispatch(decrement())}>-</Button>*/}
                {/*<Button onClick={() => dispatch(increment())}>+</Button>*/}
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
