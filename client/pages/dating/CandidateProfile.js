import React, {useContext, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Box, Paper, useMediaQuery} from "@mui/material";
import {fetchData} from "@/store/user/actions";
import types from "@/store/user/types";
import selUser from "@/store/user/selectors";
import urls from '../../../src/main/resources/urls.json'
import destinations from '../../../src/main/resources/destinations.json'
import SwiperUserPic from "../../components/dating_components/swiper_carousel/SwiperUserPic";
import api from "../../lib/API";
import BackButton from "../../components/BackButton";
import ActionPanel from "../../components/dating_components/candidate_profile/ActionPanel";
import CandidateDetailsTable from "../../components/dating_components/candidate_profile/CandidateDetailsTable";
import My_Drawer from "../../components/appbar/My_Drawer";
import ToggleMenuIconButton from "../../components/ToggleMenuIconButton";
import {useRouter} from "next/router";
import {useTheme} from "@mui/material/styles";
import Image from "next/image";
import AccountCircle from "@mui/icons-material/AccountCircle";
import globalVariables from '@/root/globalVariables.json';
import {Context} from '@/root/context.js';

import MessengerDialogWindow from "../../components/forms/MessengerDialogWindow";

const CandidateProfile = () => {
    const theme = useTheme();
    const context = useContext(Context);
    const dispatch = useDispatch();
    const user = useSelector(selUser.user);
    const [pictures, setPictures] = useState([]);
    const stompClient = useSelector(selUser.stompClient);
    const router = useRouter();
    const queriedUserId = router.query.queriedUserId;
    const candidateUserObj = useRef();
    /*** Блок рефов ниже-своебразный костыль, иначе user.id и queriedUserId почему-то оказываются не доступными
     * при запуске sendMessageHandler() из слушателя  document.addEventListener('keyup', e => {
     * ***/
    const id = useRef();
    id.current = user ? user.id : '';
    const candidateId = useRef();
    candidateId.current = queriedUserId ? queriedUserId : '';
    const debounce = useRef({});


    //***************** <ActionPanel/>drawer  functionality **********************//
    useEffect(() => {//здесь получаем состояния isLiked и isBookMarked для кандидата, чтобы отрендерить соответствующие иконки в ActionPanel
        if (debounce.current['checkingIsLiked']) return;
        debounce.current['checkingIsLiked'] = true;
// проверяем isLiked
        api.get(`${urls.likesAndBookmarks}?type=${destinations.likesNotifType}&fromId=${id.current}&toId=${candidateId.current}`)
            .then(data => {
                if (data[0] && data[0].type) {
                    setIsLiked(true);
                    // console.log("this candidate WAS liked by current user");
                } else {
                    // console.log("this candidate was NOT liked by current user");
                }
            }).catch(() => {
            console.log("error checking IF this candidate was liked by current user")
        });

// проверяем isBookmarked
        api.get(`${urls.likesAndBookmarks}?type=BOOKMARKED&fromId=${id.current}&toId=${candidateId.current}`)
            .then(data => {
                if (data[0] && data[0].type) {
                    setIsBookmarked(true);
                    // console.log("this candidate WAS bookmarked by current user");
                } else {
                    // console.log("this candidate was NOT bookmarked by current user");
                }
            }).catch(() => {
            console.log("error checking IF this candidate was bookmarked by current user")
        });
    }, [router.query])


    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const forceToggleDrawer = () => {
        setIsDrawerOpen(() => !isDrawerOpen);
    }

    const [isLiked, setIsLiked] = useState(false);
    const likeHandler = () => {
        setIsLiked((isLiked) => !isLiked);
        const nowLikedState = !isLiked;//эта переменная нужна, т.к. state не обновляется мгновенно и путает данные

        const likeNotification = {
            destination: `${destinations.likesNotifications}${queriedUserId}`,
            type: `${destinations.likesNotifType}`,
            value: `${urls.queriedCandidateProfile}${id.current}`,
            fromId: id.current.toString(), toId: candidateId.current.toString(),
            subject: nowLikedState ? `${candidateUserObj.current.name} ${candidateUserObj.current.lastName} ${destinations.likedSubject}`
                : `${candidateUserObj.current.name} ${candidateUserObj.current.lastName} ${destinations.unlikedSubject}`
        };


         /* // тут либо записывали, либо удаляли из БД лайки. Но мы решили сохранять ВСЁ, что было
        if (nowLikedState) {
            //отослать stomp-уведомление о лайке юзеру, которого я лайкнул и записать лайк в БД:
            api.post(`${urls.messages}`, likeNotification).then(() => {});
        }

       if (!nowLikedState) {// удалить из базы нотификейшн о том, что этот кандидат ранее был лайкнут текущим ющером
            api.delete(`${urls.likesAndBookmarks}?type=${destinations.likesNotifType}&fromId=${user.id.toString()}&toId=${queriedUserId.toString()}`).then(data => {
                console.log("isLiked deleted!");
            }).catch(() => {
                console.log("not found an isLiked notification to delete!")
            });
        }*/

        api.post(`${urls.messages}`, likeNotification).then(() => {});
        const data = {msg: likeNotification, client: stompClient}
        context.stompNotifier(data);
    }


    const [isBookmarked, setIsBookmarked] = useState(false);
    const bookmarkHandler = () => {
        setIsBookmarked(!isBookmarked);
        const nowBookmarkedState = !isBookmarked;//эта переменная нужна, т.к. state не обновляется мгновенна и путает данные

        if (nowBookmarkedState) {
            //записать метку bookmarked в БД:
            const msg = {
                destination: null, type: "BOOKMARKED", value: null, subject: null,
                fromId: id.current, toId: candidateId.current,
            };
            api.post(`${urls.messages}`, msg).then(() => {
            });
        }

        if (!nowBookmarkedState) {// удалить из базы нотификейшн о том, что этот кандидат ранее был лайкнут текущим ющером
            api.delete(`${urls.likesAndBookmarks}?type=BOOKMARKED&fromId=${id.current}&toId=${candidateId.current}`).then(data => {
                console.log("isLiked deleted!");
            }).catch(() => {
                console.log("not found an isLiked notification to delete!")
            });
        }

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
        if (e.target.dataset.name === "triggersToggling"
            || e.target.closest("div").getAttribute("data-name") === "triggersToggling")
            return; //-не переключать Drawer, если кликаем по пунктам ActionPanel- менюшки

        setIsDrawerOpen((isDrawerOpen) => !isDrawerOpen);
        // console.log("not toggling, as target is not equal to triggersToggling");
    };
    const isSmallScreen = useMediaQuery('(max-width:900px)');
    const isLargeScreen = !isSmallScreen;
    let isPaid = useSelector(selUser.isPaid); //оплачен ли данным юзером данный вид сервиса
    // isPaid = false;
    const closeMessageDialog = () => {
        setIsMessageDialogOpen(false);
    };
    let tempTextFieldValue = useRef('');
    const textFieldRef = useRef();
    useEffect(() => {
        document.addEventListener('keyup', e => {
            if (debounce.current['checkKeyCombinationPressed']) return;
            // console.log("e.key: ", e.key);
            // console.log("e.code: ", e.code);
            if ((e.altKey || e.ctrlKey || e.shiftKey) && e.key === "Enter") {
                setTimeout(() => {
                    debounce.current['checkKeyCombinationPressed'] = false;
                }, globalVariables.keyPressDebounce);
                sendMessageHandler();
                debounce.current['checkKeyCombinationPressed'] = true;
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

        // Отправляем полученный из диалогового окна текст в stomp-мессенджер и в БД:
        //datingMessage является одновременно сущностью и уведомления и сообщения
        const datingMessage = {
            destination: `${destinations.datingMessageSentNotifications}${candidateId.current}`,
            type: "DATING_MESSAGE_SENT_NOTIFICATION", // id.current обязательно, иначе: Cannot read properties of null (reading 'id')
            chat: 'dating',
            value: tempTextFieldValue.current ? tempTextFieldValue.current : "",
            fromId: id.current,
            toId: candidateId.current
        };
        const data = {msg: datingMessage, client: stompClient};


        api.post(`${urls.messages}`, datingMessage).then(() => {});
        context.stompNotifier(data);
    };


    const fetchExistingPhotos = (queriedUserId) => {
        dispatch({type: types.FETCHING_PHOTOS, payload: true});
        api.get(`/users/photos/all/${queriedUserId}?serviceGroup=DATING`).then((urls) => {
            const pictures = [...urls];
            dispatch({type: types.FETCHING_PHOTOS, payload: false});
            if (candidateUserObj.current?.avatar && !pictures.includes(candidateUserObj.current.avatar)) {
                pictures.push(candidateUserObj.current.avatar);
            }
            setPictures(() => pictures);
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

    if(!user) return;

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
            // backgroundColor: `${theme.paperBackgroundColor}`,
        }}>


            {isSmallScreen &&
                <Box>
                    <Box sx={{position: 'absolute'}}>
                        <My_Drawer isDrawerOpen={isDrawerOpen} toggleDrawer={conditionalToggleDrawer}>
                            <ActionPanel
                                isMessageDialogOpen={isMessageDialogOpen}
                                openMessageDialog={openMessageDialog}
                                isBookmarked={isBookmarked}
                                bookmarkToFavorites={bookmarkHandler}
                                isLiked={isLiked}
                                likeAction={likeHandler}
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
                            bookmarkToFavorites={bookmarkHandler}
                            isLiked={isLiked}
                            likeAction={likeHandler}
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