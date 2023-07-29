import {
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Pressable,
} from "react-native";

import { Colors, Spacing, Theme } from "constants/index";

type ButtonProps = {
  label: string;
  onPress: () => void;
  width: string;
};

export const Button = ({ onPress, label, width = "40%" }: ButtonProps) => {
  const buttonStyles: ViewStyle[] = [styles.button];
  const textStyles: TextStyle[] = [styles.text];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        ...buttonStyles,
        { opacity: pressed ? 0.75 : 1 },
        { width: width },
      ]}
    >
      <Text style={textStyles}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: Spacing.md,
    backgroundColor: Colors.greyDarkest,
    margin: Spacing.sm,
    borderRadius: Theme.radius,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.greyMedium,
  },
  buttonPrimary: {
    backgroundColor: Colors.greyDark,
  },
  text: {
    color: Colors.greyLight,
    fontWeight: "500",
    fontSize: 16,
  },
  textPrimary: {
    color: Colors.greyLight,
  },
});
