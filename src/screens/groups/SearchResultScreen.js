import React from "react";
import { Box, Pressable, StatusBar, Text } from "native-base";
import { FlatList, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import { SearchScreenHeader } from "../../components/headers/SearchScreenHeader";
import { GroupSearchNotFound } from "../../components/group/GroupSearchNotFound";
import { Loader } from "../../components/Loader";
import { RenderGroups } from "../../components/group/RenderGroups";

export const SearchResultScreen = ({ navigation }) => {
  const { searchedGroups } = useSelector((state) => state.group);

  if (searchedGroups.isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <Pressable flex={1} onPress={() => Keyboard?.dismiss()}>
        {searchedGroups.data.length === 0 ? (
          <GroupSearchNotFound onPress={() => navigation.goBack()} />
        ) : (
          <>
            <Box mx={5}>
              <Text fontSize={24} my={3} color={"primary.500"} fontWeight={900}>
                Search Result
              </Text>
            </Box>
            <FlatList
              keyboardShouldPersistTaps="handled"
              data={searchedGroups.data}
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
