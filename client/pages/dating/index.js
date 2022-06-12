import React from 'react';
import DatingWrapper from "./DatingWrapper";
import {datingMenu} from "../../public/menuConfig";
import {Box, Grid} from '@mui/material';
import DatingUserList from "../../components/content/DatingUserList";
import tryUsers from '../../public/tryUsers';

const Index = () => {

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
                    <DatingUserList users={tryUsers}/>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Index;