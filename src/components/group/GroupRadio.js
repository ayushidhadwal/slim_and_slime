import * as React from "react";
import { Box, HStack, Pressable, Spacer, Text, VStack } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";

import { theme } from "../../styles/theme";

export const GroupRadio = ({
  icon,
  heading,
  subheading,
  children,
  onPress,
}) => {
  return (
    <Pressable
      flex={1}
      flexDirection="row"
      alignItems="center"
      onPress={onPress}
    >
      <HStack flexShrink={1} alignItems={"center"} mb={5} py={2} space={3}>
        <Box
          w={50}
          h={12}
          bgColor="primary.50"
          justifyContent="center"
          alignItems="center"
          borderRadius={theme.borderRadius}
        >
          <Ionicons name={icon} size={24} />
        </Box>
        <VStack>
          <Text fontWeight={800} color="muted.500" fontSize={12}>
            {heading}
          </Text>
          <Text fontWeight={500} color="muted.300" fontSize={12}>
            {subheading}
          </Text>
        </VStack>
        <Spacer />
      </HStack>
      <Spacer />
      {children}
    </Pressable>
  );
};
