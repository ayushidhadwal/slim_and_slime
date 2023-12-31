import React, { memo, useState } from "react";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { Picker } from "@react-native-picker/picker";
import { Box, Button, HStack, Text } from "native-base";

import { UNITS } from "../utils/fitness";
import { ImperialHeight, MetricHeight } from "../utils/height";

const HeightPickerSheet = (props) => {
  const [height, setHeight] = useState(props?.payload?.height);

  return (
    <ActionSheet id={props.sheetId}>
      <HStack p={2} alignItems="center" justifyContent="space-between">
        <Text m={3} color="transparent">
          Done
        </Text>
        <Box flex={1}>
          <Text fontWeight="800" fontSize="md" textAlign="center">
            Height
          </Text>
        </Box>

        <Button onPress={() => SheetManager.hide("height-picker-sheet")}>
          Done
        </Button>
      </HStack>
      <HStack p={3}>
        <Box flex={1}>
          <Picker
            selectedValue={height}
            onValueChange={(itemValue) => {
              props.payload?.setHeight(itemValue);
              setHeight(itemValue);
            }}
            mode="dropdown"
          >
            {props.payload?.unit === UNITS.IMPERIAL
              ? ImperialHeight.map((item) => (
                  <Picker.Item
                    key={item.id}
                    label={item.label}
                    value={item.value}
                  />
                ))
              : MetricHeight.map((item) => (
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

export default memo(HeightPickerSheet);
