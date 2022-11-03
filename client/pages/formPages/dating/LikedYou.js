import React from 'react';
import DatingMenuWrapper from "./DatingMenuWrapper";
import {datingMenu} from "../../../public/menuConfig";

const LikedYou = () => {
    return (
        <div>
            <DatingMenuWrapper>
                {datingMenu[4].linkName}
            </DatingMenuWrapper>
            <h3>Кандидаты, которым Вы понравились</h3>
        </div>
    );
};

export default LikedYou;