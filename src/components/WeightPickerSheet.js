import React, { memo, useState } from "react";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { Box, Button, HStack, Text } from "native-base";
import { Picker } from "@react-native-picker/picker";

import { UNITS } from "../utils/fitness";
import {
  ImperialWeight,
  ImperialWeightDecimal,
  MetricWeight,
  MetricWeightDecimal,
} from "../utils/weight";

const WeightPickerSheet = (props) => {
  const [weight, setWeight] = useState(props?.payload?.weight);
  const [decimal, setDecimal] = useState(props?.payload?.decimal);

  return (
    <ActionSheet id={props.sheetId}>
      <HStack p={2} alignItems="center" justifyContent="space-between">
        <Text m={3} color="transparent">
          Done
        </Text>
        <Box flex={1}>
          <Text fontWeight="800" fontSize="md" textAlign="center">
            Weight
          </Text>
        </Box>

        <Button onPress={() => SheetManager.hide("weight-picker-sheet")}>
          Done
        </Button>
      </HStack>
      <HStack p={3}>
        <Box flex={1}>
          <Picker
            selectedValue={weight}
            onValueChange={(itemValue) => {
              props.payload?.setWeight(itemValue);
              setWeight(itemValue);
            }}
            mode="dropdown"
          >
            {props.payload?.unit === UNITS.IMPERIAL
              ? ImperialWeight.map((item) => (
                  <Picker.Item
                    key={item.id}
                    label={item.value}
                    value={item.value}
                  />
                ))
              : MetricWeight.map((item) => (
                  <Picker.Item
                    key={item.id}
                    label={item.value}
                    value={item.value}
                  />
                ))}
          </Picker>
        </Box>
        <Box flex={1}>
          <Picker
            selectedValue={decimal}
            onValueChange={(itemValue) => {
              props.payload?.setDecimal(itemValue);
              setDecimal(itemValue);
            }}
            mode="dropdown"
          >
            {props.payload?.unit === UNITS.IMPERIAL
              ? ImperialWeightDecimal.map((item) => (
                  <Picker.Item
                    key={item.id}
                    label={item.label}
                    value={item.value}
                  />
                ))
              : MetricWeightDecimal.map((item) => (
                  <Picker.Item
                    key={item.id}
                    label={item.label}
                    value={item.value}
                  />
                ))}
          </Picker>
        </Box>
      </HStack>
    </ActionSheet>
  );
};

export default memo(WeightPickerSheet);
