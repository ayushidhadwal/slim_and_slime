import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet, Dimensions } from "react-native";
import {
  Box,
  Text,
  Image,
  HStack,
  StatusBar,
  Button,
  VStack,
  FlatList,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

import { theme } from "../../styles/theme";

const slides = [
  {
    key: "s1",
    title: "Track your daily progress",
    text: "Track your monthly and weekly progress and get flexible with the routine in no time.",
    image: require("../../../assets/images/FitnessTracker-pana.png"),
  },
  {
    key: "s2",
    title: "Get Inspired",
    text: "Every morning wake up and get on with our programs and start your day fresh.",
    image: require("../../../assets/images/Skatebuddies-rafiki.png"),
  },
  {
    key: "s3",
    title: "Get, Set.. Go",
    text: "We know you love challenges and we love to see you take challenges that will help you grow.",
    image: require("../../../assets/images/Solidarity-pana.png"),
  },
];

const { width, height } = Dimensions.get("window");

const NextButton = ({ title, onPress }) => (
  <Button
    size="sm"
    px={6}
    onPress={onPress}
    _text={{
      fontWeight: 800,
      fontSize: 16,
    }}
    rounded={theme.borderRadius}
  >
    {title}
  </Button>
);

const renderItem = ({ item }) => {
  return (
    <Box w={width} px={5}>
      <VStack mb={12}>
        <Text fontWeight="900" fontSize={24} mb={3}>
          {item.title}
        </Text>
        <Text fontWeight="600" numberOfLines={4}>
          {item.text}
        </Text>
      </VStack>

      <VStack flex={1}>
        <Image
          source={item.image}
          alt={item.title}
          resizeMode="contain"
          h={height / 3}
        />
      </VStack>
    </Box>
  );
};

export const OnBoardingScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);

  const scrollToIndex = (index) =>
    flatListRef.current.scrollToIndex({ animated: true, index });

  const onSkip = () => navigation.navigate("Login");

  const onNext = () => scrollToIndex(index + 1);

  const onViewableItemsChanged = useCallback(({ changed }) => {
    setIndex(changed[0].index);
  }, []);

  const viewConfigRef = useRef({
    itemVisiblePercentThreshold: 50,
  });

  const flatListRef = useRef();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <HStack py={3} px={5} alignItems="center" justifyContent="flex-end">
        <Button
          disabled={index === slides.length - 1}
          variant="ghost"
          size="md"
          onPress={onSkip}
          _text={{
            fontWeight: 800,
            color: "#000",
          }}
        >
          Skip
        </Button>
      </HStack>

      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={(item) => item.key}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfigRef.current}
      />
      <VStack my={3} alignItems="center">
        <HStack>
          {slides.map((_, i) => (
            <Box
              key={i}
              borderColor="muted.500"
              borderWidth="1"
              backgroundColor={index === i ? "muted.400" : "muted.50"}
              w={3}
              h={3}
              m={1}
              rounded="lg"
            />
          ))}
        </HStack>
      </VStack>
      <VStack p={5} mb={2} alignItems="flex-end">
        <NextButton
          title={index === slides.length - 1 ? "Finish" : "Next"}
          onPress={index === slides.length - 1 ? onSkip : onNext}
        />
      </VStack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});
