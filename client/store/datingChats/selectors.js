const activeInterlocutor = state => state.datingChatData.activeInterlocutor;

const datingMessages = state => state.datingChatData.datingMessages;
const datingNotifications = state => state.datingChatData.datingNotifications;
const datingLikedNotifications = state => state.datingChatData.datingLikedNotifications;
const allowedInterlocutorsData = state => state.datingChatData.allowedInterlocutorsData;

export default {
    activeInterlocutor,

    datingMessages,
    datingNotifications,
    datingLikedNotifications,
    allowedInterlocutorsData,

}
