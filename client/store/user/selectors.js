const user = state => state.userData.user;
// const userId = state => state.userData.user.id;
const loading = state => state.userData.loading;
const loadingMatchingCandidatesIds = state => state.userData.loadingMatchingCandidatesIds;
const userDatingProfile = state => state.userData.userDatingProfile;
const userDatingProfileData = state => state.userData.userDatingProfile.data;
const loadingUserDatingProfile = state => state.userData.loadingUserDatingProfile;


const datingSearchCriteriaProfile = state => state.userData.datingSearchCriteriaProfile;
const loadingDatingSearchCriteriaProfile = state => state.userData.loadingDatingSearchCriteriaProfile;
const isDatingSearchCriteriaProfile = state => state.userData.isDatingSearchCriteriaProfile;


const accommodationUserProfiles = state => state.userData.accommodationUserProfiles;
const isCurrUserHasAccommodationProfile = state => state.userData.isCurrUserHasAccommodationProfile;
const tenantUserProfile = state => state.userData.tenantUserProfile;
const isCurrUserHasTenantProfile = state => state.userData.isCurrUserHasTenantProfile;
const candidateDatingProfile = state => state.userData.candidateDatingProfile;
const isCurrUserHasDatingProfile = state => state.userData.isCurrUserHasDatingProfile;
const matchingCandidatesIds = state => state.userData.matchingCandidatesIds;
const reviewedUser = state => state.userData.reviewedUser;
const isPhotosFetching = state => state.userData.isPhotosFetching;
const isPaid = state => state.userData.isPaid;
const subscriptions = state => state.userData.subscriptions;
const isUserAppliedHisSubscriptions = state => state.userData.isUserAppliedHisSubscriptions;
const stompClient = state => state.userData.stompClient;
const datingMessages = state => state.userData.datingMessages;
const datingNotifications = state => state.userData.datingNotifications;
const datingMessagesDb = state => state.userData.datingMessagesDb;
const datingNotificationsDb = state => state.userData.datingNotificationsDb;
const datingServiceParticipation = state => {
    if (state.userData.user) {
        return state.userData.user.datingServiceParticipation;
    } else {
        return false;
    }
};

export default {
    user,
    // userId,
    loading,
    loadingMatchingCandidatesIds,
    userDatingProfile,
    datingSearchCriteriaProfile,
    loadingDatingSearchCriteriaProfile,
    isDatingSearchCriteriaProfile,
    userDatingProfileData,
    loadingUserDatingProfile,
    accommodationUserProfiles,
    isCurrUserHasAccommodationProfile,
    tenantUserProfile,
    isCurrUserHasTenantProfile,
    candidateDatingProfile,
    isCurrUserHasDatingProfile,
    matchingCandidatesIds,
    reviewedUser,
    isPhotosFetching,
    isPaid,
    subscriptions,
    isUserAppliedHisSubscriptions,
    stompClient,
    datingMessages,
    datingNotifications,
    datingMessagesDb,
    datingNotificationsDb,
    datingServiceParticipation,
};