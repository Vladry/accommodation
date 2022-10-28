import React, {useEffect, useRef, useState} from 'react';
import DatingMenuWrapper from "./DatingMenuWrapper";
import {datingMenu} from "../../../public/menuConfig";
import {Box, Grid, useMediaQuery} from '@mui/material';
import DatingUserList from "../../../components/dating_components/DatingUserList";
import api from "../../../lib/API";
import {useSelector} from "react-redux";
import sel from "../../../store/selectors";
import {fetchData} from "../../../store/actions/userAction";
import types from "../../../store/types";
import urls from '../../../../src/main/resources/urls.json';
import My_Drawer from "../../../components/appbar/My_Drawer";
import ToggleMenuIconButton from "../../../components/ToggleMenuIconButton";
import BackButton from "../../../components/BackButton";

const Index = () => {

    const user = useSelector(sel.user);
    const loadingMatchingCandidatesIds = useSelector(sel.loadingMatchingCandidatesIds);
    const loadingUserDatingProfile = useSelector(sel.loadingUserDatingProfile);
    const userDatingProfile = useSelector(sel.userDatingProfile);
    const [candidates, setCandidates] = useState(null);
    const candidatesIds = useRef({});
    let resUsers;
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
    const isSmallScreen = useMediaQuery('(max-width: 600px)');


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
        return <p>return!</p>;
    }


    return (
        <Box sx={{display: 'flex'}}>
            <Box>
                {isSmallScreen &&
                    <My_Drawer

                        isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer}>
                        <DatingMenuWrapper>
                            {datingMenu[0].linkName}
                        </DatingMenuWrapper>
                    </My_Drawer>}
                {isSmallScreen && <Box sx={{position: 'absolute', top: '1px', left: '15px'}}>
                    <ToggleMenuIconButton
                        color={'#333A9D'} toggleDrawer={toggleDrawer}/></Box>}


                {!isSmallScreen && <DatingMenuWrapper>
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
