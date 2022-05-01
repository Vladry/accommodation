import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Autoplay, Pagination, Parallax} from "swiper";
import 'swiper/css';
import {Box, Divider, Typography, useMediaQuery} from "@mui/material";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {useTheme} from "@mui/material/styles";
import Slides from "./Slides";
import {carouselCards, carouselTextColor, fontSize} from "../public/carouselConfig";
import SwiperCard from "./SwiperCard";


const SwiperCarousel = () => {
    const testSlides = (
        <>
            <SwiperSlide><img src={'../../swiper-pictures/1.jpg'} alt={'carousel-picture'}/></SwiperSlide>
            <SwiperSlide><img src={'../../swiper-pictures/2.jpg'} alt={'carousel-picture'}/></SwiperSlide>
            <SwiperSlide><img src={'../../swiper-pictures/3.jpg'} alt={'carousel-picture'}/></SwiperSlide>
            <SwiperSlide><img src={'../../swiper-pictures/4.jpg'} alt={'carousel-picture'}/></SwiperSlide>
            <SwiperSlide><img src={'../../swiper-pictures/1.jpg'} alt={'carousel-picture'}/></SwiperSlide>
            <SwiperSlide><img src={'../../swiper-pictures/5.jpg'} alt={'carousel-picture'}/></SwiperSlide>
            <SwiperSlide><img src={'../../swiper-pictures/6.jpg'} alt={'carousel-picture'}/></SwiperSlide>
            <SwiperSlide><img src={'../../swiper-pictures/3.jpg'} alt={'carousel-picture'}/></SwiperSlide>
            <SwiperSlide><img src={'../../swiper-pictures/7.jpg'} alt={'carousel-picture'}/></SwiperSlide>
            <SwiperSlide><img src={'../../swiper-pictures/8.jpg'} alt={'carousel-picture'}/></SwiperSlide>
            <SwiperSlide><img src={'../../swiper-pictures/9.jpg'} alt={'carousel-picture'}/></SwiperSlide>
            <SwiperSlide><img src={'../../swiper-pictures/10.jpg'} alt={'carousel-picture'}/></SwiperSlide>
        </>
    );


    const isSmallSize = useMediaQuery('(max-width: 700px)');
    const isMediumSize = useMediaQuery('(min-width: 701px) and (max-width: 1050px)');
    let bcgPicWidth = '160%';
    let bcgPicBias = '260px';
    let bcgPicHeight = '450px';
    let soldierLeftBias = '70%';
    let soldierTopBias = '130px';
    let soldierSize = '210px';
    let vFont = 'h6';
    if (isSmallSize) {
        bcgPicBias = '200px';
        soldierLeftBias = "60%";
        soldierTopBias = '170px';
        vFont = "body1";
        soldierSize = '150px';
    } else if (isMediumSize) {
        soldierLeftBias = "70%";
        soldierTopBias = '130px';
        soldierSize = '170px';
    }


    return (
        <>
            <Swiper modules={[Autoplay, Navigation, Pagination, Parallax]}
                    navigation={false}
                    className="mySwiper"
                    loop={true}
                    parallax={true}
                    pagination={false}     // pagination={{clickable: true}}
                    autoplay={{
                        delay: 5500,
                        disableOnInteraction: false,
                    }}
                    slidesPerView={1}
            >

                <div  //контейнер для параллакс-изображения (кораблик)
                    slot="container-start"
                    className="parallax-bg"
                    style={{
                        background:
                            "no-repeat url(../../swiper-pictures/2_.png)",
                        filter: 'opacity(0.8)',
                        position: 'absolute',
                        top: "-60px",
                        left: bcgPicBias,
                        backgroundSize: '110%  90%',
                        height: bcgPicHeight,
                        width: bcgPicWidth,
                    }}
                    data-swiper-parallax="-55%"
                    data-swiper-parallax-opacity="0.9"
                >.
                </div>
                <div   //контейнер для статического изображения (солдат с пальцем вверх)
                    style={{
                        position: 'absolute',
                        top: soldierTopBias,
                        left: soldierLeftBias,
                        opacity: "0.6",
                        filter: "brightness(100%)"
                    }}>
                    <img style={{height: soldierSize, width: soldierSize}}
                         src={'../../swiper-pictures/fuck-boy.png'} alt={'soldier'}/>
                </div>


                <Slides/>


            </Swiper>

            <Divider/>

            <Typography variant={vFont}>
                <Box sx={{m: "16px "}}>... а тем временем... русский корабль шёл...</Box>
            </Typography>
        </>
    );


};

export default SwiperCarousel;

