import Ionicons from "@expo/vector-icons/Ionicons";
import { HStack, Text } from "native-base";
import * as React from "react";

export const ErrorText = ({ error }) => {
  if (!error) {
    return null;
  }

  return (
    <HStack space={1} alignItems="center">
      <Ionicons name="md-alert-circle-outline" size={15} color="red" />
      <Text fontSize={12} color="red.600">
        {error}
      </Text>
    </HStack>
  );
};
