import React, {useEffect, useState} from 'react';
import Popover from '@mui/material/Popover';
import {Paper} from "@mui/material";

import sel from '@/store/user/selectors';
import {useSelector} from "react-redux";
import api from "@/root/lib/API";
import urls from "../../../../src/main/resources/urls.json";
import {NavLink} from "@/components/appbar/NavLink";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import classes from "./contextMenu.module.scss";
import {v4 as uuidv4} from 'uuid';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import datingMenuClasses from '../../dating_components/datingMenuItems/datingMenu.module.scss';

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
    const HidingContextMenuHandler = () => {
        setIsHidingOptionsActive((val) => !val)
    }

    const blockInterlocutorHideCorrespondenceForAll = () => {
        // BLOCKED_CORR_HIDDEN_FOR_ALL
        console.log("blockInterlocutorHideCorrespondenceForAll");
        console.log("interlocutorId: ", interlocutorId, "user.id: ", user.id);
        api.put(`${urls.blockInterlocutorHideCorrespondenceForAll}?chat=datingChatStatus&fromId=${interlocutorId}&toId=${user.id}`).then();
    };
    const blockInterlocutorLeaveCorrespondenceForAll = () => {
        // BLOCKED_CORRESPONDENCE_AVAILABLE_FOR_ALL
        console.log("blockInterlocutorLeaveCorrespondenceForAll");
        api.put(`${urls.blockInterlocutorLeaveCorrespondenceForAll}?chat=datingChatStatus&fromId=${interlocutorId}&toId=${user.id}`).then();
    };
    const blockInterlocutorLeaveCorrespondenceForRecipient = () => {
        // BLOCKED_CORRESPONDENCE_AVAILABLE_FOR_RECIPIENT
        console.log("blockInterlocutorLeaveCorrespondenceForRecipient");
        api.put(`${urls.blockInterlocutorLeaveCorrespondenceForRecipient}?chat=datingChatStatus&fromId=${interlocutorId}&toId=${user.id}`).then();
    };
    const blockInterlocutorDeleteAllCorrespondence = () => {
        // BLOCKED_CORRESPONDENCE_DELETED
        console.log("blockInterlocutorDeleteAllCorrespondence");
        api.put(`${urls.blockInterlocutorDeleteAllCorrespondence}?chat=datingChatStatus&fromId=${interlocutorId}&toId=${user.id}`).then();
    };
    const unBlockInterlocutorAndShowCorrespondence = () => {//TODO перенести на соответствующую сервисную страницу приложения
        // UNBLOCKED
        console.log("unBlockInterlocutorAndShowCorrespondence");
        api.put(`${urls.unBlockInterlocutorAndShowCorrespondence}?chat=datingChatStatus&fromId=${interlocutorId}&toId=${user.id}`).then();
    };

    const hideCorrespondenceForRecipient = () => {
        // UNBLOCKED_CORRESPONDENCE_HIDDEN_FOR_RECIPIENT
        console.log("hideCorrespondenceForRecipient");
        api.put(`${urls.hideCorrespondenceForRecipient}?chat=datingChatStatus&fromId=${interlocutorId}&toId=${user.id}`).then();
    };
    const hideCorrespondenceForInterlocutor = () => {
        // UNBLOCKED_CORRESPONDENCE_HIDDEN_FOR_INTERLOCUTOR
        console.log("hideCorrespondenceForInterlocutor");
        api.put(`${urls.hideCorrespondenceForInterlocutor}?chat=datingChatStatus&fromId=${interlocutorId}&toId=${user.id}`).then();
    };
    const hideCorrespondenceForAll = () => {
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


    const blockingOptions = {
        blockInterlocutorHideCorrespondenceForAll,
        blockInterlocutorLeaveCorrespondenceForAll,
        blockInterlocutorLeaveCorrespondenceForRecipient,
        blockInterlocutorDeleteAllCorrespondence,
        unBlockInterlocutorAndShowCorrespondence,
        paragraphStyle
    }
    const hidingOptions = {
        hideCorrespondenceForRecipient,
        hideCorrespondenceForInterlocutor,
        hideCorrespondenceForAll,
        HidingContextMenuHandler,
        paragraphStyle
    };


    /*** секция из рекурсивного меню: ***/
    const menuLinks = [

        {
            label: <p><RemoveCircleIcon className={`${datingMenuClasses['menu-icons']}  ${classes['warning']}`}/> Заблокировать</p>,
            value: [
                {
                    label: <p onClick={blockInterlocutorHideCorrespondenceForAll}>
                        <RemoveCircleIcon className={`${datingMenuClasses['menu-icons']} ${classes['danger']}`}/>
                        Заблокировать. Переписку скрыть от всех. (восстановимо)</p>,
                    value: null
                },

                {
                    label: <p onClick={blockInterlocutorLeaveCorrespondenceForAll}>
                        <RemoveCircleIcon className={`${datingMenuClasses['menu-icons']} ${classes['danger']}`}/>
                        Заблокировать. Переписку оставить для всех. (восстановимо)</p>,
                    value: null
                },

                {
                    label: <p onClick={blockInterlocutorLeaveCorrespondenceForRecipient}>
                        <RemoveCircleIcon className={`${datingMenuClasses['menu-icons']} ${classes['danger']}`}/>
                        Заблокировать (восстановимо), Переписку оставить только для себя.</p>,
                    value: null
                },
                {
                    label: <p onClick={blockInterlocutorDeleteAllCorrespondence}>
                        <RemoveCircleIcon className={`${datingMenuClasses['menu-icons']} ${classes['danger']}`}/>
                        Заблокировать. Переписку удалить навсегда.(необратимо)</p>,
                    value: null
                }, {
                    label: <p onClick={unBlockInterlocutorAndShowCorrespondence}>
                        <RemoveCircleIcon className={`${datingMenuClasses['menu-icons']} ${classes['danger']}`}/>
                        Разблокировать собеседника и восстановить сокрытую переписку (удаленная не восстановима)</p>,
                    value: null
                },
            ]
        },

        {
            label: <p><SpeakerNotesOffIcon className={`${datingMenuClasses['menu-icons']}  ${classes['warning']}`}/> Сокрыть сообщения</p>,

            value: [
                {
                    label: <p>
                        <VisibilityOffIcon className={`${datingMenuClasses['menu-icons']} ${classes['danger']}`}/>
                        <span>Скрыть собеседника и переписку только у меня. (скрытая переписка восстановима)</span></p>,
                    value: null
                },

                {
                    label: <p onClick={hideCorrespondenceForInterlocutor}>
                        <VisibilityOffIcon className={`${datingMenuClasses['menu-icons']} ${classes['danger']}`}/>
                        <span>Скрыть переписку только для собеседника. (восстановимо)</span></p>,
                    value: null
                },

                {
                    label: <p onClick={hideCorrespondenceForAll}>
                        <VisibilityOffIcon className={`${datingMenuClasses['menu-icons']} ${classes['danger']}`}/>
                        <span>Скрыть переписку для всех. (восстановимо)</span></p>,
                    value: null
                }
            ]
        },

        //дальше могут следовать многоуровневые рекурсивные элементы меню любой вложенности:
        /*        {
                    label: "Second",
                    value: [
                        {
                            label: "Nested first",
                            value: "nestedFirst"
                        },
                        {
                            label: "Nested second",
                            value: [
                                {
                                    label: "Nested third",
                                    value: "nestedThird"
                                }
                            ]
                        }
                    ]
                }*/
    ];

    const mapLink = (link) => {
        if (Array.isArray(link.value)) {
            return (
                <li key={link.value} className={`${classes['menuItemClass']}  ${classes['dropdown']}`}>
                    {link.label}
                    <ul className={classes['submenu']}>{link.value.map(mapLink)}</ul>
                </li>
            );
        }

        return (
            <li key={uuidv4()} className={classes['menuItemClass']}>
                <p>{link.label}</p>
            </li>
        );
    };


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
                PaperProps={{ // тут задаются размеры для Popover
                    // style: {width: '55%'},
                }}
            >
                <Paper elevation={2}>
                    <ul style={{display: 'flex', flexFlow: 'column noWrap', justifyContent: 'center', alignItems: 'start', padding: '10px', borderRadius: '10px'}}
                        className={classes['menu']}>
                        <li className={classes['menuItemClass']}>
                            <VisibilityIcon className={datingMenuClasses['menu-icons']}/>
                            <p><NavLink href={`${urls.queriedCandidateProfile}${interlocutorId}`}>Смотреть
                                профайл</NavLink></p>
                        </li>
                        <li className={classes['menuItemClass']} onClick={bookmarkHandler}>
                            <BookmarkAddIcon className={datingMenuClasses['menu-icons']} sx={{color: `${isBookmarked ? 'green' : ""}`}}/>
                            <p>{bookMarkActionText}</p>
                        </li>
                        <li className={classes['menuItemClass']} onClick={deleteCorrespondenceFromDB}>
                            <PersonOffIcon  style={{color: 'red'}} className={datingMenuClasses['menu-icons']}/>
                            <p>/Удалить навсегда</p>
                        </li>
                        {menuLinks.map(mapLink)}
                    </ul>
                </Paper>
            </Popover>
        </div>
    )
        ;
};

export default InterlocutorContextMenu;