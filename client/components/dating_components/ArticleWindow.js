import React from 'react';
import {Box, Grid, Paper} from "@mui/material";
import {useTheme} from "@mui/material/styles";

const ArticleWindow = ({title, content, children}) => {
    const theme = useTheme();

    return (
        <Paper sx={{
            display: 'flex', alignItems: 'flex-start', flexFlow: 'wrap', border: '1px solid green',
            ...theme.paperProps
        }}>
            <h3 style={{textAlign: 'center'}}>{title}</h3>
            <Grid container xs={12}  md={12}>   {/*это контейнер ArticleWindow*/}
                    <Grid item={true}>   {/*это контейнер карусели*/}
                        {children}
                    </Grid>
                    <Grid sx={{        // это контейнер таблицы
                        display: 'grid',
                        justifyContent: "center",
                        // justifyContent: "space-around",
                        alignItems: 'center',
                        columnGap: '2px', rowGap: '8px',
                        gridTemplateColumns: {xs: '1fr', md: '1fr 1fr'}
                    }} container>
                        {content}
                    </Grid>
            </Grid>
        </Paper>
    );
};

export default ArticleWindow;