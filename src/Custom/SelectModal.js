import {Button, Modal, StyleSheet, View} from "react-native";
import {THEME} from "../../Theme";
import React from "react";

export const SelectModal = ({visible, data, setSelected, dispatchMethod, setVisible}) => {
    return (
        <Modal visible={visible} animationType={'slide'} transparent={false}>
            <View style={styles.container}>
                {
                    data.map((item, index) => <Button title={item.name} key={index} color={THEME.textColor}
                                                      onPress={async () => {
                                                          setSelected(item.name)
                                                          await dispatchMethod(item.value)
                                                          setVisible(false)
                                                      }}/>)
                }
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: THEME.background
    },
})
