import React, { memo, useEffect, useState } from "react";
import { FormControl, Input, Pressable, View } from "native-base";
import { SheetManager } from "react-native-actions-sheet";

import { kgToPounds, poundsTokg, UNITS } from "../utils/fitness";

const WeightPicker = ({
  value: defaultVal,
  onChangeText,
  unit,
  ...inputProps
}) => {
  const defaultValue = defaultVal ? defaultVal.split(".") : defaultVal;

  const [value, setValue] = useState(defaultVal);
  const [unitLabel, setUnitLabel] = useState("");
  const [weight, setWeight] = useState(
    defaultValue?.length === 2 ? defaultValue[0] : defaultVal
  );
  const [decimal, setDecimal] = useState(
    defaultValue?.length === 2 ? defaultValue[0] : ""
  );

  useEffect(() => {
    setUnitLabel(unit === UNITS.METRIC ? "kg" : "lb");
    if (Number(value) && unit === UNITS.IMPERIAL && unitLabel === "kg") {
      // kg to pound
      const v = kgToPounds(Number(value)).toFixed(1);

      if (v) {
        const s = v.split(".");
        if (s.length === 2) {
          const w = s[0];
          const d = s[1];

          setWeight(w);
          setDecimal(d);
          setValue(v);
        }
      }
    }

    if (Number(value) && unit === UNITS.METRIC && unitLabel === "lb") {
      // pounds to kg
      const v = poundsTokg(Number(value)).toFixed(1);

      if (v) {
        const s = v.split(".");
        if (s.length === 2) {
          const w = s[0];
          const d = s[1];

          setWeight(w);
          setDecimal(d);
          setValue(v);
        }
      }
    }
  }, [unit]);

  useEffect(() => {
    if (weight) {
      const v = `${weight}${decimal ? `.${decimal}` : ""}`;
      setValue(v);
      onChangeText(`${weight}${decimal ? `.${decimal}` : ""}`);
    }
  }, [weight, decimal]);

  return (
    <>
      <FormControl.Label>Weight</FormControl.Label>
      <Pressable
        onPress={() => {
          SheetManager.show("weight-picker-sheet", {
            payload: { unit: unit, weight, setWeight, decimal, setDecimal },
          });
        }}
      >
        <View pointerEvents="none">
          <Input
            {...inputProps}
            value={
              value !== "0.0"
                ? value
                  ? `${value} ${unitLabel}`
                  : ""
                : defaultVal
            }
            placeholder={`Enter your weight in ${unitLabel}`}
            isReadOnly={true}
          />
        </View>
      </Pressable>
    </>
  );
};

export default memo(WeightPicker);
