import React, {useEffect, useRef, useState} from 'react';
import {datingMenu} from "../../../public/menuConfig";
import {LocalMenuItem, NavLink_styled} from "../../../utils/typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import sel from '../../../store/selectors';
import {useSelector} from "react-redux";
import {Divider} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import HomeIcon from "@mui/icons-material/Home";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import TuneIcon from "@mui/icons-material/Tune";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import classes from './datingMenu.module.scss';

const DatingMenu = () => {
    const datingMessages = useSelector(sel.datingMessages);
    const datingNotifications = useSelector(sel.datingNotifications);

    return (
        <div>
            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                {/*                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={datingMessages ? datingMessages.length : 0} color="error">
                        <MailIcon/>
                    </Badge>
                </IconButton>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={datingNotifications ? datingNotifications.length : 0} color="error">
                        <NotificationsIcon/>
                    </Badge>
                </IconButton>*/}
            </Box>
            <br/>
            <LocalMenuItem>
                <IconButton
                    size="large" aria-label="show 17 new notifications" color="inherit" sx={{mx: '0', px: '0'}}
                >
                    <Badge sx={{position: 'relative', top: '-20px', left: '30px'}}
                           badgeContent={datingNotifications ? `${datingNotifications.length}` : ''}
                           color="error">
                    </Badge><ThumbUpAltIcon/>
                </IconButton>
                <NavLink_styled
                    href={datingMenu[0].url}>{datingMenu[0].linkName}
                </NavLink_styled>
            </LocalMenuItem>


            <LocalMenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit"  sx={{mx: '0', px: '0'}}>
                    <Badge sx={{position: 'relative', top: '-18px', left: '30px'}}
                           badgeContent={datingMessages ? `${datingMessages.length}` : ''} color="error">
                    </Badge>
                    <MailIcon/>
                </IconButton>
                <NavLink_styled
                    href={datingMenu[1].url}>{datingMenu[1].linkName}</NavLink_styled>
            </LocalMenuItem>


            <LocalMenuItem className={classes.LocalMenu}>
                <BookmarksIcon className={classes.menuIcons}/><NavLink_styled
                href={datingMenu[2].url}>{datingMenu[2].linkName}</NavLink_styled>
            </LocalMenuItem>
            <LocalMenuItem>
                <VisibilityIcon/><NavLink_styled
                href={datingMenu[3].url}>{datingMenu[3].linkName}</NavLink_styled>
            </LocalMenuItem>
            <LocalMenuItem>
                <FilterAltIcon/><NavLink_styled
                href={datingMenu[4].url}>{datingMenu[4].linkName}</NavLink_styled>
            </LocalMenuItem>
            <LocalMenuItem>
                <ManageAccountsIcon/><NavLink_styled
                href={datingMenu[5].url}>{datingMenu[5].linkName}</NavLink_styled>
            </LocalMenuItem>
            <LocalMenuItem>
                <AddAPhotoIcon/><NavLink_styled
                href={datingMenu[6].url}>{datingMenu[6].linkName}</NavLink_styled>
            </LocalMenuItem>
            <Divider/>
            <LocalMenuItem>
                <HomeIcon/><NavLink_styled
                href={datingMenu[7].url}>{datingMenu[7].linkName}</NavLink_styled>
            </LocalMenuItem>

        </div>
    );
};

export default DatingMenu;

