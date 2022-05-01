import React from 'react';
import {Box, Typography} from "@mui/material";
import styled from "@emotion/styled";
import {SwiperSlide} from 'swiper/react';
import {carouselTextColor, fontSize} from '../public/carouselConfig.js';

const SwiperCard = ({card}) => {

return (
            <SwiperSlide>
                <Box sx={{width: '80%', m: '0 auto'}}>
                    <Typography variant='h4'>
                        {card.title}
                    </Typography>

                    <FontBox>
                        {card.content}
                    </FontBox>
                </Box>
            </SwiperSlide>
    );


};

export default SwiperCard;

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