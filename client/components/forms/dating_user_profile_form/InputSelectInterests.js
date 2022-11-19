import React, {useEffect, useState} from 'react';
import {Button} from "@mui/material";
import interests from '../interests.js'
import {useTheme} from "@mui/material/styles";
import {Label, Select} from "../../../utils/typography";

const InputSelectInterests = ({formikRef, input, formik}) => {
    let initValues = interests;
    const theme = useTheme();

    const [options, setOptions] = useState(initValues);
    const [selected, setSelected] = useState([]);

    const initOne = (value, selectedArr) => {
        selectedArr.push(initValues.filter((item) => item.val === value)[0]);
    }


    useEffect(() => {
        if (formik.values[formikRef] && formik.values[formikRef].length > 0) {

            let selectedArr = [];
            formik.values[formikRef].forEach(val => initOne(val, selectedArr));
            setSelected(selectedArr);

            const optionsArr = initValues.filter(val => !selectedArr.includes(val));
            setOptions(optionsArr);
        }
    }, [formik.values])



    const handleSelect = (e) => {
        const value = e.target.value;
        selectOne(value);
    }

    const selectOne = (value) => {

        setOptions(options.filter((item) => item.val !== value));
        const selectedOne = initValues.filter((item) => item.val === value)[0];
        setSelected([...selected, selectedOne]);
        if (formik.values[formikRef] && formik.values[formikRef].length > 0) {
            formik.values[formikRef] = [...formik.values[formikRef], selectedOne.val];
        } else {
            formik.values[formikRef] = [selectedOne.val];
        }
    }


    const unselect = (e) => {
        const value = e.target.value;
        const returnItemToRemaining = selected.filter((item) => item.val === value);
        const selectedUpdated = selected.filter((item) => item.val !== value);
        setOptions([...options, returnItemToRemaining[0]]);
        setSelected(selectedUpdated);
        formik.values[formikRef] = formik.values[formikRef].filter((item) => item !== value);
    }


    const optionItems = options.map((opt, ind) => (
        <option key={ind} value={opt.val}>{opt.en} </option>
    ));

    const selectedElems = selected.map((value, ind) => (
        <Button key={ind} sx={() => theme.selectButton} size={'small'} color={"primary"} variant={'contained'}
                value={value?.val ? value.val : ""}
                onClick={unselect}>{`${value?.en ? value.en : ""}`}</Button>
    ));

    return (
        <div key={formikRef}>

            <Label> {input.label}:<br/>
                <div>
                    {selectedElems}
                </div>
                <Select multiple={false} value={"NOT_CHOSEN"} onChange={handleSelect}>
                    {optionItems}
                </Select>
            </Label>


        </div>
    );
};

export default InputSelectInterests;

