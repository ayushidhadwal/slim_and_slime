import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginScreen } from "../screens/auth/LoginScreen";
import { ForgotPasswordScreen } from "../screens/auth/ForgotPasswordScreen";
import { NewPasswordScreen } from "../screens/auth/NewPasswordScreen";
import { RegisterScreen } from "../screens/auth/RegisterScreen";
import { OnBoardingScreen } from "../screens/onboarding/OnBoardingScreen";
import { VerifyOtpScreen } from "../screens/auth/VerifyOtpScreen";
import { HeaderBackIcon } from "../components/icons/HeaderBackIcon";

const Stack = createNativeStackNavigator();

export const screenOptions = ({ navigation }) => {
  return {
    headerShadowVisible: false,
    headerTitleAlign: "center",
    headerLeft: () => {
      if (navigation.canGoBack()) {
        return <HeaderBackIcon onPress={navigation.goBack} />;
      }
      return null;
    },
    headerTitle: "",
  };
};

function AuthStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="OnBoarding"
      screenOptions={screenOptions}
    >
      <Stack.Screen
        name="OnBoarding"
        component={OnBoardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AuthStackNavigator;
