import React, {useContext} from 'react';
import {useSelector} from "react-redux";
import useAuth from "../../../hooks/useAuth";
import FormMapper from "../FormMapper";
import {udpFields} from "./udpFields";
import {Context} from '../../../context';
import sel from "../../../store/selectors";

const UdpForm = ({handleSubmit}) => {
    const user = useSelector(sel.user);
    const isAuthenticated = useAuth(true);
    const userDatingProfile = useSelector(sel.userDatingProfile);
    const {prepareFormData} = useContext(Context);
    const formInitValues = prepareFormData(udpFields, userDatingProfile);


    if (!isAuthenticated) return (<h3>please login/ Войтите в систему</h3>);
    if (user === null || user === undefined) return (<h3>user is not defined in store</h3>);

    return (
        <div>
            <FormMapper
                fields={udpFields}
                initValues={formInitValues}
                validation={null}
                handleSubmit={handleSubmit}/>
        </div>
    );
};

export default UdpForm;