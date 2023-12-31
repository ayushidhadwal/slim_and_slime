import * as React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Box, FormControl, HStack, Image, Pressable, Text } from "native-base";

import { pickImage } from "../utils";
import { theme } from "../styles/theme";
import { ErrorText } from "./ErrorText";
import { useEffect, useState } from "react";
import { useMessage } from "../hooks/useMessage";

export const ImagePickerInput = ({
  label,
  mb,
  value = { uri: "", name: "", type: "" },
  onChange,
  aspectRatio = [2, 2],
  helperText = "",
  error = "",
}) => {
  const [isError, setIsError] = useState(false);

  const setMessage = useMessage();

  useEffect(() => {
    setIsError(false);
  }, [value.uri]);

  return (
    <>
      <FormControl.Label
        _text={{
          bold: true,
        }}
      >
        {label}
      </FormControl.Label>
      <Pressable
        onPress={async () => {
          try {
            setMessage(null);
            const image = await pickImage({ aspect: aspectRatio });
            if (image) {
              onChange(image);
            }
          } catch (e) {
            setMessage(e.message);
          }
        }}
        mb={mb}
      >
        <HStack alignItems={"center"} py={2} space={3}>
          <Box
            w={50}
            h={12}
            bgColor={value.uri && !isError ? "#FFF" : "primary.50"}
            justifyContent="center"
            alignItems="center"
            borderRadius={theme.borderRadius}
          >
            {value.uri && !isError ? (
              <Image
                key={value?.uri}
                source={value}
                alt="Image"
                size="xl"
                h="100%"
                width="100%"
                resizeMode="cover"
                rounded={50}
                onError={() => setIsError(true)}
              />
            ) : (
              <Ionicons name="md-attach-outline" size={24} />
            )}
          </Box>
          <Text fontWeight={500} color="muted.300" fontSize={12}>
            {helperText}
          </Text>
        </HStack>
        <ErrorText error={error} />
      </Pressable>
    </>
  );
};
