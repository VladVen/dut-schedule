import { ITheme } from "./theme.types";
import { ViewStyle } from "react-native";

export const DarkTHEME: ITheme = {
  background: "rgb(42,42,42)",
  textColor: "rgb(153, 191, 87)",
  headerColor: "rgb(2, 139, 124)",
  dangerColor: "#e53935",
  disabledColor: "#949494",
  headerText: "#000000",
  cardColor: {
    pz:"rgb(0,0,0)",
    lk: '#81123c',
    lb: '#45667e',
    ekz: '#391949',
    zal: '#183d18',
    sem: '#362d36',
    dop: '#484747',
  },
};
export const LightTHEME: ITheme = {
  background: "rgb(255,255,255)",
  textColor: "rgb(0,0,0)",
  headerColor: "rgb(2, 139, 124)",
  dangerColor: "#e53935",
  disabledColor: "#949494",
  headerText: "#ffffff",
  cardColor: {
    pz:"rgb(153, 191, 87)",
    lk: '#fffadb',
    lb: '#c4e5ff',
    ekz: '#b0bcff',
    zal: '#a7f1a7',
    sem: '#fff0ff',
    dop: '#e3ebe4',
  },
};



export const container = (background: string): ViewStyle => {
  return {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: background,
  };
};

