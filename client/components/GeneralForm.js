import React from 'react';
import {Box, Button, Grid} from "@mui/material";

const GeneralForm = ({mappedFields, formik}) => {
    return (
        <>
            <form style={{width: '95%', margin: '0 auto'}} onSubmit={formik.handleSubmit}>
                {/*<form style={{ width: isSmallScreen? '95%' : '680px', margin: '0 auto'}} onSubmit={formik.handleSubmit}>*/}
                <Grid container
                      sx={{
                          display: 'grid',
                          justifyContent: "space-around",
                          alignItems: 'center',
                          columnGap: '10px',
                          gridTemplateColumns: {xs: '1fr', md: '1fr 1fr'}
                      }}>
                    {mappedFields}
                </Grid>
                <Box textAlign={'center'} margin={'20px'}>
                    <Button variant="contained" onClick={formik.submitForm}>Submit/ Отправить форму</Button>
                </Box>

                {/*https://developer.mozilla.org/ru/docs/Web/HTML/Element/pre*/}
                {/*<pre>{JSON.stringify(formik.values, null, 4)}</pre>*/}
            </form>
        </>
    );
};

export default GeneralForm;