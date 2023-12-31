import * as React from "react";
import { Box, FormControl, Input, WarningOutlineIcon } from "native-base";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { CustomButton } from "../../components/CustomButton";
import { ForgotPasswordLayout } from "../../components/layouts/ForgotPasswordLayout";
import { theme } from "../../styles/theme";
import { InputRightIcon } from "../../components/icons/InputRightIcon";
import { useMessage } from "../../hooks/useMessage";
import { resetPassword } from "../../store/auth/forgotPasswordSlice";

const validate = (values) => {
  const errors = {};

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

export const NewPasswordScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.forgotPassword);
  const setMessage = useMessage();

  const onResetPasswordSubmit = ({ password, confirmPassword }) => {
    dispatch(resetPassword({ password, confirmPassword })).then((result) => {
      if (result?.error?.message) {
        setMessage(result.error.message);
      } else {
        setMessage("Your password reset successfully.");
        navigation.navigate("Login");
      }
    });
  };

  return (
    <ForgotPasswordLayout
      heading="Reset Password"
      description="Please create a new password. Your new password should be different from your previous passwords."
    >
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        onSubmit={onResetPasswordSubmit}
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
              title="Reset Password"
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
