import React, {useEffect, useRef, useState} from 'react';
import DatingMenuWrapper from "./DatingMenuWrapper";
import {datingMenu} from "../../../public/menuConfig";
import {Box, Grid} from '@mui/material';
import DatingUserList from "../../../components/dating_components/DatingUserList";
import api from "../../../lib/API";
import {useSelector} from "react-redux";
import sel from "../../../store/selectors";
import {fetchData} from "../../../store/actions/userAction";
import types from "../../../store/types";
import urls from '../../../../src/main/resources/urls.json';

const Index = () => {

    const user = useSelector(sel.user);
    const loadingMatchingCandidatesIds = useSelector(sel.loadingMatchingCandidatesIds);
    const loadingUserDatingProfile = useSelector(sel.loadingUserDatingProfile);
    const userDatingProfile = useSelector(sel.userDatingProfile);
    const [candidates, setCandidates] = useState(null);
    const candidatesIds = useRef({});
    let resUsers;

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
        <Grid container={true} spacing={2}>
            <Grid item={true} xs={5} sm={3} md={2}>
                <Box sx={{border: '1px solid red'}}><DatingMenuWrapper>
                    {datingMenu[0].linkName}
                </DatingMenuWrapper></Box>
            </Grid>
            <Grid item={true} xs={7} sm={9} md={10}>
                <Box sx={{border: '1px solid green'}}>

                    {!!candidates?.length > 0
                        && <h3 style={{textAlign: 'center'}}>Candidates matching your criteria:</h3>
                        && <DatingUserList users={candidates}/>}

                    {!candidates?.length > 0 && <h3 style={{textAlign: 'center', color: "#b30000"}}>
                        No candidates matching your criteria! <br/>
                        Нет кандидатов соответствующих Вашим критериям!</h3>}

                </Box>
            </Grid>
        </Grid>
    );
};

export default Index;
