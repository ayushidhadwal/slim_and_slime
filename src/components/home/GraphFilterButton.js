import { HStack, Pressable, Text } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";

export const GraphFilterButton = ({ onPress, title, active, value }) => (
  <Pressable onPress={() => onPress(value)}>
    <HStack
      rounded={100}
      bg={active ? "primary.600" : "muted.300"}
      alignItems="center"
      justifyContent="center"
      px={2}
    >
      <Ionicons
        name="md-calendar-outline"
        size={20}
        color={active ? "#FFF" : "#404040"}
      />
      <Text
        m={2}
        fontWeight="800"
        fontSize={10}
        color={active ? "#FFF" : "#404040"}
      >
        {title}
      </Text>
    </HStack>
  </Pressable>
);
