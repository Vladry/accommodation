import React, {useEffect, useState} from 'react';
import {Button} from "@mui/material";
import goals from '../goals.js'
import interests from '../interests.js'
import styled from "@emotion/styled";
import stylingConfig from '../../../stylingConfig'

const InputSelectMany = ({formikRef, input, formik}) => {
    let initValues;

    switch (formikRef) {
        case 'myGoals':
            initValues = goals;
            break;
        case 'myInterests':
            initValues = interests;
            break;
        default:
    }

    const [options, setOptions] = useState(initValues);
    const [selected, setSelected] = useState([]);

    const init = () => {
        let optInit = [...initValues];
        const selectedInit = [];

        if (formik.values[formikRef] && formik.values[formikRef].length > 0) {

            formik.values[formikRef].forEach(
                (val) => {
                    optInit = (optInit.filter(opt => opt.val !== val));
                    selectedInit.push(initValues.filter(opt => opt.val === val)[0]);
                });

            setOptions(optInit);
            setSelected(selectedInit);
        }
    }

    useEffect(() => {
                init();
    }, [])


    const selectByClick = (e) => {
        const value = e.target.value;
        console.log("select->  value = ", value)

        setOptions(options.filter((item) => item.val !== value));
        const selectedOne = initValues.filter((item) => item.val === value);
        setSelected([...selected, selectedOne[0]]);
        if (formik.values[formikRef] && formik.values[formikRef].length >0) {
            formik.values[formikRef] = [...formik.values[formikRef], selectedOne[0].val];
        } else {
            formik.values[formikRef] = [selectedOne[0].val];
        }
    }

    const processSelect = (e) => {
        const value = e.target.value;
        console.log("select->  value = ", value)
        setOptions(options.filter((item) => item.val !== value));
        const selectedOne = initValues.filter((item) => item.val === value);
        setSelected([...selected, selectedOne[0]]);
        if (formik.values[formikRef] && formik.values[formikRef].length >0) {
            formik.values[formikRef] = [...formik.values[formikRef], selectedOne[0].val];
        } else {
            formik.values[formikRef] = [selectedOne[0].val];
        }
    }



    const unselectByClick = (e) => {
        const value = e.target.value;
        const returnItemToRemaining = selected.filter((item) => item.val === value);
        const selectedUpdated = selected.filter((item) => item.val !== value);
        setOptions([...options, returnItemToRemaining[0]]);
        setSelected(selectedUpdated);
        formik.values[formikRef] = formik.values[formikRef].filter((item) => item !== value);
        // console.log("formik.values[formikRef]: ", formik.values[formikRef]);
    }


    const optionItems = options.map((opt, ind) => (
        <option key={ind} value={opt.val}>{opt.en} </option>
    ));

    const selectedElems = selected.map((value, ind) => (
        <Button key={ind} sx={()=> stylingConfig.selectButton} size={'small'} color={"primary"}  variant={'contained'}
                value={value?.val? value.val : ""}
                onClick={unselectByClick}>{`${value?.en? value.en : ""}`}</Button>
    ));


    return (
        <div key={formikRef}>

            <Labels> {input.label}:<br/>
                <div>
                    {selectedElems}
                </div>
                <Select multiple={true} onChange={selectByClick}>
                    {optionItems}
                </Select>
            </Labels>


        </div>
    );
};

export default InputSelectMany;

const Labels = styled.label`
font-size: ${stylingConfig.labels.fontSize};
font-weight: ${stylingConfig.labels.fontWeight};
color: ${stylingConfig.labels.color};
    `;

const Select = styled.select`
margin-top: ${stylingConfig.formItem.selectTopMargin};
`;