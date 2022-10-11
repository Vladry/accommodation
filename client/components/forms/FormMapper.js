import React from 'react';
import {useFormik, getIn} from 'formik';
import MuiPhoneNumber from 'material-ui-phone-number-2';
import {Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, useMediaQuery} from "@mui/material";
import AutocompleteFromMapbox from "../AutocompleteFromMapbox";
import InputSelectMany from "./dating_user_profile_form/InputSelectMany";
import InputSelectSex from "./dating_user_profile_form/InputSelectSex";
import InputSelectCountry from "./dating_user_profile_form/InputSelectCountry";
import styled from "@emotion/styled";
import stylingConfig from '../../stylingConfig'
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
            case 'select_many':
                return (
                    <FormItem key={formikRef} ><InputSelectMany formikRef={formikRef} input={input}
                                               formik={formik}/></FormItem>
                );
            case 'select_sex':
                return (
                    <FormItem key={formikRef}><InputSelectSex formikRef={formikRef} input={input}
                                              formik={formik}/></FormItem>
                );
            case 'select_country':
                return (
                    <FormItem key={formikRef}><InputSelectCountry formikRef={formikRef} input={input} formik={formik}/></FormItem>
                );
            case 'number':
                return (
                    <FormItem key={formikRef}><Labels>{input.label}:<br/>
                        <input id={formikRef} name={formikRef} defaultValue={0}/>
                    </Labels></FormItem>
                );
            case 'tel':
                return (
                    <FormItem key={formikRef}><MuiPhoneNumber
                        variant={"outlined"}
                        fullWidth
                        margin={'normal'}
                        defaultCountry={'ua'}
                        onChange={e => formik.setFieldValue(formikRef, e)}
                        value={getIn(formik.values, formikRef) ? getIn(formik.values, formikRef) : ""}
                        {...input}
                    /></FormItem>
                );
            case 'checkbox':
                return (<FormItem key={formikRef} sx={{p: 2, border: '1px solid lightgrey', borderRadius: 1}}>
                        <FormControlLabel control={<Checkbox/>}
                                          value={getIn(formik.values, formikRef) ? getIn(formik.values, formikRef) : false} {...input} {...defaultProps.checkbox}
                        /></FormItem>
                );
            case 'autocompleteFromMapBox':
                return (<FormItem key={formikRef}><AutocompleteFromMapbox
                    error={getIn(formik.touched, formikRef) && Boolean(getIn(formik.errors, formikRef))}
                    helperText={getIn(formik.touched, formikRef) ? getIn(formik.errors, formikRef) : ''}
                    value={getIn(formik.values, formikRef) ? getIn(formik.values, formikRef) : ""}
                    onChange={e => {
                        formik.setFieldValue(formikRef, e, true)
                    }
                    }/></FormItem>);
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
                    <FormItem key={formikRef}><TextField
                        fullWidth
                        helperText={getIn(formik.touched, formikRef) ? getIn(formik.errors, formikRef) : ''}
                        error={getIn(formik.touched, formikRef) && Boolean(getIn(formik.errors, formikRef))}
                        value={getIn(formik.values, formikRef) ? getIn(formik.values, formikRef) : ""}
                        {...input}
                        {...defaultProps.textField}
                    /></FormItem>
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

const FormItem = styled.div`
border: ${stylingConfig.formItem.border};
border-radius: ${stylingConfig.formItem.borderRadius};
margin: ${stylingConfig.formItem.blockMargin};
`;

const Labels = styled.label`
font-size: ${stylingConfig.labels.fontSize};
font-weight: ${stylingConfig.labels.fontWeight};
color: ${stylingConfig.labels.color};
`;