import React from "react";
import { Image, Text, VStack } from "native-base";
import { Dimensions } from "react-native";

import { GroupButton } from "./GroupButton";
import { DividerWithText } from "./DividerWithText";

const { height } = Dimensions.get("window");

export const GroupNotFound = ({ onSearchPress, onCreatePress }) => (
  <VStack width="100%" flex={1} alignItems="center" p={5}>
    <Image
      width="100%"
      h={height / 2.5}
      source={require("../../../assets/images/no-group-2.png")}
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
      No groups found!
    </Text>
    <GroupButton
      onPress={onSearchPress}
      icon="md-search-outline"
      title="Search & Join"
      mb={4}
    />
    <DividerWithText title="or" />
    <GroupButton onPress={onCreatePress} icon="md-add-sharp" title="Create" />
  </VStack>
);
