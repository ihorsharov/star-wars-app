import React from "react";
import { DimensionValue, View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props extends ViewProps {
  children: React.ReactNode;
  backgroundColor?: string;
  paddingTop?: DimensionValue;
  paddingBottom?: DimensionValue;
  paddingRight?: DimensionValue;
  paddingLeft?: DimensionValue;
  borderRadius?: number;
}

export const ScreenWrapper: React.FC<Props> = ({ children, backgroundColor = "#fff", paddingTop, paddingBottom, paddingLeft, paddingRight, borderRadius, style, ...restProps }) => {
  const insets = useSafeAreaInsets()

  return (
    <View
      style={{
        paddingTop: paddingTop ?? insets.top,
        paddingBottom: paddingBottom ?? insets.bottom,
        paddingLeft: paddingLeft ?? insets.left,
        paddingRight: paddingRight ?? insets.right,
        backgroundColor,
        flex: 1,
      }}
      {...restProps}
    >
      {children}
    </View>
  );
};