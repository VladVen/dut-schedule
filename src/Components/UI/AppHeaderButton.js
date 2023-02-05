import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

const AppHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      iconSize={24}
      IconComponent={Ionicons}
      color={"black"}
    />
  );
};

export default AppHeaderButton;
