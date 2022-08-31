import React, {useEffect, useState} from 'react';
import DatingMenuWrapper from "./DatingMenuWrapper";
import {datingMenu} from "../../../public/menuConfig";
import {Box, Grid} from '@mui/material';
import DatingUserList from "../../../components/dating_components/DatingUserList";
import api from "../../../lib/API";
import {useDispatch, useSelector} from "react-redux";
import sel from "../../../store/selectors";
import {getDatingProfile} from "../../../store/actions/userAction";
import types from "../../../store/types";

const Index = () => {

    const user = useSelector(sel.user);
    // const matchingCandidatesIds = useSelector(sel.matchingCandidatesIds);
    const [candidatesMatchingCriteria, setCandidatesMatchingCriteria] = useState(null);
    const dispatch = useDispatch();


    async function getMatchingCandidatesIds() {
        if (!user) {
            console.log("user is null, returning!");
            return <p>user is undefined</p>;
        }


let resIds;
// получим ids кандидатов, подходящих под критерии userDatingProfile:
        try {
            const getIds = api.get(`users/${user.id}/matchingDatingCandidatesIds`);
            // console.log(`fetched for matchingDatingCandidates with userId: ${user.id}\n Found candidates: ${resIds} `);
            resIds = await getIds;
            dispatch({type: types.SET_MATCHING_CANDIDATES_IDS, payload: resIds});

            // если подходящие кандидаты существуют, по их ids вытащим и userDatingProfiles самих кандидатов:
            if (resIds != null) {
                (getMatchingCandidates(resIds).then());
            }
        } catch (err) {
            // console.log(err);
            console.log(`matchingDatingCandidatesIds для userId: ${user.id} не найдены, или error`);
        }

    }
    async function getMatchingCandidates(resIds) {
// по найденным  candidatesIdsMatchingCriteria вытащим данных пользователей, чтобы потом отрендерить их userCards:
        try {
            // console.log("now fetching to /users/allByIds with argument: ", resIds);
            const getCandidates = api.post("/users/allByIds", resIds);
            const resUsers = await getCandidates;
            await setCandidatesMatchingCriteria(resUsers);
            // console.log(`успешно получили matchingDatingCandidates: ${resUsers} `);
        } catch (err) {
            // console.log(err);
            console.log(`matchingDatingCandidates для userId: ${user.id} не получены`);
        }
    }


    useEffect(() => {
        // Получим список подходящих под критерии поиска для текущего пользователя:
        const ids = getMatchingCandidatesIds().then(() => {
        });
    }, [user])


    return (
        <Grid container={true} spacing={2}>
            <Grid item={true} xs={5} sm={3} md={2}>
                <Box sx={{border: '1px solid red'}}><DatingMenuWrapper>
                    {datingMenu[0].linkName}
                </DatingMenuWrapper></Box>
            </Grid>
            <Grid item={true} xs={7} sm={9} md={10}>
                <Box sx={{border: '1px solid green'}}>
                    <h3 style={{textAlign: 'center'}}>Candidates matching your criteria</h3>
                    <DatingUserList users={candidatesMatchingCriteria}/>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Index;