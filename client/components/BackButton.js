import React from 'react';
import {Box, Button} from "@mui/material";
import {useRouter} from "next/router";

const BackButton = ({xyOffset}) => {
    // эта кнопка получает произвольное кол-во атрибутов расположения или ни одного:
    // пример1: <BackButton/>   -по-умолчанию расположится так:  position: 'fixed', top: '1px', right: '1px'
    // пример2:  <BackButton xyOffset={{top: '120px', left: '1px'}}/>
    // пример3:  <BackButton xyOffset={{right: '10px'}}/>
    const router = useRouter();

    return (
        <Box textAlign={'center'} margin={'4px'}
             sx={
                 () => {
                     const defaultVals = {zIndex: 1, position: 'fixed', boxShadow: '18'};
                     const staticAttr = {...defaultVals, top: '1px', right: '20px'};
                     if (!xyOffset) return staticAttr;
                     let attributes = {};
                     if (xyOffset.top) {
                         attributes = {...attributes, top: xyOffset.top}
                     }
                     if (xyOffset.right) {
                         attributes = {...attributes, right: xyOffset.right}
                     }
                     if (xyOffset.left) {
                         attributes = {...attributes, left: xyOffset.left}
                     }
                     if (xyOffset.bottom) {
                         attributes = {...attributes, bottom: xyOffset.bottom}
                     }

                     return {...defaultVals, ...attributes};
                 }
             }>
            <Button variant="contained" size={'small'} onClick={router.back}>Back</Button>
        </Box>
    );
};

export default BackButton;