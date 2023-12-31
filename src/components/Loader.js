import React from "react";
import { ActivityIndicator } from "react-native";
import { Box } from "native-base";

export const Loader = ({ boxProps }) => {
  return (
    <Box flex={1} alignItems="center" justifyContent="center" {...boxProps}>
      <ActivityIndicator size="large" color="#1670b0" />
    </Box>
  );
};
