import React from 'react';
import Tooltip from "@mui/material/Tooltip";
import useAuth from "../../hooks/useAuth";
import {mainMenu} from "../../public/menuConfig";
import {NavLinkProtected, LocalMenuItem} from "../../utils/typography";


let isAuthenticated = null;

const LockedMenu = ({placement}) => {

    isAuthenticated = useAuth(false);


    return (
        <div>
            <LocalMenuItem><Tooltip placement={placement}
                                    title={mainMenu[1].title}>
                <span>
                <NavLinkProtected href={'#'}>{mainMenu[1].linkName}</NavLinkProtected>
                    {/*<NavLinkProtected href={mainMenu[1].url}>{mainMenu[1].linkName}</NavLinkProtected>*/}
                </span></Tooltip>
            </LocalMenuItem>

            <LocalMenuItem><Tooltip placement={placement}
                                    title={mainMenu[2].title}>
                <span>
                   <NavLinkProtected href={'#'}>{mainMenu[2].linkName}</NavLinkProtected>

                </span></Tooltip>
            </LocalMenuItem>


            <LocalMenuItem><Tooltip placement={placement}
                                    title={mainMenu[3].title}>
                <span>
                    <NavLinkProtected href={'#'}>{mainMenu[3].linkName}</NavLinkProtected>
                </span></Tooltip>
            </LocalMenuItem>

            <LocalMenuItem><Tooltip placement={placement}
                                    title={mainMenu[4].title}>
                <span>
                    <NavLinkProtected href={'#'}>{mainMenu[4].linkName}</NavLinkProtected>
                </span></Tooltip>
            </LocalMenuItem>

        </div>
    );
};

export default LockedMenu;


