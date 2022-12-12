import React, {useEffect, useRef, useState} from 'react';
import {datingMenu} from "../../public/menuConfig";
import {Box} from '@mui/material';
import DatingUserList from "@/components/dating_components/DatingUserList";
import api from "../../lib/API";
import {useDispatch, useSelector} from "react-redux";
import sel from "@/store/user/selectors";
import selDatingChats from "@/store/datingChats/selectors";
import urls from '../../../src/main/resources/urls.json';
import BackButton from "@/components/BackButton";
import {NavLink_styled} from "@/utils/typography";
import datingChatsTypes from "@/store/datingChats/types";
import classes from "@/components/dating_components/datingMenuItems/dating.module.css";
import {useRouter} from "next/router";
import styled from "@emotion/styled";
import globalVariables from '@/root/globalVariables.json';
import DatingMenuDrawer from "@/components/dating_components/DatingMenuDrawer";
import destinations from '../../../src/main/resources/destinations.json';

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

        const dispatch = useDispatch();
        const debounce = useRef(false);
        const datingServiceParticipation = useSelector(sel.datingServiceParticipation);
        const datingNotifications = useSelector(selDatingChats.datingNotifications);
        const datingLikedNotifications = useSelector(selDatingChats.datingLikedNotifications);
        const datingMessages = useSelector(selDatingChats.datingMessages);
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
                    // checkDatingRegistration(); //TODO раскомментировать для проверки регистрации
                }, datingGuestPeriodMs);
            } else if (datingServiceParticipation && timers.current['datingRegistrationChecker']) {
                clearTimeout(timers.current['datingRegistrationChecker']);
            }

        }, [datingServiceParticipation]);


        useEffect(() => {
            if(!user?.id) return;
            console.log("in useEffect, [datingNotifications]")
            api.get(`${urls.messagesToId}?type=DATING_NOTIFICATION&id=${user.id}`).then(data => {
                if (data && data[0]) {
                    // dispatch({type: datingChatsTypes.SET_DATING_NOTIFICATIONS, payload: data});
                }

            }).catch((e) => {
                console.log("ошибка при получении уведомлений", e.message);
            });
        }, [datingNotifications])


        useEffect(() => {
            if(!user?.id) return;
            console.log("in useEffect, [LIKED]")
            api.get(`${urls.messagesToId}?type=${destinations.likesNotifType}&id=${user.id}`).then(data => {
                if (data && data[0]) {
                    // dispatch({type: datingChatsTypes.SET_DATING_NOTIFICATIONS, payload: data});
                }

            }).catch((e) => {
                console.log("ошибка при получении уведомлений", e.message);
            });
        }, [datingLikedNotifications])


        useEffect(() => {
            if(!user?.id) return;
            api.get(`${urls.messagesToId}?type=PRIVATE_NOTIFICATION&id=${user.id}`).then(data => {
                if (data && data[0]) {
                    dispatch({type: datingChatsTypes.SET_DATING_MESSAGES, payload: data});
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
                getCandidatesIds().then(() => {
                });
            }
        }, [userDatingProfile, datingSearchCriteriaProfile])


        if (!user || loadingMatchingCandidatesIds || loadingUserDatingProfile) {
            return <NavLink_styled href={urls.hostPrefix}>please, reload</NavLink_styled>;
        }


        return (
            <Box sx={{display: 'flex'}}>

                <DatingMenuDrawer hideThreshold={600} menuIndex={0} /> {/*menuIndex - это порядковый номер  массива datingMenu[] файле menuConfig.js*/}


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