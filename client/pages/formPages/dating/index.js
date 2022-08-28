import React, {useEffect, useState} from 'react';
import DatingMenuWrapper from "./DatingMenuWrapper";
import {datingMenu} from "../../../public/menuConfig";
import {Box, Grid} from '@mui/material';
import DatingUserList from "../../../components/dating_components/DatingUserList";
import api from "../../../lib/API";
import {useDispatch, useSelector} from "react-redux";
import sel from "../../../store/selectors";

const Index = () => {

    const user = useSelector(sel.selectUser);
    // console.log("user at top: ", user);
    const [candidatesIdsMatchingCriteria, setCandidatesIdsMatchingCriteria] = useState(null);
    const [candidatesMatchingCriteria, setCandidatesMatchingCriteria] = useState(null);
    const dispatch = useDispatch();


    async function getMatchingUsersIds() {
        if(!user) {
            console.log("user in getMatchingUsersIds: ", user);
                console.log("in getMatchingUsersIds, user is null, returning!");
                return <p>user is undefined</p>;
            }
        let resIds;
            try {
                const getIds = api.get(`users/${user.id}/matchingDatingCandidatesIds`);
                 resIds = await getIds;
                console.log(`fetched for matchingDatingCandidates with userId: ${user.id}\n Found candidates: ${resIds} `);
                await setCandidatesIdsMatchingCriteria(resIds);
            } catch (err) {
                console.log(err);
                console.log(`error fetching matchingDatingCandidatesIds with userId: ${user.id}`);
            }

// по найденным  candidatesIdsMatchingCriteria вытащим данных пользователей, чтобы потом отрендерить их userCards:
            try {
            console.log("now fetching to /users/allByIds with argument: ", resIds);
                const getCandidates = api.post("/users/allByIds", resIds);
                const resUsers = await getCandidates;
                await setCandidatesMatchingCriteria(resUsers);
                console.log(`fetched matchingDatingCandidates: ${resUsers} `);
            } catch (err) {
                console.log(err);
                console.log(`error fetching matchingDatingCandidates with userId: ${user.id}`);
            }


        }

        useEffect(()=> {
            // Получим список подходящих под критерии поиска для текущего пользователя:
            getMatchingUsersIds().then(() => { /*console.log("getMatchingUsersIds() done")*/});


        //на всякий случай получим datingProfile текущего currentUser (для нахождения сandidatesMatchingCriteria это не требуется):
        //         const logActionCurrentU = act.GET_USER_DATING_PROFILE;
        //         const setActionCurrentU = act.SET_USER_DATING_PROFILE;
        //         dispatch(getDatingProfile(user.id, logActionCurrentU, setActionCurrentU));
    },[])



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