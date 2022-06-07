import React from 'react';
import DatingWrapper from "./DatingWrapper";
import datingMenu from "./DatingMenu";

const DatingProfile = () => {
    return (
        <DatingWrapper title={datingMenu[5]}>
            <h2>profile</h2>
        </DatingWrapper>
    );
};

export default DatingProfile;