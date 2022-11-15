import React, {useContext, useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import FormMapper from "../FormMapper";
import {udpFields} from "./udpFields";

import sel from "../../../store/selectors";
import {Grid} from "@mui/material";
import {Context} from "../../../context";

const UdpForm = ({handleSubmit}) => {
    const user = useSelector(sel.user);
    const userDatingProfile = useSelector(sel.userDatingProfile);


    /*** Блок получения values для рендера udpProfileForm  (редактирование анкеты) ***/
/* Разрешаем рендерить форму профайла ТОЛЬКО если isUdpRenderAllowed либо isInitValRender = true.  И без
datingServiceParticipation не обойтись. Иначе имеем глюк: если при первых рендерах отрендерить FormMapper с
defaultValues, а потом попытаться перерендерить с данными из udp, то почему-то, все значения FormMapper
останутся изначальными (с defaultValues). TODO Это связано с каким-то глюком на этапе задания initialValues при
создании formik=useFormik() в файле FormMapper.js
*/
    const isDatingParticipant = user && user.datingServiceParticipation && userDatingProfile;
    const isInitValRender = user && !user.datingServiceParticipation && !userDatingProfile //TODO потом убрать этот случай, т.к. профайл может создать только участник службы знакомств
    const {prepareFormData} = useContext(Context);
    const initVal = {"initialValues": prepareFormData(udpFields, userDatingProfile, isDatingParticipant, isInitValRender)};


    if (isDatingParticipant || isInitValRender) {
        return (
            <Grid container={true} spacing={2}>
                <FormMapper
                    fields={udpFields}
                    initVal={initVal}
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