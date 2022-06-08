import React from 'react';
import DatingWrapper from "./DatingWrapper";
import {datingMenu} from "../../public/menuConfig";
import {Box, Grid} from '@mui/material';
import DatingUserList from "../../components/content/DatingUserList";

const Index = () => {
    const users = [
        {name: "Vlad", bestPhoto: ""},
        {name: "Serge", bestPhoto: ""},
        {name: "Andrey", bestPhoto: ""},
        {name: "Egor", bestPhoto: ""},
    ];
    return (
        <Grid container={true} spacing={2}>
            <Grid item={true} xs={5} sm={3} md={2}>
                <Box sx={{border: '1px solid red'}}><DatingWrapper>
                    {datingMenu[0].linkName}
                </DatingWrapper></Box>
            </Grid>
            <Grid item={true} xs={7} sm={9} md={10}>
                <Box sx={{border: '1px solid green'}}>
                    <h3>Меню</h3>
                    <DatingUserList users={users}/>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Index;