import React from 'react';
import DatingWrapper from "./DatingWrapper";
import {datingMenu} from "../../public/menuConfig";
import {Box, Grid} from '@mui/material';
import DatingUserList from "../../components/content/DatingUserList";

const Index = () => {
    const users = [
        {name: "Vlad", bestPhoto: "photo1"},
        {name: "Serge", bestPhoto: "photo2"},
        {name: "Andrey", bestPhoto: "photo3"},
        {name: "Anya", bestPhoto: "photo4"},
        {name: "Petya", bestPhoto: "photo5"},
        {name: "Galya", bestPhoto: "photo6"},
        {name: "Sidora", bestPhoto: "photo7"},
        {name: "Gvidonia", bestPhoto: "photo8"},
        {name: "Algora", bestPhoto: "photo9"},
        {name: "Semyon", bestPhoto: "photo10"},
        {name: "Kuzya", bestPhoto: "photo11"},
        {name: "Priparok", bestPhoto: "photo12"},
        {name: "Karisa", bestPhoto: "photo13"},
        {name: "Matvey", bestPhoto: "photo14"},
        {name: "Danil", bestPhoto: "photo15"},
        {name: "Efimovna", bestPhoto: "photo16"},
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