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
            timestampCreated: new Date(2022,  8, 1, 18, 43).getTime(),
            timestampUpdated: 0
        },
        {
            fromUserId: 1,
            toUserId: 19,
            chat: 'dating',
            msg: 'how are you?',
            timestampCreated:  new Date(2022,  10, 3, 20, 36).getTime(),
            timestampUpdated: 0
        },
        {
            fromUserId: 1,
            toUserId: 19,
            chat: 'dating',
            msg: 'any plans for the weekends?',
            timestampCreated:  new Date(2022,  11, 4, 9, 20).getTime(),
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
    sentMessages: [
        {
            fromUserId: 19,
            toUserId: 1,
            chat: 'dating',
            msg: 'hi, Bob!',
            timestampCreated:  new Date(2022,  9, 2, 13, 5).getTime(),
            timestampUpdated: 0
        },
        {
            fromUserId: 19,
            toUserId: 1,
            chat: 'dating',
            msg: 'I am not bad, bro!',
            timestampCreated:  new Date(2022,  11, 4, 5, 20).getTime(),
            timestampUpdated: 0
        },
        {
            fromUserId: 19,
            toUserId: 1,
            chat: 'dating',
            msg: 'Not really!',
            timestampCreated:  new Date(2022,  11, 4, 20, 40).getTime(),
            timestampUpdated: 0
        },
    ]
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