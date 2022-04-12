import React, {useState} from 'react';
import {useFetch} from "../hooks/useFetch";
import AutocompleteWithDebounce from "./AutocompleteWithDebounce";

const AutocompleteFromMapbox = ({value, onChange, error, helperText}) => {
    const [{data, loading, modifyData}, getData] = useFetch({
        instant: false,
        initData: {places: []},
        dataTransformer: d => ({places: d.features.map(f => f.place_name)}),
        url: `https://api.mapbox.com/geocoding/v5/mapbox.places/.json`
    })

    const getOptions = (inputCity) => {
        if (inputCity) {
            getData({
                url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${inputCity}.json?access_token=pk.eyJ1IjoidmFkeW0tdGFydGFrb3Zza3lpIiwiYSI6ImNraHo4bmt1ZzB2MGszMGx0dDNqZHdmaWUifQ.VVvuIigxHHYEJiQZlWItsQ`
            })
        } else {
            modifyData({places: []})
        }
    }

    return (
        <AutocompleteWithDebounce helperText={helperText} error={error} getOptions={getOptions} options={data.places} onChange={onChange} value={value}/>
    );
};

export default AutocompleteFromMapbox;