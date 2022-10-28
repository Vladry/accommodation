import React from 'react';
import {Box, Grid} from "@mui/material";

const SideBar = ({children}) => {
    return (
        <Box >
            <Grid sx={{border: '1px solid red'}} item={true} xs={12}  md={4}>

                    {children}

            </Grid>
        </Box>


    );
};

export default SideBar;