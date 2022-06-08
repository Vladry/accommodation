import React from 'react';
import DatingUser from './DatingUser';
import styled from "@emotion/styled";
import {Box} from "@mui/material";

const DatingUserList = ({users}) => {
    if(!users) return;
    const datingUsers = users.map(
        (user, key) => {
            if (!user) return null;
            return <DatingUser user={user} key={key} />;
        });

    return (
        <>
            {datingUsers}
        </>
    );
};

export default DatingUserList;

const ListItem = styled(Box)`

`;