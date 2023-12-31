import { registerSheet } from "react-native-actions-sheet";

import HeightPickerSheet from "./src/components/HeightPickerSheet";
import WeightPickerSheet from "./src/components/WeightPickerSheet";

registerSheet("height-picker-sheet", HeightPickerSheet);
registerSheet("weight-picker-sheet", WeightPickerSheet);

export {};
