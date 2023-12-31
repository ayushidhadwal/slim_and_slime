import React from "react";
import { Box, HStack, Icon, IconButton, Text, VStack } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const AppHeader = ({ navigation, route, username }) => {
  return (
    <>
      <Box safeAreaTop bg="#FFF" />
      <HStack
        bg="#FFF"
        px="5"
        py="3"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
      >
        <HStack alignItems="center">
          {route.name.toLowerCase() === "home" ? (
            <VStack>
              <Text
                numberOfLines={1}
                color="#000"
                fontSize="18"
                fontWeight="800"
                w={width / 1.3}
              >
                Hi, {username}!
              </Text>
              <Text color="primary.500" fontSize="10" fontWeight="500">
                Welcome, Slim & Smile weight loss center
              </Text>
            </VStack>
          ) : (
            <Text color="#000" my={1.5} fontSize="20" fontWeight="800">
              {route.name}
            </Text>
          )}
        </HStack>
        <HStack space={4}>
          {route.name.toLowerCase() === "groups" && (
            <IconButton
              size="xs"
              onPress={() => navigation.navigate("SearchGroup")}
              icon={
                <Icon
                  as={Ionicons}
                  name="md-search-outline"
                  size="lg"
                  color="black"
                />
              }
            />
          )}

          <IconButton
            size="xs"
            onPress={() => navigation.navigate("Notification")}
            icon={
              <Icon
                as={Ionicons}
                name="md-notifications-outline"
                size="lg"
                color="black"
              />
            }
          />
        </HStack>
      </HStack>
    </>
  );
};
