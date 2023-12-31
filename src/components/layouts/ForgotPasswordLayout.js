import * as React from "react";
import { Dimensions } from "react-native";
import { Box, Center, Image, StatusBar, Text } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

const { height, width } = Dimensions.get("window");

export const ForgotPasswordLayout = ({
  children,
  description,
  heading,
  image,
}) => {
  return (
    <SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Box flex={1} px={5} mt={3} mb={5}>
          <Box mb={10}>
            <Text fontSize={24} mb={3} color={"primary.500"} fontWeight={900}>
              {heading}
            </Text>
            <Text fontSize={"md"} fontWeight={600}>
              {description}
            </Text>
          </Box>

          {image && (
            <Center mb={3}>
              <Box h={height / 3.5} w={width / 1.5}>
                <Image
                  source={image}
                  alt="image"
                  size="xl"
                  h={"100%"}
                  width={"100%"}
                  resizeMode={"contain"}
                />
              </Box>
            </Center>
          )}
          {children}
        </Box>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
