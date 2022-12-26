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
import urls from "../../../src/main/resources/urls.json";
import destinations from "../../../src/main/resources/destinations.json";
import {NavLink} from "@/components/appbar/NavLink";
import {NavLink_styled} from "@/utils/typography";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";

const InterlocutorContextMenu = ({contextEl, contextMenuCloseHandler}) => {
    // https://mui.com/material-ui/react-popover/#anchor-playground
    const open = !!contextEl;
    const id = open ? 'context-menu-popover' : undefined;

    const user = useSelector(sel.user);
    const activeInterlocutor = useSelector(selDatingChats.activeInterlocutor);


    let isBlocked = false;
    useEffect(() => {//здесь получаем состояния isBookMarked, isBlocked
        if(!user?.id || !activeInterlocutor) return;
// проверяем isBlocked
        console.log("in interlocutorContextMenu  useEffect.  activeInterlocutor: ", activeInterlocutor)

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
        api.get(`${urls.likesAndBookmarks}?type=BOOKMARKED&fromId=${user.id}&toId=${activeInterlocutor}`)
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
    }, [user, activeInterlocutor])



    const [isBookmarked, setIsBookmarked] = useState(false);
    const bookmarkHandler = () => { //TODO объединить с bookmarkHandler в файле CandidateProfile.js
        console.log("in bookmarkHandler, isBookmarked: ", isBookmarked)
        setIsBookmarked(!isBookmarked);
        const nowBookmarkedState = !isBookmarked;//эта переменная нужна, т.к. state не обновляется мгновенна и путает данные
        console.log("nowBookmarkedState: ", nowBookmarkedState)
        if (nowBookmarkedState) {
            //записать метку bookmarked в БД:
            console.log("setting isBookmarked");
            const msg = {
                destination: null, type: "BOOKMARKED", value: null, subject: null,
                fromId: user.id, toId: activeInterlocutor,
            };
            console.log("api.post(`${urls.messages}`, msg)");
            api.post(`${urls.messages}`, msg).then(() => {
            });
            console.log("isBookmarked must be!");
        }

        if (!nowBookmarkedState) {// удалить из базы нотификейшн о том, что этот кандидат ранее был лайкнут текущим ющером
            console.log("in  if (!nowBookmarkedState)");
            console.log(" api.delete(`${urls.likesAndBookmarks}");
            api.delete(`${urls.likesAndBookmarks}?type=BOOKMARKED&fromId=${user.is}&toId=${activeInterlocutor}`).then(data => {
                console.log("isBookmarked must be deleted!");
            }).catch(() => {
                console.log("not found an isLiked notification to delete!")
            });
        }

    }



    const paragraphStyle = {fontSize: '12px', fontWeight: '500', margin: '5px', cursor: 'pointer'}
    const bookMarkActionText = isBookmarked? 'Удалить из избранного' : 'Добавить в избранное';return (
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
                <Paper elevation={12} sx={{display: 'flex', flexFlow: 'column noWrap', padding: '10px', borderRadius: '10px'}}>
                    {/*<p style={paragraphStyle} onClick={()=>{}}>Смотреть профайл</p>*/}
                    <p style={{...paragraphStyle, color: 'blue'}}>
                        <VisibilityIcon/><NavLink href={`${urls.queriedCandidateProfile}${activeInterlocutor}`}>Смотреть
                        профайл</NavLink></p>
                    <p style={paragraphStyle} onClick={bookmarkHandler}>
                        <BookmarkAddIcon sx={{color : `${isBookmarked ? 'green' : ""}` }}/>
                        {bookMarkActionText}</p>
                    <p style={{...paragraphStyle, color: 'darkred'}} onClick={() => {
                    }}><RemoveCircleIcon/><span style={{color: '#000'}}>Заблокировать(возможно восстановить)</span></p>
                    <p style={{...paragraphStyle, color: 'red'}} onClick={() => {
                    }}><PersonAddDisabledIcon/><span style={{color: '#000'}}>Удалить собеседника и переписку</span></p>
                </Paper>
            </Popover>
        </div>
    );
};

export default InterlocutorContextMenu;