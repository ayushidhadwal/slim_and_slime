import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";

import { HomeScreen } from "../screens/home/HomeScreen";
import { SettingsScreen } from "../screens/settings/SettingsScreen";
import { GroupsScreen } from "../screens/groups/GroupsScreen";
import { AppHeader } from "../components/headers/AppHeader";
import { AnimatedBottomTab } from "../components/nav/AnimatedBottomTab";

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  const { name } = useSelector((state) => state.user);

  return (
    <Tab.Navigator
      tabBar={(props) => <AnimatedBottomTab {...props} />}
      screenOptions={{
        header: (props) => <AppHeader {...props} username={name} />,
        headerShown: true,
        tabBarActiveTintColor: "white",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: "Home",
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="Groups"
        component={GroupsScreen}
        options={{
          headerTitle: "Groups",
          tabBarLabel: "Groups",
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: "Settings",
          tabBarLabel: "Settings",
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
