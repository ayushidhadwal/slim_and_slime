import React from "react";
import { Divider, HStack, Text } from "native-base";

export const DividerWithText = ({ title }) => {
  return (
    <>
      <Divider mt={2} />
      <HStack bottom={3.5} backgroundColor="#FFF" px={3}>
        <Text fontWeight="500" fontSize="16" textAlign="center">
          {title}
        </Text>
      </HStack>
    </>
  );
};
