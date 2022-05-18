import React from 'react';
import {useSelector} from "react-redux";
import useAuth from "../../hooks/useAuth";
import AccommodationForm from "../../components/forms/AccommodationForm";
import api from "../../lib/API";
import Layout from "../../components/Layout";


const AccommodationFormPage = () => {
    const user = useSelector((state)=>state.userData.user);
    const isAuthenticated = useAuth(true);

    const handleSubmit = async (values) => {
        console.log("fetchING  await api.post(\"/accommodations\", values");
        console.log("form values: ", values);
        values = {...values, userId: user.id};
        console.log("values with userId: ", values);

        await api.post("/accommodations", values
        ).then(() => {
            console.log("fetched  await api.post(\"/accommodations\", values")
        }) /*TODO fetchAccommodations(userId))*/
            .catch(err => {
                console.log(err)
            });
    };
    const fetchAccommodations = async (user) => {
        api.post(`/accommodations/${user.id}`, null)
            .then(r => {
            } /*alert(JSON.stringify(r, null, 2))*/)
    }

    if (!isAuthenticated) return (<h3>please login/ Войтите в систему</h3>);
    if (user === null || user === undefined) return (<h3>user's not defined in store</h3>);

    return (
        <>
            <h3 style={{textAlign: 'center', marginTop: '10px'}}
            >Accommodation Details<br/>Информация о предлагаемом жилье</h3>
            <AccommodationForm handleSubmit={handleSubmit}/>
        </>
    );
};

const mapStateToProps = (state) => {
    console.log("in mapStateToProps: returning: state.userData.user", {user: state.userData.user})
    return {user: state.userData.user};
};

export default AccommodationFormPage;

AccommodationFormPage.auth = true;

AccommodationFormPage.getLayout = (data) => (
    <Layout>
        {data}
    </Layout>
)