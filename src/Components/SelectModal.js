import { Modal, ScrollView, StyleSheet, View } from "react-native";
import { THEME } from "../../Theme";
import React, {useMemo} from "react";
import AppButton from "./UI/AppButton";
import {useSelector} from "react-redux";
import {localisation} from "../localisation/localisation";

export const SelectModal = ({
  visible,
  data,
  setSelected,
  dispatchMethod,
  setVisible,
}) => {

  const lang = useSelector((state) => state.settings.lang);
  const localise = useMemo(() => localisation(lang), [lang]);

  return (
    <Modal visible={visible} animationType={"slide"} transparent={false}>
      <View style={styles.container}>
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
            color={THEME.dangerColor}
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.background,
    paddingTop: 30,
  },
  button: {
    marginBottom: 10,
  },
  margin: {
    marginTop: 15,
    marginHorizontal: 10,
  },
});
