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

const carouselTextColor = '#993300';


const SwiperCarousel = () => {
    const theme = useTheme();
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
    let bcgPicBias = '360px';
    let bcgPicHeight = '400px';
    let soldierLeftBias = '70%';
    let soldierTopBias = '80px';
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
                            "no-repeat url(../../swiper-pictures/1_.jpg)",
                        filter: 'opacity(0.7)',
                        position: 'absolute',
                        top: "-50px",
                        left: bcgPicBias,
                        backgroundSize: '100%  80%',
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


                {/*                <div   //контейнер для статического изображения (солдат с пальцем вверх)
                    style={{background: "no-repeat center url(../../swiper-pictures/fuck-boy.png)",
                        position: 'absolute', top: "60px", left: "50%", opacity: "0.4", filter: "brightness(100%)",
                        height: '300px', width: '300px'
                    }}

                >.</div>*/}

                <SwiperSlide>
                    <Box sx={{width: '80%', m: '0 auto'}}>
                        <Typography variant='h4'>
                            О Нашей Платформе
                        </Typography>

                        <FontBox>
                            Мы - гуманитарный волонтёрский проект, цель которого - максимально ускорить и облегчить
                            возвращение наших славных Украинцев к безопасной и счастливой жизни.
                            Мы -международный ресурс и мы оформлены сейчас на языке врага для более обширного
                            понимания во
                            всём Мире, но мы украинцы! Слава Украине!
                        </FontBox>
                    </Box>
                </SwiperSlide>

                <SwiperSlide>
                    <Box sx={{width: '80%', m: '0 auto'}}>
                        <Typography variant='h4'>
                            Предложить/ Найти Жильё
                        </Typography>

                        <FontBox>
                            Наш сервис позволяет предлагать и находить жильё и гостепреимство для переселенцев и
                            потерявших свой дом. Для этого, мы предлагаем и хозяевам жилья и соискателям заполнять
                            подробные
                            анкеты: чем более подробно Вы заполните наши формы и расскажете о
                            себе, тем более эффективно будут работать наши поисковые алгоритмы, сопоставляя
                            потребности
                            соискателей с возможностями хозяев. Это позволит самым пострадавшим получить первый
                            приоритет в расселении.
                        </FontBox>
                    </Box>
                </SwiperSlide>


                <SwiperSlide>
                    <Box sx={{width: '80%', m: '0 auto'}}>
                        <Typography variant='h4'>
                            Служба Международных Знакомств
                        </Typography>

                        <FontBox>
                            Наш подлый враг, желает видеть украинцев несчастными, поэтому еще один сервис,
                            который мы вскоре запускаем: <span>служба военных знакомств</span>, цель которого:
                            знакомства
                            созидательного характера ведущие к улучшению нашего благосостояния. Это про всё личное,
                            что может перерости в счастье и
                            радость для Украинцев). Отличие нашего сервиса: бесплатно на время войны для
                            переселенцев и предоставляющих жильё и тщательный подход в ликвидации жульничества и
                            хамства.
                        </FontBox>
                    </Box>
                </SwiperSlide>


                <SwiperSlide>
                    <Box sx={{width: '80%', m: '0 auto'}}>
                        <Typography variant='h4'>
                            Поддержка Пострадавших
                        </Typography>

                        <FontBox>
                            Развиваем новый сервис: психологическая, дружеское тепло и волонтерская поддержка тем,
                            кто
                            испытал на себе последствия насилия рашистов. Для этого мы организовываем сеть
                            специальных служб, которые будут работать по Украине и Европе.
                            Наша команда призывает волонтеров присоединяться к нашей платформе -регистрироваться
                            пользователями и отсылать нам свои предложение по партнерству в телеграм: @Vlad_Ry.
                        </FontBox>
                    </Box>
                </SwiperSlide>


            </Swiper>

            <Divider/>

            <Typography variant={vFont}>
                <Box sx={{m: "2"}}>... а тем временем... русский корабль погружался ...</Box>
            </Typography>
        </>
    );


};

export default SwiperCarousel;

const FontBox = styled.p`
    font-family: 'Tapestry', cursive;
    font-weight: 400;
    font-display: swap;
    font-size: 22px;
    color: ${carouselTextColor};
`;

