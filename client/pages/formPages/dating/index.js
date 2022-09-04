import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import DatingMenuWrapper from "./DatingMenuWrapper";
import {datingMenu} from "../../../public/menuConfig";
import {Box, Grid} from '@mui/material';
import DatingUserList from "../../../components/dating_components/DatingUserList";
import api from "../../../lib/API";
import {useDispatch, useSelector} from "react-redux";
import sel from "../../../store/selectors";
import {fetchData} from "../../../store/actions/userAction";
import types from "../../../store/types";

const Index = () => {

    const user = useSelector(sel.user);
    const loadingMatchingCandidatesIds = useSelector(sel.loadingMatchingCandidatesIds);
    const userDatingProfile = useSelector(sel.userDatingProfile);
    const [candidates, setCandidates] = useState(null);
    const candidatesIds = useRef({});
    let resUsers;


    async function getCandidatesIds() {// получим ids кандидатов, подходящих под критерии userDatingProfile:

        if (!candidatesIds.current["ids"]) {//наше кэширование
            try {
                candidatesIds.current["loading"] = true;
                const getIds = await api.get(url);
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
    async function getCandidates (ids){
        // console.log(`in getCandidates->  candidates Ids}: `, ids);
        try {
            const getCandidates = await api.post("/users/allByIds", ids);
            resUsers = await getCandidates;
            setCandidates(resUsers);
            candidatesIds.current["loading"] = false;
            candidatesIds.current["ids"] = null;
        } catch (err) {
            console.log(`error in  getCandidatesIds() -> для userId: ${user.id} `);
        }

    }

    useEffect(() => {
        // console.log("in useEffect");
        if (!candidatesIds.current["loading"] && user) {
            getCandidatesIds().then();
        }
    }, [userDatingProfile])


    if (!user) {
        return <p>user is undefined</p>;
        console.log("in dating/index -> user undefined, returning")
    }
    const url = `users/${user.id}/candidatesIds`;


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
