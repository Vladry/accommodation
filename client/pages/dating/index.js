import React from 'react';
import DatingWrapper from "./DatingWrapper";
import {datingMenu} from "../../public/menuConfig";
import {Box, Grid} from '@mui/material';
import DatingUserList from "../../components/content/DatingUserList";

const Index = () => {
    const users = [
        {id:  1, name: "Vlad", bestPhoto: "photo1"},
        {id:  2, name: "Serge", bestPhoto: "photo2"},
        {id:  3, name: "Andrey", bestPhoto: "photo3"},
        {id:  4, name: "Anya", bestPhoto: "photo4"},
        {id:  5, name: "Petya", bestPhoto: "photo5"},
        {id:  6, name: "Galya", bestPhoto: "photo6"},
        {id:  7, name: "Sidora", bestPhoto: "photo7"},
        {id:  8, name: "Gvidonia", bestPhoto: "photo8"},
        {id:  9, name: "Algora", bestPhoto: "photo9"},
        {id: 10, name: "Semyon", bestPhoto: "photo10"},
        {id: 11, name: "Kuzya", bestPhoto: "photo11"},
        {id: 12, name: "Priparok", bestPhoto: "photo12"},
        {id: 13, name: "Karisa", bestPhoto: "photo13"},
        {id: 14, name: "Matvey", bestPhoto: "photo14"},
        {id: 15, name: "Danil", bestPhoto: "photo15"},
        {id: 16, name: "Efimovna", bestPhoto: "photo16"},
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
                    <h3 style={{textAlign: 'center'}}>Меню</h3>
                    <DatingUserList users={users}/>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Index;