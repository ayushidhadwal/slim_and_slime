import * as React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  HStack,
  Text,
  WarningOutlineIcon,
  Input,
  Pressable,
  Image,
  Select,
  CheckIcon,
} from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { theme } from "../../styles/theme";
import { InputRightIcon } from "../../components/icons/InputRightIcon";
import { CustomButton } from "../../components/CustomButton";
import { ForgotPasswordLayout } from "../../components/layouts/ForgotPasswordLayout";
import { useMessage } from "../../hooks/useMessage";
import { updateProfile } from "../../store/user/userSlice";
import { pickImage } from "../../utils";
import { BASE_URL } from "../../constants/common";
import { UNITS } from "../../utils/fitness";
import HeightPicker from "../../components/HeightPicker";
import WeightPicker from "../../components/WeightPicker";

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Name is required";
  }

  if (!values.gender) {
    errors.gender = "Gender is required";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.weight) {
    errors.weight = "Weight is required!";
  } else if (Number.isNaN(Number(values.weight))) {
    errors.weight = "Only numbers are allowed!";
  }

  if (!values.height) {
    errors.height = "Height is required!";
  } else if (Number.isNaN(Number(values.height))) {
    errors.height = "Only numbers are allowed!";
  }

  return errors;
};

export const EditProfileScreen = () => {
  const setMessage = useMessage();
  const dispatch = useDispatch();
  const {
    isLoading,
    name: userName,
    email: userEmail,
    profilePic: userProfilePic,
    height: userHeight,
    weight: userWeight,
    gender: userGender,
    unit: userUnit,
  } = useSelector((state) => state.user);

  const [source, setSource] = useState({ uri: "", name: "", type: "" });

  const onUpdateProfileSubmit = ({
    name,
    email,
    height,
    weight,
    gender,
    unit,
  }) => {
    dispatch(
      updateProfile({
        name,
        email,
        height,
        weight,
        gender,
        profilePic: source,
        unit,
      })
    ).then((result) => {
      if (result?.error?.message) {
        setMessage(result.error.message);
      } else {
        setSource((prevState) => ({ ...prevState, name: "", type: "" }));
        setMessage("Your profile updated successfully.");
      }
    });
  };

  useEffect(() => {
    if (userProfilePic) {
      setSource({ uri: BASE_URL + "/" + userProfilePic, name: "", type: "" });
    }
  }, [userProfilePic]);

  return (
    <ForgotPasswordLayout
      heading="Edit Profile"
      description="Update your profile details."
    >
      <Formik
        initialValues={{
          name: userName,
          email: userEmail,
          height: String(userHeight),
          weight: String(userWeight),
          gender: userGender,
          unit: userUnit,
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
              isInvalid={"gender" in errors && touched.gender}
            >
              <FormControl.Label>Gender</FormControl.Label>
              <Select
                minWidth="200"
                accessibilityLabel="Choose Gender"
                placeholder="Choose Gender"
                _selectedItem={{
                  bg: "muted.200",
                  endIcon: <CheckIcon size={5} />,
                }}
                mt="1"
                onValueChange={handleChange("gender")}
                selectedValue={values.gender}
                size="xxl"
              >
                <Select.Item label="Male" value="MALE" />
                <Select.Item label="Female" value="FEMALE" />
                <Select.Item label="Others" value="OTHERS" />
              </Select>
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.gender}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl mb={3} isInvalid={"unit" in errors && touched.unit}>
              <FormControl.Label>Unit</FormControl.Label>
              <Select
                size="xxl"
                minWidth="200"
                accessibilityLabel="Choose Unit"
                placeholder="Choose Unit"
                _selectedItem={{
                  bg: "muted.200",
                  endIcon: <CheckIcon size={5} />,
                }}
                mt="1"
                onValueChange={handleChange("unit")}
                selectedValue={values.unit}
                dropdownIcon={<InputRightIcon name="caret-down" />}
              >
                <Select.Item
                  label="Imperial - inches/pounds"
                  value={UNITS.IMPERIAL}
                />
                <Select.Item label="Metric - cm/kg" value={UNITS.METRIC} />
              </Select>
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.unit}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl
              mb={3}
              isInvalid={"height" in errors && touched.height}
              w="100%"
            >
              <HeightPicker
                type="height"
                size="xxl"
                rounded={theme.borderRadius}
                focusOutlineColor={"primary.600"}
                InputRightElement={<InputRightIcon name="body" />}
                onChangeText={handleChange("height")}
                onBlur={handleBlur("height")}
                value={values.height}
                keyboardType="number-pad"
                unit={values.unit}
              />

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.height}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl
              mb={3}
              isInvalid={"weight" in errors && touched.weight}
              w="100%"
            >
              <WeightPicker
                type="text"
                size="xxl"
                rounded={theme.borderRadius}
                focusOutlineColor={"primary.600"}
                InputRightElement={<InputRightIcon name="barbell" />}
                onChangeText={handleChange("weight")}
                onBlur={handleBlur("weight")}
                value={values.weight}
                keyboardType="number-pad"
                unit={values.unit}
              />

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.weight}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl
              mb={5}
              isInvalid={"email" in errors && touched.email}
              w="100%"
            >
              <FormControl.Label
                _text={{
                  bold: true,
                }}
              >
                Email
              </FormControl.Label>
              <Input
                type="email"
                size="xxl"
                placeholder="Enter your email"
                rounded={theme.borderRadius}
                focusOutlineColor={"primary.600"}
                InputRightElement={<InputRightIcon name="md-mail" />}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.email}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl.Label
              _text={{
                bold: true,
              }}
            >
              Profile Image
            </FormControl.Label>
            <Pressable
              onPress={async () => {
                try {
                  setMessage(null);
                  const image = await pickImage({ aspect: [2, 2] });
                  if (image) {
                    setSource(image);
                  }
                } catch (e) {
                  setMessage(e.message);
                }
              }}
            >
              <HStack alignItems={"center"} mb={10} py={2} space={3}>
                <Box
                  w={50}
                  h={12}
                  bgColor={source.uri ? "#FFF" : "primary.50"}
                  justifyContent="center"
                  alignItems="center"
                  borderRadius={theme.borderRadius}
                >
                  {source.uri ? (
                    <Image
                      key={source}
                      source={source}
                      alt="User Profile"
                      size="xl"
                      h="100%"
                      width="100%"
                      onError={() => setSource(null)}
                      resizeMode="contain"
                      rounded={50}
                    />
                  ) : (
                    <Ionicons name="md-attach-outline" size={24} />
                  )}
                </Box>
                <Text fontWeight={500} color="muted.300" fontSize={12}>
                  Choose Image
                </Text>
              </HStack>
            </Pressable>

            <CustomButton
              title="Update Profile"
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
