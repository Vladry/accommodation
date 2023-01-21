import {ACTIONS, ACTIONS_Cust} from './index';
import api from "../../lib/API";
import urls from "../../../src/main/resources/urls.json";
import context from '@/root/contextValues.js';
import types from "@/store/datingChats/types";
import {shallowEqual, useSelector} from "react-redux";
import selDatingChats from "@/store/datingChats/selectors";


const messageExample = {
    fromId: 0,
    toId: 0,
    chat: 'dating',
    value: '',
    subject: '',
    createdDate: 0,
    lastModifiedDate: 0,
    seen: false,
    hiddenForSender: false,
    hiddenForRecipient: false,
    deleted: false
}
const chatSettings = {
    chatType: 'DATING',
    lastActiveChatUserId: 1,
    blockedInterlocutorsIds: [3],
    mutedInterlocutorsIds: [3],
    notificationSound: true,
    favoritesUserIds: [1],
    keepMediaFilesDays: 10,
    localMediaFilesFolder: 'C:\\Users\\dating',
    photoSentQuality: 250,
}

const chatSettingsInit = {
    chatType: 'DATING',
    lastActiveChatUserId: 0,
    blockedInterlocutorsIds: [],
    mutedInterlocutorsIds: [],
    notificationSound: true,
    favoritesUserIds: [],
    keepMediaFilesDays: 10,
    localMediaFilesFolder: 'C:\\Users\\dating',
    photoSentQuality: 250,
}

const init = {
    allowedInterlocutorsData: [],
    activeInterlocutor: 0,
    receivedMessages: [],
    sentMessages: [],
    newDatingChatMessage: {},

    sendMessageNotification: [],
    unseenReceivedMessages: [],
    datingMessages: [],
    datingNotifications: [],
    datingLikedNotifications: [],

    chatSettings: chatSettingsInit
}


const reducer = (state = init, {type, payload}) => {
    switch (type) {


        case String(ACTIONS.blockThisInterlocutor): {
            const notBlacklistedInterlocutors = state.allowedInterlocutorsData.filter(interlocutor => interlocutor.userId !== payload);
            const blacklistedInterlocutors = state.allowedInterlocutorsData.filter(interlocutor => interlocutor.userId === payload);
            blacklistedInterlocutors.map(interlocutor => {
                interlocutor.blacklisted = true;
                return interlocutor;
            })
            return {
                ...state, allowedInterlocutorsData: [...notBlacklistedInterlocutors, ...blacklistedInterlocutors],
                receivedMessages: [], sentMessages: [], activeInterlocutor: 0
            }
        }

        case String(ACTIONS.removeInterlocutorFromStore): {
            const newAllowedInterlocutorsData = state.allowedInterlocutorsData.filter(interlocutor => interlocutor.userId !== payload);
            return {
                ...state, allowedInterlocutorsData: newAllowedInterlocutorsData, receivedMessages: [], sentMessages: [], activeInterlocutor: 0
            }
        }

        case String(ACTIONS.getChatSettings.success):
            return {
                ...state,
                chatSettings: payload
            };

        case String(ACTIONS.setInterlocutors):
            return {
                ...state,
                allowedInterlocutorsData: payload
            };

        case String(ACTIONS.setActiveInterlocutor): {
            return {
                ...state,
                activeInterlocutor: payload
            };
        }


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