import React from 'react';
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const BlockingOptionsSubmenu = (props) => {

    const {
        blockInterlocutorHideCorrespondenceForAll,
        blockInterlocutorLeaveCorrespondenceForAll,
        blockInterlocutorLeaveCorrespondenceForRecipient,
        blockInterlocutorDeleteAllCorrespondence,
        unBlockInterlocutorAndShowCorrespondence,
        BlockingContextMenuHandler
    } = props;

    return (
        <div>
            <p onClick={BlockingContextMenuHandler}>свернуть подменю блокировок</p>
            <p onClick={blockInterlocutorHideCorrespondenceForAll}><RemoveCircleIcon style={{color: "darkred"}}/>
                <span >Заблокировать. Переписку скрыть от всех. (восстановимо)</span></p>

            <p onClick={blockInterlocutorLeaveCorrespondenceForAll}><RemoveCircleIcon style={{color: "darkred"}}/>
                <span>Заблокировать. Переписку оставить для всех. (восстановимо)</span></p>

            <p onClick={blockInterlocutorLeaveCorrespondenceForRecipient}><RemoveCircleIcon style={{color: "darkred"}}/>
                <span>Заблокировать (восстановимо), Переписку оставить только для себя.</span></p>

            <p onClick={blockInterlocutorDeleteAllCorrespondence}><RemoveCircleIcon style={{color: "darkred"}}/>
                <span>Заблокировать. Переписку удалить навсегда.(необратимо)</span></p>

            <p onClick={unBlockInterlocutorAndShowCorrespondence}><RemoveCircleIcon style={{color: "darkred"}}/>
                <span>Разблокировать собеседника и восстановить сокрытую переписку (удаленная не восстановима)</span></p>

        </div>
    );
};

export default BlockingOptionsSubmenu;