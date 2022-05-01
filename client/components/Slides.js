import React from 'react';
import {carouselCards} from '../public/carouselConfig.js';
import SwiperCard from "./SwiperCard";

const Slides = () => {
    const cardList = carouselCards.map((card, index) =>
        <SwiperCard key={index} card={card}/>);

    return (
        <>
            {cardList}
        </>
    );
};

export default Slides;