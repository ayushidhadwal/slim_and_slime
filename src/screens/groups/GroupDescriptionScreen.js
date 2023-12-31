import React, { useState } from "react";
import { Box, ScrollView, Text } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GroupHeader } from "../../components/group/GroupHeader";
import { CustomButton } from "../../components/CustomButton";
import { useMessage } from "../../hooks/useMessage";
import { joinGroup } from "../../store/group/groupSlice";
import { JoinRequestSuccessModal } from "../../components/group/JoinRequestSuccessModal";

const { height } = Dimensions.get("window");

export const GroupDescriptionScreen = ({ navigation, route }) => {
  const { group } = route.params;

  const dispatch = useDispatch();
  const setMessage = useMessage();
  const { myGroups } = useSelector((state) => state.group);

  const [success, setSuccess] = useState(false);

  const joinGroupHandler = () => {
    dispatch(joinGroup({ id: group.id, privacy: group.privacy })).then(
      (result) => {
        if (result?.error?.message) {
          setMessage(result.error.message);
        } else {
          if (group.privacy === "PRIVATE") {
            setSuccess(true);
          } else {
            setMessage("Joined Successfully");
            navigation.replace("LeaderBoard", { groupId: group.id });
          }
        }
      }
    );
  };

  return (
    <SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
      <JoinRequestSuccessModal
        visible={success}
        onPress={() =>
          navigation.replace("BottomTabs", {
            screen: "Groups",
          })
        }
      />
      <ScrollView style={{ height: height }}>
        <GroupHeader cover={group.coverImage} profile={group.groupImage} />

        <Box px={5}>
          <Text
            fontSize={22}
            color={"primary.500"}
            fontWeight={900}
            numberOfLines={3}
          >
            {group.name}
          </Text>
          <Text fontSize={"sm"} fontStyle="italic" fontWeight={400} mb={5}>
            Members: {group.limit}
          </Text>

          <Text>{group.desc}</Text>
        </Box>
      </ScrollView>
      <Box p={5}>
        <CustomButton
          title={
            group.privacy === "PRIVATE" ? "Send Join Request" : "Join Group"
          }
          onPress={joinGroupHandler}
          isLoading={myGroups.isLoading}
          spinnerPlacement="end"
          isLoadingText="Submitting"
        />
      </Box>
    </SafeAreaView>
  );
};
