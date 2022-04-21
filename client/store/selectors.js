import navReducer from "./reducers/navReducer";

const getCurrentSection = state=> state.navigationData.currentSection;

export default {
    getCurrentSection,
};