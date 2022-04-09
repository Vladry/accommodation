//  https://formik.org/docs/api/field

import React, {useState} from 'react';
import {Form, Formik, Field, ErrorMessage, useFormik, getIn} from 'formik';
import * as yup from 'yup';
import {EMAIL_REGEXP} from "../utils/regexp";
import MuiPhoneNumber from 'material-ui-phone-number';
import {Checkbox, FormControlLabel, Grid, TextField} from "@mui/material";

const fields = [
    {
        id: "name",
        name: "name",
        formikRef: "name",
        label: "First name",
        defaultValue: "",
        type: "text"
    },
    {
        id: "lastName",
        name: "lastName",
        formikRef: "lastName",
        label: "Last name",
        defaultValue: "",
        type: "text"
    },
    {
        id: "email",
        name: "email",
        formikRef: "email",
        label: "Email",
        defaultValue: "",
        type: "text"
    },
    {
        id: "password",
        name: "password",
        formikRef: "password",
        label: "Password",
        defaultValue: "",
        type: "text"
    },
    {
        id: "phoneNumber",
        name: "phoneNumber",
        formikRef: "phoneNumber",
        label: "Phone number",
        defaultValue: "",
        type: "tel"
    },
    {
        id: "hideSocialContactData",
        name: "hideSocialContactData",
        formikRef: "hideSocialContactData",
        label: "Hide social contact data",
        defaultValue: false,
        type: "checkbox",
    },
    {
        id: "urlSocial1",
        name: "urlSocial1",
        formikRef: "urlSocial1",
        label: "urlSocial1",
        defaultValue: "",
        type: "text",
    },
    {
        id: "urlSocial2",
        name: "urlSocial2",
        formikRef: "urlSocial2",
        label: "urlSocial2",
        defaultValue: "",
        type: "text",
    },
    {
        id: "messenger1",
        name: "messenger1",
        formikRef: "messenger1",
        label: "messenger1",
        defaultValue: "",
        type: "text",
    },
    {
        id: "messenger2",
        name: "messenger2",
        formikRef: "messenger2",
        label: "messenger2",
        defaultValue: "",
        type: "text",
    },
    {
        id: "city",
        name: "city",
        formikRef: "city",
        label: "City",
        defaultValue: "",
        type: "text",
    },
    {
        id: "country",
        name: "country",
        formikRef: "country",
        label: "Country",
        defaultValue: "",
        type: "text",
    },
    {
        id: "datingServiceParticipation",
        name: "datingServiceParticipation",
        formikRef: "datingServiceParticipation",
        label: "Dating service participation",
        defaultValue: false,
        type: "checkbox",
    }
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
            [f.formikRef]: f.defaultValue
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

    const mappedFields = fields.map(({formikRef, ...input}) => {
        switch (input.type) {
            case 'tel':
                return (
                    <MuiPhoneNumber
                        key={input.id}
                        defaultCountry={"ua"}
                        onChange={e => formik.setFieldValue(formikRef, e)}
                        value={getIn(formik.values, formikRef)}
                        {...input}
                    />
                );
            case 'checkbox':
                return (
                    <FormControlLabel key={input.id} control={<Checkbox/>}
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
        <Grid sx={{width: '400px', margin: '0 auto'}} container>
            <form onSubmit={formik.handleSubmit}>
                {mappedFields}
            </form>
        </Grid>
    );
};

export default UserForm;