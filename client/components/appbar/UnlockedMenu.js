import React from 'react';
import Tooltip from "@mui/material/Tooltip";
import useAuth from "../../hooks/useAuth";
import {mainMenu} from '../../public/menuConfig.js';
import {useSelector} from "react-redux";
import sel from "@/store/user/selectors";
import {LocalMenuItem, NavLink_styled, NavLinkProtected} from "../../utils/typography";


let isAuthenticated = null;

const UnlockedMenu = ({placement}) => {

    const user = useSelector(sel.user);
    const datingServiceParticipation = useSelector(sel.user) ? user.datingServiceParticipation : false;
    isAuthenticated = useAuth(false);


    return (
        <div>

            {datingServiceParticipation
                && <LocalMenuItem><Tooltip placement={placement} title={mainMenu[1].title}>
                <span>
                    <NavLink_styled href={mainMenu[1].url}>{mainMenu[1].linkName}</NavLink_styled>
                </span></Tooltip>
                </LocalMenuItem>}

            {!datingServiceParticipation
                && <LocalMenuItem><Tooltip placement={placement} title={mainMenu[1].inactiveTitle}>
                <span>
                    <NavLinkProtected href={mainMenu[1].url}>{mainMenu[1].inactiveLinkName}</NavLinkProtected>
                </span></Tooltip>
                </LocalMenuItem>}

            <LocalMenuItem><Tooltip placement={placement}
                                    title={mainMenu[2].title}>
                <span>
                   <NavLink_styled href={mainMenu[2].url}>{mainMenu[2].linkName}</NavLink_styled>
                </span></Tooltip>
            </LocalMenuItem>


            <LocalMenuItem><Tooltip placement={placement}
                                    title={mainMenu[3].title}>
                <span>
                    <NavLink_styled href={mainMenu[3].url}>{mainMenu[3].linkName}</NavLink_styled>
                </span></Tooltip>
            </LocalMenuItem>

            <LocalMenuItem><Tooltip placement={placement}
                                    title={mainMenu[4].title}>
                <span>
                    <NavLink_styled href={mainMenu[4].url}>{mainMenu[4].linkName}</NavLink_styled>
                </span></Tooltip>
            </LocalMenuItem>

        </div>
    );
};

export default UnlockedMenu;


