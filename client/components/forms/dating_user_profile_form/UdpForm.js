import React, {useContext, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import FormMapper from "../FormMapper";
import {udpFields} from "./udpFields";

import sel from "../../../store/selectors";
import {Grid} from "@mui/material";
import {Context} from "../../../context";

const UdpForm = ({handleSubmit}) => {
    const userDatingProfile = useSelector(sel.userDatingProfile);
    const [initValues, setInitValues] = useState(null);

    const {prepareFormData} = useContext(Context);

    useEffect(() => {
        const initV = prepareFormData(udpFields, userDatingProfile);
        setInitValues(initV);
    }, [userDatingProfile])


    if (initValues) {
        return (
            <Grid container={true} spacing={2}>
                <FormMapper
                    fields={udpFields}
                    initVal={initValues}
                    userDatingProfile={userDatingProfile}
                    validation={null}
                    handleSubmit={handleSubmit}/>
            </Grid>
        );
    } else {
        return null;
    }

};

export default UdpForm;