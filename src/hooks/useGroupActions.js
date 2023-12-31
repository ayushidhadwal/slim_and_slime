import { useDispatch } from "react-redux";
import { Alert } from "react-native";

import {
  deleteGroup,
  leaveGroup,
  removeGroupMember,
} from "../store/group/groupSlice";
import { useMessage } from "./useMessage";

export const useGroupActions = (id = null, callback = null) => {
  const dispatch = useDispatch();
  const setMessage = useMessage();

  const onLeave = () => {
    Alert.alert(
      "Please Confirm!",
      "Are you sure you want to leave this group.",
      [
        {
          style: "destructive",
          text: "Leave",
          onPress: () => {
            dispatch(leaveGroup({ id })).then((result) => {
              if (result?.error?.message) {
                setMessage(result.error.message);
              } else {
                setMessage("Group left successfully.");
                if (callback) {
                  callback();
                }
              }
            });
          },
        },
        { text: "Cancel" },
      ]
    );
  };

  const onDelete = () => {
    Alert.alert(
      "Please Confirm!",
      "Are you sure you want to delete this group, this action cannot be undone.",
      [
        {
          style: "destructive",
          text: "Delete",
          onPress: () => {
            dispatch(deleteGroup({ id })).then((result) => {
              if (result?.error?.message) {
                setMessage(result.error.message);
              } else {
                setMessage("Group deleted successfully.");
                if (callback) {
                  callback();
                }
              }
            });
          },
        },
        { text: "Cancel" },
      ]
    );
  };

  const onRemoveMember = ({ groupId, memberId }) => {
    Alert.alert(
      "Please Confirm!",
      "Are you sure you want to remove this member, this action cannot be undone.",
      [
        {
          style: "destructive",
          text: "Yes, remove",
          onPress: () => {
            dispatch(removeGroupMember({ groupId, memberId })).then(
              (result) => {
                if (result?.error?.message) {
                  setMessage(result.error.message);
                } else {
                  setMessage("removed successfully.");
                }
              }
            );
          },
        },
        { text: "Cancel" },
      ]
    );
  };

  return { onLeave, onDelete, onRemoveMember };
};
