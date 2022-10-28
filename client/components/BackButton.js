import React from 'react';
import {Box, Button} from "@mui/material";
import {useRouter} from "next/router";

const BackButton = () => {
    const router = useRouter();

    return (
        <Box textAlign={'center'} margin={'4px'}
             sx={{zIndex: '1', position: 'fixed', right: '1px', top: '1px', boxShadow: '18'}}>
            <Button variant="contained" size={'small'} onClick={router.back}>Back / Обратно</Button>
        </Box>
    );
};

export default BackButton;