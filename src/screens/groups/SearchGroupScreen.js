import React, { useCallback, useEffect } from "react";
import { Box, Pressable, StatusBar, Text } from "native-base";
import { FlatList, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import { SearchScreenHeader } from "../../components/headers/SearchScreenHeader";
import { GroupNotFound } from "../../components/group/GroupNotFound";
import { useMessage } from "../../hooks/useMessage";
import { getGroups } from "../../store/group/groupSlice";
import { Loader } from "../../components/Loader";
import { RenderGroups } from "../../components/group/RenderGroups";

export const SearchGroupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const setMessage = useMessage();

  const { groups } = useSelector((state) => state.group);

  const fetchGroups = useCallback(() => {
    dispatch(getGroups()).then((result) => {
      if (result?.error?.message) {
        setMessage(result.error.message);
      }
    });
  }, []);

  useEffect(() => {
    fetchGroups();
  }, []);

  if (groups.isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <Pressable flex={1} onPress={() => Keyboard?.dismiss()}>
        {groups.data.length === 0 ? (
          <GroupNotFound
            onCreatePress={() => navigation.navigate("CreateGroup")}
            onSearchPress={() => navigation.navigate("SearchGroup")}
          />
        ) : (
          <>
            <Box mx={5}>
              <Text fontSize={24} my={3} color={"primary.500"} fontWeight={900}>
                All Groups
              </Text>
            </Box>
            <FlatList
              keyboardShouldPersistTaps="handled"
              data={groups.data}
              renderItem={RenderGroups}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
      </Pressable>
    </SafeAreaView>
  );
};

export const options = () => ({
  header: (props) => <SearchScreenHeader {...props} />,
});
