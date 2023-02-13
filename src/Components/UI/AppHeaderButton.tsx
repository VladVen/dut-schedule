import React from "react";
import {
  CommonHeaderButtonProps,
  HeaderButton,
} from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

const AppHeaderButton = (props: CommonHeaderButtonProps) => {
  return <HeaderButton {...props} iconSize={24} IconComponent={Ionicons} />;
};

export default AppHeaderButton;
