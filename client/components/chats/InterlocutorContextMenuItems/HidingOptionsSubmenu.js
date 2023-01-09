import React from 'react';
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";

const HidingOptionsSubmenu = (props) => {

    const {
        hideCorrespondenceForRecipient,
        hideCorrespondenceForInterlocutor,
        hideCorrespondenceForAll,
        HidingContextMenuHandler
    } = props;

    return (
        <div>
            <p onClick={HidingContextMenuHandler}>свернуть модменю сокрытия сообщений</p>
            <p onClick={hideCorrespondenceForRecipient}>
                <PersonAddDisabledIcon style={{color: "darkred"}}/>
                <span style={{color: '#000'}}>Скрыть собеседника и переписку только у меня. (скрытая переписка восстановима)</span></p>

            <p onClick={hideCorrespondenceForInterlocutor}>
                <PersonAddDisabledIcon style={{color: "darkred"}}/>
                <span style={{color: '#000'}}>Скрыть переписку только для собеседника. (восстановимо)</span></p>

            <p onClick={hideCorrespondenceForAll}>
                <PersonAddDisabledIcon style={{color: "darkred"}}/>
                <span style={{color: '#000'}}>Скрыть переписку для всех. (восстановимо)</span></p>
        </div>
    );
};

export default HidingOptionsSubmenu;