
const CHANGE_LANGUAGE = "CHANGE_LANGUAGE";
const CHANGE_TAB = "CHANGE_TAB";

const initialState = {
  lang: "English",
  tabIndex: 0
};

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE: {
      return {
        ...state,
        lang: action.payload.lang,
      };
    }
    case CHANGE_TAB: {
      return {
        ...state,
        tabIndex: action.payload.tab,
      };
    }
    default:
      return state;
  }
};
export const changeLang = (lang) => ({
  type: CHANGE_LANGUAGE,
  payload: { lang },
});
export const changeTabIndex = (tab) => ({
  type: CHANGE_TAB,
  payload: { tab },
});
