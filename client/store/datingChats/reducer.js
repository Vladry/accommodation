import {ACTIONS, ACTIONS_Cust} from './index';
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
    receivedMessages: [],
    sentMessages: [],
    newDatingChatMessage: {},

    sendMessageNotification: [],
    unseenReceivedMessages: [],
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
    createdDate: 0,
    lastModifiedDate: 0
}


const reducer = (state = init, {type, payload}) => {
    switch (type) {

        case String(ACTIONS.setActiveInterlocutor):
            return {
                ...state,
                activeInterlocutor: payload
            };

        /*            case String(ACTIONS.addReceivedMessages):
                    return {
                        ...state,
                        receivedMessages: [...state.receivedMessages, payload]
                    };*/

        case String(ACTIONS.addSendMessageNotification):
            return {
                ...state,
                sendMessageNotification: [...state.sendMessageNotification, payload.notification]
            };


        case String(ACTIONS.getReceivedMessages.success):
            return {
                ...state,
                receivedMessages: payload
            };

        case String(ACTIONS.getSentMessages.success):
            return {
                ...state,
                sentMessages: payload
            };

        case String(ACTIONS.getUnseenMessages.success):
            return {
                ...state,
                unseenReceivedMessages: payload
            };


        case String(ACTIONS_Cust.sendNewMessage):
            return {
                ...state
            };

        // case String(ACTIONS_Cust.setMessagesAsSeen):
        //     return {
        //         ...state
        //     };


        case types.SET_DATING_MESSAGES:
            return {...state, datingMessages: payload};

        case types.SET_DATING_NOTIFICATIONS:
            return {...state};


        case types.SET_DATING_LIKED_NOTIFICATIONS:
            console.log("case types.SET_DATING_LIKED_NOTIFICATIONS:, payload: ", payload);
            return {...state, datingLikedNotifications: payload};

        case types.ADD_DATING_LIKED_NOTIFICATIONS:
            return {...state, datingLikedNotifications: [...state.datingLikedNotifications, payload]};

        case types.ADD_DATING_UNLIKED_NOTIFICATIONS:
            let remainingLikedNotif = [...state.datingLikedNotifications];
            remainingLikedNotif = remainingLikedNotif.filter(notif =>
                !(notif.fromId.toString() === payload.fromId.toString()
                    && notif.toId.toString() === payload.toId.toString()));
            return {...state, datingLikedNotifications: [...remainingLikedNotif, payload]};


        default:
            return state;
    }
}

export default reducer;