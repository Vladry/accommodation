import React, {useEffect, useRef, useState} from 'react';
import DatingMenuWrapper from "../../components/dating_components/datingMenuItems/DatingMenuWrapper";
import {datingMenu} from "../../public/menuConfig";
import {Box, useMediaQuery} from '@mui/material';
import DatingUserList from "../../components/dating_components/DatingUserList";
import api from "../../lib/API";
import {useDispatch, useSelector} from "react-redux";
import sel from "@/store/user/selectors";
import urls from '../../../src/main/resources/urls.json';
import My_Drawer from "../../components/appbar/My_Drawer";
import ToggleMenuIconButton from "../../components/ToggleMenuIconButton";
import BackButton from "../../components/BackButton";
import {NavLink_styled} from "../../utils/typography";
import types from "@/store/user/types";
import classes from "../../components/dating_components/datingMenuItems/dating.module.css";
import {useRouter} from "next/router";
import styled from "@emotion/styled";
import globalVariables from '../../globalVariables.json';

const Index = () => {

        const user = useSelector(sel.user);
        const userId = useRef();
        userId.current = user ? user.id : '';
        const loadingMatchingCandidatesIds = useSelector(sel.loadingMatchingCandidatesIds);
        const loadingUserDatingProfile = useSelector(sel.loadingUserDatingProfile);
        const userDatingProfile = useSelector(sel.userDatingProfile);
        const datingSearchCriteriaProfile = useSelector(sel.datingSearchCriteriaProfile);
        const [candidates, setCandidates] = useState(null);
        const candidatesIds = useRef({});
        let resUsers;
        const [isDrawerOpen, setIsDrawerOpen] = useState(false);
        const toggleDrawer = () => setIsDrawerOpen((isDrawerOpen) => !isDrawerOpen);
        const isSmallScreen = useMediaQuery('(max-width: 600px)');
        const dispatch = useDispatch();
        const debounce = useRef(false);
        const datingServiceParticipation = useSelector(sel.datingServiceParticipation);
        const datingNotifications = useSelector(sel.datingNotifications);
        const datingMessages = useSelector(sel.datingMessages);
    const datingMessagesDb = useSelector(sel.datingMessagesDb);
    const datingNotificationsDb = useSelector(sel.datingNotificationsDb);
        const router = useRouter();
        const datingGuestPeriodMs = globalVariables.datingGuestPeriodMs;
        const timersInit = {datingRegistrationChecker: null}
        const timers = useRef(timersInit);

        const checkDatingRegistration = () => {
            console.log("datingRegistrationChecker->");
            if (!datingServiceParticipation) {
                showMustRegisterUdp();
            } else if (datingServiceParticipation && timers.current['datingRegistrationChecker']) {
                clearTimeout(timers.current['datingRegistrationChecker']);
            }
        };

        const showMustRegisterUdp = () => {
            console.log("dialogWindow: you must fill out your dating profile!!")
            router.push(`${datingMenu[6].url}?force=true`).then();
        };

        useEffect(() => {
            if (!datingServiceParticipation && !timers.current['datingRegistrationChecker']) {
                timers.current['datingRegistrationChecker'] = setTimeout(() => {
                    checkDatingRegistration();
                }, datingGuestPeriodMs);
            } else if (datingServiceParticipation && timers.current['datingRegistrationChecker']) {
                clearTimeout(timers.current['datingRegistrationChecker']);
            }

        }, [datingServiceParticipation]);



    useEffect(() => {
        console.log("in useEffect, [datingNotifications]")
        api.get(`${urls.messagesToId}?type=DATING_NOTIFICATION&id=${19}`).then(data => {
            if (data && data[0]) {
                dispatch({type: types.SET_DATING_NOTIFICATIONS_DB, payload: data});
            }

        }).catch((e) => {
            console.log("ошибка при получении уведомлений");
        });
    }, [datingNotifications])


    useEffect(() => {
            api.get(`${urls.messagesToId}?type=PRIVATE_MESSAGE&id=${19}`).then(data => {
                if (data && data[0]) {
                    dispatch({type: types.SET_DATING_MESSAGES_DB, payload: data});
                }

            }).catch((e) => {
                console.log("ошибка при получении сообщений");
            });

        }, [datingMessages])




        async function getCandidatesIds() {// получим ids кандидатов, подходящих под критерии userDatingProfile:
            try {
                const aggregatedProfile = {...userDatingProfile, ...datingSearchCriteriaProfile};
//TODO возможно userDatingProfile не понадобится алгоритму поиска в составе aggregatedProfile
//                 console.log("getCandidatesIds()->");
                const getIds = await api.post(`${urls.candidatesIds}?currentUserId=${user.id}`, aggregatedProfile);
//ниже: доп. get-версия (вместо api.post), когда udp на бЭк не передается с фронта, а отдельно фЭтчуется из бЭка доп.запросом из БД:
                // const getIds = await api.get(`${urls.candidatesIds}/${user.id}`);
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

        async function getCandidates(ids) {
            // console.log(`in getCandidates->  candidates Ids}: `, ids);
            try {
                const getCandidatesPost = await api.post(urls.allUsersByIds, ids)
                resUsers = await getCandidatesPost;
                setCandidates(() => resUsers);
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
            if (user && !loadingMatchingCandidatesIds) {
                getCandidatesIds().then(()=>{});
            }
        }, [userDatingProfile, datingSearchCriteriaProfile])


        if (!user || loadingMatchingCandidatesIds || loadingUserDatingProfile) {
            return <NavLink_styled href={urls.hostPrefix}>please, reload</NavLink_styled>;
        }


        return (
            <Box sx={{display: 'flex'}}>
                <Box>
                    {isSmallScreen &&
                        <My_Drawer
                            isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer}>
                            <DatingMenuWrapper disabled={datingMenu[0].url}>
                                {datingMenu[0].linkName}
                            </DatingMenuWrapper>
                        </My_Drawer>}
                    {isSmallScreen && <Box sx={{position: 'absolute', top: '1px', left: '15px'}}>
                        <ToggleMenuIconButton
                            color={'#333A9D'} toggleDrawer={toggleDrawer}/></Box>}


                    {!isSmallScreen && <DatingMenuWrapper disabled={datingMenu[0].url}>
                        {datingMenu[0].linkName}
                    </DatingMenuWrapper>}
                </Box>


                <Box>
                    {!!candidates?.length > 0
                        && <Box>
                            <h3 className={classes['header']}>{datingMenu[0].title}:</h3>
                            <DatingUserList users={candidates}/>
                        </Box>
                    }

                    {(!candidates?.length > 0 && !!userDatingProfile && !!datingServiceParticipation)
                        && <h3 className={classes['header']} style={{color: "#b30000"}}>
                            Try to go for more humble criteria! <br/>
                            Видимо нет достойных...</h3>}

                    {(!userDatingProfile && !!datingServiceParticipation)
                        && <h3 className={classes['header']} style={{color: "#b30000", maxWidth: '600px'}}>
                            <SpanNotify>Подбор кандидатов возможен на основании заполненных данных в разделах: </SpanNotify>
                            <NavLink_styled style={{fontSize: '18px'}}
                                            href={datingMenu[6].url}>{datingMenu[6].linkName}</NavLink_styled>
                            <SpanNotify> и уточнений в: </SpanNotify>
                            <NavLink_styled style={{fontSize: '18px'}}
                                            href={datingMenu[5].url}>{datingMenu[5].linkName}</NavLink_styled>
                            <br/><br/> <SpanWarn> Перейдите в соответствующие разделы и заполните формы.</SpanWarn>
                            <br/><br/><SpanNotify>Успешных знакомств! </SpanNotify>
                        </h3>
                    }


                </Box>

                <BackButton xyOffset={{right: '1px'}}/>
            </Box>
        );
    }
;

export default Index;

const SpanWarn = styled.span`
color: red;
`;
const SpanNotify = styled.span`
color: grey;
`;