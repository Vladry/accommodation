import React, {useContext} from 'react';
import {Context} from '../../context';
import styled from '@emotion/styled';
import {Box, ListItem} from "@mui/material";
import Image from "next/image";

const DatingUserCard = ({user}) => {
    const {getDatingUserProfile} = useContext(Context);
    let ImageBox_styled, isAvatar;

    if (user.avatar === "") ImageBox_styled = styled(Box)`
       filter: opacity(0.2);
    `
    else ImageBox_styled = styled(Box)``;

    if (user.avatar === "") {
        isAvatar = {filter: 'opacity(0.2)'}
    } else {
        isAvatar = {}
    }


    return (
        <Box>
            <ListItem style={{position: 'relative'}}>{user.name}</ListItem>
            <Box
                sx={{border: '2px solid blue', borderRadius: '12px', width: '250px', height: '250px', padding: '10px'}}>

                <div style={{position: 'relative', top: '-1em', ...isAvatar } }>
                    <Image name={user.id} data-name={String(user.id)} onClick={getDatingUserProfile}
                           src={user.avatar ? user.avatar : '/images/users.png'}
                           alt={'user-image'} width={250} height={250}
                    />
                </div>
            </Box>
        </Box>
    );


};

export default DatingUserCard;

