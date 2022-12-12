import {ACTIONS} from './index';
import api from "../../lib/API";
import urls from "../../../src/main/resources/urls.json";
import context from '@/root/contextValues.js';
import types from "@/store/datingChats/types";

const chatSettings = {
    lastActiveChatUserId: 1,
    blackListedInterlocutorsIds: [3],
    favoritesUserIds: [],
    keepMediaFilesDays: 10,
    localMediaFilesFolder: 'C:\\Users\\dating',
    notificationSound: true,
    photoSentQuality: 250,
}

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
        {
            userId: 19,
            avatar: 'https://res.cloudinary.com/vladry/image/upload/v1628498610/vlad_shrunk/cat2_x0yqxm.jpg',
            nick: 'Vlad',
        },
        {
            userId: 20,
            avatar: 'https://res.cloudinary.com/vladry/image/upload/v1628498610/vlad_shrunk/cat2_x0yqxm.jpg',
            nick: 'Sender',
        },
    ],
    activeInterlocutor: 1,
    receivedMessages: [
        {
            fromId: 1,
            toId: 19,
            chat: 'dating',
            value: 'hi, its me Bob!',
            timestampCreated: new Date(2022,  8, 1, 18, 43).getTime(),
            timestampUpdated: 0
        },
        {
            fromId: 1,
            toId: 19,
            chat: 'dating',
            value: 'how are you?',
            timestampCreated:  new Date(2022,  10, 3, 20, 36).getTime(),
            timestampUpdated: new Date(2022,  10, 3, 20, 38).getTime(),
        },
        {
            fromId: 1,
            toId: 19,
            chat: 'dating',
            value: 'any plans for the weekends?',
            timestampCreated:  new Date(2022,  11, 3, 9, 20).getTime(),
            timestampUpdated: new Date(2022,  11, 4, 13, 43).getTime(),
        },
        {
            fromId: 2,
            toId: 19,
            chat: 'dating',
            value: 'hi, its Martin, how are you?',
            timestampCreated: 0,
            timestampUpdated: 0
        },
        {
            fromId: 3,
            toId: 19,
            chat: 'dating',
            value: 'hi, its Ozzy, are you tired of me?',
            timestampCreated: 0,
            timestampUpdated: 0
        }
    ],
    sentMessages: [
        {
            fromId: 19,
            toId: 1,
            chat: 'dating',
            value: 'hi, Bob!',
            timestampCreated:  new Date(2022,  9, 2, 13, 5).getTime(),
            timestampUpdated: 0
        },
        {
            fromId: 19,
            toId: 1,
            chat: 'dating',
            value: 'I am not bad, bro!',
            timestampCreated:  new Date(2022,  11, 4, 5, 20).getTime(),
            timestampUpdated: 0
        },
        {
            fromId: 19,
            toId: 1,
            chat: 'dating',
            value: 'Not really!',
            timestampCreated:  new Date(2022,  11, 4, 20, 40).getTime(),
            timestampUpdated: 0
        },
    ],
    allMessages: [],
    newDatingChatMessage: {},

    datingMessages: [],
    datingNotifications: [],
    datingLikedNotifications: [],

    chatSettings: chatSettings
}


const messageExample = {
    fromId: 0,
    toId: 0,
    chat: 'dating',
    value: '',
    subject: '',
    seen: false,
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

        case String(ACTIONS.setAllMessages):
            return {
                ...state,
                allMessages: payload
            };

            case String(ACTIONS.addDatingMessage):
                console.log("in ACTIONS.addDatingMessage reducer, payload: ", payload)
            return {
                ...state,
                allMessages: [...state.allMessages, payload]
            };

        case String(ACTIONS.sendNewMessage):
            const message = payload.msg;
            api.post(`${urls.messages}`, message).then(() => {});
            context.stompNotifier(payload);
            return {
                ...state,
                newDatingChatMessage: payload
            };



        case types.SET_DATING_MESSAGES:
            return {...state, datingMessages: payload};

        case types.SET_DATING_NOTIFICATIONS:
            console.log("in case datingChatsTypes.SET_DATING_NOTIFICATIONS:")
            console.log("payload: ", payload)
            return {...state, datingNotifications: {...state.datingNotifications, payload}};


        case types.SET_DATING_LIKED_NOTIFICATIONS:
            console.log("in case datingChatsTypes.SET_DATING_LIKED_NOTIFICATIONS:")
            console.log("payload: ", payload)
            return {...state, datingLikedNotifications: [...state.datingLikedNotifications, payload] };

        case types.SET_DATING_UNLIKED_NOTIFICATIONS:
            console.log("in case datingChatsTypes.SET_DATING_UNLIKED_NOTIFICATIONS:")
            console.log("payload: ", payload)
            let remainingLikedNotif = [...state.datingLikedNotifications];
            remainingLikedNotif = remainingLikedNotif.filter(notif=>
                !(notif.fromId.toString() === payload.fromId.toString()
                && notif.toId.toString() === payload.toId.toString()));
            return {...state, datingLikedNotifications: [...remainingLikedNotif, payload] };



        default:
            return state;
    }
}

export default reducer;