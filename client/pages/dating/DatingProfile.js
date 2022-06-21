import React from 'react';
import {useSelector} from "react-redux";
import useAuth from "../../hooks/useAuth";
import FormMapper from "../../components/forms/FormMapper";
import {datingUserProfileFormFields} from "../../components/forms/datingUserProfileFormFields";

const DatingProfile = ({handleSubmit}) => {
    const user = useSelector((state)=>state.userData.user);
    const isAuthenticated = useAuth(true);


    if (!isAuthenticated) return (<h3>please login/ Войтите в систему</h3>);
    if (user === null || user === undefined) return (<h3>user's not defined in store</h3>);



    return (
        <div>
            <h3 style={{textAlign: 'center', marginTop: '10px'}}
            >DatingProfile</h3>
            <FormMapper fields={datingUserProfileFormFields} validation={null}

                        handleSubmit={handleSubmit}/>
        </div>
    );
};

export default DatingProfile;