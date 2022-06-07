import React from 'react';
import DatingWrapper from "./DatingWrapper";
import datingMenu from "./DatingMenu";

const Index = () => {
    return (
        <div>
            <DatingWrapper title = {datingMenu[0]}>
                <h2>Меню</h2>
            </DatingWrapper>

        </div>
    );
};

export default Index;