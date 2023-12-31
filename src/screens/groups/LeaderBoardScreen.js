import React, { useCallback, useEffect, useState } from "react";
import { Box, Text, VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { GroupHeader } from "../../components/group/GroupHeader";
import { LeaderBoardCard } from "../../components/LeaderBoardCard";
import { Loader } from "../../components/Loader";
import { getGroupDetails } from "../../store/group/groupSlice";
import { useMessage } from "../../hooks/useMessage";

export const LeaderBoardScreen = ({ route }) => {
  const { groupId } = route.params;
  const [numberOfLines, setNumberOfLines] = useState(2);

  const dispatch = useDispatch();
  const setMessage = useMessage();
  const { groupDetails, myGroups } = useSelector((state) => state.group);

  const renderItems = ({ item }) => (
    <LeaderBoardCard
      groupId={groupDetails.id}
      memberId={item.id}
      name={item.name}
      image={item.profilePic}
      isOwner={groupDetails.isOwner}
      steps={item.stepsTotal}
    />
  );

  const fetchDetails = useCallback(() => {
    dispatch(getGroupDetails({ groupId })).then((result) => {
      if (result?.error?.message) {
        setMessage(result.error.message);
      }
    });
  }, []);

  useEffect(() => {
    fetchDetails();
  }, []);

  if (myGroups.isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
      <GroupHeader
        cover={groupDetails.coverImage}
        profile={groupDetails.image}
        isJoined={groupDetails.isJoined}
        id={groupId}
        isOwner={groupDetails.isOwner}
      />

      <Box flex={1} px={5}>
        <VStack my={4} flex={1}>
          <FlatList
            ListHeaderComponent={
              <>
                <Text
                  fontSize={22}
                  color={"primary.500"}
                  fontWeight={900}
                  numberOfLines={3}
                >
                  {groupDetails?.name}
                </Text>
                <Text
                  fontSize={"sm"}
                  fontStyle="italic"
                  fontWeight={400}
                  mb={5}
                >
                  Members: {groupDetails?.numberOfMembers}
                </Text>

                <Text numberOfLines={numberOfLines}>{groupDetails?.desc}</Text>
                {numberOfLines && groupDetails?.desc && (
                  <Text
                    color="primary.600"
                    fontWeight="bold"
                    onPress={() => setNumberOfLines(null)}
                  >
                    + Read more
                  </Text>
                )}

                <Text
                  fontSize={18}
                  color={"muted.500"}
                  fontWeight={700}
                  numberOfLines={3}
                  mt={3}
                  mb={5}
                  underline
                >
                  Leaderboard
                </Text>
              </>
            }
            data={groupDetails.members}
            renderItem={renderItems}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </VStack>
      </Box>
    </SafeAreaView>
  );
};
