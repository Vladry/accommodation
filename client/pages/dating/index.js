import React from 'react';
import DatingWrapper from "./DatingWrapper";
import {datingMenu} from "../../public/menuConfig";
import {Box, Grid} from '@mui/material';

const Index = () => {
    return (
        // <Grid contrainer={true} spacing={0.5}>
        //     <Grid item={true} sm={12} md={4} sx={{border: '1px solid red'}}>
        //         <Box>
        //             <DatingWrapper>
        //                 {datingMenu[0].linkName}
        //             </DatingWrapper>
        //         </Box>
        //     </Grid>
        //     <Grid item={true} sm={12} md={8} sx={{border: '1px solid blue'}}>
        //         <Box><h3>Меню</h3></Box>
        //     </Grid>
        // </Grid>

        // <Grid container spacing={2}>
        //     <Grid item xs={8}>
        //         <Box>xs=8</Box>
        //     </Grid>
        //     <Grid item xs={4}>
        //         <Box>xs=4</Box>
        //     </Grid>
        //     <Grid item xs={4}>
        //         <Box>xs=4</Box>
        //     </Grid>
        //     <Grid item xs={8}>
        //         <Box>xs=8</Box>
        //     </Grid>
        // </Grid>


        <Grid container={true} spacing={2}>
            <Grid item={true} xs={5} sm={3} md={2}>
                <Box sx={{border: '1px solid red'}}><DatingWrapper>
                    {datingMenu[0].linkName}
                </DatingWrapper></Box>
            </Grid>
            <Grid item={true} xs={7} sm={9} md={10}>
                <Box sx={{border: '1px solid green'}}><h3>Меню</h3></Box>
            </Grid>
        </Grid>
    );
};

export default Index;