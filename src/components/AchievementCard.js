import React from 'react';
import {Box, HStack, Image, Pressable, Text, VStack} from 'native-base';

export const AchievementCard = ({title, subTitle, image, onPress, style}) => {
  return (
    <Pressable onPress={onPress}>
      <HStack
        bg={'primary.50'}
        alignItems={'center'}
        mb={5}
        style={[{elevation: 3}, style]}>
        <Box
          w={100}
          h={100}
          rounded={200}
          justifyContent={'center'}
          alignItems={'center'}>
          {image}
        </Box>
        <VStack>
          <Text
            color="primary.300"
            fontSize="sm"
            fontFamily="body"
            fontStyle={'normal'}
            fontWeight="100">
            {title}
          </Text>
          <Text
            fontSize={10}
            fontFamily="body"
            fontStyle={'normal'}
            fontWeight="100"
            color={'primary.400'}>
            {subTitle}
          </Text>
        </VStack>
      </HStack>
    </Pressable>
  );
};
