import React from 'react';
import {datingMenu} from "../../../public/menuConfig";
import {LocalMenuItem, NavLink_styled} from "../../../utils/typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import sel from '../../../store/selectors';
import {useSelector} from "react-redux";
import {Divider, Paper} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import HomeIcon from "@mui/icons-material/Home";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import classes from './datingMenu.module.scss';
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";

const DatingMenu = ({disabled}) => {
    const datingMessages = useSelector(sel.datingMessages);
    const datingNotifications = useSelector(sel.datingNotifications);
    const datingMessagesDb = useSelector(sel.datingMessagesDb);
    const datingNotificationsDb = useSelector(sel.datingNotificationsDb);

    return (
        <Paper variant={'elevation'} elevation={8}>
            {!(disabled === datingMenu[0].url)
                && <LocalMenuItem className={classes['local-menu']}>
                    <EmojiPeopleIcon className={classes['menu-icons']}/><NavLink_styled
                    href={datingMenu[0].url}>{datingMenu[0].linkName}</NavLink_styled>
                </LocalMenuItem>}

            <Divider/>
            {!(disabled === datingMenu[1].url)
                && <LocalMenuItem className={classes['local-menu']}>
                    <IconButton
                        size="large" aria-label="show 17 new notifications" color="inherit" sx={{mx: '0', px: '0'}}
                    >
                        <Badge sx={{position: 'relative', top: '-20px', left: '30px'}}
                               badgeContent={datingNotificationsDb ? `${datingNotificationsDb.length}` : ''}
                               color="error">
                        </Badge><ThumbUpAltIcon className={classes['menu-icons']}/>
                    </IconButton>
                    <NavLink_styled
                        href={datingMenu[1].url}>{datingMenu[1].linkName}
                    </NavLink_styled>
                </LocalMenuItem>}


            {!(disabled === datingMenu[2].url)
                && <LocalMenuItem className={classes['local-menu']}>
                    <IconButton size="large" aria-label="show 4 new mails" color="inherit" sx={{mx: '0', px: '0'}}>
                        <Badge sx={{position: 'relative', top: '-18px', left: '30px'}}
                               badgeContent={datingMessagesDb ? `${datingMessagesDb.length}` : ''} color="error">
                        </Badge>
                        <MailIcon className={classes['menu-icons']}/>
                    </IconButton>
                    <NavLink_styled
                        href={datingMenu[2].url}>{datingMenu[2].linkName}</NavLink_styled>
                </LocalMenuItem>}


            {!(disabled === datingMenu[3].url)
                && <LocalMenuItem className={classes['local-menu']}>
                    {/*<LocalMenuItem className={classes.localMenu}>  -почему-то не работает авто-нейминг: LocalMenu */}
                    <BookmarksIcon className={classes['menu-icons']}/>
                    <NavLink_styled
                        href={datingMenu[3].url}>{datingMenu[3].linkName}
                    </NavLink_styled>
                </LocalMenuItem>}

            {!(disabled === datingMenu[4].url)
                && <LocalMenuItem className={classes['local-menu']}>
                    <VisibilityIcon className={classes['menu-icons']}/>
                    <NavLink_styled
                        href={datingMenu[4].url}>{datingMenu[4].linkName}
                    </NavLink_styled>
                </LocalMenuItem>}

            {!(disabled === datingMenu[5].url)
                && <LocalMenuItem className={classes['local-menu']}>
                    <FilterAltIcon className={classes['menu-icons']}/>
                    <NavLink_styled
                        href={datingMenu[5].url}>{datingMenu[5].linkName}
                    </NavLink_styled>
                </LocalMenuItem>}

            {!(disabled === datingMenu[6].url)
                && <LocalMenuItem className={classes['local-menu']}>
                    <ManageAccountsIcon className={classes['menu-icons']}/>
                    <NavLink_styled
                        href={datingMenu[6].url}>{datingMenu[6].linkName}
                    </NavLink_styled>
                </LocalMenuItem>}

            {!(disabled === datingMenu[7].url)
                && <LocalMenuItem className={classes['local-menu']}>
                    <AddAPhotoIcon className={classes['menu-icons']}/>
                    <NavLink_styled
                        href={datingMenu[7].url}>{datingMenu[7].linkName}
                    </NavLink_styled>
                </LocalMenuItem>}

            <Divider/>
            <LocalMenuItem className={classes['local-menu']}>
                <HomeIcon className={classes['menu-icons']}/>
                <NavLink_styled
                    href={datingMenu[8].url}>{datingMenu[8].linkName}
                </NavLink_styled>
            </LocalMenuItem>

        </Paper>
    );
};

export default DatingMenu;

