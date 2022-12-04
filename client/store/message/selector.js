const getCurrentChat = state => {
    if (state) {
        const data = JSON.parse(JSON.stringify(state.messageData));
        const isChatSelected = data.activeId !== -1;
        return isChatSelected ? data.chats.find(v => v.id === data.activeId) : {};
    }
};

const getMessageData = state => {
    if (state) {
        const data = JSON.parse(JSON.stringify(state.messageData));
        const isChatSelected = data.activeId !== -1;

        return {
            isNavigationLoading: data.navigationLoading,
            isDetailLoading: data.detailLoading,
            searchUserLoading: data.searchUserLoading,
            chats: data.chats,
            foundUsers: data.foundUsers,
            chatData: data.chatData,
            activeId: data.activeId,
            isChatSelected,
            isChatInfo: data.isChatInfo,
            message: data.message,
            showHeaderAvatar: data.showHeaderAvatar
        }
    }
};

export default {
    getCurrentChat,
    getMessageData
}
