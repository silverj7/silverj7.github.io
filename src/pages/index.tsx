import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import {
  Box,
  Center,
  Heading,
  Highlight,
  calc,
  Link as ChakraLink,
  Flex,
} from '@chakra-ui/react';

const $lineHeight = '1.4375rem';

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Box as="main">
      <Center height="100vh" textAlign="center">
        <Flex gap={$lineHeight} flexDir="column">
          <Heading
            as="h1"
            size="4xl"
            maxW="16ch"
            lineHeight={calc($lineHeight).multiply(4).toString()}
          >
            <Highlight
              query="With Speed"
              styles={{ color: 'purple.600', _dark: { color: 'purple.400' } }}
            >
              Welcome to SEJ's portfolio.
            </Highlight>
          </Heading>
        </Flex>
      </Center>
    </Box>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
