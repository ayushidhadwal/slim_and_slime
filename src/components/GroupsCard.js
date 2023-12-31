import React, { useEffect, useState } from "react";
import {
  HStack,
  Icon,
  IconButton,
  Image,
  Menu,
  Pressable,
  Spacer,
  Text,
  VStack,
} from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import { theme } from "../styles/theme";
import { BASE_URL } from "../constants/common";
import { useGroupActions } from "../hooks/useGroupActions";

const DEFAULT_IMG = require("../../assets/images/woman.png");

export const GroupsCard = ({
  id,
  name,
  desc,
  image,
  members,
  index,
  isOwner,
  isJoined,
  privacy,
  coverImage,
}) => {
  const navigation = useNavigation();
  const [source, setSource] = useState(DEFAULT_IMG);

  useEffect(() => {
    if (image) {
      setSource({ uri: BASE_URL + "/" + image });
    }
  }, [image]);

  const { onDelete, onLeave } = useGroupActions(id);

  const onView = () => {
    if (isJoined || isOwner) {
      navigation.navigate("LeaderBoard", { groupId: id });
    } else {
      navigation.navigate("GroupDescription", {
        group: {
          id: id,
          name: name,
          limit: members,
          desc: desc,
          privacy: privacy,
          groupImage: image,
          coverImage: coverImage,
        },
      });
    }
  };

  const onEdit = () => {
    navigation.navigate("EditGroup", {
      group: {
        id: id,
        name: name,
        limit: members,
        desc: desc,
        privacy: privacy,
        groupImage: image,
        coverImage: coverImage,
      },
    });
  };

  return (
    <Pressable
      onPress={onView}
      backgroundColor="#FFF"
      shadow={2}
      mb={5}
      mx={5}
      p={3}
      mt={index === 0 ? 2 : 0}
      rounded={theme.borderRadius}
    >
      <HStack alignItems="flex-start" space={2} mb={2}>
        <Image
          key={String(source)}
          w={50}
          h={50}
          rounded={50}
          source={source}
          alt="group image"
          onError={() => setSource(DEFAULT_IMG)}
          resizeMode="cover"
        />
        <VStack flexShrink={1}>
          <Text fontWeight="900" fontSize="16" numberOfLines={1}>
            {name}
          </Text>
          <Text color="muted.500" fontSize="12">
            {members} members
          </Text>
        </VStack>
        <Spacer />
        {(isJoined || isOwner) && (
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
            {isJoined && !isOwner ? (
              <Menu.Item px={0} onPress={onLeave}>
                Leave
              </Menu.Item>
            ) : null}

            {isOwner ? (
              <>
                <Menu.Item px={0} onPress={onEdit}>
                  Edit
                </Menu.Item>
                <Menu.Item px={0} onPress={onDelete}>
                  Delete
                </Menu.Item>
              </>
            ) : null}
          </Menu>
        )}
      </HStack>
      <VStack>
        <Text fontSize="13" fontWeight="400" numberOfLines={3}>
          {desc}
        </Text>
      </VStack>
    </Pressable>
  );
};
