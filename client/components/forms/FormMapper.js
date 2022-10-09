import React from 'react';
import {useFormik, getIn} from 'formik';
import MuiPhoneNumber from 'material-ui-phone-number-2';
import {Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, useMediaQuery} from "@mui/material";
import AutocompleteFromMapbox from "../AutocompleteFromMapbox";
import InputSelect from "./dating_user_profile_form/InputSelect";

const FormMapper = ({fields, initValues, validation, handleSubmit}) => {

    const formik = useFormik({
        ...initValues,
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
            case 'select':
                return (
                    <InputSelect key={formikRef} formikRef={formikRef} input={input} formik={formik}/>
                );
            case 'tel':
                return (
                    <MuiPhoneNumber
                        variant={"outlined"}
                        fullWidth
                        margin={'normal'}
                        key={formikRef}
                        defaultCountry={'ua'}
                        onChange={e => formik.setFieldValue(formikRef, e)}
                        value={getIn(formik.values, formikRef) ? getIn(formik.values, formikRef) : ""}
                        {...input}
                    />
                );
            case 'checkbox':
                return (<Box key={formikRef} sx={{p: 2, border: '1px solid lightgrey', borderRadius: 1}}>
                        <FormControlLabel control={<Checkbox/>}
                                          value={getIn(formik.values, formikRef) ? getIn(formik.values, formikRef) : false} {...input} {...defaultProps.checkbox}
                        /></Box>
                );
            case 'autocompleteFromMapBox':
                return (<AutocompleteFromMapbox
                    error={getIn(formik.touched, formikRef) && Boolean(getIn(formik.errors, formikRef))}
                    helperText={getIn(formik.touched, formikRef) ? getIn(formik.errors, formikRef) : ''}
                    key={formikRef}
                    value={getIn(formik.values, formikRef) ? getIn(formik.values, formikRef) : ""}
                    onChange={e => {
                        formik.setFieldValue(formikRef, e, true)
                    }
                    }/>);
            case 'image': //TODO -переписать весь кейс для image:
                // https://medium.com/geekculture/how-to-upload-and-preview-images-in-react-js-4e22a903f3db
                return null;
                /*                return (<Box key={formikRef} sx={{p: 2, border: '1px solid lightgrey', borderRadius: 1}}>
                        - input your image here-
                        <input type='image' alt="user_images"/>
                    </Box>
            )*/
                ;
            default:
                return (
                    <TextField
                        fullWidth
                        key={formikRef}
                        helperText={getIn(formik.touched, formikRef) ? getIn(formik.errors, formikRef) : ''}
                        error={getIn(formik.touched, formikRef) && Boolean(getIn(formik.errors, formikRef))}
                        value={getIn(formik.values, formikRef) ? getIn(formik.values, formikRef) : ""}
                        {...input}
                        {...defaultProps.textField}
                    />
                )
        }
    })

    return (
        <form style={{width: '95%', margin: '0 auto'}} onSubmit={formik.handleSubmit}>
            {/*<form style={{ width: isSmallScreen? '95%' : '680px', margin: '0 auto'}} onSubmit={formik.handleSubmit}>*/}
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
                <Button variant="contained" onClick={formik.submitForm}>Submit/ Отправить форму</Button>
            </Box>

        </form>
    );
};

export default FormMapper;