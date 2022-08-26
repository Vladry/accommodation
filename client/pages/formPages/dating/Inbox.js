import React from 'react';
import DatingMenuWrapper from "./DatingMenuWrapper";
import {datingMenu} from "../../../public/menuConfig";

const Inbox = () => {
    return (
        <div>
            <DatingMenuWrapper>
                {datingMenu[1].linkName}
            </DatingMenuWrapper>
            <h3>Inbox</h3>
        </div>
    );
};

export default Inbox;