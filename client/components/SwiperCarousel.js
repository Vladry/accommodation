import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Autoplay, Pagination, Parallax} from "swiper";
import 'swiper/css';
import {Box, Typography, useMediaQuery} from "@mui/material";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {useTheme} from "@mui/material/styles";

const SwiperCarousel = () => {
const theme = useTheme();
    const testSlides = (
        <>
            <SwiperSlide><img src={'../../swiper-pictures/1.jpg'}  alt={'carousel-picture'}/></SwiperSlide>
            <SwiperSlide><img src={'../../swiper-pictures/2.jpg'}  alt={'carousel-picture'}/></SwiperSlide>
            <SwiperSlide><img src={'../../swiper-pictures/3.jpg'}  alt={'carousel-picture'}/></SwiperSlide>
            <SwiperSlide><img src={'../../swiper-pictures/4.jpg'}  alt={'carousel-picture'}/></SwiperSlide>
            <SwiperSlide><img src={'../../swiper-pictures/1.jpg'}  alt={'carousel-picture'}/></SwiperSlide>
            <SwiperSlide><img src={'../../swiper-pictures/5.jpg'}  alt={'carousel-picture'}/></SwiperSlide>
            <SwiperSlide><img src={'../../swiper-pictures/6.jpg'}  alt={'carousel-picture'}/></SwiperSlide>
            <SwiperSlide><img src={'../../swiper-pictures/3.jpg'}  alt={'carousel-picture'}/></SwiperSlide>
            <SwiperSlide><img src={'../../swiper-pictures/7.jpg'}  alt={'carousel-picture'}/></SwiperSlide>
            <SwiperSlide><img src={'../../swiper-pictures/8.jpg'}  alt={'carousel-picture'}/></SwiperSlide>
            <SwiperSlide><img src={'../../swiper-pictures/9.jpg'}  alt={'carousel-picture'}/></SwiperSlide>
            <SwiperSlide><img src={'../../swiper-pictures/10.jpg'} alt={'carousel-picture'}/></SwiperSlide>
    </>
    );


    const isSmallSize = useMediaQuery('(max-width: 700px)');
    const isMediumSize = useMediaQuery('(min-width: 701px) and (max-width: 1050px)');
    let pics;
    // if ( isSmallSize ) {pics = 1} else if (isMediumSize ){pics = 2} else {pics = 3}  //     -активировать для {renderSlides_2}
    let bcgPicWidth = '160%';
    let bcgPicBias = '100px';
    let bcgPicHeight = '400px';
    if ( isSmallSize )
    {bcgPicWidth = '100%'; bcgPicBias = '50px'; bcgPicHeight = '400px';}
    else if (isMediumSize )
    {bcgPicWidth = '120%'; bcgPicBias = '40px'; bcgPicHeight = '300px';}


    return (
        <>
            <Swiper modules={[Autoplay, Navigation, Pagination, Parallax]}
                    navigation={false}
                    className="mySwiper"
                    loop={true}
                    parallax={true}
                    pagination={false}     // pagination={{clickable: true}}
                    autoplay={{
                        delay: 500,
                        disableOnInteraction: false,
                    }}
                    slidesPerView={1}
            >

                <div  //контейнер для параллакс-изображения (кораблик)
                    slot="container-start"
                    className="parallax-bg"
                    style={{
                        background:
                            "no-repeat center  url(../../swiper-pictures/1_.jpg)",
                        backgroundSize: 'cover',

                        filter: 'opacity(0.5)',
                        minHeight: bcgPicHeight,
                        position: 'absolute',
                        left: bcgPicBias,
                        width: bcgPicWidth,
                    }}
                    data-swiper-parallax="-23%"
                    data-swiper-parallax-opacity="0.9"
                >.</div>
<div   //контейнер для статического изображения (солдат с пальцем вверх)
    style={{background: "no-repeat center url(../../swiper-pictures/fuck-boy.png)", minHeight: bcgPicHeight,
        position: 'relative', top: bcgPicHeight, opacity: "0.4", filter: "brightness(150%)"}}

>.</div>


                <SwiperSlide>
                    <Box  sx={{width:  '80%', m: '0 auto' }}>
                    <Typography variant = 'h5' >
                        О Нашей Платформе
                    </Typography>

                    <Typography  variant = 'h6'>
                        <p>
                            Мы - гуманитарный волонтёрский проект, цель которого - максимально ускорить и облегчить
                            возвращение наших славных Украинцев к безопасной и счастливой жизни.
                            Мы -международный ресурс и мы оформлены сейчас на языке врага для более обширного понимания во
                            всём Мире, но мы украинцы! Слава Украине!
                        </p>
                    </Typography>
                    </Box>
                </SwiperSlide>

                <SwiperSlide>
                    <Box  sx={{width:  '80%', m: '0 auto' }}>
                        <Typography variant = 'h5' >
                            Предложить/ Найти Жильё
                        </Typography>

                        <Typography  variant = 'h6'>
                            <p>
                                Наш сервис позволяет предлагать и находить жильё и гостепреимство для переселенцев и
                                потерявших свой дом. Для этого, мы предлагаем и хозяевам жилья и соискателям заполнять подробные
                                анкеты: чем более подробно Вы заполните наши формы и расскажете о
                                себе, тем более эффективно будут работать наши поисковые алгоритмы, сопоставляя потребности
                                соискателей с возможностями хозяев. Это позволит самым пострадавшим получить первый приоритет в расселении.
                            </p>
                        </Typography>
                    </Box>
                </SwiperSlide>


                <SwiperSlide>
                    <Box  sx={{width:  '80%', m: '0 auto' }}>
                        <Typography variant = 'h5' >
                            Служба Международных Знакомств
                        </Typography>

                        <Typography  variant = 'h6'>
                            <p>
                                Наш подлый враг, желает видеть украинцев несчастными, поэтому еще один сервис,
                                который мы вскоре запускаем: <span>служба военных знакомств</span>, цель которого: знакомства
                                созидательного характера ведущие к улучшению нашего благосостояния. Это про всё личное, что может перерости в счастье и
                                радость для Украинцев). Отличие нашего сервиса: бесплатно на время войны для переселенцев и предоставляющих жильё и тщательный подход в ликвидации жульничества и хамства.
                            </p>
                        </Typography>
                    </Box>
                </SwiperSlide>


                <SwiperSlide>
                    <Box  sx={{width:  '80%', m: '0 auto' }}>
                        <Typography variant = 'h5' >
                            Поддержка Пострадавших
                        </Typography>

                        <Typography  variant = 'h6'>
                            <p>
                                Развиваем новый сервис: психологическая, дружеское тепло и волонтерская поддержка тем, кто
                                испытал на себе последствия насилия рашистов. Для этого мы организовываем сеть специальных служб, которые будут работать по Украине и Европе.
                                Наша команда призывает волонтеров присоединяться к нашей платформе -регистрироваться пользователями и отсылать нам свои предложение по партнерству в телеграм:  @Vlad_Ry.
                            </p>
                        </Typography>
                    </Box>
                </SwiperSlide>


            </Swiper>
        </>
    );



};

export default SwiperCarousel;