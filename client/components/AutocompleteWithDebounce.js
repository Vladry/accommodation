import React, {useEffect, useState} from 'react';
import {Autocomplete, TextField} from "@mui/material";
import useDebounce from "../hooks/useDebounce";

const AutocompleteWithDebounce = ({getOptions, options, onChange, error, helperText}) => {
    const [inputValue, setInputValue] = useState('');

    useDebounce({
        callback: () => getOptions(inputValue),
        value: inputValue,
        onEmpty: () => {
            getOptions('')
        }
    })

    return (
        <Autocomplete
            disablePortal
            id="combo-box-place"
            options={options}
            sx={{ width: 300 }}
            onChange={(e, value, reason) => {
                console.log("select", value, reason)
                if (reason === "selectOption") {
                    onChange(value);
                } else if (reason === "clear") {
                    onChange("");
                }
            }}
            onInputChange={(e, value, reason) => {
                if (reason === 'input') {
                    setInputValue(value);
                } else {
                    setInputValue('');
                }
            }}
            renderInput={(params) => <TextField helperText={helperText} error={error} value={inputValue} {...params} label="Place" />}
        />
    );
};

export default AutocompleteWithDebounce;