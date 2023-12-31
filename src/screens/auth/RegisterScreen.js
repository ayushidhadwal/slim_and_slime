import React, { useCallback } from "react";
import {
  Box,
  Checkbox,
  CheckIcon,
  FormControl,
  HStack,
  Input,
  Select,
  Text,
  WarningOutlineIcon,
} from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";

import { AuthLayout } from "../../components/layouts/AuthLayout";
import { CustomButton } from "../../components/CustomButton";
import { useMessage } from "../../hooks/useMessage";
import { register } from "../../store/auth/authSlice";
import { theme } from "../../styles/theme";
import { InputRightIcon } from "../../components/icons/InputRightIcon";
import { UNITS, GENDERS } from "../../utils/fitness";
import WeightPicker from "../../components/WeightPicker";
import HeightPicker from "../../components/HeightPicker";
import { openLinkInBrowser } from "../../utils";
import { PRIVACY_POLICY, TERMS_AND_CONDITIONS } from "../../constants/common";

const validate = (values) => {
  const errors = {};

  if (values.eua === false) {
    errors.eua = "Please read and accept EUA";
  }

  if (!values.name) {
    errors.name = "Name is required";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  }

  if (!values.gender) {
    errors.gender = "Gender is required";
  }

  if (!values.unit) {
    errors.unit = "Unit is required";
  }

  if (!values.weight || !Number(values.weight)) {
    errors.weight = "Weight is required!";
  } else if (Number.isNaN(Number(values.weight))) {
    errors.weight = "Only numbers are allowed!";
  }

  if (!values.height || !Number(values.height)) {
    errors.height = "Height is required!";
  } else if (Number.isNaN(Number(values.height))) {
    errors.height = "Only numbers are allowed!";
  }

  return errors;
};

export const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const setMessage = useMessage();

  const onRegisterSubmit = useCallback(
    (values, { resetForm }) =>
      dispatch(register(values)).then((result) => {
        if (result?.error?.message) {
          setMessage(result.error.message);
        } else {
          resetForm();
        }
      }),
    []
  );

  return (
    <AuthLayout
      heading="Welcome !"
      description="Hello there, register to continue"
    >
      <Formik
        initialValues={{
          name: "",
          gender: "",
          height: "",
          weight: "",
          email: "",
          password: "",
          unit: "IMPERIAL",
          eua: false,
        }}
        onSubmit={onRegisterSubmit}
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
              <FormControl.Label>Name</FormControl.Label>
              <Input
                type="text"
                size="xxl"
                placeholder="Enter your Name"
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
                size="xxl"
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
                dropdownIcon={<InputRightIcon name="caret-down" />}
              >
                <Select.Item label="Male" value={GENDERS.MALE} />
                <Select.Item label="Female" value={GENDERS.FEMALE} />
                <Select.Item label="Others" value={GENDERS.OTHERS} />
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
              mb={3}
              isInvalid={"email" in errors && touched.email}
              w="100%"
            >
              <FormControl.Label>Email</FormControl.Label>
              <Input
                type="email"
                size="xxl"
                placeholder="Enter your Email"
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

            <FormControl
              isInvalid={"password" in errors && touched.password}
              w="100%"
              mb={3}
            >
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type="password"
                size="xxl"
                placeholder="Enter your Password"
                rounded={theme.borderRadius}
                focusOutlineColor={"primary.600"}
                InputRightElement={<InputRightIcon name="lock-closed" />}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.password}
              </FormControl.ErrorMessage>
            </FormControl>

            <HStack mb={10} mt={3} space={2} alignItems="flex-start">
              <Box mt={1}>
                <Checkbox
                  onChange={(v) => setFieldValue("eua", v)}
                  isInvalid={"eua" in errors}
                  accessibilityLabel="I have read and I accept the terms and conditions and privacy
                policy."
                  value="accepted"
                  isChecked={values.eua}
                />
              </Box>
              <Text
                flexShrink={1}
                fontWeight={600}
                onPress={() => setFieldValue("eua", !values.eua)}
                fontSize={13}
              >
                I have read and I accept the{" "}
                <Text
                  onPress={() => openLinkInBrowser(TERMS_AND_CONDITIONS)}
                  color="primary.600"
                  fontWeight={700}
                >
                  Terms & Conditions
                </Text>{" "}
                and{" "}
                <Text
                  onPress={() => openLinkInBrowser(PRIVACY_POLICY)}
                  color="primary.600"
                  fontWeight={700}
                >
                  Privacy Policy
                </Text>
                .
              </Text>
            </HStack>

            <CustomButton
              title="Register"
              onPress={handleSubmit}
              mb={5}
              isLoading={isLoading}
              spinnerPlacement="end"
              isLoadingText="Submitting"
            />

            <Text textAlign={"center"} fontWeight={"700"}>
              Already have an Account ?{" "}
              <Text
                color={"primary.500"}
                fontWeight={"800"}
                onPress={() => navigation.navigate("Login")}
              >
                Login
              </Text>
            </Text>
          </Box>
        )}
      </Formik>
    </AuthLayout>
  );
};
