import * as React from "react";
import { Box, FormControl, Input, Text, WarningOutlineIcon } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";

import { CustomButton } from "../../components/CustomButton";
import { AuthLayout } from "../../components/layouts/AuthLayout";
import { InputRightIcon } from "../../components/icons/InputRightIcon";
import { theme } from "../../styles/theme";
import { login } from "../../store/auth/authSlice";
import { useMessage } from "../../hooks/useMessage";

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  }

  return errors;
};

export const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const setMessage = useMessage();

  const onLoginSubmit = (values, { resetForm }) =>
    dispatch(login(values)).then((result) => {
      if (result?.error?.message) {
        setMessage(result.error.message);
      } else {
        resetForm();
      }
    });

  return (
    <AuthLayout
      heading="Welcome !"
      description="Hello there, login to continue"
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={onLoginSubmit}
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

            <Text
              onPress={() => navigation.navigate("ForgotPassword")}
              textAlign="right"
              mb={10}
              fontWeight={800}
            >
              Forgot Password ?
            </Text>

            <CustomButton
              title="Login"
              onPress={handleSubmit}
              mb={5}
              isLoading={isLoading}
              spinnerPlacement="end"
              isLoadingText="Submitting"
            />

            <Text textAlign={"center"} fontWeight={"700"}>
              Don't have an Account ?{" "}
              <Text
                color={"primary.500"}
                fontWeight={"800"}
                onPress={() => navigation.navigate("Register")}
              >
                Register
              </Text>
            </Text>
          </Box>
        )}
      </Formik>
    </AuthLayout>
  );
};
