//  https://formik.org/docs/api/field

import React, {useState} from 'react';
import {Form, Formik, Field, ErrorMessage, useFormik, getIn} from 'formik';
import * as yup from 'yup';
import {EMAIL_REGEXP} from "../utils/regexp";
import MuiPhoneNumber from 'material-ui-phone-number-2';
import {Button, Checkbox, Container, FormControlLabel, Grid, TextField} from "@mui/material";

const fields = [
    {
        id: "name",
        name: "name",
        formikRef: "name",
        label: "First name",
        valueByDefault: "",
        type: "text"
    },
    {
        id: "lastName",
        name: "lastName",
        formikRef: "lastName",
        label: "Last name",
        valueByDefault: "",
        type: "text"
    },
    {
        id: "email",
        name: "email",
        formikRef: "email",
        label: "Email",
        valueByDefault: "",
        type: "text"
    },
    {
        id: "password",
        name: "password",
        formikRef: "password",
        label: "Password",
        valueByDefault: "",
        type: "text"
    },
    {
        id: "phoneNumber",
        name: "phoneNumber",
        formikRef: "phoneNumber",
        label: "Phone number",
        valueByDefault: "+380",
        type: "tel"
    },
    {
        id: "urlSocial1",
        name: "urlSocial1",
        formikRef: "urlSocial1",
        label: "urlSocial1",
        valueByDefault: "",
        type: "text",
    },
    {
        id: "urlSocial2",
        name: "urlSocial2",
        formikRef: "urlSocial2",
        label: "urlSocial2",
        valueByDefault: "",
        type: "text",
    },
    {
        id: "messenger1",
        name: "messenger1",
        formikRef: "messenger1",
        label: "messenger1",
        valueByDefault: "",
        type: "text",
    },
    {
        id: "messenger2",
        name: "messenger2",
        formikRef: "messenger2",
        label: "messenger2",
        valueByDefault: "",
        type: "text",
    },
    {
        id: "city",
        name: "city",
        formikRef: "city",
        label: "City",
        valueByDefault: "",
        type: "text",
    },
    {
        id: "country",
        name: "country",
        formikRef: "country",
        label: "Country",
        valueByDefault: "",
        type: "text",
    },
    {
        id: "datingServiceParticipation",
        name: "datingServiceParticipation",
        formikRef: "datingServiceParticipation",
        label: "Dating service participation",
        valueByDefault: false,
        type: "checkbox",
    }, {
        id: "hideSocialContactData",
        name: "hideSocialContactData",
        formikRef: "hideSocialContactData",
        label: "Hide social contact data",
        valueByDefault: false,
        type: "checkbox",
    },
];

const UserForm = () => {
    const formValidationSchema = yup.object().shape({
        name: yup.string().min(3, "слишком короткое имя").max(20, "укоротите имя"),
        lastName: yup.string().min(3, "слишком короткая фамилия").max(20, "укоротите фамилию"),
        email: yup.string()/*.matches(EMAIL_REGEXP, "incorrect email")*/.required("действительный имейл обязателен"),
        password: yup.string().min(8, "пароль -не менее 8ми знаков").max(20, "пароль - не боле 20ти знаков"),
        phoneNumber: yup.string()/*.phoneNumber()*/.required(true),
        hideSocialContactData: yup.boolean(),
        city: yup.string().required("Required"),
        country: yup.string().required("Required"),
        datingServiceParticipation: yup.boolean().required("Required")
    })

    const handleSubmit = (values) => {
        console.log("in handleSubmit()")
        console.log(JSON.stringify(values, null, 2));
    }

    const formik = useFormik({
        initialValues: fields.reduce((acc, f) => ({
            ...acc,
            [f.formikRef]: f.valueByDefault
        }), {}),
        validationSchema: formValidationSchema,
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