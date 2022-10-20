import React, {useEffect, useState} from 'react';
import sex from '../sex.json';
import {Label, Select} from "../../../utils/typography";

const InputSelectSex = ({formikRef, input, formik}) => {
    let initValues = [...sex];

    switch (formikRef) {
        case 'mySex':
            initValues = initValues.filter(sex => sex.val !== "ANY");
            break;
        case 'seekAPersonOfSex':
            initValues = initValues.filter(sex => sex.val !== "OTHER");
            break;

        default:
    }


    const [options, setOptions] = useState(initValues);
    const [selected, setSelected] = useState({});


    useEffect(() => {
        {
            if (formik.values[formikRef]) {
                setSelected(initValues.filter(sex => sex.val === formik.values[formikRef])[0]);
            } else {
                formik.values[formikRef] = input.valueByDefault;
                setSelected(initValues.filter(sex => sex.val === formik.values[formikRef])[0]);

            }
        }
    }, [])


    const select = (e) => {
        formik.values[formikRef] = e.target.value;
        setSelected(initValues.filter(sex => sex === formik.values[formikRef])[0]);
    }


    const optionItems = options.map((opt, ind) => (
        <option key={ind} value={opt.val}>{opt.en} </option>)
    );


    return (
        <div key={formikRef}>
            <Label> {input.label}:
                <Select  style={{marginLeft: '12px'}} multiple={false}
                         value={selected?.val? selected.val: input.defaultValue} onChange={select}>
                    {optionItems}
                </Select>
            </Label>
        </div>
    );
};

export default InputSelectSex;


