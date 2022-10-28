import React from 'react';
import {Box, Paper} from "@mui/material";
import {useTheme} from "@mui/material/styles";

const ArticleWindow = ({title, content}) => {
    const theme = useTheme();

    return (
        <Paper sx={{
            border: '1px solid green',
            ...theme.paperProps
        }}>
            <h3 style={{textAlign: 'center'}}>{title}</h3>

                    <Box sx={{
                        // display: 'flex',
                        // justifyContent: "center",
                        // alignItems: 'center',
                        // columnGap: '2px', rowGap: '8px',
                        // gridTemplateColumns: {xs: '1fr', md: '1fr 1fr'}
                    }} >
                        {content}
                    </Box>
        </Paper>
    );
};

export default ArticleWindow;