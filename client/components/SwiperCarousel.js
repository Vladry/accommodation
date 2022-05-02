import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Autoplay, Pagination, Parallax} from "swiper";
import 'swiper/css';
import {Box, Divider, Typography, useMediaQuery} from "@mui/material";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {useTheme} from "@mui/material/styles";
import styled from '@emotion/styled';
import {carouselCards, fontSize, carouselTextColor, slidesDelay} from '../public/carouselConfig.js';
// import fuckBoy from '../public/swiper-pictures/fuck-boy.png';
import Image from 'next/image';

const SwiperCarousel = () => {
    const theme = useTheme();
    // const testSlides = (
    //     <>
    //         <SwiperSlide><img src={'../../swiper-pictures/1.jpg'} alt={'carousel-picture'}/></SwiperSlide>
    //         <SwiperSlide><img src={'../../swiper-pictures/2.jpg'} alt={'carousel-picture'}/></SwiperSlide>
    //         <SwiperSlide><img src={'../../swiper-pictures/3.jpg'} alt={'carousel-picture'}/></SwiperSlide>
    //         <SwiperSlide><img src={'../../swiper-pictures/4.jpg'} alt={'carousel-picture'}/></SwiperSlide>
    //         <SwiperSlide><img src={'../../swiper-pictures/1.jpg'} alt={'carousel-picture'}/></SwiperSlide>
    //         <SwiperSlide><img src={'../../swiper-pictures/5.jpg'} alt={'carousel-picture'}/></SwiperSlide>
    //         <SwiperSlide><img src={'../../swiper-pictures/6.jpg'} alt={'carousel-picture'}/></SwiperSlide>
    //         <SwiperSlide><img src={'../../swiper-pictures/3.jpg'} alt={'carousel-picture'}/></SwiperSlide>
    //         <SwiperSlide><img src={'../../swiper-pictures/7.jpg'} alt={'carousel-picture'}/></SwiperSlide>
    //         <SwiperSlide><img src={'../../swiper-pictures/8.jpg'} alt={'carousel-picture'}/></SwiperSlide>
    //         <SwiperSlide><img src={'../../swiper-pictures/9.jpg'} alt={'carousel-picture'}/></SwiperSlide>
    //         <SwiperSlide><img src={'../../swiper-pictures/10.jpg'} alt={'carousel-picture'}/></SwiperSlide>
    //     </>
    // );


    const isSmallSize = useMediaQuery('(max-width: 700px)');
    const isMediumSize = useMediaQuery('(min-width: 701px) and (max-width: 1050px)');
    let bcgPicWidth = '160%';
    let bcgPicBias = '260px';
    let bcgPicHeight = '450px';
    let soldierLeftBias = '70%';
    let soldierTopBias = '60px';
    let soldierSize = '170px';
    let vFont = 'h6';
    if (isSmallSize) {
        bcgPicBias = '200px';
        bcgPicHeight = '600px';
        soldierLeftBias = "60%";
        soldierTopBias = '150px';
        vFont = "body1";
        soldierSize = '150px';
    } else if (isMediumSize) {
        bcgPicHeight = '630px';
        soldierLeftBias = "70%";
        soldierTopBias = '120px';
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
                        delay: slidesDelay,
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
                        filter: 'opacity(0.6)',
                        position: 'absolute',
                        top: "-60px",
                        left: bcgPicBias,
                        backgroundSize: '110%  60%',
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
                    <Image src={'/swiper-pictures/fuck-boy.png'}
                           width={soldierSize} height={soldierSize} alt={'soldier'}/>
                </div>


                <SwiperSlide>
                    <Box sx={{width: '80%', m: '0 auto'}}>
                        <Typography variant='h4'>
                            {carouselCards[0].title}
                        </Typography>

                        <FontBox>
                            {!isSmallSize && carouselCards[0].content}
                            {isSmallSize && carouselCards[0].contentMob}
                        </FontBox>
                    </Box>
                </SwiperSlide>

                <SwiperSlide>
                    <Box sx={{width: '80%', m: '0 auto'}}>
                        <Typography variant='h4'>
                            {carouselCards[1].title}
                        </Typography>

                        <FontBox>
                            {!isSmallSize && carouselCards[1].content}
                            {isSmallSize && carouselCards[1].contentMob}
                        </FontBox>
                    </Box>
                </SwiperSlide>

                <SwiperSlide>
                    <Box sx={{width: '80%', m: '0 auto'}}>
                        <Typography variant='h4'>
                            {carouselCards[2].title}
                        </Typography>

                        <FontBox>
                            {!isSmallSize && carouselCards[2].content}
                            {isSmallSize && carouselCards[2].contentMob}
                        </FontBox>
                    </Box>
                </SwiperSlide>

                <SwiperSlide>
                    <Box sx={{width: '80%', m: '0 auto'}}>
                        <Typography variant='h4'>
                            {carouselCards[3].title}
                        </Typography>

                        <FontBox>
                            {!isSmallSize && carouselCards[3].content}
                            {isSmallSize && carouselCards[3].contentMob}
                        </FontBox>
                    </Box>
                </SwiperSlide>


            </Swiper>

            <Divider/>

            <Typography variant={vFont}>
                <Box sx={{m: "16px "}}>... а тем временем... русский корабль шёл...</Box>
            </Typography>
        </>
    );
};

export default SwiperCarousel;

const FontBox = styled.p`
    font-family: 'RobotoSlab', serif;
    // font-family: 'Roboto', cursive;
    // font-family: 'Tapestry', cursive;
    font-weight: 400;
    font-display: swap;
    font-size: ${fontSize};
    color: ${carouselTextColor};
    text-shadow: 1px 1px #1d3557;
`;

