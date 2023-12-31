import React, { memo, useEffect, useState } from "react";
import { FormControl, Input, Pressable, View } from "native-base";
import { SheetManager } from "react-native-actions-sheet";

import { cmToFeet, feetToCm, UNITS } from "../utils/fitness";

const HeightPicker = ({
  value: defaultVal,
  onChangeText,
  unit,
  ...inputProps
}) => {
  const [value, setValue] = useState(defaultVal);
  const [unitLabel, setUnitLabel] = useState("");
  const [height, setHeight] = useState(defaultVal);

  useEffect(() => {
    setUnitLabel(unit === UNITS.METRIC ? "cm" : "inches");
    if (Number(value) && unit === UNITS.IMPERIAL && unitLabel === "cm") {
      // cm to ft.in
      const v = cmToFeet(Number(value)).toFixed(1);
      if (v) {
        setHeight(v);
        setValue(v);
      }
    }

    if (Number(value) && unit === UNITS.METRIC && unitLabel === "inches") {
      // ft.in to cm
      const v = feetToCm(Number(value)).toFixed(1);
      if (v) {
        setHeight(v);
        setValue(v);
      }
    }
  }, [unit]);

  useEffect(() => {
    if (height) {
      const v = `${height}`;
      setValue(v);
      onChangeText(v);
    }
  }, [height]);

  let v = value ? `${value} ${unitLabel}` : "";
  if (unit === UNITS.IMPERIAL && v) {
    v = `${value.split(".")[0]}ft ${value.split(".")[1]}${unitLabel}`;
  }

  return (
    <>
      <FormControl.Label>Height</FormControl.Label>
      <Pressable
        onPress={() => {
          SheetManager.show("height-picker-sheet", {
            payload: { unit: unit, setHeight, height },
          });
        }}
      >
        <View pointerEvents="none">
          <Input
            {...inputProps}
            value={v}
            placeholder={`Enter your height in ${unitLabel}`}
            isReadOnly={true}
          />
        </View>
      </Pressable>
    </>
  );
};

export default memo(HeightPicker);
