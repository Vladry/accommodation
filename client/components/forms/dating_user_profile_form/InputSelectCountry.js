import React, {useEffect, useState} from 'react';
import country from '../countries.json';
import styled from "@emotion/styled";
import stylingConfig from "../../../stylingConfig";

const InputSelectCountry = ({formikRef, input, formik}) => {
    let initValues = [...country];
    const [options, setOptions] = useState(initValues);
    const [selected, setSelected] = useState("");


    useEffect(() => {
        {
            if (formik.values[formikRef]) {
                setSelected(formik.values[formikRef]);
            }
        }
    }, [])


    const select = (e) => {
        formik.values[formikRef] = e.target.value;
        setSelected(formik.values[formikRef]);
    }

    const optionItems = options.map((opt, ind) => (
        <option key={ind} value={opt}>{opt} </option>)
    );



    return (
        <div key={formikRef}>
            <Labels> {input.label}:<br/>
                <Select multiple={false} value={selected} onChange={select}>
                    {optionItems}
                </Select>
            </Labels>
        </div>
    );
};

export default InputSelectCountry;

const Labels = styled.label`
font-size: ${stylingConfig.labels.fontSize};
font-weight: ${stylingConfig.labels.fontWeight};
color: ${stylingConfig.labels.color};
    `;

const Select = styled.select`
margin-top: ${stylingConfig.formItem.selectTopMargin};
`;

