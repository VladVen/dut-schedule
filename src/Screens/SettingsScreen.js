import { StyleSheet, Switch, TouchableOpacity, View } from "react-native";
import AppText from "../Components/UI/AppText";
import { useMemo, useState } from "react";
import { THEME } from "../../Theme";
import { useDispatch, useSelector } from "react-redux";
import {
  changeLang,
  changeTheme,
  enableNotifications,
} from "../../redux/settingsReducer";
import { SelectModal } from "../Components/SelectModal";
import { localisation } from "../localisation/localisation";

export const SettingsScreen = () => {
  const { theme, lang: language } = useSelector((state) => state.settings);
  const { enabled, frequency } = useSelector(
    (state) => state.settings.notifications
  );
  const dispatch = useDispatch();

  const [freq, serFreq] = useState(false);
  const [lang, setLang] = useState(false);
  const [themeMode, setThemeMode] = useState(false);

  const localise = useMemo(() => localisation(language), [language]);

  const onEnable = () => {
    dispatch(enableNotifications());
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.switch} onPress={onEnable}>
        <AppText>{localise.settings.enable}</AppText>
        <Switch value={enabled} onChange={onEnable} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.switch}>
        <AppText>{localise.settings.notify}</AppText>
        <AppText size={"s"}>{frequency}</AppText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.switch} onPress={() => setLang(true)}>
        <AppText>{localise.settings.lang}</AppText>
        <AppText size={"s"}>{language}</AppText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.switch}
        onPress={() => setThemeMode(true)}
      >
        <AppText>{localise.settings.theme}</AppText>
        <AppText size={"s"}>{theme}</AppText>
      </TouchableOpacity>
      <SelectModal
        data={localise.settings.langOptions}
        visible={lang}
        setVisible={setLang}
        setSelected={() => {}}
        dispatchMethod={(lang) => {
          dispatch(changeLang(lang));
        }}
      />
      <SelectModal
        data={localise.settings.themeOptions}
        visible={themeMode}
        setVisible={setThemeMode}
        setSelected={() => {}}
        dispatchMethod={(theme) => {
          dispatch(changeTheme(theme));
        }}
      />
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: THEME.background
    },
    switch: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
    }
})