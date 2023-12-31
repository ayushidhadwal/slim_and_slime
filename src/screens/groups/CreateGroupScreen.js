import * as React from "react";
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
import { createGroup } from "../../store/group/groupSlice";
import { GroupRadio } from "../../components/group/GroupRadio";
import { ImagePickerInput } from "../../components/ImagePickerInput";

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

  if (!values.groupImage?.name) {
    errors.groupImage = "Group Image is required";
  }

  if (!values.coverImage?.name) {
    errors.coverImage = "Cover Image is required";
  }

  return errors;
};

export const CreateGroupScreen = () => {
  const setMessage = useMessage();
  const dispatch = useDispatch();
  const {
    myGroups: { isLoading },
  } = useSelector((state) => state.group);

  const onUpdateProfileSubmit = (
    { name, membersLimit, privacy, desc, groupImage, coverImage },
    { resetForm }
  ) => {
    dispatch(
      createGroup({
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
        resetForm();
        setMessage("Group created successfully.");
      }
    });
  };

  return (
    <ForgotPasswordLayout
      heading="Create Group"
      description="You can create a new group by completing the form below."
    >
      <Formik
        initialValues={{
          name: "",
          membersLimit: "",
          desc: "",
          privacy: "PUBLIC",
          groupImage: { uri: "", name: "", type: "" },
          coverImage: { uri: "", name: "", type: "" },
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
              value={values.groupImage}
              onChange={async (image) => {
                setFieldValue("groupImage", image);
              }}
              error={errors.groupImage}
              mb={3}
              aspectRatio={[2, 2]}
              helperText="Choose group image"
            />

            <ImagePickerInput
              label="Group Cover Image"
              value={values.coverImage}
              onChange={async (image) => {
                setFieldValue("coverImage", image);
              }}
              error={errors.coverImage}
              mb={10}
              aspectRatio={[4, 2]}
              helperText="Choose group cover image"
            />

            <CustomButton
              title="Create Group"
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
