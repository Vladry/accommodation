import React from 'react';
import styled from '@emotion/styled';
import {Box} from "@mui/material";

const DatingUser = ({user}) => {
    return (
        <Box>
            <ListItem>{user.name}</ListItem>
{/*            <ListItem>lastName</ListItem>
            <ListItem>urlSocial1</ListItem>
            <ListItem>urlSocial2</ListItem>
            <ListItem>messenger1</ListItem>
            <ListItem>messenger2</ListItem>*/}
            <ListItem>{user.bestPhoto}</ListItem>
        </Box>
    );
};

export default DatingUser;

const ListItem = styled(Box)`

`;