import { StyleSheet, Switch, TouchableOpacity, View } from "react-native";
import AppText from "../Components/UI/AppText";
import { useMemo, useState } from "react";
import { SelectModal } from "../Components/SelectModal";
import { localisation } from "../localisation/localisation";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useAppTheme } from "../../hooks/useAppTheme";
import { Sizes } from "../../types/sizes";
import {
  LangType,
  SettingsSlice,
} from "../../store/reducers/settings/settingsSlice";
import { ThemeSlice } from "../../store/reducers/theme/themeSlice";
import { IList } from "../../types/list.types";

export const SettingsScreen = () => {
  const language = useAppSelector((state) => state.settings.lang);
  const darkMode = useAppSelector((state) => state.theme.darkTheme);
  const dispatch = useAppDispatch();
  const theme = useAppTheme();
  const { changeLang } = SettingsSlice.actions;
  const { changeMode } = ThemeSlice.actions;

  const [lang, setLang] = useState(false);

  const localise = useMemo(() => localisation(language), [language]);

  const onTheme = () => {
    dispatch(changeMode());
  };
  const onLanguageChange = (data: IList) => {
    dispatch(changeLang(data.value as LangType));
  };

  return (
    <View
      style={{ flex: 1, padding: 10, backgroundColor: theme.colors.background }}
    >
      <TouchableOpacity style={styles.switch} onPress={() => setLang(true)}>
        <AppText>{localise.settings.lang}</AppText>
        <AppText size={Sizes.small}>{language}</AppText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.switch} onPress={onTheme}>
        <AppText>{localise.settings.theme}</AppText>
        <Switch value={darkMode} onChange={onTheme} />
      </TouchableOpacity>
      <SelectModal
        data={localise.settings.langOptions}
        visible={lang}
        setVisible={setLang}
        dispatchMethod={onLanguageChange}
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