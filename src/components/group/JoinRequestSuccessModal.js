import React from "react";
import { Dimensions, ImageBackground, Modal } from "react-native";
import { Box, Button, Icon, Image, Text, VStack } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";

import { theme } from "../../styles/theme";

const { width } = Dimensions.get("window");
const BG_IMAGE = require("../../../assets/images/backgroundImg.png");

export const JoinRequestSuccessModal = ({ visible, onPress }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
    >
      <Box
        flex={1}
        bg="rgba(0, 0, 0, 0.3)"
        alignItems="center"
        justifyContent="center"
      >
        <ImageBackground
          source={BG_IMAGE}
          resizeMode="cover"
          style={{
            width: width - 50,
            alignItems: "center",
          }}
        >
          <VStack m={3} rounded={theme.borderRadius} p={5} alignItems="center">
            <Image
              w={100}
              h={100}
              resizeMode="contain"
              source={require("../../../assets/images/success.png")}
              alt="Success Image"
              mb={5}
            />
            <Text color="yellow.500" fontWeight="bold" fontSize={22} mb={3}>
              Great!
            </Text>

            <Text mb={3}>Your request is send successfully.</Text>

            <Button
              py={1}
              _text={{ fontWeight: 800 }}
              leftIcon={<Icon as={Ionicons} name="md-home" size="sm" />}
              onPress={onPress}
            >
              Go To Home
            </Button>
          </VStack>
        </ImageBackground>
      </Box>
    </Modal>
  );
};
