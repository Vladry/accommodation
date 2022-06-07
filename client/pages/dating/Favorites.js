import React from 'react';
import DatingWrapper from "./DatingWrapper";
import {datingMenu} from "../../public/menuConfig";

const Favorites = () => {
    return (
        <div>
            <DatingWrapper>
                {datingMenu[2].linkName}
            </DatingWrapper>
            <h3>Favorites</h3>
        </div>
    );
};

export default Favorites;