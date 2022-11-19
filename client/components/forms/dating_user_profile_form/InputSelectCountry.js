import React, {useEffect, useState} from 'react';
import country from '../countries.json';
import {useTheme} from "@mui/material/styles";
import {Label, Select} from "../../../utils/typography";

const InputSelectCountry = ({formikRef, input, formik}) => {
    let initValues = [...country];
    const [options, setOptions] = useState(initValues);
    const [selected, setSelected] = useState("");

    const theme = useTheme();

    useEffect(() => {
        {
            if (formik.values[formikRef]) {
                setSelected(formik.values[formikRef]);
            }
        }
    }, [formik.values])


    const select = (e) => {
        formik.values[formikRef] = e.target.value;
        setSelected(formik.values[formikRef]);
    }

    const optionItems = options.map((opt, ind) => (
        <option key={ind} value={opt}>{opt} </option>)
    );


    return (
        <div key={formikRef}>
            <Label> {input.label}:<br/>
                <Select multiple={false} value={selected} onChange={select}>
                    {optionItems}
                </Select>
            </Label>
        </div>
    );
};

export default InputSelectCountry;


