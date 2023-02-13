import { NativeStackScreenProps } from "@react-navigation/native-stack";

export enum RoutesStack {
  Login = "Login",
  Student = "Student",
  Teacher = "Teacher",
  Settings = "Settings",
  Footer = "Footer",
}

export type RoutesStackParamList = Record<RoutesStack, undefined>;

export type ScreenNavigationProps<T extends RoutesStack> =
  NativeStackScreenProps<RoutesStackParamList, T>;

