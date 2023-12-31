import React, { useEffect, useState } from "react";
import { Box, ScrollView, StatusBar, VStack } from "native-base";
import { Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import GraphComponent from "../../components/GraphComponent";
import { CurrentStepsCard } from "../../components/home/CurrentStepsCard";
import { TodaySummary } from "../../components/home/TodaySummary";
import { useMessage } from "../../hooks/useMessage";
import { getFitnessRecord } from "../../store/user/userSlice";

const { height } = Dimensions.get("window");

export const HomeScreen = ({}) => {
  const [filter, setFilter] = useState("Month");

  const dispatch = useDispatch();
  const setMessage = useMessage();
  const { isLoading } = useSelector((state) => state.user);

  const { fitnessRecord } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getFitnessRecord({ filter: filter.toLowerCase() })).then(
      (result) => {
        if (result?.error?.message) {
          setMessage(result.error.message);
        }
      }
    );
  }, [filter]);

  return (
    <Box style={{ flex: 1 }}>
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
      <ScrollView h={height} showsVerticalScrollIndicator={false}>
        <VStack px={5} pt={3}>
          <CurrentStepsCard
            averageSteps={fitnessRecord.averageStepsInAWeek}
            currentSteps={fitnessRecord.todaySteps}
          />
          <TodaySummary
            heading="Today"
            distance={fitnessRecord.todayDistance}
            calories={fitnessRecord.todayCalories}
          />
        </VStack>
        <GraphComponent
          activeFilter={filter}
          onFilterPress={(value) => setFilter(value)}
          isLoading={isLoading}
        />
      </ScrollView>
    </Box>
  );
};
