import { Modal, View } from "react-native";
import { localisation } from "../localisation/localisation";
import { useAppSelector } from "../../hooks/redux";
import React, { FC } from "react";
import AppText from "./UI/AppText";
import AppButton from "./UI/AppButton";
import { useAppTheme } from "../../hooks/useAppTheme";
import { Sizes } from "../../types/sizes";

// export const InternetAlert = (error, method) => {
//   const lang = useAppSelector((state) => state.settings.lang);
//   const localise = localisation(lang);
//   Alert.alert(
//     `${error}`,
//     localise.internetAlert.body,
//     [
//       {
//         text: localise.internetAlert.retry,
//         onPress: method,
//         style: "default",
//       },
//       {
//         text: localise.internetAlert.cancel,
//         style: "cancel",
//       },
//     ],
//     {
//       cancelable: true,
//     }
//   );
// };

interface IAlert {
  error: string;
  onClose: (error: string) => void;
  method: () => void;
  offlineMode?: boolean;
  onDismiss?: () => void
}

export const InternetAlert: FC<IAlert> = ({
  error,
  onClose,
  method,
    onDismiss = () => {},
  offlineMode = true,
}) => {
  const lang = useAppSelector((state) => state.settings.lang);
  const localise = localisation(lang);
  const theme = useAppTheme();
  return (
    <Modal transparent visible={!!error}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            paddingVertical: 25,
            backgroundColor: theme.colors.cardColor,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 1,
            elevation: 8,
          }}
        >
          <AppText style={{ margin: 25 }}>
            {localise.internetAlert.body}
          </AppText>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <AppButton onPress={method} size={Sizes.small}>
              {localise.internetAlert.retry}
            </AppButton>
            {offlineMode && (
              <AppButton
                onPress={() => {
                    onDismiss()
                  onClose("");
                }}
                size={Sizes.small}
              >
                {localise.internetAlert.cancel}
              </AppButton>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};
