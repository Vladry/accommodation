import React, {useContext, useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Autoplay, Pagination, EffectFade, Thumbs, FreeMode} from "swiper";
import {Box, useMediaQuery} from "@mui/material";
import 'swiper/css';
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import styles from "./SwiperUserPic.module.css";
import {Context} from "../../../context";
import styled from '@emotion/styled';
import {useTheme} from "@mui/material/styles";


const SwiperUserPic = ({pictures}) => { // https://swiperjs.com/react
    // code example: https://codesandbox.io/s/v1c96y?file=/src/App.jsx:339-349
    // console.log("SwiperUserPic-> pictures:", pictures);
    const {classNames} = useContext(Context);
    const theme = useTheme();

    if (!pictures || pictures.length <= 0) {
        return null;
    }// обязательно выйти, иначе полезут ошибки по classList и некорректен же метод pictures.map!

    /*    useEffect(() => { // https://stackoverflow.com/questions/65590148/swiperjs-how-do-you-style-the-pagination-bullets
            const stylesheet = document.styleSheets[0];
            stylesheet.insertRule(".swiper-pagination-bullet {\n" +
                "    width: 20px;\n" +
                "    height: 20px;\n" +
                "    text-align: center;\n" +
                "    line-height: 20px;\n" +
                "    font-size: 12px;\n" +
                "    color: #000;\n" +
                "    opacity: 1;\n" +
                "    background: rgba(0, 0, 0, 0.2);\n" +
                "}\n" +
                "\n" +
                ".swiper-pagination-bullet-active {\n" +
                "    color: #fff;\n" +
                "    background: #007aff;\n" +
                "}", 0);
        }, []);*/

    const pagination = {
        clickable: true,
        bulletClass: `swiper-pagination-bullet ${styles['swiper-pagination-bullet']}`,
        renderBullet: function (index, className) {
            // renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
    };


    /*    const isSmallSize = useMediaQuery('(max-width: 700px)');
        const isMediumSize = useMediaQuery('(min-width: 701px) and (max-width: 1050px)');
        let width = '100%';
        let height = '100%';
        if (isMediumSize) {
        } else if (isSmallSize) {
        }*/

    const picArr = [
        '/swiper-pictures/1.jpg',
        '/swiper-pictures/2.jpg',
        '/swiper-pictures/3.jpg',
        '/swiper-pictures/4.jpg',
        '/swiper-pictures/5.jpg',
        '/swiper-pictures/6.jpg',
        '/swiper-pictures/7.jpg',
        '/swiper-pictures/8.jpg',
        '/swiper-pictures/9.jpg',
        '/swiper-pictures/10.jpg'
    ];

    // TODO: нарушен порядок рендера фотографий, аватарка должна быть первая!
    //  И не всегда рендерятся приходящие фотки. При этом 'pictures' -приходит упорядоченный и бывает наложение фотки на фотку (если высокая фотка накрывается сверху короткой)
    const imgContent = pictures.map((el, i) => (
        <SwiperSlide className={`${styles['swiper-slide']}`} key={i}>
            <img style={{ listStyle: "none", borderRadius: `${theme.cardBoxParams.borderRadius}` }} className={`${styles['swiper-slide img']}`}
                                                                          src={el}
                                                                          alt={'carousel-picture'}/></SwiperSlide>
    ));

    return (
        <>
            <Swiper
                modules={[Autoplay, Navigation, Pagination, EffectFade]}
                // className={styles.swiper}
                className={`mySwiper ${styles.swiper}`}
                spaceBetween={0}
                // slidesPerView={1}
                slidesPerView={"auto"}
                centeredSlides={true}
                autoHeight={true}
                effect={"fade"}
                navigation={true}
                loop={true}
                pagination={pagination}  // pagination={{clickable: true}}   //pagination={false}
                autoplay={false}
                // autoplay={{
                //     delay: 3000,
                //     disableOnInteraction: true,
                // }}
            >
                {imgContent}
            </Swiper>
        </>
    );
};



export default SwiperUserPic;


