import React from 'react';
import DatingWrapper from "./DatingWrapper";
import {datingMenu} from "../../public/menuConfig";

const Index = () => {
    return (
        <div>
            <DatingWrapper>
                {datingMenu[0].linkName}
            </DatingWrapper>
            <h3>Меню</h3>
        </div>
    );
};

export default Index;