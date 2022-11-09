import React, {useContext, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Box, Paper, useMediaQuery} from "@mui/material";
import {fetchData} from "../store/actions/userAction";
import types from "../store/types";
import sel from "../store/selectors";
import urls from '../../src/main/resources/urls.json'
import subscriptions from '../../src/main/resources/subscriptions.json'
import SwiperUserPic from "../components/dating_components/swiper_carousel/SwiperUserPic";
import api from "../lib/API";
import BackButton from "../components/BackButton";
import ActionPanel from "../components/dating_components/candidate_profile/ActionPanel";
import CandidateDetailsTable from "../components/dating_components/candidate_profile/CandidateDetailsTable";
import My_Drawer from "../components/appbar/My_Drawer";
import ToggleMenuIconButton from "../components/ToggleMenuIconButton";
import {useTheme} from "@mui/material/styles";
import Image from "next/image";
import AccountCircle from "@mui/icons-material/AccountCircle";

import MessengerDialogWindow from "../components/forms/MessengerDialogWindow";
import PrivateMessage from "../components/PrivateMessage";
import {Context} from "../context";
import {NavLink_styled} from "../utils/typography";


const CandidateProfile = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const user = useSelector(sel.user);
    const loadDatProfile = useRef({den: false});
    const reviewedUser = useSelector(sel.reviewedUser);
    const [pictures, setPictures] = useState([]);
    const fetchingFlag = useRef(false);
    const stompClient = useSelector(sel.stompClient);
    const context = useContext(Context);



    //***************** <ActionPanel/> drawer **********************//
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const forceToggleDrawer = () => {
        setIsDrawerOpen(() => !isDrawerOpen);
    }
    const [isLiked, setIsLiked] = useState(false);
    const likeAction = () => {
        setIsLiked(!isLiked);

        // Отправляем целевому пользователю уведомление о лайке/анлайке:
        //value =http://localhost:3000/CandidateProfile?queriedUserId=6,  subject= "{name} has liked you!"
        const messengerArgs = {destination: `${subscriptions.thisPersonLikedYou}${user.id}`, type: "NOTIFICATION",
            value: urls.queriedCandidateProfile+user.id, subject: `${user.name} ${user.lastName}`,
            fromId: user.id, toId: reviewedUser.id, date: null, time: null};
        context.stompMessenger(stompClient, messengerArgs);

    }

    const [isBookmarked, setIsBookmarked] = useState(false);
    const bookmarkToFavorites = () => {
        setIsBookmarked(!isBookmarked);
    }



    //***************** <MessengerDialogWindow/> **********************//
    const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
    const openMessageDialog = () => {
        setIsMessageDialogOpen(true);
    };
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
        if(e.target) {
            tempTextFieldValue.current = e.target.value;
        }
    }

    const sendMessageHandler = () => {
        textFieldRef.current.value = "";
        // console.log("message:", tempTextFieldValue.current);
    const value = (tempTextFieldValue && tempTextFieldValue.current) ? tempTextFieldValue.current : "";
    function escapeHtml(unsafe)
        {
            return unsafe
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }
        const cleanVal = escapeHtml(value);

        // Отправляем полученный из  текст в мессенджер:
        const messengerArgs = {destination: `${subscriptions.privateMessages}${user.id}`, type: "PRIVATE_MESSAGE",
            value: cleanVal,
            fromId: user.id, toId: reviewedUser.id, subject: null, date: null, time: null};
        context.stompMessenger(stompClient, messengerArgs);
        closeMessageDialog();
    };


    const fetchExistingPhotos = (reviewedUserId) => {
        fetchingFlag.current = true;
        dispatch({type: types.FETCHING_PHOTOS, payload: true});
        api.get(`/users/photos/all/${reviewedUserId}?serviceGroup=DATING`).then((urls) => {
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
        if (reviewedUser) {
            dispatch(fetchData(urls.datingProfile, reviewedUser.id, types.GET_CANDIDATE_DATING_PROFILE, types.SET_CANDIDATE_DATING_PROFILE_SUCCESS, types.SET_CANDIDATE_DATING_PROFILE_FAIL));
        }
    }, [reviewedUser]);

    useEffect(() => {
        if (!fetchingFlag.current && !!reviewedUser && !!reviewedUser.id) {
            fetchExistingPhotos(reviewedUser.id);
            // console.log("candidateDatingProfile: ", candidateDatingProfile);
        }
    }, [reviewedUser])

    if(!user || !loadDatProfile || !reviewedUser) return <NavLink_styled href={urls.hostPrefix}>please, reload</NavLink_styled>;



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
            </Avatar>) : <AccountCircle sx={{display: 'flex'}}/>);

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
                            <ActionPanel
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
                        <ActionPanel
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


            <MessengerDialogWindow
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