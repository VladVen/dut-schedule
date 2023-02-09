import { Alert } from "react-native";
import {localisation} from "../localisation/localisation";
import {useSelector} from "react-redux";

export const InternetAlert = (error, method) => {
    const lang = useSelector(state => state.settings.lang)
    const localise = localisation(lang)
  Alert.alert(
    `${error}`,
      localise.internetAlert.body,
    [
      {
        text: localise.internetAlert.retry,
        onPress: method,
        style: "default",
      },
      {
        text: localise.internetAlert.cancel,
        style: "cancel",
      },
    ],
    {
      cancelable: true,
    }
  );
};
