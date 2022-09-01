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
    const loadingMatchingCandidatesIds = useSelector(sel.loadingMatchingCandidatesIds);
    const matchingCandidatesIds = useSelector(sel.matchingCandidatesIds);
    const userDatingProfile = useSelector(sel.userDatingProfile);
    const [candidates, setCandidates] = useState(null);
    const dispatch = useDispatch();
    let resUsers;
    let denoiseFlag1 = false;
    let denoiseFlag2 = false;

    async function getCandidatesIds() {
        if (!user || denoiseFlag1) {
            // console.log("user is null, or loadingMatchingCandidatesIds is true.    returning!");
            return <p>user is undefined</p>;
        }
        denoiseFlag1 = true;
        // console.log("denoiseFlag: ",denoiseFlag1);
        let resIds;
        dispatch({type: types.GET_MATCHING_CANDIDATES_IDS});
// получим ids кандидатов, подходящих под критерии userDatingProfile:
        try {
            const getIds = api.get(`users/${user.id}/candidatesIds`);
            resIds = await getIds;
            console.log(`ids for candidates for userId: ${user.id}: `, resIds);
            dispatch({type: types.SET_MATCHING_CANDIDATES_IDS, payload: resIds});

            return resIds;

        } catch (err) {
            // console.log(err);
            console.log(`не найдены ids of candidates, или error`);
        }

    }
    async function getCandidates() {
        if (matchingCandidatesIds == null || denoiseFlag2) {
            return;
        }
        denoiseFlag2 = true;
        // console.log(`ids for candidates for userId: ${user.id}: `, matchingCandidatesIds);
// по найденным  candidatesIdsMatchingCriteria вытащим данных пользователей, чтобы потом отрендерить их userCards:
        try {
            // console.log("now fetching to /users/allByIds with argument: ", resIds);
            const getCandidates = api.post("/users/allByIds", matchingCandidatesIds);
            resUsers = await getCandidates;
            setCandidates(resUsers);
            console.log(`успешно получили matchingDatingCandidates: `, matchingCandidatesIds);
        } catch (err) {
            // console.log(err);
            console.log(`candidates для userId: ${user.id} не получены`);
        }
    }


    useEffect(() => {
            getCandidatesIds();
    }, [userDatingProfile])

    useEffect(() => {
            getCandidates();
    }, [matchingCandidatesIds])



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
                    <DatingUserList users={candidates}/>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Index;