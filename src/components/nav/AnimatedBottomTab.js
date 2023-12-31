import React from "react";
import { HStack, Pressable, Text } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TabItem = ({ name, onPress, onLongPress, icon, active }) => {
  return (
    <Pressable
      flex={1}
      flexDirection="row"
      space={5}
      rounded={20}
      p={2}
      my={3}
      justifyContent="center"
      bgColor={active ? "#FFF" : "#1670b0"}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <HStack space={1}>
        <Ionicons name={icon} size={20} color={active ? "#1670b0" : "#FFF"} />
        {active && (
          <Text fontWeight="800" color="primary.600">
            {name}
          </Text>
        )}
      </HStack>
    </Pressable>
  );
};

export const AnimatedBottomTab = ({ state, descriptors, navigation }) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <HStack
      mx={5}
      mb={bottom ? bottom : 5}
      mt={2}
      shadow={9}
      bgColor="primary.600"
      rounded={16}
      space={3}
      px={3}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        let iconName = "md-home";

        switch (route.name) {
          case "Home":
            iconName = "md-home";
            break;
          case "Groups":
            iconName = "ios-stats-chart-outline";
            break;
          case "Settings":
            iconName = "md-settings";
            break;
          default:
            break;
        }

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabItem
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            active={isFocused}
            name={label}
            icon={iconName}
          />
        );
      })}
    </HStack>
  );
};
