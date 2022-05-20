import React from 'react';
import {useFormik, getIn} from 'formik';
import MuiPhoneNumber from 'material-ui-phone-number-2';
import {Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, useMediaQuery} from "@mui/material";
import AutocompleteWithDebounce from "../AutocompleteWithDebounce";
import AutocompleteFromMapbox from "../AutocompleteFromMapbox";
import {useRouter} from "next/router";

const FormMapper = ({fields, validation, handleSubmit}) => {
    const isSmallScreen = useMediaQuery("(max-width: 700px)");
    const router = useRouter();

    const formik = useFormik({
        initialValues: fields.reduce((acc, f) => ({
            ...acc,
            [f.formikRef]: f.valueByDefault
        }), {}),
        validationSchema: validation,
        onSubmit: (values) => {
            handleSubmit(values);
        }
    })

    const defaultProps = React.useMemo(() => ({
            textField: {
                variant: 'outlined',
                margin: 'normal',
                onChange: props => {
                    formik.handleChange(props);
                    formik.handleBlur(props);
                },
                onBlur: formik.handleBlur
            },
            checkbox: {
                onChange: props => {
                    formik.handleChange(props);
                    formik.handleBlur(props);
                },
                onBlur: formik.handleBlur
            }
        }),
        [formik]
    );

    const mappedFields = fields.map(({formikRef, valueByDefault, ...input}) => {
        switch (input.type) {
            case 'tel':
                return (
                    <MuiPhoneNumber
                        variant={"outlined"}
                        fullWidth
                        margin={'normal'}
                        key={formikRef}
                        defaultCountry={'ua'}
                        onChange={e => formik.setFieldValue(formikRef, e)}
                        value={getIn(formik.values, formikRef)}
                        {...input}
                    />
                );
            case 'checkbox':
                return (<Box key={formikRef} sx={{p: 2, border: '1px solid lightgrey', borderRadius: 1}}>
                        <FormControlLabel control={<Checkbox/>}
                                          value={getIn(formik.values, formikRef)} {...input} {...defaultProps.checkbox}
                        /></Box>
                );
            case 'autocompleteFromMapBox':
                return (<AutocompleteFromMapbox
                    error={getIn(formik.touched, formikRef) && Boolean(getIn(formik.errors, formikRef))}
                    helperText={getIn(formik.touched, formikRef) ? getIn(formik.errors, formikRef) : ''}
                    key={formikRef}
                    value={getIn(formik.values, formikRef)}
                    onChange={e => {
                        formik.setFieldValue(formikRef, e, true)
                    }
                    }/>);
            default:
                return (
                    <TextField
                        fullWidth
                        key={formikRef}
                        helperText={getIn(formik.touched, formikRef) ? getIn(formik.errors, formikRef) : ''}
                        error={getIn(formik.touched, formikRef) && Boolean(getIn(formik.errors, formikRef))}
                        value={getIn(formik.values, formikRef)}
                        {...input}
                        {...defaultProps.textField}
                    />
                )
        }
    })


    return (
        <form style={{ width: isSmallScreen? '400px' : '800px', margin: '0 auto'}} onSubmit={formik.handleSubmit}>
            <Grid sx={{
                    display: 'grid',
                    justifyContent: "space-around",
                    alignItems: 'center',
                    columnGap: '10px',
                    gridTemplateColumns: {xs: '1fr', md: '1fr 1fr'}
            }} container>
                {mappedFields}
            </Grid>

            <Box textAlign={'center'} margin={'20px'}>
            <Button variant="contained"  onClick={formik.submitForm}>Submit/ Отправить форму</Button>
            </Box>

        </form>
    );
};

export default FormMapper;