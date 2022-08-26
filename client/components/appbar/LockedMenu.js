import React from 'react';
import Tooltip from "@mui/material/Tooltip";
import useAuth from "../../hooks/useAuth";
import styled from "@emotion/styled";
import {NavLink} from "./NavLink";
import {mainMenu} from "../../public/menuConfig";

let isAuthenticated = null;

const LockedMenu = ({placement}) => {

    isAuthenticated = useAuth(false);


    return (
        <div>

            <MenuItem><Tooltip placement={placement}
                               title={mainMenu[1].title}>
                <span>
                <NavLinkProtected href={mainMenu[1].url} children={mainMenu[1].linkName}/>
                </span></Tooltip>
            </MenuItem>

            <MenuItem><Tooltip placement={placement}
                               title={mainMenu[2].title}>
                <span>
                   <NavLinkProtected href={mainMenu[2].url} children={mainMenu[2].linkName}/>
                </span></Tooltip>
            </MenuItem>


            <MenuItem><Tooltip placement={placement}
                               title={mainMenu[3].title}>
                <span>
                    <NavLinkProtected href={mainMenu[3].url} children={mainMenu[3].linkName}/>
                </span></Tooltip>
            </MenuItem>

            <MenuItem><Tooltip placement={placement}
                               title={mainMenu[4].title}>
                <span>
                    <NavLinkProtected href={mainMenu[4].url} children={mainMenu[4].linkName}/>
                </span></Tooltip>
            </MenuItem>

        </div>
    );
};

export default LockedMenu;


const NavLinkProtected = styled(NavLink)`
margin: 5px 10px;
text-decoration: none;
&:visited, &:link  {color: ${props => props.theme.palette.primary.main}   };
&:focus, &:hover, &:active {color: ${props => props.theme.palette.error.main}   };
`;


const MenuItem = styled.div`
border: 2px solid #ccc;
border-radius: 15px;
margin: 20px 10px;
`;
