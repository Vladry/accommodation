import React from 'react';
import {useFormik, getIn} from 'formik';
import MuiPhoneNumber from 'material-ui-phone-number-2';
import {Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, useMediaQuery} from "@mui/material";
import AutocompleteFromMapbox from "../AutocompleteFromMapbox";
import InputSelectGoals from "./dating_user_profile_form/InputSelectGoals";
import InputSelectSex from "./dating_user_profile_form/InputSelectSex";
import InputSelectCountry from "./dating_user_profile_form/InputSelectCountry";
import styled from "@emotion/styled";
import stylingConfig from '../../stylingConfig'
import InputSelectInterests from "./dating_user_profile_form/InputSelectInterests";
import {Slider} from '@mui/material';

const FormMapper = ({fields, initValues, validation, handleSubmit}) => {

    const formik = useFormik(
        {
            ...initValues,
            validationSchema: validation,
            onSubmit: (values) => {
                handleSubmit(values);
            }
        }
    )

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

    const checkYourBirthday = dateReFormatter(formik.values["birthday"]);
    // formik.values['checkYourBirthday'] = dateConvert(formik.values["birthday"]);
    // console.log("checkYourBirthday: ", formik.values['checkYourBirthday']);

    const mappedFields = fields.map(({formikRef, valueByDefault, ...input}) => {
        switch (input.type) {
            case 'range':
                let minLim, maxLim, rangeMarks, initValue, initLower, initHigher;
                switch (formikRef) {
                    case 'ageRange':
                        initLower = getIn(formik.values, 'minPreferedAge') ? getIn(formik.values, 'minPreferedAge') : 18;
                        initHigher = getIn(formik.values, 'maxPreferedAge') ? getIn(formik.values, 'maxPreferedAge') : 60;
                        // minLim = initLower>0? initLower-2 : 16;
                        // maxLim = initHigher>0? initHigher+10 : 80;
                        minLim = 16;
                        maxLim = 70;
                        initValue = [initLower, initHigher];
                        // rangeMarks = [{value: initLower + 5, label: initLower + 5}, {value: initHigher - 5, label: initHigher - 5}]
                        break;
                    case 'heightRange':
                        initLower = getIn(formik.values, 'minHeightIWant') ? getIn(formik.values, 'minHeightIWant') : 160;
                        initHigher = getIn(formik.values, 'maxHeightIWant') ? getIn(formik.values, 'maxHeightIWant') : 180;
                        // minLim = initLower>0? initLower-2 : 150;
                        // maxLim = initHigher>0? initHigher+10 : 200;
                        minLim = 150;
                        maxLim = 200;
                        initValue = [initLower, initHigher];
                        // rangeMarks = [{value: initLower + 5, label: initLower + 5}, {value: initHigher - 5, label: initHigher - 5}]
                        break;
                    default:
                }

                return (<FormItem key={formikRef}>
                    <Labels>{input.label}
                        <Slider id={formikRef} name={formikRef}
                                min={minLim}
                                max={maxLim}
                                valueLabelDisplay="auto"  // 'auto' | 'on', 'off'
                            // marks={rangeMarks}
                                value={initValue}
                            // onChange={formik.handleChange}  //- вызов вшитого handleChange для слайдера не даст возможности выполнить другие действия. Поэтому пишем коллбэк:
                                onChange={
                                    (e) => {//коллбЭком обновлений значения данного слайдера -> установка [min, max]
                                        const [min, max] = e.target.value;
                                        formik.setFieldValue(formikRef, [min, max]);
                                        switch (formikRef) {
                                            case 'ageRange':
                                                //и выставляем соответств-щие поля возрастов или роста
                                                formik.setFieldValue('minPreferedAge', min);
                                                formik.setFieldValue('maxPreferedAge', max);
                                                // альтернативные способы выставлять поля возрастов или роста:
                                                // formik.values['minPreferedAge'] = formik.values[formikRef][0];
                                                // formik.values['maxPreferedAge'] = formik.values[formikRef][1];
                                                break;
                                            case 'heightRange':
                                                formik.setFieldValue('minHeightIWant', min);
                                                formik.setFieldValue('maxHeightIWant', max);
                                                break;
                                            default:
                                        }

                                    }}

                        /></Labels>
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
                        <Labels>{input.label}:<br/>
                            <input id={formikRef} name={formikRef}
                                   value={getIn(formik.values, formikRef) ? getIn(formik.values, formikRef) : ""}
                                   onChange={formik.handleChange}


                            />
                        </Labels></FormItem>
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
            case 'image': //TODO -переписать весь кейс для image:
                // https://medium.com/geekculture/how-to-upload-and-preview-images-in-react-js-4e22a903f3db
                return null;

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
                        {checkYourBirthday && checkYourBirthday}
                        {/*= {formik.values['checkYourBirthday'] && formik.values['checkYourBirthday']}*/}
                    </span>
                    </FormItem>);
                break;

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

            {/*https://developer.mozilla.org/ru/docs/Web/HTML/Element/pre*/}
            <pre>{JSON.stringify(formik.values, null, 4)}</pre>
        </form>
    );
};

export default FormMapper;

const FormItem = styled.div`
border: ${stylingConfig.formItem.border};
border-radius: ${stylingConfig.formItem.borderRadius};
margin: ${stylingConfig.formItem.blockMargin};
min-height: ${stylingConfig.formItem.minHeight};
`;

const Labels = styled.label`
font-size: ${stylingConfig.labels.fontSize};
font-weight: ${stylingConfig.labels.fontWeight};
color: ${stylingConfig.labels.color};
`;