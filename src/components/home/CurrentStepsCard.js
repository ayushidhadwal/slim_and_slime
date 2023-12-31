import * as React from "react";
import { Dimensions, ImageBackground } from "react-native";
import { Box, Divider, HStack, Text, VStack } from "native-base";
import { SvgXml } from "react-native-svg";

import { Run } from "../svg";
import { theme } from "../../styles/theme";
import { numberFormat } from "../../utils";

const { width } = Dimensions.get("window");

/**
 *
 * @param currentSteps {number}
 * @param averageSteps {number}
 * @returns {JSX.Element}
 * @constructor
 */
export const CurrentStepsCard = ({ currentSteps, averageSteps }) => {
  return (
    <Box rounded={theme.borderRadius} pb={3}>
      <Box shadow={1}>
        <ImageBackground
          source={require("../../../assets/images/HomeBanner.png")}
          resizeMode="stretch"
        >
          <HStack justifyContent={"space-between"} m={5}>
            <VStack>
              <Text fontWeight="400" color="#FFF">
                Steps
              </Text>
              <Box w={8}>
                <Divider ml={4} />
              </Box>
              <Text mt={1} fontWeight="800" color="#FFF" fontSize="xl">
                {numberFormat(currentSteps)}
              </Text>
            </VStack>
            <SvgXml xml={Run} width={"60"} height={"60"} />
          </HStack>
        </ImageBackground>
      </Box>

      <Text textAlign="center" fontWeight="600" my={1} fontSize="sm">
        7 Days Average - {numberFormat(averageSteps)} steps
      </Text>
      <Box h={0.4} bg={"muted.400"} w={width / 3.5} alignSelf="center" />
    </Box>
  );
};
