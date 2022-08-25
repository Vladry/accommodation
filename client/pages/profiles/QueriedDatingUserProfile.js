import React, {useEffect, useState} from 'react';
import DatingWrapper from "../formPages/dating/DatingWrapper";
import api from "../../lib/API";
import {useSelector} from "react-redux";
import useAuth from "../../hooks/useAuth";
import {useRouter} from "next/router";
import {datingUserProfileFormFields} from "../../components/forms/dating_user_profile_form/datingUserProfileFormFields";
import DatUserProfileMapper from "../../components/DatUserProfileMapper";
import {Box, Button} from "@mui/material";


const QueriedDatingUserProfile = () => {
    const user = useSelector((state) => state.userData.user);
    const isAuthenticated = useAuth(true);
    const router = useRouter();
    const [queriedUserProfile, setQueriedUserProfile] = useState({});

    async function fetchDatingUProfile() {
        console.log('queriedUserId: ', router.query.queriedUserId);
        let url = `/users/${router.query.queriedUserId}/datingProfile`;
        console.log("fetching url:", url);
        await api.get(url)
            .then((profile) => {
                console.log('queriedUserProfile: ', profile); // вывод queriedUserProfile
                setQueriedUserProfile(profile);
            })
            .catch(err => {
                console.log(err)
            });
    }

    useEffect(() => {
        if (router.query.queriedUserId) {
            fetchDatingUProfile();
        }
    }, [router.query.queriedUserId]);


    if (router.query.queriedUserId === undefined || !isAuthenticated) return <p>not authenticated or queriedUserId undefined</p>;


    const showProfile =
        <div>
            <DatUserProfileMapper fields={datingUserProfileFormFields} values={queriedUserProfile} id={router.query.queriedUserId}/>
        </div>


    return (
        <>
            <Box textAlign={'center'} margin={'20px'}>
                <Button variant="contained" onClick={router.back}>Back / Обратно</Button>
            </Box>
            {showProfile}
            <Box textAlign={'center'} margin={'20px'}>
                <Button variant="contained" onClick={router.back}>Back / Обратно</Button>
            </Box>
        </>
    );
};

export default QueriedDatingUserProfile;