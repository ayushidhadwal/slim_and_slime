import React, { useCallback, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Provider as StoreProvider } from "react-redux";
import { SheetProvider } from "react-native-actions-sheet";
import * as Notifications from "expo-notifications";
import "./Sheets";
import { AppNavigation } from "./src/navigation/AppNavigation";
import { nativeBaseTheme } from "./src/styles/native-base-theme";
import { store } from "./src/store";
import "./src/utils/axios-default";
import { AppUpdate } from "./src/components/AppUpdate";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const App = () => {
  const [fontsLoaded] = useFonts({
    "OpenSans-Light": require("./assets/fonts/OpenSans/OpenSans-Light.ttf"),
    "OpenSans-LightItalic": require("./assets/fonts/OpenSans/OpenSans-LightItalic.ttf"),
    "OpenSans-Regular": require("./assets/fonts/OpenSans/OpenSans-Regular.ttf"),
    "OpenSans-Italic": require("./assets/fonts/OpenSans/OpenSans-Italic.ttf"),
    "OpenSans-Medium": require("./assets/fonts/OpenSans/OpenSans-Medium.ttf"),
    "OpenSans-MediumItalic": require("./assets/fonts/OpenSans/OpenSans-MediumItalic.ttf"),
    "OpenSans-SemiBold": require("./assets/fonts/OpenSans/OpenSans-SemiBold.ttf"),
    "OpenSans-SemiBoldItalic": require("./assets/fonts/OpenSans/OpenSans-SemiBoldItalic.ttf"),
    "OpenSans-Bold": require("./assets/fonts/OpenSans/OpenSans-Bold.ttf"),
    "OpenSans-BoldItalic": require("./assets/fonts/OpenSans/OpenSans-BoldItalic.ttf"),
    "OpenSans-ExtraBold": require("./assets/fonts/OpenSans/OpenSans-ExtraBold.ttf"),
    "OpenSans-ExtraBoldItalic": require("./assets/fonts/OpenSans/OpenSans-ExtraBoldItalic.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <NativeBaseProvider theme={nativeBaseTheme}>
        <SheetProvider>
          <StoreProvider store={store}>
            <AppUpdate />
            <AppNavigation />
          </StoreProvider>
        </SheetProvider>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};

export default App;
