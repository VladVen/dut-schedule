import { Modal, ScrollView, StyleSheet, View } from "react-native";
import { container } from "../../theme/Theme";
import React, { useMemo } from "react";
import AppButton from "./UI/AppButton";
import { localisation } from "../../localisation/localisation";
import { Sizes } from "../../types/sizes";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useAppSelector } from "../../hooks/redux";
import { IList } from "../../types/list.types";

interface ISelectModal {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  data: IList[];
  dispatchMethod: (IList) => void;
}

export const SelectModal: React.FC<ISelectModal> = ({
  visible,
  data,
  dispatchMethod,
  setVisible,
}) => {
  const lang = useAppSelector((state) => state.settings.lang);
  const localise = useMemo(() => localisation(lang), [lang]);
  const theme = useAppTheme();

  return (
    <Modal visible={visible} animationType={"slide"} transparent={false}>
      <View style={{ ...container(theme.colors.background), paddingTop: 30 }}>
        <ScrollView>
          {data.map((item, index) => (
            <View style={styles.margin} key={index}>
              <AppButton
                onPress={async () => {
                  await setVisible(false);
                  dispatchMethod(item);
                }}
                size={Sizes.small}
              >
                {item.name}
              </AppButton>
            </View>
          ))}
        </ScrollView>
        <View style={styles.button}>
          <AppButton
            onPress={() => setVisible(false)}
            color={theme.colors.dangerColor}
            size={Sizes.large}
          >
            {localise.buttons.goBack}
          </AppButton>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
  },
  margin: {
    marginTop: 15,
    marginHorizontal: 10,
  },
});
