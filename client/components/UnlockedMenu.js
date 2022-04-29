import React from 'react';
import Tooltip from "@mui/material/Tooltip";
import useAuth from "../hooks/useAuth";
import styled from "@emotion/styled";
import {NavLink} from "./NavLink";
import menuConfig from '../public/menuConfig.js';

let isAuthenticated = null;

const UnlockedMenu = ({placement}) => {

        isAuthenticated = useAuth(false);


    return (
        <div>
            <MenuItem><Tooltip  placement ={placement}
                                title={menuConfig[1].title}>
                <span>
                    <NavLinkUnprotected href={menuConfig[1].url} children={menuConfig[1].linkName}/>
                </span>
            </Tooltip></MenuItem>

            <MenuItem><Tooltip  placement ={placement}
                                title={menuConfig[2].title}>
                <span>
                   <NavLinkUnprotected href={menuConfig[2].url} children={menuConfig[2].linkName}/>
                </span>
            </Tooltip></MenuItem>

            <MenuItem><Tooltip  placement ={placement}
                title={menuConfig[3].title}>
                <span>
                   <NavLinkUnprotected href={menuConfig[3].url} children={menuConfig[3].linkName}/>
                </span>
            </Tooltip></MenuItem>


            <MenuItem><Tooltip  placement ={placement}
                title={menuConfig[4].title}>
                <span>
                    <NavLinkUnprotected href={menuConfig[4].url} children={menuConfig[4].linkName}/>
                </span>
            </Tooltip></MenuItem>

        </div>
    );
};

export default UnlockedMenu;

const NavLinkUnprotected = styled(NavLink)`
margin: 5px 10px;
text-decoration: none;
&:visited, &:link, &:active {color: ${props => props.theme.palette.primary.main}   };
&:focus, &:hover {color: ${props => props.theme.palette.warning.dark} };
`;


const MenuItem = styled.div`
border: 2px solid #ccc;
border-radius: 15px;
margin: 20px 10px;
`;
