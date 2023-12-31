import React, { useEffect, useState } from "react";
import { Box, HStack, Image, Pressable, Text, VStack } from "native-base";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useSelector } from "react-redux";

import { theme } from "../styles/theme";
import { BASE_URL } from "../constants/common";

const DEFAULT_PROFILE_IMG = require("../../assets/images/man.png");

export const SettingsProfileCard = ({ onPress }) => {
  const { name, email, profilePic } = useSelector((state) => state.user);
  const [source, setSource] = useState(DEFAULT_PROFILE_IMG);

  useEffect(() => {
    if (profilePic) {
      setSource({ uri: BASE_URL + "/" + profilePic });
    }
  }, [profilePic]);

  return (
    <Pressable onPress={onPress}>
      <HStack
        justifyContent="space-between"
        alignItems="center"
        backgroundColor="#FFF"
        shadow={2}
        borderRadius={theme.borderRadius}
        p={5}
      >
        <HStack alignItems="center">
          <Box h={50} w={50}>
            <Image
              rounded={50}
              key={source}
              source={source}
              alt="User Profile"
              size="xl"
              h="100%"
              width="100%"
              resizeMode="contain"
              onError={() => setSource(DEFAULT_PROFILE_IMG)}
            />
          </Box>
          <VStack flex={0.9} mx={2}>
            <Text
              color={"primary.800"}
              fontWeight="800"
              fontSize="md"
              textTransform="capitalize"
              numberOfLines={2}
            >
              {name}
            </Text>
            <Text
              numberOfLines={1}
              fontSize="xs"
              fontWeight={400}
              textTransform="lowercase"
            >
              {email}
            </Text>
          </VStack>
        </HStack>

        <Box>
          <FontAwesome5 name={"edit"} size={20} color={"#000000"} />
        </Box>
      </HStack>
    </Pressable>
  );
};
