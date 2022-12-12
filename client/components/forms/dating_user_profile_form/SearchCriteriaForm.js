import React, {useContext} from 'react';
import {useSelector} from "react-redux";
import FormMapper from "../FormMapper";
import {searchCriteriaFields} from "./searchCriteriaFields";

import sel from "@/store/user/selectors";
import {Grid} from "@mui/material";
import {Context} from "@/root/context.js";

const SearchCriteriaForm = ({handleSubmit}) => {
    const datingSearchCriteriaProfile = useSelector(sel.datingSearchCriteriaProfile);

    const {prepareFormData} = useContext(Context);
    const initVal = {"initialValues": prepareFormData(searchCriteriaFields, datingSearchCriteriaProfile)};
    if (initVal.initialValues) {
        return (
            <Grid container={true} spacing={2}>
                <FormMapper
                    fields={searchCriteriaFields}
                    initVal={initVal}
                    validation={null}
                    handleSubmit={handleSubmit}/>
            </Grid>
        );
    } else {
        return null;
    }
};

export default SearchCriteriaForm;