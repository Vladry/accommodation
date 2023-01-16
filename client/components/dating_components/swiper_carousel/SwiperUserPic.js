import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, EffectFade, Navigation, Pagination} from "swiper";
import 'swiper/css';
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import styles from "./SwiperUserPic.module.css";
import {useTheme} from "@mui/material/styles";


const SwiperUserPic = ({pictures}) => { // https://swiperjs.com/react
    // code example: https://codesandbox.io/s/v1c96y?file=/src/App.jsx:339-349
    // console.log("SwiperUserPic-> pictures:", pictures);
    const theme = useTheme();

    if (!pictures || pictures.length === 0) {
        return null;
    }// обязательно выйти, иначе полезут ошибки по classList и некорректен же метод pictures.map!

    const pagination = {
        clickable: true,
        bulletClass: `swiper-pagination-bullet ${styles['swiper-pagination-bullet']}`,
        renderBullet: function (index, className) {
            // renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
    };



    // TODO: нарушен порядок рендера фотографий, аватарка должна быть первая!
    //  И не всегда рендерятся приходящие фотки. При этом 'pictures' -приходит упорядоченный и бывает наложение фотки на фотку (если высокая фотка накрывается сверху короткой)
    const imgContent = pictures.map((el, i) => (
        <SwiperSlide sx={{backgroundColor: `${theme.paperBackgroundColor}`}} className={`${styles['swiper-slide']}`} key={i}>
            <img style={{ listStyle: "none", borderRadius: `${theme.cardBoxParams.borderRadius}`, overflow: 'hidden' }} className={`${styles['swiper-slide img']}`}
                                                                          src={el}
                                                                          alt={'carousel-picture'}/></SwiperSlide>
    ));

    return (
            <Swiper
                modules={[Autoplay, Navigation, Pagination, EffectFade]}
                // className={styles.swiper}
                className={`mySwiper ${styles.swiper}`}
                spaceBetween={0}
                slidesPerView={1}
                // slidesPerView={"auto"}
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
    );
};



export default SwiperUserPic;


