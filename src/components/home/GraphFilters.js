import { GraphFilterButton } from "./GraphFilterButton";
import { HStack } from "native-base";
import React from "react";

export const GraphFilters = ({ onFilterPress, activeFilter }) => (
  <HStack px={5} py={4} space={4} justifyContent="center">
    <GraphFilterButton
      onPress={onFilterPress}
      title="Monthly Steps"
      active={activeFilter === "Year"}
      value="Year"
    />
    <GraphFilterButton
      onPress={onFilterPress}
      title="Steps per Day"
      active={activeFilter === "Month"}
      value="Month"
    />
  </HStack>
);
