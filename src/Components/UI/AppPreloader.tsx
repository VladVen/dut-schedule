import React from "react";
import { ActivityIndicator, View } from "react-native";
import { container } from "../../../theme/Theme";

interface IAppLoader {
  background: string;
  color: string;
}

export const AppPreloader: React.FC<IAppLoader> = ({ background, color }) => {
  return (
    <View style={container(background)}>
      <ActivityIndicator color={color} size={"large"} />
    </View>
  );
};
