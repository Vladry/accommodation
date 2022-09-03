const user = state => state.userData.user;
const loading = state => state.userData.loading;
const loadingMatchingCandidatesIds = state => state.userData.loadingMatchingCandidatesIds;
const userDatingProfile = state=> state.userData.userDatingProfile;
const accommodationUserProfile = state=> state.userData.accommodationUserProfile;
const isCurrUserHasAccommodationProfile = state=>state.userData.isCurrUserHasAccommodationProfile;
const tenantUserProfile = state=> state.userData.tenantUserProfile;
const isCurrUserHasTenantProfile = state=>state.userData.isCurrUserHasTenantProfile;
const candidateDatingProfile = state=> state.userData.candidateDatingProfile;
const isCurrUserHasDatingProfile = state=> state.userData.isCurrUserHasDatingProfile;
const matchingCandidatesIds = state=> state.userData.matchingCandidatesIds;

export default {
    user,
    loading,
    loadingMatchingCandidatesIds,
    userDatingProfile,
    accommodationUserProfile,
    isCurrUserHasAccommodationProfile,
    tenantUserProfile,
    isCurrUserHasTenantProfile,
    candidateDatingProfile,
    isCurrUserHasDatingProfile,
    matchingCandidatesIds,
};