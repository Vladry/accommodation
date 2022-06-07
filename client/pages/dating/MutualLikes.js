import React from 'react';
import DatingWrapper from "./DatingWrapper";
import {datingMenu} from "../../public/menuConfig";

const MutualLikes = () => {
    return (
        <div>
            <DatingWrapper>
                {datingMenu[3].linkName}
            </DatingWrapper>
            <h3>MutualLikes</h3>
        </div>
    );
};

export default MutualLikes;