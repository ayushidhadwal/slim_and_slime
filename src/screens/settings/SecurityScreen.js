import * as React from "react";
import { Box, FormControl, Input, WarningOutlineIcon } from "native-base";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { CustomButton } from "../../components/CustomButton";
import { ForgotPasswordLayout } from "../../components/layouts/ForgotPasswordLayout";
import { theme } from "../../styles/theme";
import { InputRightIcon } from "../../components/icons/InputRightIcon";
import { useMessage } from "../../hooks/useMessage";
import { updatePassword } from "../../store/user/userSlice";

const validate = (values) => {
  const errors = {};

  if (!values.oldPassword) {
    errors.oldPassword = "Current Password is required";
  }

  if (!values.password) {
    errors.password = "Password is required";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Password does not match!";
  }

  return errors;
};

export const SecurityScreen = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);
  const setMessage = useMessage();

  const onSecuritySubmit = (values, { resetForm }) => {
    dispatch(updatePassword(values)).then((result) => {
      if (result?.error?.message) {
        setMessage(result.error.message);
      } else {
        resetForm();
        setMessage("Your password updated successfully.");
      }
    });
  };

  return (
    <ForgotPasswordLayout
      heading="Security"
      description="Notice: Constantly change your passwords to something new for better security."
    >
      <Formik
        initialValues={{ oldPassword: "", password: "", confirmPassword: "" }}
        onSubmit={onSecuritySubmit}
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
              isInvalid={"oldPassword" in errors && touched.oldPassword}
              w="100%"
            >
              <FormControl.Label
                _text={{
                  bold: true,
                }}
              >
                Current Password
              </FormControl.Label>
              <Input
                type="password"
                size="xxl"
                placeholder="Enter a your current password"
                rounded={theme.borderRadius}
                focusOutlineColor={"primary.600"}
                InputRightElement={<InputRightIcon name="lock-closed" />}
                onChangeText={handleChange("oldPassword")}
                onBlur={handleBlur("oldPassword")}
                value={values.oldPassword}
              />

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.oldPassword}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl
              mb={3}
              isInvalid={"password" in errors && touched.password}
              w="100%"
            >
              <FormControl.Label
                _text={{
                  bold: true,
                }}
              >
                Password
              </FormControl.Label>
              <Input
                type="password"
                size="xxl"
                placeholder="Enter a password"
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

            <FormControl
              mb={10}
              isInvalid={"confirmPassword" in errors && touched.confirmPassword}
              w="100%"
            >
              <FormControl.Label
                _text={{
                  bold: true,
                }}
              >
                Confirm Password
              </FormControl.Label>
              <Input
                type="password"
                size="xxl"
                placeholder="Confirm your password"
                rounded={theme.borderRadius}
                focusOutlineColor={"primary.600"}
                InputRightElement={<InputRightIcon name="lock-closed" />}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
              />

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.confirmPassword}
              </FormControl.ErrorMessage>
            </FormControl>

            <CustomButton
              title="Update Password"
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
