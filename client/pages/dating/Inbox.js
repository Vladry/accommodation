import React from 'react';
import DatingWrapper from "./DatingWrapper";
import datingMenu from "./DatingMenu";

const Inbox = () => {
    return (
        <DatingWrapper title = {datingMenu[1]}>
            <h2>Inbox</h2>
        </DatingWrapper>
    );
};

export default Inbox;