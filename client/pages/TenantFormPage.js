import React from 'react';
import TenantForm from "../components/forms/TenantForm";

const TenantFormPage = () => {

    const handleSubmit =  (values) => {
            alert(JSON.stringify(values, null, 2));
        };

    return (
        <>
            <h3 style={{textAlign: 'center', marginTop: '10px'}}
            >Tenant Details<br/>Информация о семье претендента на жильё</h3>
            <TenantForm handleSubmit={handleSubmit}/>
        </>
    );
};

export default TenantFormPage;