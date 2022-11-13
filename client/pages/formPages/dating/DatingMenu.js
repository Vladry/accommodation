import React, {useEffect, useRef, useState} from 'react';
import {datingMenu} from "../../../public/menuConfig";
import {LocalMenuItem, NavLink_styled} from "../../../utils/typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import sel from '../../../store/selectors';
import {useSelector} from "react-redux";

const DatingMenu = () => {
    const datingMessages = useSelector(sel.datingMessages);
    const datingNotifications = useSelector(sel.datingNotifications);

    return (
        <div>
            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={datingMessages? datingMessages.length : 0} color="error">
                        <MailIcon/>
                    </Badge>
                </IconButton>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={datingNotifications? datingNotifications.length : 0} color="error">
                        <NotificationsIcon/>
                    </Badge>
                </IconButton>

            </Box>
            <br/>
            <LocalMenuItem><NavLink_styled
                href={datingMenu[0].url}>{datingMenu[0].linkName}</NavLink_styled></LocalMenuItem>
            <LocalMenuItem><NavLink_styled
                href={datingMenu[1].url}>{datingMenu[1].linkName}</NavLink_styled></LocalMenuItem>
            <LocalMenuItem><NavLink_styled
                href={datingMenu[2].url}>{datingMenu[2].linkName}</NavLink_styled></LocalMenuItem>
            <LocalMenuItem><NavLink_styled
                href={datingMenu[3].url}>{datingMenu[3].linkName}</NavLink_styled></LocalMenuItem>
            <LocalMenuItem><NavLink_styled
                href={datingMenu[4].url}>{datingMenu[4].linkName}</NavLink_styled></LocalMenuItem>
            <LocalMenuItem><NavLink_styled
                href={datingMenu[5].url}>{datingMenu[5].linkName}</NavLink_styled></LocalMenuItem>
            <LocalMenuItem><NavLink_styled
                href={datingMenu[6].url}>{datingMenu[6].linkName}</NavLink_styled></LocalMenuItem>
            <LocalMenuItem><NavLink_styled
                href={datingMenu[7].url}>{datingMenu[7].linkName}</NavLink_styled></LocalMenuItem>
            <LocalMenuItem><NavLink_styled
                href={datingMenu[8].url}>{datingMenu[8].linkName}</NavLink_styled></LocalMenuItem>
        </div>
    );
};

export default DatingMenu;

