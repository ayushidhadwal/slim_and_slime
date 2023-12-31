import React, { useState } from "react";
import { Button, Center, Image, Modal, Text } from "native-base";

export const AppUpdate = () => {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      animationPreset="slide"
      bg="primary.900:alpha.90"
      isOpen={open}
      safeAreaTop={true}
    >
      <Center zIndex={1}>
        <Image
          source={require("../../assets/images/rocket.png")}
          size={"md"}
          resizeMode={"contain"}
          alt={"text"}
          position={"absolute"}
          top={-25}
          shadow={5}
        />
      </Center>
      <Modal.Content>
        <Modal.Body _scrollview={{ scrollEnabled: false }}>
          <Text
            fontWeight="bold"
            fontSize={"xl"}
            color={"black"}
            textAlign={"center"}
            mt={10}
          >
            We are better than Ever
          </Text>
          <Text
            fontWeight="bold"
            fontSize={"sm"}
            color={"#6c6c6c"}
            textAlign={"center"}
            my={4}
          >
            The current version of the application is no longer supported.
            Please update the app.
          </Text>
          <Button onPress={() => setOpen(false)} colorScheme="primary">
            Update New Version
          </Button>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
