import React, {useContext, useEffect} from 'react';
import {useSelector} from "react-redux";
import FormMapper from "../FormMapper";
import {udpFields} from "./udpFields";

import sel from "@/store/user/selectors";
import {Grid} from "@mui/material";
import {Context} from "@/root/context.js";

const UdpForm = ({handleSubmit}) => {
    const user = useSelector(sel.user);
    const userDatingProfile = useSelector(sel.userDatingProfile);

    /*** Блок получения values для рендера udpProfileForm  (редактирование анкеты) ***/
    const {prepareFormData} = useContext(Context);
    const initVal = {"initialValues": prepareFormData(udpFields, userDatingProfile)};
    if (initVal.initialValues) {
        return (
            <Grid container={true} spacing={2}>
                <FormMapper
                    fields={udpFields}
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