import React from "react";
import { Box, Divider, StatusBar, Text, VStack } from "native-base";
import { useDispatch } from "react-redux";

import { SettingsItem } from "../../components/SettingsItem";
import { SettingsProfileCard } from "../../components/SettingsProfileCard";
import { logout } from "../../store/auth/authSlice";
import { theme } from "../../styles/theme";
import { openLinkInBrowser } from "../../utils";
import { PRIVACY_POLICY, TERMS_AND_CONDITIONS } from "../../constants/common";

export const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const logoutHandler = () => dispatch(logout());

  return (
    <Box flex={1} backgroundColor="#FFF">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <VStack m={5}>
        <SettingsProfileCard
          onPress={() => navigation.navigate("EditProfile")}
        />

        <VStack
          shadow={2}
          rounded={theme.borderRadius}
          bgColor={"#FFF"}
          my={10}
          p={5}
        >
          <SettingsItem
            title="Security"
            onPress={() => navigation.navigate("Security")}
            icon="lock-open-outline"
          />
          <SettingsItem
            title="Delete Account"
            onPress={() => navigation.navigate("DeleteAccount")}
            icon="md-warning-outline"
          />
          <SettingsItem
            title="About Us"
            onPress={() => navigation.navigate("AboutUs")}
            icon="md-information-circle-outline"
          />
          <SettingsItem
            title="Privacy Policy"
            onPress={() => openLinkInBrowser(PRIVACY_POLICY)}
            icon="md-document-text-outline"
          />
          <SettingsItem
            title="Terms & Conditions"
            onPress={() => openLinkInBrowser(TERMS_AND_CONDITIONS)}
            icon="md-document-text-outline"
          />
          <Divider my={3} />
          <SettingsItem
            onPress={logoutHandler}
            title={
              <Text color="primary.600" fontWeight={700}>
                Logout
              </Text>
            }
            icon="md-log-out-sharp"
            rightIcon={false}
            iconColor="#1670b0"
          />
        </VStack>
      </VStack>
    </Box>
  );
};
