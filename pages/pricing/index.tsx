import {ReactNode} from 'react';
import {
	Box,
	Button,
	Heading,
	HStack,
	List,
	ListIcon,
	ListItem,
	Stack,
	Text,
	useColorModeValue,
	VStack
} from '@chakra-ui/react';
import {FaCheckCircle} from 'react-icons/fa';

function PriceWrapper({ children }: { children: ReactNode }) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderColor={useColorModeValue('gray.200', 'gray.500')}
      borderRadius={'xl'}>
      {children}
    </Box>
  );
}

export default function ThreeTierPricing() {
  return (
    <Box bg={'gray.50'} py={12}>
      <VStack spacing={2} textAlign="center">
        <Heading as="h1" fontSize="4xl">
          Plans that fit your need
        </Heading>
        <Text fontSize="lg" color={'gray.500'}>
          Start with 14-day free trial. No credit card needed. Cancel at
          anytime.
        </Text>
      </VStack>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}>
        <PriceWrapper>
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              Hobby
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">
				  BTN
              </Text>
              <Text fontSize="5xl" fontWeight="900">
				  3000
              </Text>
              <Text fontSize="3xl" color="gray.500">
                /month
              </Text>
            </HStack>
          </Box>
          <VStack
            bg={useColorModeValue('gray.50', 'gray.700')}
            py={4}
            borderBottomRadius={'xl'}>
            <List spacing={3} textAlign="start" px={12}>
				<ListItem>
					<ListIcon as={FaCheckCircle} color="green.500"/>
					200 mints/month
				</ListItem>
				<ListItem>
					<ListIcon as={FaCheckCircle} color="green.500"/>
					limited support time
				</ListItem>
            </List>
            <Box w="80%" pt={7}>
              <Button w="full" colorScheme="red" variant="outline">
                Start trial
              </Button>
            </Box>
          </VStack>
        </PriceWrapper>

        <PriceWrapper>
          <Box position="relative">
            <Box
              position="absolute"
              top="-16px"
              left="50%"
              style={{ transform: 'translate(-50%)' }}>
              <Text
                textTransform="uppercase"
                bg={useColorModeValue('red.300', 'red.700')}
                px={3}
                py={1}
                color={useColorModeValue('gray.900', 'gray.300')}
                fontSize="sm"
                fontWeight="600"
                rounded="xl">
                Most Popular
              </Text>
            </Box>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                Growth
              </Text>
              <HStack justifyContent="center">
                <Text fontSize="3xl" fontWeight="600">
					BTN
                </Text>
                <Text fontSize="5xl" fontWeight="900">
					72000
                </Text>
                <Text fontSize="3xl" color="gray.500">
					/year
                </Text>
              </HStack>
            </Box>
            <VStack
              bg={useColorModeValue('gray.50', 'gray.700')}
              py={4}
              borderBottomRadius={'xl'}>
              <List spacing={3} textAlign="start" px={12}>
				  <ListItem>
					  <ListIcon as={FaCheckCircle} color="green.500"/>
					  600 mints/month
				  </ListItem>
				  <ListItem>
					  <ListIcon as={FaCheckCircle} color="green.500"/>
					  24/7 support time
				  </ListItem>
              </List>
              <Box w="80%" pt={7}>
                <Button w="full" colorScheme="red">
                  Start trial
                </Button>
              </Box>
            </VStack>
          </Box>
        </PriceWrapper>
        <PriceWrapper>
          <Box py={4} px={12}>
			  <Text fontWeight="500" fontSize="2xl">
				  Enterprise
			  </Text>
			  <HStack justifyContent="center">
				  {/*<Text fontSize="3xl" fontWeight="600">*/}
				  {/*  $*/}
				  {/*</Text>*/}
				  <Text fontSize="5xl" fontWeight="900">
					  Talk to us
				  </Text>
				  {/*<Text fontSize="3xl" color="gray.500">*/}
				  {/*  /month*/}
				  {/*</Text>*/}
			  </HStack>
          </Box>
          <VStack
            bg={useColorModeValue('gray.50', 'gray.700')}
            py={4}
            borderBottomRadius={'xl'}>
            <List spacing={3} textAlign="start" px={12}>
				<ListItem>
					<ListIcon as={FaCheckCircle} color="green.500"/>
					for larger mint numbers
				</ListItem>
				<ListItem>
					<ListIcon as={FaCheckCircle} color="green.500"/>
					custom integration into your system
				</ListItem>
				<ListItem>
					<ListIcon as={FaCheckCircle} color="green.500"/>
					24/7 support time
				</ListItem>
				<ListItem>
					<ListIcon as={FaCheckCircle} color="green.500"/>
					Additional feature support
				</ListItem>
			</List>
			  <Box w="80%" pt={7}>
				  <Button w="full" colorScheme="red" variant="outline">
					  Contact Us
				  </Button>
			  </Box>
          </VStack>
        </PriceWrapper>
      </Stack>
    </Box>
  );
}
