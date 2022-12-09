import * as datingChatActions from './index';
import {ACTIONS} from './index';

const init = {
    allowedInterlocutorsData: [
        {
            userId: 1,
            avatar: 'https://res.cloudinary.com/vladry/image/upload/v1628868305/avatars/Ira_yvvlml.png',
            nick: 'Bob',
        },
        {
            userId: 2,
            avatar: 'https://res.cloudinary.com/vladry/image/upload/v1628868305/avatars/Tanya_mi0o0m.png',
            nick: 'Martin',
        },
        {
            userId: 3,
            avatar: 'https://res.cloudinary.com/vladry/image/upload/v1628498610/vlad_shrunk/cat2_x0yqxm.jpg',
            nick: 'Ozzy',
        },
    ],
    blackListedInterlocutorsIds: [3],
    activeInterlocutor: 0,
    receivedMessages: [
        {
            fromUserId: 1,
            toUserId: 19,
            chat: 'dating',
            msg: 'hi, its me Bob!',
            timestampCreated: 1,
            timestampUpdated: 0
        },
        {
            fromUserId: 1,
            toUserId: 19,
            chat: 'dating',
            msg: 'how are you?',
            timestampCreated: 2,
            timestampUpdated: 0
        },
        {
            fromUserId: 2,
            toUserId: 19,
            chat: 'dating',
            msg: 'hi, its Martin, how are you?',
            timestampCreated: 0,
            timestampUpdated: 0
        },
        {
            fromUserId: 3,
            toUserId: 19,
            chat: 'dating',
            msg: 'hi, its Ozzy, are you tired of me?',
            timestampCreated: 0,
            timestampUpdated: 0
        }
    ],
    sentMessages: []
}


const messageExample = {
    fromUserId: 0,
    toUserId: 0,
    chat: 'dating',
    msg: '',
    timestampCreated: 0,
    timestampUpdated: 0
}

const reducer = (state = init, {type, payload}) => {
    switch (type) {

        case String(ACTIONS.setActiveInterlocutor):
            return {
                ...state,
                activeInterlocutor: payload
            };

        default:
            return state;
    }
}

export default reducer;