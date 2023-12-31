import React, { useState } from "react";
import { Dimensions, ImageBackground, StatusBar } from "react-native";
import { Box, Button, HStack, Icon, IconButton, Image } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { theme } from "../../styles/theme";
import { BASE_URL } from "../../constants/common";
import { useGroupActions } from "../../hooks/useGroupActions";

const { height, width } = Dimensions.get("window");

const DEFAULT_COVER = require("../../../assets/images/DEFAULT_COVER.png");
const DEFAULT_IMG = require("../../../assets/images/DEFAULT_IMG.png");

export const GroupHeader = ({
  id = null,
  cover,
  profile,
  isJoined = false,
  isOwner = false,
}) => {
  const [coverImage, setCoverImage] = useState({
    uri: BASE_URL + "/" + cover,
  });
  const [groupImage, setGroupImage] = useState({
    uri: BASE_URL + "/" + profile,
  });

  const { isLoading } = useSelector((state) => state.group);

  const navigation = useNavigation();

  const { onDelete, onLeave } = useGroupActions(id, () => {
    navigation.replace("BottomTabs", {
      screen: "Groups",
    });
  });

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <ImageBackground
        key={coverImage}
        source={coverImage}
        resizeMode="cover"
        style={{
          height: height / 4,
          marginBottom: (isOwner || isJoined) && id ? 25 : 60,
        }}
        onError={() => setCoverImage(DEFAULT_COVER)}
      >
        <HStack bg="rgba(0, 0, 0, 0.3)" flex={1}>
          <Box justifyContent={"center"} ml={2}>
            <IconButton
              size="md"
              onPress={() => navigation.goBack()}
              icon={
                <Icon
                  as={Ionicons}
                  name="chevron-back"
                  size="lg"
                  color="#FFF"
                />
              }
            />
          </Box>
        </HStack>
        <Image
          position="absolute"
          bottom="-25%"
          left="5%"
          key={groupImage}
          source={groupImage}
          alt="image"
          resizeMode="cover"
          h={width / 4.5}
          w={width / 4.5}
          rounded={theme.borderRadius}
          onError={() => setGroupImage(DEFAULT_IMG)}
        />
      </ImageBackground>
      {isJoined && id && !isOwner ? (
        <Button
          mx={5}
          size="sm"
          alignSelf="flex-end"
          _text={{ fontWeight: 800 }}
          leftIcon={<Icon as={Ionicons} name="md-power" size="sm" />}
          bg="red.700"
          onPress={onLeave}
          isLoading={isLoading}
          spinnerPlacement="end"
          isLoadingText="Leaving"
        >
          Leave Group
        </Button>
      ) : null}

      {isOwner && id ? (
        <Button
          mx={5}
          size="sm"
          alignSelf="flex-end"
          _text={{ fontWeight: 800 }}
          leftIcon={<Icon as={Ionicons} name="md-trash" size="sm" />}
          bg="red.700"
          onPress={onDelete}
          isLoading={isLoading}
          spinnerPlacement="end"
          isLoadingText="Deleting"
        >
          Delete Group
        </Button>
      ) : null}
    </>
  );
};
