import React from 'react';
import {Link} from "@mui/material";
import styled from "@emotion/styled";
import {NavLink} from "../components/appbar/NavLink";

const Acquaintances = () => {
    return (
        <div>
            <h2>Знакомства</h2>
            <p>страница поиска знакомств</p>
            <MenuItem><NavLink_styled href={"/inbox"}>входящие</NavLink_styled></MenuItem>
            <MenuItem><NavLink_styled href={"/favorites"}>избранные</NavLink_styled></MenuItem>
            <MenuItem><NavLink_styled href={"/dating-profile"}>взаимно лайкаем</NavLink_styled></MenuItem>
            <MenuItem><NavLink_styled href={"/dating-preferences"}>настройка поиска</NavLink_styled></MenuItem>
            <MenuItem><NavLink_styled href={"/dating-profile"}>моя анкета</NavLink_styled></MenuItem>
        </div>
    );
};

export default Acquaintances;


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