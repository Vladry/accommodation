import React from 'react';
import styled from '@emotion/styled';
import {Box} from "@mui/material";
import Image from "next/image";
// import personImage from 'https://www.shareicon.net/data/2015/06/12/53139_user_256x256.png';

const DatingUser = ({user}) => {
    return (
        <Box>
            <ListItem>{user.name}</ListItem>
            <Box sx={{border: '2px solid blue', borderRadius: '12px', width: '250px', height: '250px'}}>
                {user.bestPhoto}
                <Image src={'/images/users.png'}
                       alt={'user-image'} width={250} height={250}
                />
            </Box>
        </Box>
    );
};

export default DatingUser;

const ListItem = styled(Box)`

`;