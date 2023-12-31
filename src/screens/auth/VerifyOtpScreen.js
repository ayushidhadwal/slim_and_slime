import * as React from "react";
import { Box, Text } from "native-base";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { ForgotPasswordLayout } from "../../components/layouts/ForgotPasswordLayout";
import { CustomButton } from "../../components/CustomButton";
import { useMessage } from "../../hooks/useMessage";
import { sendCode, verifyCode } from "../../store/auth/forgotPasswordSlice";
import OtpInput from "../../components/OtpInput";
import ResendCounter from "../../components/ResendCounter";
import { useCallback } from "react";

const validate = (values) => {
  const errors = {};

  if (values.userOtp.length !== 4) {
    errors.userOtp = "Please enter valid OTP!";
  }

  return errors;
};

export const VerifyOtpScreen = ({ navigation, route }) => {
  const { email } = route.params;

  const dispatch = useDispatch();
  const { isLoading, code } = useSelector((state) => state.forgotPassword);
  const setMessage = useMessage();

  console.log(code);

  const onVerifyOtpSubmit = ({ userOtp }) => {
    dispatch(verifyCode({ code: userOtp })).then((result) => {
      if (result?.error?.message) {
        setMessage(result.error.message);
      } else {
        navigation.replace("NewPassword");
      }
    });
  };

  const resendOTP = useCallback(async () => {
    const result = await dispatch(sendCode({ email }));
    if (result?.error?.message) {
      setMessage(result.error.message);
    } else {
      return true;
    }
  }, []);

  return (
    <ForgotPasswordLayout
      heading="Verify OTP"
      description={
        <Text>
          We have sent verification code to your registered email address{" "}
          <Text fontWeight={800} color="primary.400">
            "{email.toLowerCase()}"
          </Text>
          . Please enter the verification code below.
        </Text>
      }
    >
      <Formik
        initialValues={{ userOtp: "" }}
        onSubmit={onVerifyOtpSubmit}
        validate={validate}
      >
        {({ handleChange, handleSubmit, errors }) => (
          <Box>
            <OtpInput
              isInvalid={errors.userOtp}
              numberOfInput={4}
              onChangeText={handleChange("userOtp")}
              autoFocus={true}
            />

            <CustomButton
              title="Verify"
              onPress={handleSubmit}
              spinnerPlacement="end"
              isLoadingText="Submitting"
              mb={5}
              isLoading={isLoading}
            />

            <ResendCounter onPress={resendOTP} />
          </Box>
        )}
      </Formik>
    </ForgotPasswordLayout>
  );
};
