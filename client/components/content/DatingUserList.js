import React from 'react';
import DatingUser from './DatingUser';
import styled from "@emotion/styled";
import {Box} from "@mui/material";

const DatingUserList = ({users}) => {
    if (!users) return;
    const datingUsers = users.map(
        (user, key) => {
            if (!user) return null;
            return <DatingUser user={user} key={key}/>;
        });

    return (
        <FlexContainer>
            {datingUsers}
        </FlexContainer>
    );
};

export default DatingUserList;

const FlexContainer = styled(Box)`
display: flex;
justify-content flex-start;
flex-flow: row wrap;
gap: 5px;
`;
const ListItem = styled(Box)`

`;