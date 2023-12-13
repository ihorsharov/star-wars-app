import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Pressable,
} from "react-native";

interface Props {
  children: React.ReactNode;
}

export const KeyboardAvoidingDisplayComponent: React.FC<Props> = ({
  children,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        {children}
      </Pressable>
    </KeyboardAvoidingView>
  );
};
