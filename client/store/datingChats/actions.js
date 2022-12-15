import api from '../../lib/API';
import urls from '../../../src/main/resources/urls';
import {createActions} from '../actionsCreator.js';
import context from "@/root/contextValues";

// TODO  createActions - впринципе наххрен не нужны, это подкапотный механизм redux-toolkit. Надо разобраться с тулкитом и не использовать эти createActions
const actions = createActions(
    {
        actionTypes: [
            "SET_ACTIVE_INTERLOCUTOR", "SET_ALL_MESSAGES",  "ADD_ALL_MESSAGES", "ADD_RECEIVED_MESSAGES",
            "ADD_SEND_MESSAGE_NOTIFICATION", "SET_UNSEEN_MESSAGES",


        ],

        asyncTypes: ["GET_UNSEEN_MESSAGES", "GET_RECEIVED_MESSAGES", "GET_SENT_MESSAGES", "SEND_NEW_MESSAGE", "SET_MESSAGES_AS_SEEN"],
    },
    {
        prefix: 'datingChats',
    }
);

export const ACTIONS = {
    ...actions.actions,
    ...actions.asyncActions,
}

const getUnseenMessages = (id) => async dispatch => {
    try {
        dispatch(ACTIONS.getUnseenMessages.request());
        const unseen = await api.get(`${urls.unseenMessages}${id}?chat=dating`).then();
        dispatch(ACTIONS.getUnseenMessages.success(unseen));
    } catch (e) {
        dispatch(ACTIONS.getUnseenMessages.fail());
        console.log(e.message);
    }
};

const getReceivedMessages = ({fromId, toId}) => async dispatch => {
    try {
        dispatch(ACTIONS.getReceivedMessages.request());
        const received = await
        api.get( `${urls.chatMessages}?chat=dating&fromId=${fromId}&toId=${toId}`).then();
        dispatch(ACTIONS.getReceivedMessages.success(received));
    } catch (e) {
        dispatch(ACTIONS.getReceivedMessages.fail());
        console.log(e.message);
    }
};


const getSentMessages = ({fromId, toId}) => async dispatch => {
    // console.log("in getSentMessages, fromId: ", fromId, ", toId: ", toId)
    try {
        dispatch(ACTIONS.getSentMessages.request());
        const sent = await
            api.get( `${urls.chatMessages}?chat=dating&fromId=${toId}&toId=${fromId}`).then();
        dispatch(ACTIONS.getSentMessages.success(sent));
    } catch (e) {
        dispatch(ACTIONS.getSentMessages.fail());
        console.log(e.message);
    }
};

const sendNewMessage = (payload)=> async dispatch=> {
    const message = payload.msg;
    const counterparts =  payload.counterparts;
    try {
        api.post(`${urls.messages}`, message).then(() => {
        });
        context.stompNotifier(payload);
        dispatch(ACTIONS_Cust.getSentMessages(counterparts));
    } catch (e) {
        console.log("new message could not be sent to DB, ", e.message)
    }

};

const setMessagesAsSeen = ({fromId, toId})=> async dispatch=> {
    // console.log("payload activeInterlocutor: ", fromId)
    // console.log("payload userId: ", toId)
    try {
        api.put(`${urls.msgSetToSeen}/${fromId}/${toId}`).then(() => {
        });
        dispatch(ACTIONS_Cust.getUnseenMessages(toId));
    } catch (e) {
        console.log("action: setMessagesAsSeen(), ", e.message)
    }

};


export const ACTIONS_Cust = {
    getUnseenMessages,
    getReceivedMessages,
    getSentMessages,
    sendNewMessage,
    setMessagesAsSeen
}


