import React from 'react';
import {useFormik, getIn} from 'formik';
import MuiPhoneNumber from 'material-ui-phone-number-2';
import {Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField} from "@mui/material";

const FormMapper = ({fields, validation, handleSubmit}) => {

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
                return (<Box sx={{ p: 2, border: '1px solid lightgrey', borderRadius: 1 }}>
                        <FormControlLabel key={formikRef} control={<Checkbox/>}
                                          value={getIn(formik.values, formikRef)} {...input} {...defaultProps.checkbox}
                        /></Box>
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
            <Grid sx={{
                display: 'grid',
                justifyContent: "space-around",
                alignItems: 'center',
                columnGap: '10px',
                gridTemplateColumns: '1fr 1fr'
            }} container>
                {mappedFields}
            </Grid>
            <Button variant="outlined" fullWidth onClick={formik.submitForm}>Submit</Button>

        </form>
    );
};

export default FormMapper;