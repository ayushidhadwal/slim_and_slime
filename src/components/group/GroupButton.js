import React from "react";
import { HStack, Pressable, Text } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";

import { theme } from "../../styles/theme";

export const GroupButton = ({ onPress, title, icon, ...restProps }) => {
  return (
    <Pressable onPress={onPress}>
      <HStack
        {...restProps}
        bgColor="#FFF"
        space={1}
        alignItems="center"
        borderWidth={1}
        py={1}
        px={2}
        rounded={theme.borderRadius}
        borderColor="#1670b0"
      >
        <Ionicons name={icon} size={20} color="#1670b0" />
        <Text
          color="primary.600"
          fontWeight="800"
          fontSize="16"
          textAlign="center"
        >
          {title}
        </Text>
      </HStack>
    </Pressable>
  );
};
