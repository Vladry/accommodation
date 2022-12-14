import api from '../../lib/API';
import urls from '../../../src/main/resources/urls';
import {createActions} from '../actionsCreator.js';

// TODO  createActions - впринципе наххрен не нужны, это подкапотный механизм redux-toolkit. Надо разобраться с тулкитом и не использовать эти createActions
const actions = createActions(
    {
        actionTypes: [
            "SET_ACTIVE_INTERLOCUTOR", "SET_ALL_MESSAGES", "SEND_NEW_MESSAGE", "ADD_ALL_MESSAGES", "ADD_RECEIVED_MESSAGES",
            "ADD_SEND_MESSAGE_NOTIFICATION", "SET_UNSEEN_MESSAGES"],

        asyncTypes: ["GET_UNSEEN_MESSAGES"],
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


export const ACTIONS_Cust = {
    getUnseenMessages,
}


