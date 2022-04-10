//  https://formik.org/docs/api/field

import React, {useState} from 'react';
import {Form, Formik, Field, ErrorMessage, useFormik, getIn} from 'formik';
import {EMAIL_REGEXP} from "../../utils/regexp";
import MuiPhoneNumber from 'material-ui-phone-number-2';
import {Button, Checkbox, Container, FormControlLabel, Grid, TextField} from "@mui/material";
import {userFormValidation} from "./formsValidations";
import {userFormFields} from "./userFormFields";


const UserForm = () => {

    const formik = useFormik({
        initialValues: userFormFields.reduce((acc, f) => ({
            ...acc,
            [f.formikRef]: f.valueByDefault
        }), {}),
        validationSchema: userFormValidation,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
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

    const mappedFields = userFormFields.map(({formikRef, valueByDefault, ...input}) => {
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
                return (
                    <FormControlLabel key={formikRef} control={<Checkbox/>}
                                      value={getIn(formik.values, formikRef)} {...input} {...defaultProps.checkbox} />
                );
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
        <form style={{width: '800px', margin: '0 auto'}} onSubmit={formik.handleSubmit}>
            <Grid sx={{display: 'grid', justifyContent: "space-around", alignItems: 'center', columnGap: '10px', gridTemplateColumns: '1fr 1fr'}} container>
                {mappedFields}
            </Grid>
            <Button variant="outlined" fullWidth onClick={formik.submitForm}>Submit</Button>

        </form>
    );
};

export default UserForm;