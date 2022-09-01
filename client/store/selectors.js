const user = state => state.userData.user;
const loading = state => state.userData.loading;
const loadingMatchingCandidatesIds = state => state.userData.loadingMatchingCandidatesIds;
const userDatingProfile = state=> state.userData.userDatingProfile;
const accommodationUserProfile = state=> state.userData.accommodationUserProfile;
const tenantUserProfile = state=> state.userData.tenantUserProfile;
const candidateDatingProfile = state=> state.userData.candidateDatingProfile;
const matchingCandidatesIds = state=> state.userData.matchingCandidatesIds;
const isCurrUserRegisteredInDating = state=> state.userData.isCurrUserRegisteredInDating;

export default {
    user,
    loadingMatchingCandidatesIds,
    userDatingProfile,
    accommodationUserProfile,
    tenantUserProfile,
    candidateDatingProfile,
    matchingCandidatesIds,
    isCurrUserRegisteredInDating,
};