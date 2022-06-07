import React from 'react';
import DatingWrapper from "./DatingWrapper";
import datingMenu from "./DatingMenu";

const Favorites = () => {
    return (
        <DatingWrapper title = {datingMenu[2]}>
            <h2>Favorites</h2>
        </DatingWrapper>
    );
};

export default Favorites;