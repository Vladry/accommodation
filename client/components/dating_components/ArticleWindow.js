import React from 'react';
import {Box, Grid} from "@mui/material";

const ArticleWindow = ({title, content, children}) => {
    return (
        <Grid item={true} xs={7} sm={9} md={10}>
            <Box sx={{border: '1px solid green'}}>
                <h3 style={{textAlign: 'center'}}>{title}</h3>
                {children}
                <Grid sx={{
                    display: 'grid',
                    justifyContent: "space-around",
                    alignItems: 'center',
                    columnGap: '2px', rowGap: '8px',
                    gridTemplateColumns: {xs: '1fr', md: '1fr 1fr'}
                }} container>
                    {content}
                </Grid>

            </Box>
        </Grid>
    );
};

export default ArticleWindow;