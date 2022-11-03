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
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {Dialog} from '@mui/material';

let stompClient = null;

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
    const forceToggleDrawer = () => {
        setIsDrawerOpen(() => !isDrawerOpen);
    }


    const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
    const openMessageDialog = () => {
        console.log("in openMessageDialog->");
        setIsMessageDialogOpen(!isMessageDialogOpen);
    };

    const [isLiked, setIsLiked] = useState(false);
    const likeAction = () => {
        setIsLiked(!isLiked);
    }

    const [isBookmarked, setIsBookmarked] = useState(false);
    const bookmarkToFavorites = () => {
        setIsBookmarked(!isBookmarked);
    }

    const conditionalToggleDrawer = (e) => {
        // console.log("e.target: ", e.target);
        // console.log('e.target.getAttribute("name): ', e.target.getAttribute("name"));
        // console.log('e.target.dataset.name: ', e.target.dataset.name);
        // console.log('e.target.getAttribute("data-name): ', e.target.getAttribute("data-name"));
        if (e.target.dataset.name === "triggersToggling") {
            setIsDrawerOpen(() => !isDrawerOpen);
        }
        console.log("not toggling, as target is not equal to triggersToggling");
    };
    const isSmallScreen = useMediaQuery('(max-width:900px)');
    const isLargeScreen = !isSmallScreen;
    const userId = useSelector(sel.user).id;

    const candidateId = userId; //TODO ПРОПИСАТЬ!


    const handleCloseMessageDialog = () => {
    };


    const connect = () => {
        const socket = new SockJS("/ws");
        stompClient = Stomp.over(socket);
        stompClient.connect({}, (frame) => {
            stompClient.subscribe(`/topic/dating/${candidateId}`, datingSubscription);
        })
    }

    const datingSubscription = (datingMessage) => {
        let messageText = JSON.parse(datingMessage.body);
        console.log(messageText);
    }

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
            connect();
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
                        <My_Drawer isDrawerOpen={isDrawerOpen} toggleDrawer={conditionalToggleDrawer}>
                            <ActionPannel
                                isMessageDialogOpen={isMessageDialogOpen}
                                openMessageDialog={openMessageDialog}
                                isBookmarked={isBookmarked}
                                bookmarkToFavorites={bookmarkToFavorites}
                                isLiked={isLiked}
                                likeAction={likeAction}
                            />
                        </My_Drawer>
                        <ToggleMenuIconButton color={'#000'} toggleDrawer={forceToggleDrawer}/>
                    </Box>

                    <SwiperUserPic pictures={pictures}/>
                </Box>
            }


            {isLargeScreen &&
                <Box>
                    <Box sx={{position: 'absolute'}}>
                        <ActionPannel/>
                    </Box>
                    <SwiperUserPic pictures={pictures}/>
                    <BackButton/>
                </Box>
            }
            <Dialog
                open={isMessageDialogOpen}
                onClose={handleCloseMessageDialog}
                aria-labelledby="dialog-title"
                aria-describedby="dialog-description"
            >
                {/*<DialogTitle id="dialog-title">*/}
                {/*    {"Example of losing focus after pressing a button"}*/}
                {/*</DialogTitle>*/}
                {/*<DialogContent>*/}
                {/*    <DialogContentText id="dialog-description">*/}
                {/*        The button has received focus and has been unmounted, the dialog*/}
                {/*        loses focus and does not close by ESC*/}
                {/*    </DialogContentText>*/}
                {/*</DialogContent>*/}
                {/*<DialogActions>*/}
                {/*    {!clicked ? (*/}
                {/*        <Grid*/}
                {/*            container*/}
                {/*            direction="column"*/}
                {/*            justify="flex-start"*/}
                {/*            alignItems="flex-start"*/}
                {/*        >*/}
                {/*            <Grid>*/}
                {/*                <TextField id="name" fullWidth label="Description" value="" />*/}
                {/*            </Grid>*/}
                {/*            <Grid>*/}
                {/*                <Button onClick={handleClick} color="primary">*/}
                {/*                    CLICK ME*/}
                {/*                </Button>*/}
                {/*            </Grid>*/}
                {/*        </Grid>*/}
                {/*    ) : null}*/}
                {/*</DialogActions>*/}
            </Dialog>

            <br/>
            <Box sx={{width: '60%', margin: '0 auto'}}>
                <CandidateDetailsTable/>
            </Box>


        </Paper>
    );
};

export default CandidateProfile;