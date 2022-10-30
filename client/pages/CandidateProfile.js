import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, Paper, useMediaQuery} from "@mui/material";
import {fetchData} from "../store/actions/userAction";
import types from "../store/types";
import sel from "../store/selectors";
import urls from '../../src/main/resources/urls.json'
import SwiperUserPic from "../components/dating_components/swiper_carousel/SwiperUserPic";
import api from "../lib/API";
import BackButton from "../components/BackButton";
import ActionPannel from "../components/dating_components/candidate_profile/ActionPannel";
import CandidateDetailsTable from "../components/dating_components/candidate_profile/CandidateDetailsTable";
import My_Drawer from "../components/appbar/My_Drawer";
import ToggleMenuIconButton from "../components/ToggleMenuIconButton";
import {useRouter} from "next/router";
import {useTheme} from "@mui/material/styles";


const CandidateProfile = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const candidateDatingProfile = useSelector(sel.candidateDatingProfile);
    const loadDatProfile = useRef({den: false});
    const reviewedUser = useSelector(sel.reviewedUser);
    const [pictures, setPictures] = useState([]);
    const fetchingFlag = useRef(false);
    const router = useRouter();
    const queriedUserId = router.query.queriedUserId;
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
            console.log("candidateDatingProfile: ", candidateDatingProfile);
        }
    }, [queriedUserId])


    return (
        <Paper sx={{
            // [theme.breakpoints.up('xl')]: {display: 'flex'},
            border: '1px solid green', maxWidth: "98%",
            backgroundColor: `${theme.paperBackgroundColor}`,
        }}>


            {isSmallScreen &&
                <Box>
                    <Box sx={{position: 'absolute'}}>
                        <My_Drawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer}>
                            <ActionPannel/>
                        </My_Drawer>
                        <ToggleMenuIconButton color={'#000'} toggleDrawer={toggleDrawer}/>
                    </Box>

                    <SwiperUserPic pictures={pictures}/>
                </Box>
            }


            {isLargeScreen &&
                <Box>
                    <Box sx={{position: 'absolute'}}>{<ActionPannel/>}</Box>
                    <SwiperUserPic pictures={pictures}/>
                    <BackButton/>
                </Box>
            }
            <br/>
            <Box sx={{width: '60%', margin: '0 auto'}}>
                <CandidateDetailsTable/>
            </Box>


        </Paper>
    );
};

export default CandidateProfile;