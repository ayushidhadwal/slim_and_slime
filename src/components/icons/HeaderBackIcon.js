import * as React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Icon, IconButton } from "native-base";

export const HeaderBackIcon = ({ onPress }) => (
  <IconButton
    size="xs"
    onPress={onPress}
    icon={<Icon as={Ionicons} name="chevron-back" size="lg" color="black" />}
  />
);
