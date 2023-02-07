import { StyleSheet, Switch, TouchableOpacity, View } from "react-native";
import AppText from "../Components/UI/AppText";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLang, enableNotifications } from "../../redux/settingsReducer";
import { SelectModal } from "../Components/SelectModal";
import { localisation } from "../localisation/localisation";
import { changeTheme } from "../../redux/themeReducer";
import { useTheme } from "react-native-paper";

export const SettingsScreen = () => {
  const language = useSelector((state) => state.settings.lang);
  const { enabled, frequency } = useSelector(
    (state) => state.settings.notifications
  );
  const darkMode = useSelector((state) => state.theme.darkTheme);
  const dispatch = useDispatch();
  const theme = useTheme();

  const [freq, serFreq] = useState(false);
  const [lang, setLang] = useState(false);

  const localise = useMemo(() => localisation(language), [language]);

  const onEnable = () => {
    dispatch(enableNotifications());
  };
  const onTheme = () => {
    dispatch(changeTheme());
  };

  return (
    <View
      style={{ flex: 1, padding: 10, backgroundColor: theme.colors.background }}
    >
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
      <TouchableOpacity style={styles.switch} onPress={onTheme}>
        <AppText>{localise.settings.theme}</AppText>
        <Switch value={darkMode} onChange={onTheme} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  switch: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
});