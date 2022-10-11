import React, {useEffect, useState} from 'react';
import {Button} from "@mui/material";
import goals from '../goals.js'
import interests from '../interests.js'


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

        formik.values[formikRef].forEach(
            (val) => {
                optInit = (optInit.filter(opt => opt.val !== val));
                selectedInit.push(initValues.filter(opt => opt.val === val)[0]);
            });

        setOptions(optInit);
        setSelected(selectedInit);
    }

    useEffect(() => {
        {
            // console.log("formik.values[formikRef] inside of useEffect: ", formik.values[formikRef]);
            if (formik.values[formikRef] && formik.values[formikRef].length > 0) {
                init();
            }
        }
    }, [])


    const select = (e) => {
        const value = e.target.value;
        const remaining = options.filter((item) => item.val !== value);
        const selectedOne = options.filter((item) => item.val === value);
        setOptions(remaining);
        setSelected([...selected, selectedOne[0]]);
        if (formik.values[formikRef]) {
            formik.values[formikRef] = [...formik.values[formikRef], selectedOne[0].val];
        } else {
            formik.values[formikRef] = [selectedOne[0].val];
        }

    }
    const unselect = (e) => {
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
        <Button sx={{m: '1px'}} size={'small'} variant={'outlined'} key={ind} value={value.val}
                onClick={unselect}>{`${value.en}`}</Button>
    ));


    return (
        <div key={formikRef}>
            <label> {input.label}:
                <select multiple={true} onChange={select}>
                    {optionItems}
                </select>
            </label>

            <div>
                {selectedElems}
            </div>
        </div>
    );
};

export default InputSelectMany;