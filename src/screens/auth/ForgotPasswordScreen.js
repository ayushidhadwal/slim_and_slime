import * as React from "react";
import { Box, FormControl, Input, WarningOutlineIcon } from "native-base";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { CustomButton } from "../../components/CustomButton";
import { ForgotPasswordLayout } from "../../components/layouts/ForgotPasswordLayout";
import { theme } from "../../styles/theme";
import { InputRightIcon } from "../../components/icons/InputRightIcon";
import { useMessage } from "../../hooks/useMessage";
import { sendCode } from "../../store/auth/forgotPasswordSlice";

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

export const ForgotPasswordScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.forgotPassword);
  const setMessage = useMessage();

  const onForgotPasswordSubmit = (values) => {
    dispatch(sendCode(values)).then((result) => {
      if (result?.error?.message) {
        setMessage(result.error.message);
      } else {
        navigation.navigate("VerifyOtp", {
          email: values.email,
        });
      }
    });
  };

  return (
    <ForgotPasswordLayout
      heading="Forgot Password ?"
      description="A Verification code will be sent to you email and you will need to
          enter email address to proceed."
      image={require("../../../assets/images/forgotPassword.png")}
    >
      <Formik
        initialValues={{ email: "" }}
        onSubmit={onForgotPasswordSubmit}
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
              mb={10}
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
                placeholder="Enter your registered email"
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

            <CustomButton
              title="Send"
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
