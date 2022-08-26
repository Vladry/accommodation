import React, {useEffect, useState} from 'react';
import DatingMenuWrapper from "./DatingMenuWrapper";
import {datingMenu} from "../../../public/menuConfig";
import {Box, Grid} from '@mui/material';
import DatingUserList from "../../../components/dating_components/DatingUserList";
import tryUsers from '../../../public/tryUsers';
import api from "../../../lib/API";
import useAuth from "../../../hooks/useAuth";
import act from "../../../store/types";
import {getDatingProfile} from "../../../store/actions/userAction";
import {useDispatch, useSelector} from "react-redux";


const Index = () => {

    const [allUsers, setAllUsers] = useState(null);
    const isAuthenticated = useAuth(true);
    const userDatingProfile = useSelector(state => state.userData.userDatingProfile);
    const userId = useSelector(state => state.userData.user.id);
    const dispatch = useDispatch();

    useEffect(() => {
        api.get('users/all').then((r) => setAllUsers(r))
            .catch(e => console.log(e.message));

//получим datingProfile текущего currentUser:
        const logActionCurrentU = act.GET_USER_DATING_PROFILE;
        const setActionCurrentU = act.SET_USER_DATING_PROFILE;
        dispatch(getDatingProfile(userId, logActionCurrentU, setActionCurrentU));
    }, [userId]);


    if (!allUsers) return null;

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
                    <DatingUserList users={allUsers}/>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Index;