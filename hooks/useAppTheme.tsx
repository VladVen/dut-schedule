import { useTheme } from "react-native-paper";
import { ITheme } from "../theme/theme.types";

interface IAppTheme {
  colors: ITheme;
}

export const useAppTheme = () => useTheme<IAppTheme>();