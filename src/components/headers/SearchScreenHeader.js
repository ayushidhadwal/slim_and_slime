import React, { useEffect, useState } from "react";
import { Box, HStack, Input } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";

import { HeaderBackIcon } from "../icons/HeaderBackIcon";
import { theme } from "../../styles/theme";
import { useMessage } from "../../hooks/useMessage";
import { getSearchedGroups } from "../../store/group/groupSlice";

export const SearchScreenHeader = ({ navigation, route }) => {
  const [query, setQuery] = useState(
    route?.params?.query ? route?.params?.query : ""
  );

  const dispatch = useDispatch();
  const setMessage = useMessage();

  const onSearchHandler = () => {
    if (query) {
      navigation.navigate("SearchResult", { query });
      dispatch(getSearchedGroups(query)).then((result) => {
        if (result?.error?.message) {
          setMessage(result.error.message);
        }
      });
    }
  };

  useEffect(() => {
    onSearchHandler();
  }, []);

  return (
    <>
      <Box safeAreaTop bg="#FFF" mt={2} />
      <HStack px="3" py="3" justifyContent="space-between" alignItems="center">
        <HStack>
          <HeaderBackIcon onPress={() => navigation.goBack()} />
          <Input
            ml={2}
            mr={1}
            type="text"
            size="md"
            placeholder="Search Slim & Smile"
            rounded={theme.borderRadius}
            focusOutlineColor={"primary.600"}
            flex={1}
            InputLeftElement={
              <Ionicons
                name="md-search"
                size={24}
                style={{ marginLeft: 12 }}
                color="#ccc"
              />
            }
            InputRightElement={
              query && (
                <Ionicons
                  onPress={() => setQuery("")}
                  name="md-backspace-outline"
                  size={24}
                  style={{ marginRight: 12 }}
                />
              )
            }
            onChangeText={setQuery}
            value={query}
            returnKeyType="search"
            onSubmitEditing={onSearchHandler}
            autoFocus={true}
          />
        </HStack>
      </HStack>
    </>
  );
};
