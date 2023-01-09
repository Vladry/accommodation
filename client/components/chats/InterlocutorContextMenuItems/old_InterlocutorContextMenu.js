import React, {useEffect, useState} from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import {Button, Paper} from "@mui/material";
import Box from "@mui/material/Box";

import sel from '@/store/user/selectors';
import selDatingChats from "@/store/datingChats/selectors";
import {useSelector} from "react-redux";
import {ACTIONS, ACTIONS_Cust} from "@/store/datingChats";
import api from "@/root/lib/API";
import urls from "../../../../src/main/resources/urls.json";
import destinations from "../../../../src/main/resources/destinations.json";
import {NavLink} from "@/components/appbar/NavLink";
import {NavLink_styled} from "@/utils/typography";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";

const InterlocutorContextMenu = ({interlocutorId, contextEl, contextMenuCloseHandler}) => {
    // https://mui.com/material-ui/react-popover/#anchor-playground
    const open = !!contextEl;
    const id = open ? 'context-menu-popover' : undefined;

    const user = useSelector(sel.user);


    let isBlocked = false;
    useEffect(() => {//здесь получаем состояния isBookMarked, isBlocked
        if (!user?.id || !interlocutorId) return;
// проверяем isBlocked

        /*        api.get(`${urls.likesAndBookmarks}?type=${destinations.likesNotifType}&fromId=${id.current}&toId=${candidateId.current}`)
                    .then(data => {
                        if (data[0] && data[0].type) {
                            setIsLiked(true);
                            // console.log("this candidate WAS liked by current user");
                        } else {
                            // console.log("this candidate was NOT liked by current user");
                        }
                    }).catch(() => {
                    console.log("error checking IF this candidate was liked by current user")
                });*/

// проверяем isBookMarked
        api.get(`${urls.likesAndBookmarks}?type=BOOKMARKED&fromId=${user.id}&toId=${interlocutorId}`)
            .then(data => {
                if (data[0] && data[0].type) {
                    setIsBookmarked(true);
                    // console.log("this candidate WAS bookmarked by current user");
                } else {
                    // console.log("this candidate was NOT bookmarked by current user");
                }
            }).catch(() => {
            console.log("error checking IF this candidate was bookmarked by current user")
        });
    }, [user, interlocutorId])




/*** БЛОК функционала работы с InterlocutorSettings из DatingChatSettings и режимами InterlocutorStatus, определяющими фильтрацию загружаемых и показываемых сообщений ***/

    const blockInterlocutorHideCorrespondenceForAll = ()=>{
        // BLOCKED_CORR_HIDDEN_FOR_ALL
        console.log("blockInterlocutorHideCorrespondenceForAll");
        console.log("interlocutorId: ", interlocutorId, "user.id: ", user.id);
        api.put(`${urls.blockInterlocutorHideCorrespondenceForAll}?chat=datingChatStatus&fromId=${interlocutorId}&toId=${user.id}`).then();
    };


        const blockInterlocutorLeaveCorrespondenceForAll = ()=>{
            // BLOCKED_CORRESPONDENCE_AVAILABLE_FOR_ALL
        console.log("blockInterlocutorLeaveCorrespondenceForAll");
        api.put(`${urls.blockInterlocutorLeaveCorrespondenceForAll}?chat=datingChatStatus&fromId=${interlocutorId}&toId=${user.id}`).then();
    };

        const blockInterlocutorLeaveCorrespondenceForRecipient = ()=>{
            // BLOCKED_CORRESPONDENCE_AVAILABLE_FOR_RECIPIENT
        console.log("blockInterlocutorLeaveCorrespondenceForRecipient");
        api.put(`${urls.blockInterlocutorLeaveCorrespondenceForRecipient}?chat=datingChatStatus&fromId=${interlocutorId}&toId=${user.id}`).then();
    };
        const blockInterlocutorDeleteAllCorrespondence = ()=>{
            // BLOCKED_CORRESPONDENCE_DELETED
        console.log("blockInterlocutorDeleteAllCorrespondence");
        api.put(`${urls.blockInterlocutorDeleteAllCorrespondence}?chat=datingChatStatus&fromId=${interlocutorId}&toId=${user.id}`).then();
    };


    const unBlockInterlocutorAndShowCorrespondence = ()=>{//TODO перенести на соответствующую сервисную страницу приложения
        // UNBLOCKED
        console.log("unBlockInterlocutorAndShowCorrespondence");
        api.put(`${urls.unBlockInterlocutorAndShowCorrespondence}?chat=datingChatStatus&fromId=${interlocutorId}&toId=${user.id}`).then();
    };

    const hideCorrespondenceForRecipient = ()=>{
        // UNBLOCKED_CORRESPONDENCE_HIDDEN_FOR_RECIPIENT
        console.log("hideCorrespondenceForRecipient");
        api.put(`${urls.hideCorrespondenceForRecipient}?chat=datingChatStatus&fromId=${interlocutorId}&toId=${user.id}`).then();
    };

    const hideCorrespondenceForInterlocutor = ()=>{
        // UNBLOCKED_CORRESPONDENCE_HIDDEN_FOR_INTERLOCUTOR
        console.log("hideCorrespondenceForInterlocutor");
        api.put(`${urls.hideCorrespondenceForInterlocutor}?chat=datingChatStatus&fromId=${interlocutorId}&toId=${user.id}`).then();
    };

    const hideCorrespondenceForAll = ()=>{
        // UNBLOCKED_CORRESPONDENCE_HIDDEN_FOR_ALL
        console.log("hideCorrespondenceForAll");
        api.put(`${urls.hideCorrespondenceForAll}?chat=datingChatStatus&fromId=${interlocutorId}&toId=${user.id}`).then();
    };

    const deleteCorrespondenceFromDB = () => {
        if (!user || !interlocutorId) {
            console.log("cannot delete correspondence because user or interlocutorId does not exist");
            return;
        }
        console.log("deleting correspondence between user.id: ", user.id, " and interlocutorId: ", interlocutorId);
        api.delete(`${urls.chatMessages}?chat=datingChatStatus&fromId=${interlocutorId}&toId=${user.id}`).then();
    }
    /*** конец БЛОК функционала фильтрации сообщений в зависимости от InterlocutorSettings ***/







    const [isBookmarked, setIsBookmarked] = useState(false);
    const bookmarkHandler = () => { //TODO объединить с bookmarkHandler в файле CandidateProfile.js
        // console.log("in bookmarkHandler, isBookmarked: ", isBookmarked)
        setIsBookmarked(!isBookmarked);
        const nowBookmarkedState = !isBookmarked;//эта переменная нужна, т.к. state не обновляется мгновенна и путает данные
        // console.log("nowBookmarkedState: ", nowBookmarkedState)
        if (nowBookmarkedState) {
            //записать метку bookmarked в БД:
            // console.log("setting isBookmarked");
            const msg = {
                destination: null, type: "BOOKMARKED", value: null, subject: null,
                fromId: user.id, toId: interlocutorId,
            };
            // console.log("api.post(`${urls.messages}`, msg)");
            api.post(`${urls.messages}`, msg).then(() => {
            });
        }

        if (!nowBookmarkedState) {// удалить из базы нотификейшн о том, что этот кандидат ранее был лайкнут текущим ющером
            // console.log("in  if (!nowBookmarkedState)");
            // console.log(" api.delete(`${urls.likesAndBookmarks}");
            api.delete(`${urls.likesAndBookmarks}?type=BOOKMARKED&fromId=${user.id}&toId=${interlocutorId}`).then(data => {
                // console.log("isBookmarked must be deleted!");
            }).catch(() => {
                // console.log("not found an isLiked notification to delete!")
            });
        }

    }


    const paragraphStyle = {fontSize: '12px', fontWeight: '500', margin: '5px', cursor: 'pointer'}
    const bookMarkActionText = isBookmarked ? 'Удалить из избранного' : 'Добавить в избранное';






    return (
        <div>
            <Popover
                id={id}
                open={open}
                anchorEl={contextEl}
                onClose={contextMenuCloseHandler}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Paper elevation={12}
                       sx={{display: 'flex', flexFlow: 'column noWrap', padding: '10px', borderRadius: '10px'}}>
                    {/*<p style={paragraphStyle} onClick={()=>{}}>Смотреть профайл</p>*/}
                    <p style={{...paragraphStyle, color: 'blue'}}>
                        <VisibilityIcon/>
                        <NavLink href={`${urls.queriedCandidateProfile}${interlocutorId}`}>Смотреть профайл</NavLink>
                    </p>
                    <p style={paragraphStyle} onClick={bookmarkHandler}>
                        <BookmarkAddIcon sx={{color: `${isBookmarked ? 'green' : ""}`}}/>
                        {bookMarkActionText}</p>

                    <p style={{...paragraphStyle, color: 'darkred'}} onClick={blockInterlocutorHideCorrespondenceForAll}><RemoveCircleIcon/>
                        <span style={{color: '#000'}}>Заблокировать. Переписку скрыть от всех. (восстановимо)</span></p>

                    <p style={{...paragraphStyle, color: 'darkred'}} onClick={blockInterlocutorLeaveCorrespondenceForAll}><RemoveCircleIcon/>
                        <span style={{color: '#000'}}>Заблокировать. Переписку оставить для всех. (восстановимо)</span></p>

                    <p style={{...paragraphStyle, color: 'darkred'}} onClick={blockInterlocutorLeaveCorrespondenceForRecipient}><RemoveCircleIcon/>
                        <span style={{color: '#000'}}>Заблокировать. Переписку оставить только для себя. (восстановимо)</span></p>

                    <p style={{...paragraphStyle, color: 'darkred'}} onClick={blockInterlocutorDeleteAllCorrespondence}><RemoveCircleIcon/>
                        <span style={{color: '#000'}}>Заблокировать. Переписку удалить навсегда.(необратимо)</span></p>

                    <p style={{...paragraphStyle, color: 'darkred'}} onClick={unBlockInterlocutorAndShowCorrespondence}><RemoveCircleIcon/>
                        <span style={{color: '#000'}}>Разблокировать собеседника и восстановить сокрытую переписку (удаленная не восстановима)</span></p>

                    <p style={{...paragraphStyle, color: 'red'}} onClick={hideCorrespondenceForRecipient}>
                        <PersonAddDisabledIcon/>
                        <span style={{color: '#000'}}>Скрыть собеседника и переписку только у меня. (скрытая переписка восстановима)</span></p>


                    <p style={{...paragraphStyle, color: 'red'}} onClick={hideCorrespondenceForInterlocutor}>
                        <PersonAddDisabledIcon/>
                        <span style={{color: '#000'}}>Скрыть переписку только для собеседника. (восстановимо)</span></p>

                    <p style={{...paragraphStyle, color: 'red'}} onClick={hideCorrespondenceForAll}>
                        <PersonAddDisabledIcon/>
                        <span style={{color: '#000'}}>Скрыть переписку для всех. (восстановимо)</span></p>

                    <p style={{...paragraphStyle, color: 'red'}} onClick={deleteCorrespondenceFromDB}>
                        <PersonAddDisabledIcon/>
                        <span style={{color: '#000'}}>Навсегда удалить переписку у всех (необратимо)</span></p>
                </Paper>
            </Popover>
        </div>
    );
};

export default InterlocutorContextMenu;