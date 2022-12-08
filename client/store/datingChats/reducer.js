import * as datingChatActions from './index';

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
    blackListedInterlocutorsIds: [],
    receivedMessages: [],
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
        case String(datingChatActions.someAct):
            return {
                ...state,
            };

        default:
            return state;
    }
}

export default reducer;