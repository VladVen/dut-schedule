import { Alert } from "react-native";

export const InternetAlert = (error, method) => {
  Alert.alert(
    `${error}`,
    "It seems like you haven't internet connection",
    [
      {
        text: "Retry",
        onPress: method,
        style: "default",
      },
    ],
    {
      cancelable: false,
    }
  );
};
