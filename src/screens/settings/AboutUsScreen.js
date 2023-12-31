import React from "react";
import { Box, ScrollView, StatusBar, Text } from "native-base";
import { SafeAreaView } from "react-native";

export const AboutUsScreen = () => {
  return (
    <SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box flex={1} px={5} mt={3} mb={5}>
          <Text fontSize={24} mb={3} color={"primary.500"} fontWeight={900}>
            About Us
          </Text>

          <Text
            mb={3}
          >{`Slim and Smile is the ultimate weight loss and fitness companion for iOS users. This easy-to-use app is designed to help you achieve your weight loss and fitness goals with ease. The app includes a variety of features that make it easy to track your progress, stay motivated, and reach your goals.

One of the key features of Slim and Smile is the step tracker. This feature uses your phone's accelerometer to accurately track the number of steps you take each day, so you can see how active you are and set goals to increase your activity level.

The calorie counter is another useful feature that allows you to track the calories you consume each day and compare them to the number of calories you burn. This helps you make informed decisions about your diet and make sure you're staying on track with your weight loss goals.

The app also includes a social feature that allows users to connect with friends and share their progress, providing a sense of accountability and motivation.

With Slim and Smile, you'll finally have everything you need to lose weight, feel great, and smile with confidence. Download the app now and start your journey to a healthier, happier you!

Slim and Smile is a comprehensive app that helps you with weight loss and fitness, but also addresses the mental and emotional aspect of the process. It's an all-in-one app that will help you to reach your desired goals and improve your overall well-being.`}</Text>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
