import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  WarningOutlineIcon,
  Input,
  Radio,
} from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";

import { CustomButton } from "../../components/CustomButton";
import { useMessage } from "../../hooks/useMessage";
import { ForgotPasswordLayout } from "../../components/layouts/ForgotPasswordLayout";
import { theme } from "../../styles/theme";
import { InputRightIcon } from "../../components/icons/InputRightIcon";
import { updateGroup } from "../../store/group/groupSlice";
import { GroupRadio } from "../../components/group/GroupRadio";
import { ImagePickerInput } from "../../components/ImagePickerInput";
import { BASE_URL } from "../../constants/common";

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Name is required";
  }

  if (!values.membersLimit) {
    errors.membersLimit = "Member's limit is required";
  }

  if (!values.desc) {
    errors.desc = "Description is required";
  }

  return errors;
};

export const EditGroupScreen = ({ route, navigation }) => {
  const { group } = route.params;

  const [coverImage, setCoverImage] = useState({ uri: "", name: "", type: "" });
  const [groupImage, setGroupImage] = useState({ uri: "", name: "", type: "" });

  const setMessage = useMessage();
  const dispatch = useDispatch();
  const {
    myGroups: { isLoading },
  } = useSelector((state) => state.group);

  const onUpdateProfileSubmit = ({ name, membersLimit, privacy, desc }) => {
    dispatch(
      updateGroup({
        id: group.id,
        name,
        coverImage,
        privacy,
        groupImage,
        numberOfMembers: membersLimit,
        desc,
      })
    ).then((result) => {
      if (result?.error?.message) {
        setMessage(result.error.message);
      } else {
        setGroupImage((prevState) => ({ ...prevState, name: "", type: "" }));
        setCoverImage((prevState) => ({ ...prevState, name: "", type: "" }));
        setMessage("Group updated successfully.");
        navigation.goBack();
      }
    });
  };

  useEffect(() => {
    if (group.groupImage) {
      setGroupImage({
        uri: BASE_URL + "/" + group.groupImage,
        name: "",
        type: "",
      });
    }
  }, [group.groupImage]);

  useEffect(() => {
    if (group.coverImage) {
      setCoverImage({
        uri: BASE_URL + "/" + group.coverImage,
        name: "",
        type: "",
      });
    }
  }, [group.coverImage]);

  return (
    <ForgotPasswordLayout
      heading="Edit Group"
      description="You can edit your group's details from here."
    >
      <Formik
        initialValues={{
          name: group.name,
          membersLimit: String(group.limit),
          desc: group.desc,
          privacy: group.privacy,
        }}
        onSubmit={onUpdateProfileSubmit}
        validate={validate}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <Box>
            <FormControl
              mb={3}
              isInvalid={"name" in errors && touched.name}
              w="100%"
            >
              <FormControl.Label
                _text={{
                  bold: true,
                }}
              >
                Name
              </FormControl.Label>
              <Input
                type="text"
                size="xxl"
                placeholder="Enter your name"
                rounded={theme.borderRadius}
                focusOutlineColor={"primary.600"}
                InputRightElement={<InputRightIcon name="md-person" />}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
              />

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.name}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl
              mb={3}
              isInvalid={"membersLimit" in errors && touched.membersLimit}
              w="100%"
            >
              <FormControl.Label
                _text={{
                  bold: true,
                }}
              >
                Limit Members
              </FormControl.Label>
              <Input
                type="text"
                size="xxl"
                placeholder="Enter member's limit"
                rounded={theme.borderRadius}
                focusOutlineColor={"primary.600"}
                InputRightElement={<InputRightIcon name="md-person-add" />}
                onChangeText={(value) => {
                  setFieldValue("membersLimit", value.replace(/[^0-9]/g, ""));
                }}
                onBlur={handleBlur("membersLimit")}
                value={values.membersLimit}
                keyboardType="number-pad"
              />

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.membersLimit}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl
              mb={5}
              isInvalid={"desc" in errors && touched.desc}
              w="100%"
            >
              <FormControl.Label
                _text={{
                  bold: true,
                }}
              >
                Description
              </FormControl.Label>
              <Input
                type="text"
                size="xxl"
                placeholder="Enter description"
                rounded={theme.borderRadius}
                focusOutlineColor={"primary.600"}
                onChangeText={handleChange("desc")}
                onBlur={handleBlur("desc")}
                value={values.desc}
                multiline={true}
                numberOfLines={3}
                textAlignVertical="top"
                pt={3}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.desc}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl.Label
              _text={{
                bold: true,
              }}
            >
              Privacy
            </FormControl.Label>
            <Radio.Group
              name="Privacy"
              accessibilityLabel="Privacy"
              value={values.privacy}
              onChange={(nextValue) => {
                setFieldValue("privacy", nextValue);
              }}
            >
              <GroupRadio
                icon="md-globe-outline"
                heading="Public"
                subheading="Anyone can join"
                onPress={() => setFieldValue("privacy", "PUBLIC")}
              >
                <Radio value="PUBLIC" accessibilityLabel="public" />
              </GroupRadio>

              <GroupRadio
                icon="md-lock-closed-outline"
                heading="Private"
                subheading="Request to join"
                onPress={() => setFieldValue("privacy", "PRIVATE")}
              >
                <Radio value="PRIVATE" accessibilityLabel="private" />
              </GroupRadio>
            </Radio.Group>

            <ImagePickerInput
              label="Group Image"
              value={groupImage}
              onChange={async (image) => setGroupImage(image)}
              mb={3}
              aspectRatio={[2, 2]}
              helperText="Choose group image"
            />

            <ImagePickerInput
              label="Group Cover Image"
              value={coverImage}
              onChange={async (image) => setCoverImage(image)}
              mb={10}
              aspectRatio={[4, 2]}
              helperText="Choose group cover image"
            />

            <CustomButton
              title="Update Group"
              onPress={handleSubmit}
              spinnerPlacement="end"
              isLoadingText="Submitting"
              isLoading={isLoading}
            />
          </Box>
        )}
      </Formik>
    </ForgotPasswordLayout>
  );
};
