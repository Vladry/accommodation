import React from 'react';
import {useSelector} from "react-redux";
import AccommodationForm from "../../components/forms/accommodation_form/AccommodationForm";
import api from "../../lib/API";
import Layout from "../../components/Layout";
import sel from "@/store/user/selectors";
import urls from '../../../src/main/resources/urls.json'
import {Paper} from "@mui/material";
import {useTheme} from "@mui/material/styles";

const AccommodationList = () => {
    const user = useSelector(sel.user);
    const accommodationUserProfiles = useSelector(sel.accommodationUserProfiles);
    let existingPages;
    const theme = useTheme();
    if (!user) {
        return;
    }

    const handleSubmit = async (values) => {
        values = {...values, userId: user.id};

        await api.post(urls.accommodationProfile, values
        ).then(() => {
        }).catch(err => {
            console.log(err)
        });
    };


    if (accommodationUserProfiles) {
        existingPages = accommodationUserProfiles.map((accommodation, index) => (
                <Paper key={index} sx={{...theme.paperProps}}>
                    <h3 style={{textAlign: 'center', marginTop: '10px'}}
                    >Option/Вариант: ${index + 1}</h3>
                    <AccommodationForm accommodation={accommodation} handleSubmit={handleSubmit}/>
                </Paper>
            )
        );
    }
    const newPage = (
        <Paper key={0} sx={{...theme.paperProps}}>
            <h3 style={{textAlign: 'center', marginTop: '10px'}}
            >Create your first accommodation offer/Создать первое предложение по жилью</h3>
            <AccommodationForm accommodation={null} handleSubmit={handleSubmit}/>
        </Paper>
    );

    return (
        <>
            <h2 style={{textAlign: 'center', marginTop: '10px'}}
            >Accommodation<br/>Жильё</h2>
            {!!accommodationUserProfiles && existingPages}
            {!accommodationUserProfiles && newPage}
        </>
    );
};

export default AccommodationList;


AccommodationList.getLayout = (data) => (
    <Layout>
        {data}
    </Layout>
)