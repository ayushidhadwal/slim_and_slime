import React, { useEffect } from "react";
import { Box, HStack, FlatList, StatusBar, Text, VStack } from "native-base";
import { SafeAreaView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";

import { theme } from "../../styles/theme";
import { Loader } from "../../components/Loader";
import { getNotifications } from "../../store/notification/notificationSlice";
import { useMessage } from "../../hooks/useMessage";
import { NoNotifications } from "../../components/NoNotifications";

export const NotificationScreen = () => {
  const dispatch = useDispatch();
  const setMessage = useMessage();

  const { isLoading, notifications } = useSelector(
    (state) => state.notification
  );

  useEffect(() => {
    dispatch(getNotifications()).then((result) => {
      if (result?.error?.message) {
        setMessage(result.error.message);
      }
    });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Box flex={1} mt={3}>
        <Text
          mx={5}
          fontSize={24}
          mb={3}
          color={"primary.500"}
          fontWeight={900}
        >
          Notifications
        </Text>

        {notifications.length === 0 ? (
          <NoNotifications />
        ) : (
          <FlatList
            keyExtractor={(item) => item.id}
            data={notifications}
            renderItem={({ item, index }) => {
              return (
                <Box
                  mt={index === 0 ? 3 : 0}
                  mx={5}
                  mb={4}
                  borderBottomWidth={0.3}
                  bgColor="#FFF"
                  p={2}
                  rounded={theme.borderRadius}
                >
                  <HStack space={2}>
                    <Box mt={1}>
                      <Ionicons name="md-radio-button-off-outline" size={16} />
                    </Box>
                    <Text flexShrink={1}>{item.message}</Text>
                  </HStack>
                  <VStack alignItems="flex-end">
                    <Text color="muted.400" mt={2} fontSize="xs">
                      {new Date(item.datetime).toLocaleString()}
                    </Text>
                  </VStack>
                </Box>
              );
            }}
          />
        )}
      </Box>
    </SafeAreaView>
  );
};
