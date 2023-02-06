const ENABLE_NOTIFICATIONS = "ENABLE_NOTIFICATIONS";
const CHANGE_FREQUENCY = "CHANGE_FREQUENCY";
const CHANGE_THEME = "CHANGE_THEME";
const CHANGE_LANGUAGE = "CHANGE_LANGUAGE";

const initialState = {
  notifications: {
    enabled: false,
    frequency: "one per Day",
  },
  theme: "Dark",
  lang: "English",
};

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ENABLE_NOTIFICATIONS: {
      return {
        ...state,
        notifications: {
          ...state.notifications,
          enabled: !state.notifications.enabled,
        },
      };
    }
    case CHANGE_FREQUENCY: {
      return {
        ...state,
        notifications: {
          ...state.notifications,
          frequency: action.payload.frequency,
        },
      };
    }
    case CHANGE_THEME: {
      return {
        ...state,
        theme: action.payload.theme,
      };
    }
    case CHANGE_LANGUAGE: {
      return {
        ...state,
        lang: action.payload.lang,
      };
    }
    default:
      return state;
  }
};
export const enableNotifications = () => ({
  type: ENABLE_NOTIFICATIONS,
});

export const notifyFreq = (frequency) => ({
  type: CHANGE_FREQUENCY,
  payload: { frequency },
});
export const changeTheme = (theme) => ({
  type: CHANGE_THEME,
  payload: { theme },
});
export const changeLang = (lang) => ({
  type: CHANGE_LANGUAGE,
  payload: { lang },
});