import React from 'react';
import DatingMenuWrapper from "./DatingMenuWrapper";
import {datingMenu} from "../../../public/menuConfig";

const MutualLikes = () => {
    return (
        <div>
            <DatingMenuWrapper>
                {datingMenu[3].linkName}
            </DatingMenuWrapper>
            <h3>MutualLikes</h3>
        </div>
    );
};

export default MutualLikes;