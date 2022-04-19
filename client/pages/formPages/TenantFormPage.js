import React from 'react';
import TenantForm from "../../components/forms/TenantForm";
import useAuth from "../../hooks/useAuth";
import Layout from "../../components/Layout";

const TenantFormPage = () => {

    const isAuthenticated = useAuth();

    const handleSubmit =  (values) => {
            alert(JSON.stringify(values, null, 2));
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