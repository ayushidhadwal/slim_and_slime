import React from "react";
import {
  Box,
  FormControl,
  Input,
  ScrollView,
  StatusBar,
  Text,
  WarningOutlineIcon,
} from "native-base";
import { Alert, SafeAreaView } from "react-native";
import { Formik } from "formik";
import { InputRightIcon } from "../../components/icons/InputRightIcon";
import { theme } from "../../styles/theme";
import { CustomButton } from "../../components/CustomButton";
import { useMessage } from "../../hooks/useMessage";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth/authSlice";
import { deleteAccount } from "../../store/user/userSlice";

const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = "Password is required";
  }

  return errors;
};

export const DeleteAccountScreen = () => {
  const { isLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const logoutHandler = () => dispatch(logout());

  const setMessage = useMessage();
  const onDeleteSubmit = (values) => {
    Alert.alert(
      "Please confirm.",
      "Are you sure you want to delete your account permanently? account cannot be recovered once deleted, and all your data will be lost!",
      [
        {
          text: "Delete Account & Log out",
          onPress: () => deleteAccountHandler(values.password),
          style: "destructive",
        },
        { text: "Cancel" },
      ]
    );
  };

  const deleteAccountHandler = async (password) => {
    const result = await dispatch(deleteAccount({ password }));
    if (result?.error?.message) {
      setMessage(result.error.message);
    } else {
      setMessage("Your account is deleted successfully.");
      logoutHandler();
    }
  };

  return (
    <SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box flex={1} px={5} mt={3} mb={5}>
          <Text fontSize={24} mb={3} color={"primary.500"} fontWeight={900}>
            Delete Account
          </Text>

          <Formik
            initialValues={{
              password: "",
            }}
            onSubmit={onDeleteSubmit}
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

                <CustomButton
                  title="Proceed"
                  onPress={handleSubmit}
                  mb={5}
                  isLoading={isLoading}
                  spinnerPlacement="end"
                  isLoadingText="Submitting"
                />
              </Box>
            )}
          </Formik>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
