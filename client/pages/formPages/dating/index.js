import React, {useEffect, useRef, useState} from 'react';
import DatingMenuWrapper from "./DatingMenuWrapper";
import {datingMenu} from "../../../public/menuConfig";
import {Box, useMediaQuery} from '@mui/material';
import DatingUserList from "../../../components/dating_components/DatingUserList";
import api from "../../../lib/API";
import {useDispatch, useSelector} from "react-redux";
import sel from "../../../store/selectors";
import urls from '../../../../src/main/resources/urls.json';
import My_Drawer from "../../../components/appbar/My_Drawer";
import ToggleMenuIconButton from "../../../components/ToggleMenuIconButton";
import BackButton from "../../../components/BackButton";
import {NavLink_styled} from "../../../utils/typography";
import types from "../../../store/types";

const Index = () => {

    const user = useSelector(sel.user);
    const userId = useRef();
    userId.current = user ? user.id : '';
    const loadingMatchingCandidatesIds = useSelector(sel.loadingMatchingCandidatesIds);
    const loadingUserDatingProfile = useSelector(sel.loadingUserDatingProfile);
    const userDatingProfile = useSelector(sel.userDatingProfile);
    const [candidates, setCandidates] = useState(null);
    const candidatesIds = useRef({});
    let resUsers;
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
    const isSmallScreen = useMediaQuery('(max-width: 600px)');
    const dispatch = useDispatch();
    const debounce = useRef(false);


    useEffect(() => {
        if (debounce.current) return;
        debounce.current = true;
        api.get(`${urls.messagesToId}?type=PRIVATE_MESSAGE&id=${19}`).then(data => {
            if (data && data[0]) {
                dispatch({type: types.SET_DATING_MESSAGES, payload: data});
            }

        }).catch((e) => {
            console.log("ошибка при получении сообщений");
        });

        api.get(`${urls.messagesToId}?type=DATING_NOTIFICATION&id=${19}`).then(data => {
            if (data && data[0]) {
                dispatch({type: types.SET_DATING_NOTIFICATIONS, payload: data});
            }
        }).catch((e) => {
            console.log("ошибка при получении уведомлений");
        });


        /*        api.get(`${urls.messagesFromType}?type=datingNotification`).then(notifications => {
                    if (notifications && notifications[0]) {
                        dispatch({type: types.SET_DATING_NOTIFICATIONS, payload: notifications});
                    }
                }).catch((e) => {
                    console.log("ошибка при получении уведомлений, е= ", e.message)
                });*/

        /*        api.get(`${urls.allMessages}`).then(notifications => {
                    // console.log("fetched from DB notifications: ",notifications)
                    dispatch({type: types.SET_DATING_NOTIFICATIONS, payload: notifications});
                }).catch((e)=>{console.log("ошибка при получении ВСЕХ сообщений, е= ", e.message)});*/

    }, [])


    /*
        useEffect(() => {
            api.get(`${urls.messagesToId}?type=PRIVATE_MESSAGE&id=${user.id}`).then(messages => {
                dispatch({type: types.SET_DATING_MESSAGES, payload: messages});
            });
            api.get(`${urls.messagesToId}?type=NOTIFICATION&id=${user.id}`).then(notifications => {
                dispatch({type: types.SET_DATING_NOTIFICATIONS, payload: notifications});
            });
        },[])
    */


    async function getCandidatesIds() {// получим ids кандидатов, подходящих под критерии userDatingProfile:

        if (!candidatesIds.current["ids"]) {//наше кэширование
            try {
                candidatesIds.current["loading"] = true;
                const getIds = await api.post(`${urls.candidatesIds}?currentUserId=${user.id}`, userDatingProfile);

//TODO -версия, когда udp на бЭк не передается с фронта, а отдельно фЭтчуется из бЭка доп.запросом из БД:
                // const getIds = await api.get(`${urls.candidatesIds}/${user.id}`);
//TODO -версия, когда сразу передаем udp с фронта на бЭк:
                candidatesIds.current["ids"] = await getIds;

                // console.log(`ids successfully fetched: `, candidatesIds.current["ids"]);
                if (candidatesIds.current["ids"]) {
                    getCandidates(candidatesIds.current["ids"]).then();
                }

            } catch (err) {
                candidatesIds.current["loading"] = false;
                console.log(`error fetching ids`);
            }
        }

    }

    async function getCandidates(ids) {
        // console.log(`in getCandidates->  candidates Ids}: `, ids);
        try {
            const getCandidates = await api.post(urls.allUsersByIds, ids);
            resUsers = await getCandidates;
            setCandidates(resUsers);
            candidatesIds.current["loading"] = false;
            candidatesIds.current["ids"] = null;
        } catch (err) {
            console.log(`error in  getCandidatesIds() -> для userId: ${user.id} `);
        }
    }

    const setLastVisitDateTime = () => {
        api.get(`${urls.setLastVisitDating}/${user.id}`).then();
    }

    useEffect(() => {
        if (!loadingUserDatingProfile && !candidatesIds.current["loading"] && user || loadingMatchingCandidatesIds) {
            setLastVisitDateTime();
        }
    }, []);

    useEffect(() => {
        if (!loadingUserDatingProfile && !candidatesIds.current["loading"] && user || loadingMatchingCandidatesIds) {
            getCandidatesIds().then();
        }
    }, [userDatingProfile])


    if (!user || loadingMatchingCandidatesIds || loadingUserDatingProfile) {
        return <NavLink_styled href={urls.hostPrefix}>please, reload</NavLink_styled>;
    }


    return (
        <Box sx={{display: 'flex'}}>
            <Box>
                {isSmallScreen &&
                    <My_Drawer

                        isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer}>
                        <DatingMenuWrapper disabled={null}>
                            {datingMenu[0].linkName}
                        </DatingMenuWrapper>
                    </My_Drawer>}
                {isSmallScreen && <Box sx={{position: 'absolute', top: '1px', left: '15px'}}>
                    <ToggleMenuIconButton
                        color={'#333A9D'} toggleDrawer={toggleDrawer}/></Box>}


                {!isSmallScreen && <DatingMenuWrapper disabled={null}>
                    {datingMenu[0].linkName}
                </DatingMenuWrapper>}
            </Box>


            <Box>
                {!!candidates?.length > 0
                    && <Box>
                        <h3 style={{textAlign: 'center', color: 'gray'}}>Matching your criteria:</h3>
                        <DatingUserList users={candidates}/>
                    </Box>
                }

                {!candidates?.length > 0 && <h3 style={{textAlign: 'center', color: "#b30000"}}>
                    Try to go for more humble criteria! <br/>
                    Видимо нет достойных...</h3>}


            </Box>

            <BackButton xyOffset={{right: '1px'}}/>
        </Box>
    );
};

export default Index;
