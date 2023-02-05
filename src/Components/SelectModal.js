import { Modal, ScrollView, StyleSheet, View } from "react-native";
import { THEME } from "../../Theme";
import React from "react";
import AppButton from "./UI/AppButton";

export const SelectModal = ({
  visible,
  data,
  setSelected,
  dispatchMethod,
  setVisible,
}) => {
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
            Go Back
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
