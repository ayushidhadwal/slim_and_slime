import {Box, HStack, Image, Text} from 'native-base';
import * as React from 'react';

export const GroupMemberCard = ({Steps, member, image}) => {
  return (
    <Box>
      <HStack h={60} alignItems={'center'}>
        <Box w={50} h={'100%'} borderRadius={5}>
          <Image
            source={image}
            alt="image"
            h={'100%'}
            width={'100%'}
            resizeMode={'cover'}
            borderRadius={5}
          />
        </Box>
        <Box ml={5}>
          <Text>Member {member}</Text>
          <Box
            backgroundColor={'#3F84AB'}
            mt={1}
            px={3}
            py={1}
            borderRadius={5}>
            <Text
              fontSize={8}
              color={'primary.50'}
              fontWeight={'400'}
              fontFamily="heading"
              fontStyle="normal"
              textTransform={'none'}>
              {Steps} Steps per day
            </Text>
          </Box>
        </Box>
      </HStack>
      <Box
        w={'100%'}
        borderWidth={0.2}
        backgroundColor={'#DCDCDC'}
        mt={3}
        mb={5}
      />
    </Box>
  );
};
