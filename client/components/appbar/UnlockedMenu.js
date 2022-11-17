import React from 'react';
import Tooltip from "@mui/material/Tooltip";
import useAuth from "../../hooks/useAuth";
import {datingMenu, mainMenu} from '../../public/menuConfig.js';
import {useSelector} from "react-redux";
import sel from "../../store/selectors";
import {LocalMenuItem, NavLink_styled, NavLinkProtected} from "../../utils/typography";


let isAuthenticated = null;

const UnlockedMenu = ({placement}) => {

    let isCurrUserHasDatingProfile = useSelector(sel.isCurrUserHasDatingProfile);
    const user  = useSelector(sel.user);
    const datingServiceParticipation = useSelector(sel.user)? user.datingServiceParticipation : false;
    isAuthenticated = useAuth(false);


    return (
        <div>

            <LocalMenuItem><Tooltip placement={placement}
                                    title={mainMenu[1].title}>
                <span>
                {/*{isCurrUserHasDatingProfile &&*/}
                {datingServiceParticipation &&
                    <NavLink_styled href={mainMenu[1].url}>{mainMenu[1].linkName}</NavLink_styled>}
                    {/*{!isCurrUserHasDatingProfile &&*/}
                    {!datingServiceParticipation &&
                        <NavLinkProtected href={datingMenu[5].url}>{datingMenu[5].inactiveLinkName}</NavLinkProtected>}
                </span></Tooltip>
            </LocalMenuItem>

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


