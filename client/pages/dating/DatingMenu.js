import React from 'react';
import {datingMenu} from "../../public/menuConfig";
import styled from "@emotion/styled";
import {NavLink} from "../../components/appbar/NavLink";

const DatingMenu = () => {
    return (
        <div>
            <MenuItem><NavLink_styled href={datingMenu[0].url}>{datingMenu[0].linkName}</NavLink_styled></MenuItem>
            <MenuItem><NavLink_styled href={datingMenu[1].url}>{datingMenu[1].linkName}</NavLink_styled></MenuItem>
            <MenuItem><NavLink_styled href={datingMenu[2].url}>{datingMenu[2].linkName}</NavLink_styled></MenuItem>
            <MenuItem><NavLink_styled href={datingMenu[3].url}>{datingMenu[3].linkName}</NavLink_styled></MenuItem>
            <MenuItem><NavLink_styled href={datingMenu[4].url}>{datingMenu[4].linkName}</NavLink_styled></MenuItem>
            <MenuItem><NavLink_styled href={datingMenu[5].url}>{datingMenu[5].linkName}</NavLink_styled></MenuItem>
        </div>
    );
};

export default DatingMenu;

const NavLink_styled = styled(NavLink)`
margin: 5px 10px;
text-decoration: none;
&:visited, &:link, &:active {color: ${props => props.theme.palette.primary.main}   };
&:focus, &:hover {color: ${props => props.theme.palette.success.dark} };
`;


const MenuItem = styled.div`
border: 2px solid #ccc;
border-radius: 15px;
margin: 6px 10px;
width: 200px;
`;