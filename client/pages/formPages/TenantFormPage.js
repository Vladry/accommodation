import React from 'react';
import TenantForm from "../../components/forms/TenantForm";
import useAuth from "../../hooks/useAuth";
import Layout from "../../components/Layout";
import api from "../../lib/API";
import {useSelector} from "react-redux";

const TenantFormPage = () => {
    const user = useSelector((store) => store.userData.user);

    const isAuthenticated = useAuth();

    const handleSubmit = async (values) => {
            // alert(JSON.stringify(values, null, 2));
        const result = await api.post("/tenants", values);
        // console.log('resp: ', result);
        };

    if(!isAuthenticated) return (<h3>please login/ Войтите в систему</h3>);

    return (
        <>
            <h3 style={{textAlign: 'center', marginTop: '10px'}}>
                Заполните форму о претенденте на жильё
            </h3>
            <h5 style={{textAlign: "center"}}>userId: {user?.id}</h5>
            <h5 style={{textAlign: "center"}}>userEmail: {user?.email}</h5>
            <TenantForm handleSubmit={handleSubmit}/>
        </>
    );
};

export default TenantFormPage;

TenantFormPage.auth = true;

TenantFormPage.getLayout = (data) => {
    return (
        <Layout>
            {data}
        </Layout>
    )
}