import React from 'react';
import DatingWrapper from "./DatingWrapper";
import {datingMenu} from "../../public/menuConfig";

const SearchCriteria = () => {
    return (
        <div>
            <DatingWrapper>
                {datingMenu[4].linkName}
            </DatingWrapper>
            <h3>SearchCriteria</h3>
        </div>
    );
};

export default SearchCriteria;