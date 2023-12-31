import React, { useEffect } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import AuthStackNavigator from "./AuthStackNavigator";
import { restoreSession } from "../store/auth/authSlice";
import RootStackNavigator from "./RootStackNavigator";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFF",
  },
};

export const AppNavigation = () => {
  const { userId, isSessionLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreSession());
  }, []);

  if (isSessionLoading) {
    return null;
  }

  return (
    <NavigationContainer theme={MyTheme}>
      {userId ? <RootStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};
