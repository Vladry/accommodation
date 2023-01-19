const activeInterlocutor = state => state.datingChatData.activeInterlocutor;
const previousActiveInterlocutor = state => state.datingChatData.previousActiveInterlocutor;

const datingMessages = state => state.datingChatData.datingMessages;
const receivedMessages = state => state.datingChatData.receivedMessages;
const sendMessageNotification = state => state.datingChatData.sendMessageNotification;
const unseenReceivedMessages = state => state.datingChatData.unseenReceivedMessages;

const sentMessages = state => state.datingChatData.sentMessages;
const allMessages = state => state.datingChatData.allMessages;
const newDatingChatMessage = state => state.datingChatData.newDatingChatMessage;

const datingNotifications = state => state.datingChatData.datingNotifications;
const datingLikedNotifications = state => state.datingChatData.datingLikedNotifications;
const allowedInterlocutorsData = state => state.datingChatData.allowedInterlocutorsData;

export default {
    activeInterlocutor,
    previousActiveInterlocutor,

    datingMessages,

    receivedMessages,
    sendMessageNotification,
    unseenReceivedMessages,
    sentMessages,
    allMessages,
    newDatingChatMessage,

    datingNotifications,
    datingLikedNotifications,
    allowedInterlocutorsData,

}
