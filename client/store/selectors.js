const user = state => state.userData.user;
const loading = state => state.userData.loading;
const loadingMatchingCandidatesIds = state => state.userData.loadingMatchingCandidatesIds;
const userDatingProfile = state => state.userData.userDatingProfile;
const userDatingProfileData = state => state.userData.userDatingProfile.data;
const loadingUserDatingProfile = state => state.userData.loadingUserDatingProfile;
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

export default {
    user,
    loading,
    loadingMatchingCandidatesIds,
    userDatingProfile,
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
};