import React, {useContext} from 'react';
import {Context} from '../../context';
import styled from '@emotion/styled';
import {Box} from "@mui/material";
import Image from "next/image";

const DatingUserCard = ({user}) => {
    const {getDatingUserProfile} = useContext(Context);

    return (
        <Box>
            <ListItem style={{position: 'relative'}}>{user.name}</ListItem>
            <Box sx={{border: '2px solid blue', borderRadius: '12px', width: '250px', height: '250px'}}>
                {user.bestPhoto}
                <Box style={{position: 'relative', top: '-1em'}}>
                    <Image name={user.id} data-name={String(user.id)}  onClick = {getDatingUserProfile}
                        src={'/images/users.png'}
                        alt={'user-image'} width={250} height={250}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default DatingUserCard;

const ListItem = styled(Box)`

`;