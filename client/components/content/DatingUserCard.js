import React, {useContext} from 'react';
import {Context} from '../../context';
import styled from '@emotion/styled';
import {Box, ListItem} from "@mui/material";
import Image from "next/image";

const DatingUserCard = ({user}) => {
    if (!user) return null;
    const {getDatingUserProfile} = useContext(Context);
    let avatarCssParam;

    if (!user.avatar) {
        avatarCssParam = {filter: 'opacity(0.2)'}
    } else {
        avatarCssParam = {}
    }


    return (
        <Box>
            <ListItem style={{position: 'relative'}}>{user.name}</ListItem>
            <Box
                sx={{border: '2px solid blue', borderRadius: '12px', width: '250px', height: '250px', padding: '10px'}}>

                <div style={{position: 'relative', top: '-1em', ...avatarCssParam } }>
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

