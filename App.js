import React from "react";
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {AppNavigation} from "./src/Navigation/AppNavigation";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {THEME} from "./Theme";
import {useFonts} from "expo-font";

export default function App() {

    const [loaded] = useFonts({
        'eUkraine': require('./font/e-Ukraine-Regular.otf'),
    });

    if(!loaded) {
        return <View style={styles.container}>
            <ActivityIndicator color={THEME.textColor} size={'large'}/>
        </View>
    }

    return (
        <Provider store={store}>
        <AppNavigation />
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
