import React from "react";
import { Box, HStack, Text, VStack } from "native-base";
import { ImageBackground } from "react-native";
import { SvgXml } from "react-native-svg";

import { Calorie, Distance } from "../svg";
import { useSelector } from "react-redux";
import { UNITS } from "../../utils/fitness";

const SummaryCard = ({ bgImg, heading, value, icon }) => {
  return (
    <Box h={100} flex={1} shadow={1}>
      <ImageBackground
        source={bgImg}
        resizeMode="contain"
        style={{
          flex: 1,
        }}
      >
        <HStack
          justifyContent="space-between"
          alignItems="center"
          flex={1}
          p={2}
        >
          <VStack>
            <Text fontSize="md" fontWeight="800" color="#FFF">
              {heading}
            </Text>
            <Text fontSize="sm" fontWeight="500" color="#FFF">
              {value}
            </Text>
          </VStack>
          <SvgXml xml={icon} width={"30"} height={"30"} />
        </HStack>
      </ImageBackground>
    </Box>
  );
};

export const TodaySummary = ({ heading, distance, calories }) => {
  const { unit } = useSelector((state) => state.user);

  return (
    <Box>
      <Text fontSize="md" fontWeight="800">
        {heading}
      </Text>
      <HStack justifyContent={"space-between"} space={5}>
        <SummaryCard
          bgImg={require("../../../assets/images/bg1.png")}
          heading="Distance"
          value={`${distance.toFixed(3)} ${
            unit === UNITS.IMPERIAL ? "mi" : "km"
          }`}
          icon={Distance}
        />

        <SummaryCard
          bgImg={require("../../../assets/images/bg2.png")}
          heading="Calories"
          value={`${calories} kcal`}
          icon={Calorie}
        />
      </HStack>
    </Box>
  );
};
