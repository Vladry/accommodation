import React from 'react';
import {Box, Grid} from "@mui/material";

const SideBar = ({children}) => {
    return (
            <Grid item={true} xs={5} sm={3} md={2}>
                <Box sx={{border: '1px solid red'}}>
                    {children}
                </Box>
            </Grid>


    );
};

export default SideBar;