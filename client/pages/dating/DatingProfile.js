import React from 'react';
import DatingWrapper from "./DatingWrapper";
import {datingMenu} from "../../public/menuConfig";

const DatingProfile = () => {
    return (
        <div>
            <DatingWrapper>
                {datingMenu[5].linkName}
            </DatingWrapper>
            <h3>DatingProfile</h3>
        </div>
    );
};

export default DatingProfile;