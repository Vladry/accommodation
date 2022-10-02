import React, {useContext} from 'react';
import {Context} from '../../context';
import {Box, ListItem} from "@mui/material";
import Image from "next/image";
import {useRouter} from "next/router";

const DatingUserCard = ({user}) => {
    const {forwardForUdProfileId} = useContext(Context);
    const router = useRouter();
    if (!user) return null;
    let avatarCssParam;

    if (!user.avatar) {
        avatarCssParam = {filter: 'opacity(0.2)'}
    } else {
        avatarCssParam = {}
    }


    return (
        <Box id='card' name={user.name} data-id={String(user.id)}
             onClick={forwardForUdProfileId.bind(null, router, user.id)}>
            <ListItem style={{position: 'relative'}}>{user.name}
                <span style={{marginLeft: '20px'}}>lastVisit/Был(а): {user.datingLastVisitDate}</span>
            </ListItem>
            <Box
                sx={{border: '2px solid blue', borderRadius: '12px', width: '250px', height: '250px', padding: '10px'}}>

                <div style={{position: 'relative', top: '-0.1em', ...avatarCssParam}}>
                    <Image src={user.avatar ? user.avatar : '/images/users.png'}
                           alt={'user-image'} width={250} height={250}
                    />
                </div>
            </Box>
        </Box>
    );


};

export default DatingUserCard;

