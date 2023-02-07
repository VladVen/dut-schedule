import { Modal, ScrollView, StyleSheet, View } from "react-native";
import { container } from "../../Theme";
import React, { useMemo } from "react";
import AppButton from "./UI/AppButton";
import { useSelector } from "react-redux";
import { localisation } from "../localisation/localisation";
import { useTheme } from "react-native-paper";

export const SelectModal = ({
  visible,
  data,
  setSelected,
  dispatchMethod,
  setVisible,
}) => {
  const lang = useSelector((state) => state.settings.lang);
  const localise = useMemo(() => localisation(lang), [lang]);
  const theme = useTheme();

  return (
    <Modal visible={visible} animationType={"slide"} transparent={false}>
      <View style={{ ...container(theme.colors.background), paddingTop: 30 }}>
        <ScrollView>
          {data.map((item, index) => (
            <View style={styles.margin} key={index}>
              <AppButton
                onPress={async () => {
                  setSelected(item.name);
                  await setVisible(false);
                  dispatchMethod(item.value);
                }}
                size={"s"}
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
            size={"l"}
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
