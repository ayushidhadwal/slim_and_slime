import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  HStack,
  Icon,
  IconButton,
  Image,
  Menu,
  Spacer,
  Text,
  VStack,
} from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";

import { BASE_URL } from "../constants/common";
import { useGroupActions } from "../hooks/useGroupActions";

const DEFAULT_IMG = require("../../assets/images/DEFAULT_IMG.png");

export const LeaderBoardCard = ({
  groupId,
  memberId,
  name = "",
  isOwner = false,
  steps = 0,
  image = "",
}) => {
  const [source, setSource] = useState(DEFAULT_IMG);
  const { userId } = useSelector((state) => state.group);

  useEffect(() => {
    if (image) {
      setSource({ uri: BASE_URL + "/" + image });
    }
  }, [image]);

  const { onRemoveMember } = useGroupActions();
  const onRemove = () =>
    onRemoveMember({ groupId: groupId, memberId: memberId });

  return (
    <>
      <HStack space={2} alignItems="center">
        <Image
          key={source}
          source={source}
          alt="user profile picture."
          w={60}
          h={60}
          onError={() => setSource(DEFAULT_IMG)}
        />
        <VStack space={1} flex={1}>
          <Text flexShrink={1} numberOfLines={2} fontWeight="700">
            {name}
          </Text>
          <HStack>
            <Box bg="info.500" alignSelf="flex-start" px={2} py={1} rounded={5}>
              <Text fontWeight="800" color="#FFF">
                {steps} Steps
              </Text>
            </Box>
            <Spacer />
            {isOwner && +userId !== memberId && (
              <Menu
                w="100"
                placement="bottom right"
                trigger={(triggerProps) => {
                  return (
                    <IconButton
                      borderWidth={0.5}
                      size="xs"
                      icon={
                        <Icon
                          as={Ionicons}
                          name="md-ellipsis-vertical-outline"
                          size="xs"
                          color="black"
                        />
                      }
                      {...triggerProps}
                    />
                  );
                }}
              >
                <Menu.Item p={0} onPress={onRemove}>
                  Remove
                </Menu.Item>
              </Menu>
            )}
          </HStack>
        </VStack>
      </HStack>
      <Divider my={2} />
    </>
  );
};
