import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    Avatar,
    Box,
    Paper,
    useMediaQuery
} from "@mui/material";
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

import Image from "next/image";
import AccountCircle from "@mui/icons-material/AccountCircle";

import Message_toDialog from "../components/forms/Message_toDialog";

let stompClient = null;

const CandidateProfile = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const candidateDatingProfile = useSelector(sel.candidateDatingProfile);
    const user = useSelector(sel.user);
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
        setIsMessageDialogOpen(true);
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
        // console.log("not toggling, as target is not equal to triggersToggling");
    };
    const isSmallScreen = useMediaQuery('(max-width:900px)');
    const isLargeScreen = !isSmallScreen;
    let isPaid = useSelector(sel.isPaid); //оплачен ли данным юзером данный вид сервиса
    // isPaid = false;

    const candidateId = reviewedUser.id;


    const closeMessageDialog = () => {
        setIsMessageDialogOpen(false);
    };

    let tempTextFieldValue = useRef('');
    const textFieldRef = useRef();

    const debounce = useRef(false);
    useEffect(() => {
        document.addEventListener('keyup', e => {
            if (debounce.current) return;
            // console.log("e.key: ", e.key);
            // console.log("e.code: ", e.code);
            if ((e.altKey || e.ctrlKey || e.shiftKey) && e.key === "Enter") {
                setTimeout(() => {
                    debounce.current = false;
                }, 500);
                sendMessageHandler();
                debounce.current = true;
            } else if (e.key === "Escape") {
                closeMessageDialog();
            }

        });

    }, [])


    const handleInpChange = (e) => {
        tempTextFieldValue.current = e.target.value;
    }

    const sendMessageHandler = () => {
        textFieldRef.current.value = "";
        console.log("message:", tempTextFieldValue.current);
        // closeMessageDialog();
    };


    const connect = () => {
        if (candidateId === null) return;
        const socket = new SockJS("/ws");
        stompClient = Stomp.over(socket);
        stompClient.connect({}, (frame) => {
            stompClient.subscribe(`/queue/dating/${candidateId}`, datingSubscription);
            console.log("candidate with id ", candidateId, "has subscribed!")
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
            // console.log("candidateDatingProfile: ", candidateDatingProfile);
        }
    }, [queriedUserId])


    const candidateAvatar = (
        (pictures && pictures.length > 0) ?
            (<Avatar sx={{
                bgcolor: 'lightgray', color: 'darkgray',
                width: `${isLargeScreen ? "50px" : '40px'}`,
                height: `${isLargeScreen ? "50px" : '40px'}`
            }}>
                <Image src={`${pictures[0]}`}
                       layout={'fill'}
                       alt="candidate avatar"/>
            </Avatar>)
            :
            <AccountCircle sx={{display: 'flex'}}/>
    );

    const messagingWarning = isPaid ? "Type your message below:" : "your tariff plan does not cover messaging to this candidate.";



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
                        <ActionPannel
                            isMessageDialogOpen={isMessageDialogOpen}
                            openMessageDialog={openMessageDialog}
                            isBookmarked={isBookmarked}
                            bookmarkToFavorites={bookmarkToFavorites}
                            isLiked={isLiked}
                            likeAction={likeAction}
                        />
                    </Box>
                    <SwiperUserPic pictures={pictures}/>
                    <BackButton/>
                </Box>
            }


            <Message_toDialog
                sendToName={reviewedUser.name}
                isPaid={isPaid}
                isMessageDialogOpen={isMessageDialogOpen}
                closeMessageDialog={closeMessageDialog}
                textFieldRef={textFieldRef}
                handleInpChange={handleInpChange}
                sendMessageHandler={sendMessageHandler}
                candidateAvatar={candidateAvatar}
                messagingWarning={messagingWarning}
            />


            <Box sx={{width: '60%', margin: '0 auto'}}>
                <CandidateDetailsTable/>
            </Box>


        </Paper>
    )
        ;
};

export default CandidateProfile;