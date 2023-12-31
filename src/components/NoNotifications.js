import React from "react";
import { Image, Text, VStack } from "native-base";
import { Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export const NoNotifications = () => {
  return (
    <VStack
      width="100%"
      flex={1}
      alignItems="center"
      justifyContent="center"
      p={5}
    >
      <Image
        width="100%"
        h={height / 2.5}
        source={require("../../assets/images/notifications.png")}
        alt="Notifications Img"
        resizeMode="contain"
      />
      <Text
        textTransform="uppercase"
        fontWeight="800"
        fontSize="18"
        textAlign="center"
        mb={4}
      >
        No Notifications
      </Text>
    </VStack>
  );
};
