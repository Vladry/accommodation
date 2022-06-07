import React from 'react';
import DatingWrapper from "./DatingWrapper";
import {datingMenu} from "../../public/menuConfig";

const Inbox = () => {
    return (
        <div>
            <DatingWrapper>
                {datingMenu[1].linkName}
            </DatingWrapper>
            <h3>Inbox</h3>
        </div>
    );
};

export default Inbox;