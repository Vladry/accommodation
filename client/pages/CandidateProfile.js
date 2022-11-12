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
import {useRouter, Router} from "next/router";
import {useTheme} from "@mui/material/styles";
import Image from "next/image";
import AccountCircle from "@mui/icons-material/AccountCircle";

import MessengerDialogWindow from "../components/forms/MessengerDialogWindow";
import {Context} from "../context";


const CandidateProfile = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const user = useSelector(sel.user);
    const [pictures, setPictures] = useState([]);
    const stompClient = useSelector(sel.stompClient);
    const context = useContext(Context);
    const router = useRouter();
    const queriedUserId = router.query.queriedUserId;
    const candidateUserObj = useRef();
    /*** Блок рефов ниже-своебразный костыль, иначе user.id и queriedUserId почему-то оказываются не доступными
     * при запуске sendMessageHandler() из слушателя  document.addEventListener('keyup', e => {
     * ***/
    const id = useRef();
    id.current = user?  user.id : '';
    const candidateId = useRef();
    candidateId.current = queriedUserId? queriedUserId : '';


    //***************** <ActionPanel/> drawer constants **********************//
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const forceToggleDrawer = () => {
        setIsDrawerOpen(() => !isDrawerOpen);
    }
    const [isLiked, setIsLiked] = useState(false);
    const likeAction = () => {
        setIsLiked(!isLiked);
        const nowLikedState = !isLiked;//эта переменная нужна, т.к. state не обновляется мгновенна и путает данные
        //отослать уведомление юзеру, которого я лайкнул:
        const messengerArgs = {
            destination: `${subscriptions.thisPersonLikedYou}${queriedUserId}`, type: "NOTIFICATION",
            value: `http://localhost:3000/CandidateProfile?queriedUserId=${user.id}`,
            fromId: user.id, toId: queriedUserId,
            subject: nowLikedState ? `${candidateUserObj.current.name} ${candidateUserObj.current.lastName} has liked you!`
                : `${candidateUserObj.current.name} ${candidateUserObj.current.lastName} has unliked you!`
        };
        context.stompMessenger(stompClient, messengerArgs);
        api.post(`${urls.messages}`, messengerArgs).then(()=>console.log("like notification stored to DB: ", messengerArgs));

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
        if (e.target) {
            tempTextFieldValue.current = e.target.value;
        }
    }

    const sendMessageHandler = () => {
        closeMessageDialog();
        if (!textFieldRef.current) return;
        textFieldRef.current.value = "";
        // console.log("message:", tempTextFieldValue.current);

        // Отправляем полученный из диалогового окна текст в мессенджер:
        const messengerArgs = {
            // TODO: Cannot read properties of null (reading 'id')
            destination: `${subscriptions.privateMessages}${id.current}`, type: "PRIVATE_MESSAGE",
            value: tempTextFieldValue.current ? tempTextFieldValue.current : "",
            fromId: id.current, toId: candidateId.current, subject: null
        };
        context.stompMessenger(stompClient, messengerArgs);
        api.post(`${urls.messages}`, messengerArgs).then(()=>console.log("message stored to DB"));
    };


    const fetchExistingPhotos = (queriedUserId) => {
        dispatch({type: types.FETCHING_PHOTOS, payload: true});
        api.get(`/users/photos/all/${queriedUserId}?serviceGroup=DATING`).then((urls) => {
            const pictures = [...urls];
            dispatch({type: types.FETCHING_PHOTOS, payload: false});
            if (candidateUserObj.current?.avatar && !pictures.includes(candidateUserObj.current.avatar)) {
                pictures.push(candidateUserObj.current.avatar);
            }
            setPictures(pictures);
        });
    }


    useEffect(() => {//TODO сделать шифрование айдишников, передаваемых через параметры строки
            const fetchCandidateData = async () => {
                candidateUserObj.current = await api.get(`/users/${queriedUserId}`);
                dispatch({type: types.SHELF_REVIEWED_USER_DATA, payload: candidateUserObj.current});//TODO сомневаюсь, что это нужно кидать в редакс
                dispatch(fetchData(urls.datingProfile, queriedUserId, types.GET_CANDIDATE_DATING_PROFILE, types.SET_CANDIDATE_DATING_PROFILE_SUCCESS, types.SET_CANDIDATE_DATING_PROFILE_FAIL));
                fetchExistingPhotos(queriedUserId);
            }

            if (queriedUserId) {
                fetchCandidateData().then(() => {
                });
            }
        }, [router.query]
    );


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
                sendToName={candidateUserObj.current?.name}
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