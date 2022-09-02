import React, {useEffect, useRef, useState} from 'react';
import DatingMenuWrapper from "../formPages/dating/DatingMenuWrapper";
import {useDispatch, useSelector} from "react-redux";
import useAuth from "../../hooks/useAuth";
import {useRouter} from "next/router";
import {userDatingProfileFormFields} from "../../components/forms/dating_user_profile_form/userDatingProfileFormFields";
import UserDatingProfileMapper from "../../components/UserDatingProfileMapper";
import {Box, Button, Grid} from "@mui/material";
import SideBar from "../../components/dating_components/SideBar";
import {datingMenu} from "../../public/menuConfig";
import ArticleWindow from "../../components/dating_components/ArticleWindow";
import {getDatingProfile} from "../../store/actions/userAction";
import types from "../../store/types";
import sel from "../../store/selectors";

const UserDatingProfile = () => {
    const user = useSelector(sel.user);
    const dispatch = useDispatch();
    const isAuthenticated = useAuth(true);
    const router = useRouter();
    const [queriedUserId, setQueriedUserId] = useState(router.query.queriedUserId);
    console.log("queriedUserId: ", queriedUserId);
    const userDatingProfile = useSelector(sel.userDatingProfile);
    const candidateDatingProfile = useSelector(sel.candidateDatingProfile);
    const loading = useSelector((state)=>sel.loading);
    let status = true;
    const loadDatProfile = useRef({den:false});
    let denoiseFlag1 = false;


    useEffect(() => {
        if(denoiseFlag1){return;}
        denoiseFlag1 = true;
        if (queriedUserId) {
            // console.log("in useEffect. Run: getDatingProfile action:");
            dispatch(getDatingProfile(queriedUserId, types.GET_CANDIDATE_DATING_PROFILE, types.SET_CANDIDATE_DATING_PROFILE_SUCCESS, types.SET_CANDIDATE_DATING_PROFILE_FAIL));
        } else {
            status = false;

        }
    }, [queriedUserId]);

    console.log("in userDatingProfile->  candidateDatingProfile to render: ", candidateDatingProfile)

    if(!status || !isAuthenticated || !candidateDatingProfile) return <p>not authenticated or queriedUserId undefined or isLoading</p>;

    const title = `Profile of Candidate id: ${queriedUserId}`;

    const mappedFields = <UserDatingProfileMapper fields={userDatingProfileFormFields} values={candidateDatingProfile}
                                                  id={queriedUserId}/>;
    const backButton =
        <Box textAlign={'center'} margin={'20px'} sx={{position: 'fixed', right: '2%', top: '2%', boxShadow: '18'}}>
            <Button variant="contained" onClick={router.back}>Back / Обратно</Button>
        </Box>;


    return (
        <>
            <Grid container={true} spacing={2}>
                <SideBar>
                    <DatingMenuWrapper>
                        {datingMenu[0].linkName}
                    </DatingMenuWrapper>
                </SideBar>

                <ArticleWindow title={title} content={mappedFields}>
                    {backButton}
                </ArticleWindow>
            </Grid>
        </>
    );
};

export default UserDatingProfile;