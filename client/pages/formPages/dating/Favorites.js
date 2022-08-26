import React from 'react';
import DatingMenuWrapper from "./DatingMenuWrapper";
import {datingMenu} from "../../../public/menuConfig";

const Favorites = () => {
    return (
        <div>
            <DatingMenuWrapper>
                {datingMenu[2].linkName}
            </DatingMenuWrapper>
            <h3>Favorites</h3>
        </div>
    );
};

export default Favorites;