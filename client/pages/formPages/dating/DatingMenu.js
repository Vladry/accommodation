import React from 'react';
import {datingMenu} from "../../../public/menuConfig";
import {NavLink_styled, LocalMenuItem} from "../../../utils/typography";

const DatingMenu = () => {
    return (
        <div>
            <LocalMenuItem><NavLink_styled href={datingMenu[0].url}>{datingMenu[0].linkName}</NavLink_styled></LocalMenuItem>
            <LocalMenuItem><NavLink_styled href={datingMenu[1].url}>{datingMenu[1].linkName}</NavLink_styled></LocalMenuItem>
            <LocalMenuItem><NavLink_styled href={datingMenu[2].url}>{datingMenu[2].linkName}</NavLink_styled></LocalMenuItem>
            <LocalMenuItem><NavLink_styled href={datingMenu[3].url}>{datingMenu[3].linkName}</NavLink_styled></LocalMenuItem>
            <LocalMenuItem><NavLink_styled href={datingMenu[4].url}>{datingMenu[4].linkName}</NavLink_styled></LocalMenuItem>
            <LocalMenuItem><NavLink_styled href={datingMenu[5].url}>{datingMenu[5].linkName}</NavLink_styled></LocalMenuItem>
            <LocalMenuItem><NavLink_styled href={datingMenu[6].url}>{datingMenu[6].linkName}</NavLink_styled></LocalMenuItem>
            <LocalMenuItem><NavLink_styled href={datingMenu[7].url}>{datingMenu[7].linkName}</NavLink_styled></LocalMenuItem>
        </div>
    );
};

export default DatingMenu;

