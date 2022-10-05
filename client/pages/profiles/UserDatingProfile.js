import React, {useEffect, useRef, useState} from 'react';
import DatingMenuWrapper from "../formPages/dating/DatingMenuWrapper";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {userDatingProfileFormFields} from "../../components/forms/dating_user_profile_form/userDatingProfileFormFields";
import UserDatingProfileMapper from "../../components/UserDatingProfileMapper";
import {Box, Button, Grid} from "@mui/material";
import SideBar from "../../components/dating_components/SideBar";
import {datingMenu} from "../../public/menuConfig";
import ArticleWindow from "../../components/dating_components/ArticleWindow";
import {fetchData} from "../../store/actions/userAction";
import types from "../../store/types";
import sel from "../../store/selectors";
import urls from '../../../src/main/resources/urls.json'
import SwiperUserPic from "../../components/dating_components/swiper_carousel/SwiperUserPic";


const UserDatingProfile = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [queriedUserId, setQueriedUserId] = useState(router.query.queriedUserId);
    const candidateDatingProfile = useSelector(sel.candidateDatingProfile);
    const loadDatProfile = useRef({den:false});
    const isCandidateHasPictures = !!(candidateDatingProfile && candidateDatingProfile.pictures.length > 0);

    const reviewedUser = useSelector(sel.reviewedUser);
    const pictures = candidateDatingProfile.pictures;
    console.log("pictures before:", pictures);
    // pictures.push(reviewedUser.avatar);
    pictures.unshift(reviewedUser.avatar);
    console.log("pictures after:", pictures);

    useEffect(() => {
        if(loadDatProfile["den"]){return;}
        loadDatProfile["den"] = true;
        if (queriedUserId) {
            dispatch(fetchData( urls.datingProfile, queriedUserId, types.GET_CANDIDATE_DATING_PROFILE, types.SET_CANDIDATE_DATING_PROFILE_SUCCESS, types.SET_CANDIDATE_DATING_PROFILE_FAIL));
        }
    }, [queriedUserId]);


    if(!candidateDatingProfile) return <p>not authenticated or queriedUserId undefined or isLoading</p>;

    const title = `Profile of Candidate id: ${queriedUserId}`;

    const mappedFields = <UserDatingProfileMapper fields={userDatingProfileFormFields} values={candidateDatingProfile}
                                                  id={queriedUserId}/>;
    const backButton =
        <Box textAlign={'center'} margin={'4px'} sx={{zIndex:'1', position: 'fixed', right: '1px', top: '1px', boxShadow: '18'}}>
            <Button variant="contained" size={'small'} onClick={router.back}>Back / Обратно</Button>
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
                    {isCandidateHasPictures && <SwiperUserPic pictures={pictures}/>}
                    {backButton}
                </ArticleWindow>
            </Grid>
        </>
    );
};

export default UserDatingProfile;