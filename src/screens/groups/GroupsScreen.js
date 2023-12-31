import React, { useCallback, useEffect } from "react";
import { Box, Button, HStack, Icon, Spacer, StatusBar } from "native-base";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";

import { GroupNotFound } from "../../components/group/GroupNotFound";
import { useMessage } from "../../hooks/useMessage";
import { getMyGroups } from "../../store/group/groupSlice";
import { theme } from "../../styles/theme";
import { Loader } from "../../components/Loader";
import { RenderGroups } from "../../components/group/RenderGroups";

export const GroupsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const setMessage = useMessage();

  const { myGroups } = useSelector((state) => state.group);

  const fetchMyGroups = useCallback(() => {
    dispatch(getMyGroups()).then((result) => {
      if (result?.error?.message) {
        setMessage(result.error.message);
      }
    });
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchMyGroups);
    return unsubscribe;
  }, [navigation]);

  const onCreateGroup = () => navigation.navigate("CreateGroup");

  if (myGroups.isLoading) {
    return <Loader />;
  }

  return (
    <Box flex={1} backgroundColor="#FFF">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {myGroups.data.length === 0 ? (
        <GroupNotFound
          onCreatePress={() => navigation.navigate("CreateGroup")}
          onSearchPress={() => navigation.navigate("SearchGroup")}
        />
      ) : (
        <>
          <HStack mx={5} mb={3} justifyItems="space-between">
            <Spacer />
            <Button
              rounded={theme.borderRadius}
              alignSelf="flex-end"
              onPress={onCreateGroup}
              startIcon={
                <Icon as={Ionicons} name="md-add-circle-outline" size="md" />
              }
            >
              Create
            </Button>
          </HStack>
          <FlatList
            data={myGroups.data}
            renderItem={RenderGroups}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </Box>
  );
};
