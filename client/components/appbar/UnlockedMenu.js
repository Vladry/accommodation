import React from 'react';
import Tooltip from "@mui/material/Tooltip";
import useAuth from "../../hooks/useAuth";
import styled from "@emotion/styled";
import {NavLink} from "./NavLink";
import {datingMenu, mainMenu} from '../../public/menuConfig.js';
import {useSelector} from "react-redux";
import sel from "../../store/selectors";

let isAuthenticated = null;

const UnlockedMenu = ({placement}) => {

    let isCurrUserRegisteredInDating = useSelector(sel.isCurrUserRegisteredInDating);
    isAuthenticated = useAuth(false);


    return (
        <div>

            <MenuItem><Tooltip placement={placement}
                               title={mainMenu[1].title}>
                <span>
                {isCurrUserRegisteredInDating &&
                    <NavLinkUnprotected href={mainMenu[1].url}>{mainMenu[1].linkName}</NavLinkUnprotected>}
                    {!isCurrUserRegisteredInDating &&
                        <NavLinkProtected href={datingMenu[5].url}>{datingMenu[5].inactiveLinkName}</NavLinkProtected>}
                </span></Tooltip>
            </MenuItem>

            <MenuItem><Tooltip placement={placement}
                               title={mainMenu[2].title}>
                <span>
                   <NavLinkUnprotected href={mainMenu[2].url}>{mainMenu[2].linkName}</NavLinkUnprotected>
                </span></Tooltip>
            </MenuItem>


            <MenuItem><Tooltip placement={placement}
                               title={mainMenu[3].title}>
                <span>
                    <NavLinkUnprotected href={mainMenu[3].url}>{mainMenu[3].linkName}</NavLinkUnprotected>
                </span></Tooltip>
            </MenuItem>

            <MenuItem><Tooltip placement={placement}
                               title={mainMenu[4].title}>
                <span>
                    <NavLinkUnprotected href={mainMenu[4].url}>{mainMenu[4].linkName}</NavLinkUnprotected>
                </span></Tooltip>
            </MenuItem>

        </div>
    );
};

export default UnlockedMenu;

const NavLinkUnprotected = styled(NavLink)`
margin: 5px 10px;
text-decoration: none;
&:visited, &:link, &:active {color: ${props => props.theme.palette.primary.main}   };
&:focus, &:hover {color: ${props => props.theme.palette.success.dark} };
`;


const MenuItem = styled.div`
border: 2px solid #ccc;
border-radius: 15px;
margin: 20px 10px;
`;

const NavLinkProtected = styled(NavLink)`
margin: 5px 10px;
text-decoration: none;
&:visited, &:link  {color: ${props => props.theme.palette.primary.main}   };
&:focus, &:hover, &:active {color: ${props => props.theme.palette.error.main}   };
`;