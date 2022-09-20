import {StyleSheet} from 'react-native';
import {AppNavigation} from "./src/Navigation/AppNavigation";
import {Provider} from "react-redux";
import {store} from "./redux/store";

export default function App() {

    return (
        <Provider store={store}>
        <AppNavigation />
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
