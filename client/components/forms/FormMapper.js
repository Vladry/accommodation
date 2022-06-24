import React from 'react';
import {useFormik, getIn} from 'formik';
import MuiPhoneNumber from 'material-ui-phone-number-2';
import {Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, useMediaQuery} from "@mui/material";
import AutocompleteWithDebounce from "../AutocompleteWithDebounce";
import AutocompleteFromMapbox from "../AutocompleteFromMapbox";
import {useSelector} from "react-redux";

const FormMapper = ({fields, persistedValues, validation, handleSubmit}) => {
    // persistedValues -полученные из БД значения из datingUserProfile (если таковы имеются). Если их нет- нужно подставить значения из fields[i].valueByDefault

    //формируем пары formikRef: дефолтное значение для useFormik()  (данные берутся либо из fetched datingUserProfile, если там их нет- то из заданных дефолтных значений
    const initValues =
        {
            initialValues: fields.reduce((acc, current, index, array) => ({     //https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
                ...acc,
                [current.formikRef]: (persistedValues && persistedValues[current.formikRef]) ? persistedValues[current.formikRef] : current.valueByDefault //заполняем дефолтными значениями полученными либо из fetched from persistedValues, либо из заданных по дефолту
            }), {})
        };
    const {initialValues} = initValues;

    /*
        //выше получили initValues- теперь пробежать по нему и найти initValues.initialValues[formikRef] === null и заменить их на дефолтные значения заданные в fields[i].valueByDefault
        for (let key in initValues.initialValues) {
            if (initValues.initialValues.hasOwnProperty(key)) {
                if (!initValues.initialValues[key]) {
    // console.log(key, "is not present in  initValues.initialValues" );
                    fields.forEach(obj => {
                        if (obj.formikRef === key) {
                            initValues.initialValues[key] = obj.valueByDefault;
                        }

                    });
                }
                // теперь initValues гарантированно содержит valueByDefault необходимые для useFormik()
                // console.log("key: ", key, "= ", initValues.initialValues[key]); // дефолтные значения для формы ПОСЛЕ подмены несуществующих полей в fetched на дефолтные из файла initialValues
            }

        }
    */

    // console.log("initialValues: ", initialValues);
    // console.log("persistedValues: ", persistedValues);
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
            case 'image': //TODO -переписать весь кейс для image:
                // https://medium.com/geekculture/how-to-upload-and-preview-images-in-react-js-4e22a903f3db
                return (<Box key={formikRef} sx={{p: 2, border: '1px solid lightgrey', borderRadius: 1}}>
                        - input your image here-
                        <input type='image' alt="user_images"/>
                    </Box>
                );
            default:
                return (
                    <TextField
                        fullWidth
                        key={formikRef}
                        helperText={getIn(formik.touched, formikRef) ? getIn(formik.errors, formikRef) : ''}
                        error={getIn(formik.touched, formikRef) && Boolean(getIn(formik.errors, formikRef))}
                        value={initialValues[formikRef]} //TODO вернуть как надо -получать через getIn() строкой ниже
                        // value={getIn(formik.values, formikRef)}
                        {...input}
                        {...defaultProps.textField}
                    />
                )
        }
    })

    console.log("initialValues: ", initialValues);
    console.log('formik.values', formik.values);

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