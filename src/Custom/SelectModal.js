import {Button, Modal, ScrollView, StyleSheet, View} from "react-native";
import {THEME} from "../../Theme";
import React from "react";

export const SelectModal = ({visible, data, setSelected, dispatchMethod, setVisible}) => {
    return (
        <Modal visible={visible} animationType={'slide'} transparent={false}>

            <View style={styles.container}>


                <ScrollView>
                        {
                            data.map((item, index) => <View style={styles.margin}  key={index}>
                                <Button title={item.name} color={THEME.textColor}
                                        onPress={async () => {
                                            setSelected(item.name)
                                            await dispatchMethod(item.value)
                                            setVisible(false)
                                        }}/>
                            </View>)
                        }

                </ScrollView>
                <View style={styles.button}>
                    <Button title={'Go Back'} color={THEME.dangerColor}
                            onPress={() => setVisible(false)}
                    />
                </View>

            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: THEME.background,
        paddingTop: 30,
    },
    button: {
       marginBottom: 10
    },
    margin: {
        marginTop: 15,
        marginHorizontal: 10
    }
})
