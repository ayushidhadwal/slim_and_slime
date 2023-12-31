import React from "react";
import { HStack, Pressable, Spacer, Text } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";

export const SettingsItem = ({
  icon,
  title,
  onPress,
  rightIcon = true,
  iconColor = "#000",
}) => {
  return (
    <Pressable onPress={onPress}>
      <HStack space={3} alignItems="center" backgoundColor={"#ff0000"} py={3}>
        <Ionicons name={icon} size={20} color={iconColor} />
        <Text fontWeight={500}>{title}</Text>
        <Spacer />
        {rightIcon && (
          <Ionicons
            name="md-chevron-forward-outline"
            size={20}
            color="#1670b0"
          />
        )}
      </HStack>
    </Pressable>
  );
};
