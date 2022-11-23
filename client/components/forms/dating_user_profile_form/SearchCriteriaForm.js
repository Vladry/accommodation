import React, {useContext} from 'react';
import {useSelector} from "react-redux";
import FormMapper from "../FormMapper";
import {searchCriteriaFields} from "./searchCriteriaFields";

import sel from "../../../store/selectors";
import {Grid} from "@mui/material";
import {Context} from "../../../context";

const UdpForm = ({handleSubmit}) => {
    const user = useSelector(sel.user);
    const searchCriteria = useSelector(sel.searchCriteria);

    /*** Блок получения values для рендера udpProfileForm  (редактирование анкеты) ***/
    const {prepareFormData} = useContext(Context);
    const initVal = {"initialValues": prepareFormData(searchCriteriaFields, searchCriteria)};
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

export default UdpForm;