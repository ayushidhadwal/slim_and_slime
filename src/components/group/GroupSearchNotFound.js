import React from "react";
import { Image, Text, VStack } from "native-base";
import { Dimensions } from "react-native";

import { GroupButton } from "./GroupButton";

const { height } = Dimensions.get("window");

export const GroupSearchNotFound = ({ onPress }) => {
  return (
    <VStack width="100%" flex={1} alignItems="center" p={5}>
      <Image
        width="100%"
        h={height / 2.5}
        source={require("../../../assets/images/search-start.png")}
        alt="No Groups"
        resizeMode="contain"
      />
      <Text
        textTransform="uppercase"
        fontWeight="800"
        fontSize="18"
        textAlign="center"
        mb={4}
      >
        Your search yield no results!
      </Text>
      <GroupButton
        onPress={onPress}
        icon="chevron-back"
        title="Go Back"
        mb={4}
      />
    </VStack>
  );
};
