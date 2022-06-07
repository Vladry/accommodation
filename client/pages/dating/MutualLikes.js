import React from 'react';
import DatingWrapper from "./DatingWrapper";
import datingMenu from "./DatingMenu";

const MutualLikes = () => {
    return (
        <DatingWrapper title={datingMenu[3]}>
            <h2>mutual likes</h2>
        </DatingWrapper>
    );
};

export default MutualLikes;