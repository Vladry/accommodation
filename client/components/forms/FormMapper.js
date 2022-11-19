import React, {useEffect} from 'react';
import {getIn, useFormik} from 'formik';
import MuiPhoneNumber from 'material-ui-phone-number-2';
import {Box, Button, Checkbox, FormControlLabel, Grid, Slider, TextField} from "@mui/material";
import AutocompleteFromMapbox from "../AutocompleteFromMapbox";
import InputSelectGoals from "./dating_user_profile_form/InputSelectGoals";
import InputSelectSex from "./dating_user_profile_form/InputSelectSex";
import InputSelectCountry from "./dating_user_profile_form/InputSelectCountry";
import InputSelectInterests from "./dating_user_profile_form/InputSelectInterests";
import {FormItem, Label} from '../../utils/typography';

const FormMapper = ({fields, initVal, validation, handleSubmit}) => {
//обязательно использовать formik.setValues(), т.к. при пере-рендерах, initialValues уже НЕ изменяются! Подробнее:
// см. https://github.com/jaredpalmer/formik/issues/2397   и   https://formik.org/docs/api/formik
    const formik = useFormik(
        {
            enableReinitialize: true,
            ...initVal,
            validationSchema: validation,
            onSubmit: (values) => {
                handleSubmit(values);
            }
        }
    );

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

    const dateReFormatter = (dd_MM_yyyy)=>{
        if(!dd_MM_yyyy) {return "";}
// console.log("in dateReFormatter-> input: ", dd_MM_yyyy)
        let tempArr = dd_MM_yyyy.split(".");
        const yyyy_MM_dd = tempArr.reverse().join("-");
        tempArr = new Date(yyyy_MM_dd).toDateString().split(" ");
        tempArr.splice(0, 1);
        let finalArr = [];
        finalArr.push(tempArr[1]);
        finalArr.push(tempArr[0]);
        finalArr.push(tempArr[2]);
        return finalArr.join(" ");
    }

/*    const dateReFormatterVer1 = (yyyy_MM_dd)=>{
        if(!yyyy_MM_dd) {return "";}

        let tempArr = yyyy_MM_dd.split(".");
        const dd_MM_yyyy = tempArr.reverse().join("-");
        tempArr = new Date(dd_MM_yyyy).toDateString().split(" ");
        tempArr.splice(0, 1);
        let finalArr = [];
        finalArr.push(tempArr[1]);
        finalArr.push(tempArr[0]);
        finalArr.push(tempArr[2]);
        return finalArr.join(" ");
    }*/
// console.log("formik.values: ", formik.values)
    const birthdayMonitorInputField = (formik.values && formik.values["birthday"])? dateReFormatter(formik.values["birthday"]) : undefined;
    const excludedFields = ['name', 'lastVisit', 'age', 'location'];


    const mappedFields = fields.map(({formikRef, valueByDefault, ...input}) => {
        if(excludedFields.includes(formikRef)) return null;

        switch (input.type) {
            case 'range':
                let minLim, maxLim, initValue, initLower, initHigher;
                switch (formikRef) {
                    case 'ageRange':
                        initLower = getIn(formik.values, 'minPreferredAge') ? getIn(formik.values, 'minPreferredAge') : 18;
                        initHigher = getIn(formik.values, 'maxPreferredAge') ? getIn(formik.values, 'maxPreferredAge') : 60;
                        minLim = 16;
                        maxLim = 70;
                        initValue = [initLower, initHigher];
                        // rangeMarks = [{value: initLower + 5, label: initLower + 5}, {value: initHigher - 5, label: initHigher - 5}]
                        break;
                    case 'heightRange':
                        initLower = getIn(formik.values, 'minHeightIWant') ? getIn(formik.values, 'minHeightIWant') : 160;
                        initHigher = getIn(formik.values, 'maxHeightIWant') ? getIn(formik.values, 'maxHeightIWant') : 180;
                        minLim = 150;
                        maxLim = 200;
                        initValue = [initLower, initHigher];
                        // rangeMarks = [{value: initLower + 5, label: initLower + 5}, {value: initHigher - 5, label: initHigher - 5}]
                        break;
                    default:
                }

                return (<FormItem key={formikRef}>
                    <Label>{input.label}
                        <Slider id={formikRef} name={formikRef}
                                min={minLim}
                                max={maxLim}
                                valueLabelDisplay="auto"  // 'auto' | 'on', 'off'
                            // marks={rangeMarks}
                                value={initValue}
                                onChange={
                                    (e) => {//коллбЭком обновлений значения данного слайдера -> установка [min, max]
                                        const [min, max] = e.target.value;
                                        formik.setFieldValue(formikRef, [min, max]);
                                        switch (formikRef) {
                                            case 'ageRange':
                                                //и выставляем соответств-щие поля возрастов или роста
                                                formik.setFieldValue('minPreferredAge', min);
                                                formik.setFieldValue('maxPreferredAge', max);
                                                // альтернативные способы выставлять поля возрастов или роста:
                                                // formik.values['minPreferredAge'] = formik.values[formikRef][0];
                                                // formik.values['maxPreferredAge'] = formik.values[formikRef][1];
                                                break;
                                            case 'heightRange':
                                                formik.setFieldValue('minHeightIWant', min);
                                                formik.setFieldValue('maxHeightIWant', max);
                                                break;
                                            default:
                                        }

                                    }}

                        /></Label>
                </FormItem>);
            case 'select_goals':
                return (
                    <FormItem key={formikRef}>
                        <InputSelectGoals formikRef={formikRef} input={input}
                                          formik={formik}/></FormItem>
                );
            case 'select_interests':
                return (
                    <FormItem key={formikRef}>
                        <InputSelectInterests formikRef={formikRef} input={input}
                                              formik={formik}/></FormItem>
                );
            case 'select_sex':
                return (
                    <FormItem key={formikRef}>
                        <InputSelectSex formikRef={formikRef} input={input}
                                        formik={formik}/></FormItem>
                );
            case 'select_country':
                return (
                    <FormItem key={formikRef}>
                        <InputSelectCountry formikRef={formikRef} input={input} formik={formik}/></FormItem>
                );
            case 'number':
                return (
                    <FormItem key={formikRef}
                              helperText={getIn(formik.touched, formikRef) ? getIn(formik.errors, formikRef) : ''}
                              error={getIn(formik.touched, formikRef) && Boolean(getIn(formik.errors, formikRef))}
                              onBlur={formik.handleBlur}>
                        <Label>{input.label}:<br/>
                            <input id={formikRef} name={formikRef}
                                   value={getIn(formik.values, formikRef) ? getIn(formik.values, formikRef) : ""}
                                   onChange={formik.handleChange}


                            />
                        </Label></FormItem>
                );
            case 'tel':
                return (
                    <FormItem key={formikRef}>
                        <MuiPhoneNumber
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
                return (<FormItem key={formikRef}>
                    <AutocompleteFromMapbox
                        error={getIn(formik.touched, formikRef) && Boolean(getIn(formik.errors, formikRef))}
                        helperText={getIn(formik.touched, formikRef) ? getIn(formik.errors, formikRef) : ''}
                        value={getIn(formik.values, formikRef) ? getIn(formik.values, formikRef) : ""}
                        onChange={e => {
                            formik.setFieldValue(formikRef, e, true)
                        }
                        }/></FormItem>);
            case '--number':
                return null;

            case 'birthday':
                return (
                    <FormItem key={formikRef} style={{position: 'relative'}}>
                        <TextField
                            fullWidth
                            helperText={getIn(formik.touched, formikRef) ? getIn(formik.errors, formikRef) : ''}
                            error={getIn(formik.touched, formikRef) && Boolean(getIn(formik.errors, formikRef))}
                            value={getIn(formik.values, formikRef) ? getIn(formik.values, formikRef) : ""}
                            {...input}
                            {...defaultProps.textField}
                        />
                    <span style={{position: 'absolute', top: '32px', right: '30px', color: '#00b300'}}>
                        <span style={{color: '#ff4d4d', marginRight: '12px'}}>=</span>
                        {!!birthdayMonitorInputField && birthdayMonitorInputField}
                    </span>
                    </FormItem>);

            default:
                return (
                    <FormItem key={formikRef}>
                        <TextField
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
            <Grid  container
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
    );
};

export default FormMapper;


