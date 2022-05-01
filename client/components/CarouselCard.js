import React from 'react';
import {Box, Typography} from "@mui/material";

const CarouselCard = () => {
    return (
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
    );
};

export default CarouselCard;