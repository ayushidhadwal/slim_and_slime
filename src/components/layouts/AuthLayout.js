import * as React from "react";
import { Dimensions } from "react-native";
import { Box, Center, Image, StatusBar, Text } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

const { height, width } = Dimensions.get("window");

export const AuthLayout = ({ children, description, heading }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Box flex={1} px={5} pt={12} pb={5}>
          <Center>
            <Box h={height / 6} w={width / 2.5}>
              <Image
                source={require("../../../assets/images/slim-gym.png")}
                alt="image"
                size="xl"
                h={"100%"}
                width={"100%"}
                resizeMode={"contain"}
              />
            </Box>
          </Center>

          <Box mt={8} mb={10}>
            <Text fontSize={24} mb={3} color={"primary.500"} fontWeight={900}>
              {heading}
            </Text>
            <Text fontSize={"md"} fontWeight={700}>
              {description}
            </Text>
          </Box>
          {children}
        </Box>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
