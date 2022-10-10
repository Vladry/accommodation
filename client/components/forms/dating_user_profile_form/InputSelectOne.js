import React, {useEffect, useState} from 'react';
import {Button} from "@mui/material";
import country from '../countries.json';


const InputSelectOne = ({formikRef, input, formik}) => {
    let initValues = [...country];
    console.log("initValues: ", initValues);
    const [options, setOptions] = useState(initValues);
    const [selected, setSelected] = useState("");

    const init = () => {
        setSelected(formik.values[formikRef]);
        setOptions(getOptions(formik.values[formikRef]));
    }

    const getOptions = (option) => {
        return initValues.filter(country => country !== option);
    }
    useEffect(() => {
        {
            if (formik.values[formikRef]) {
                init();
            }
        }
    }, [])


    const select = (e) => {
        const value = e.target.value;
        formik.values[formikRef] = value;
        setSelected(formik.values[formikRef]);
        setOptions(getOptions(value));
    }

    const unselect = (e) => {
        const value = e.target.value;
        setOptions(initValues);
        setSelected(null);
        formik.values[formikRef] = null;
    }

    const optionItems = options.map((opt, ind) => (
        <option key={ind} value={opt}>{opt} </option>
    ));

    const selectedElems = selected? (
        <Button sx={{m: '1px'}} size={'small'} variant={'outlined'} value={selected}
                onClick={unselect}>{`${selected} (remove)`}</Button>
    ) : null;


    /*      id: "countryINowLiveIn",
            name: "countryINowLiveIn",
            formikRef: "countryINowLiveIn",
            label: "countryINowLiveIn/Я, сейчас в стране:",
            valueByDefault: "UKRAINE",
            type: "select_one"*/

    return (
        <div key={formikRef}>
            <label> {input.label}:<br/>
                <select multiple={false} onChange={select}>
                    {optionItems}
                </select>
            </label>

            <div>
                {selectedElems}
            </div>
        </div>
    );
};

export default InputSelectOne;