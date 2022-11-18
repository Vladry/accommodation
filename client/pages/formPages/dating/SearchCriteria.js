import React from 'react';
import DatingMenuWrapper from "./DatingMenuWrapper";
import {datingMenu} from "../../../public/menuConfig";

const SearchCriteria = () => {
    return (
        <div>
            <DatingMenuWrapper disabled={datingMenu[4].url}>
                {datingMenu[4].linkName}
            </DatingMenuWrapper>
            <h3>SearchCriteria</h3>
        </div>
    );
};

export default SearchCriteria;