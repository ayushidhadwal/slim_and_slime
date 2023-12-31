import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { Pedometer } from "expo-sensors";
import { Platform } from "react-native";

import BottomTabNavigator from "./BottomTabNavigator";
import { SecurityScreen } from "../screens/settings/SecurityScreen";
import { NotificationScreen } from "../screens/notification/NotificationScreen";
import { AboutUsScreen } from "../screens/settings/AboutUsScreen";
import { DeleteAccountScreen } from "../screens/settings/DeleteAccountScreen";
import { EditProfileScreen } from "../screens/settings/EditProfileScreen";
import { CreateGroupScreen } from "../screens/groups/CreateGroupScreen";
import { EditGroupScreen } from "../screens/groups/EditGroupScreen";
import { GroupDescriptionScreen } from "../screens/groups/GroupDescriptionScreen";
import {
  SearchGroupScreen,
  options as searchGroupScreenOptions,
} from "../screens/groups/SearchGroupScreen";
import { LeaderBoardScreen } from "../screens/groups/LeaderBoardScreen";
import { screenOptions } from "./AuthStackNavigator";
import { getProfile, updateFitnessRecord } from "../store/user/userSlice";
import { useMessage } from "../hooks/useMessage";
import {
  SearchResultScreen,
  options as searchResultScreenOptions,
} from "../screens/groups/SearchResultScreen";
import { fitness } from "../utils";
import { cmToFeet, poundsTokg, UNITS } from "../utils/fitness";

const Stack = createNativeStackNavigator();

function RootStackNavigator() {
  const dispatch = useDispatch();
  const setMessage = useMessage();

  const { fitnessRecord, gender, height, weight, unit } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getProfile()).then((result) => {
      if (result?.error?.message) {
        setMessage(result.error.message);
      }
    });
  }, []);

  /* Count Steps */
  const pedometerRef = useRef(null);
  const { lastUpdatedAt } = fitnessRecord;

  useEffect(() => {
    (async () => {
      // iOS Platform.
      if (Platform.OS === "ios") {
        const { status } = await Pedometer.requestPermissionsAsync();
        if (status === "granted") {
          // Listen step counts.
          pedometerRef.current = Pedometer.watchStepCount((result) => {
            if (result.steps > 0 && height && gender && unit) {
              const convertedHeight =
                unit === UNITS.IMPERIAL ? cmToFeet(height) : height;

              const convertedWeight =
                unit === UNITS.IMPERIAL ? poundsTokg(weight) : weight;

              const distance = fitness.stepsToDistance(
                convertedHeight,
                result.steps,
                gender
              );

              const calories = fitness.stepsToCalories(
                convertedWeight,
                convertedHeight,
                gender,
                result.steps
              );

              dispatch(
                updateFitnessRecord({
                  steps: result.steps,
                  distance,
                  calories,
                })
              );
            }
          });

          // Get steps count from dates.
          if (lastUpdatedAt) {
            const end = new Date();
            const start = new Date(lastUpdatedAt);

            Pedometer.getStepCountAsync(start, end).then(
              (result) => {
                if (result.steps > 0 && height && gender && unit) {
                  const convertedHeight =
                    unit === UNITS.IMPERIAL ? cmToFeet(height) : height;

                  const convertedWeight =
                    unit === UNITS.IMPERIAL ? poundsTokg(weight) : weight;

                  const distance = fitness.stepsToDistance(
                    convertedHeight,
                    result.steps,
                    gender
                  );

                  const calories = fitness.stepsToCalories(
                    convertedWeight,
                    convertedHeight,
                    gender,
                    result.steps
                  );

                  dispatch(
                    updateFitnessRecord({
                      steps: result.steps,
                      distance,
                      calories,
                    })
                  );
                }
              },
              (error) => {
                console.log({
                  pastStepCount: "Could not get stepCount: " + error,
                });
              }
            );
          }
        }
      }
    })();

    if (Platform.OS === "ios") {
      return () => pedometerRef.current?.remove();
    }
  }, [lastUpdatedAt]);

  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={screenOptions}>
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Group>
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Security" component={SecurityScreen} />
        <Stack.Screen name="AboutUs" component={AboutUsScreen} />
        <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} />
      </Stack.Group>

      <Stack.Group>
        <Stack.Screen name="CreateGroup" component={CreateGroupScreen} />
        <Stack.Screen name="EditGroup" component={EditGroupScreen} />
        <Stack.Screen
          name="SearchGroup"
          component={SearchGroupScreen}
          options={searchGroupScreenOptions}
        />
        <Stack.Screen
          name="SearchResult"
          component={SearchResultScreen}
          options={searchResultScreenOptions}
        />
        <Stack.Screen
          name="GroupDescription"
          component={GroupDescriptionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LeaderBoard"
          component={LeaderBoardScreen}
          options={{ headerShown: false }}
        />
      </Stack.Group>
      <Stack.Screen name="Notification" component={NotificationScreen} />
    </Stack.Navigator>
  );
}

export default RootStackNavigator;
