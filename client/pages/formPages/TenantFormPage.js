import React from 'react';
import TenantForm from "../../components/forms/TenantForm";
import useAuth from "../../hooks/useAuth";
import Layout from "../../components/Layout";
import api from "../../lib/API";

const TenantFormPage = () => {

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