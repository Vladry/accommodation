import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {udpFields} from "../components/forms/dating_user_profile_form/udpFields";
import UdpMapper from "../components/UdpMapper";
import {Box, Paper, useMediaQuery} from "@mui/material";
import {fetchData} from "../store/actions/userAction";
import types from "../store/types";
import sel from "../store/selectors";
import urls from '../../src/main/resources/urls.json'
import SwiperUserPic from "../components/dating_components/swiper_carousel/SwiperUserPic";
import api from "../lib/API";
import BackButton from "../components/BackButton";
import ActionPannel from "../components/dating_components/candidate_page/ActionPannel";
import CandidateCard from "../components/dating_components/candidate_page/CandidateCard";
import My_Drawer from "../components/appbar/My_Drawer";
import ToggleMenuIconButton from "../components/ToggleMenuIconButton";


const CandidateProfile = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [queriedUserId, setQueriedUserId] = useState(router.query.queriedUserId);
    const candidateDatingProfile = useSelector(sel.candidateDatingProfile);
    const loadDatProfile = useRef({den: false});
    const reviewedUser = useSelector(sel.reviewedUser);
    const [pictures, setPictures] = useState([]);
    const fetchingFlag = useRef(false);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const toggleDrawer = () => setIsDrawerOpen(() => !isDrawerOpen);
    const isSmallScreen = useMediaQuery('(max-width:900px)');
    const isLargeScreen = !isSmallScreen;


    const fetchExistingPhotos = (queriedUserId) => {
        fetchingFlag.current = true;
        dispatch({type: types.FETCHING_PHOTOS, payload: true});
        api.get(`/users/photos/all/${queriedUserId}?serviceGroup=DATING`).then((urls) => {
            // console.log("fetched photoUrls:", urls);
            const pictures = [...urls];
            dispatch({type: types.FETCHING_PHOTOS, payload: false});
            fetchingFlag.current = false;
            if (reviewedUser?.avatar && !pictures.includes(reviewedUser.avatar)) {

                pictures.push(reviewedUser.avatar);
                // console.log("pictures: ", pictures);
            }
            setPictures(pictures);
        });
    }


    useEffect(() => {
        if (loadDatProfile["den"]) {
            return;
        }
        loadDatProfile["den"] = true;
        if (queriedUserId) {
            dispatch(fetchData(urls.datingProfile, queriedUserId, types.GET_CANDIDATE_DATING_PROFILE, types.SET_CANDIDATE_DATING_PROFILE_SUCCESS, types.SET_CANDIDATE_DATING_PROFILE_FAIL));
        }
    }, [queriedUserId]);

    useEffect(() => {
        if (!fetchingFlag.current && !!queriedUserId) {
            fetchExistingPhotos(queriedUserId);
        }
    }, [queriedUserId])


    if (!candidateDatingProfile) return <p>not authenticated or queriedUserId undefined or isLoading</p>;

    const title = `Profile of Candidate id: ${queriedUserId}`;

    const mappedFields = <UdpMapper fields={udpFields} values={candidateDatingProfile}
                                    id={queriedUserId} reviewedUser={reviewedUser}/>;


    return (
        <Paper sx={{
            // [theme.breakpoints.up('xl')]: {display: 'flex'},
            // flexFlow: 'row no-wrap',
            border: '1px solid green', maxWidth: "98%",
        }}>


            {isSmallScreen &&
                <Box>
                    <Box sx={{position: 'absolute'}}>
                        <My_Drawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer}>
                            <ActionPannel/>
                        </My_Drawer>
                        <ToggleMenuIconButton toggleDrawer={toggleDrawer}/>
                    </Box>

                    <SwiperUserPic pictures={pictures}/>
                    <BackButton xyOffset={{top: '120px', left: '1px'}}/>
                </Box>
            }


            {isLargeScreen &&
                <Box>
                    <Box sx={{position: 'absolute'}}>{<ActionPannel/>}</Box>
                    <SwiperUserPic pictures={pictures}/>
                    <BackButton/>
                </Box>

            }

            <CandidateCard mappedFields={mappedFields}/>



        </Paper>
    );
};

export default CandidateProfile;