import React from 'react';
import {useFormik, getIn} from 'formik';
import MuiPhoneNumber from 'material-ui-phone-number-2';
import {Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, useMediaQuery} from "@mui/material";
import AutocompleteFromMapbox from "./AutocompleteFromMapbox";
import {useRouter} from "next/router";
import DatingWrapper from "../pages/formPages/dating/DatingWrapper";
import {datingMenu} from "../public/menuConfig";
import DatingUserList from "./content/DatingUserList";

const DatUserProfileMapper = ({fields, values, id}) => {
    const router = useRouter();
    const excludedRefs = ['pictures', 'mySex', 'seekAPersonOfSex'];
    const mappedBoxes = fields.map(({name, formikRef, label}, index) => {
        const isExcludingElement = excludedRefs.some((el) => formikRef === el);
        if (isExcludingElement) {
            return null;
        } else
            return (
                <Box key={formikRef} sx={{p: 2, border: '1px solid lightgrey', borderRadius: 1, width: '400px'}}>
                    <p>{label}</p>
                    <p>{values[formikRef]}</p>
                </Box>
            )


    });

    return (
        <Grid container={true} spacing={2}>
            <Grid item={true} xs={5} sm={3} md={2} >
                <Box sx={{border: '1px solid red'}}><DatingWrapper>
                    {datingMenu[0].linkName}
                </DatingWrapper></Box>
            </Grid>

            <Grid item={true} xs={7} sm={9} md={10}>
                <Box sx={{border: '1px solid green'}}>
                    <h3 style={{textAlign: 'center'}}>Profile of Candidate id: {id}</h3>

                    <Grid sx={{
                        display: 'grid',
                        justifyContent: "space-around",
                        alignItems: 'center',
                        columnGap: '2px', rowGap: '8px',
                        gridTemplateColumns: {xs: '1fr', md: '1fr 1fr'}
                    }} container>
                        {mappedBoxes}
                    </Grid>


                </Box>
            </Grid>
        </Grid>
    );




};

export default DatUserProfileMapper;