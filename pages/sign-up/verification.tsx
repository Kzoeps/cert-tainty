import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Input,
	Link,
	Stack,
	Text,
	useColorModeValue
} from '@chakra-ui/react';
import {useState} from 'react';
import {VERIFICATION_FORM_INIT, VerificationFormI} from './_auth.models';
import {Form, Formik} from 'formik';

export default function VerificationForm() {
	const [showPassword, setShowPassword] = useState(false);
	const handleSubmit = async (values: VerificationFormI) => {
		console.log(values);
	};

	return (
		<Formik initialValues={VERIFICATION_FORM_INIT} onSubmit={handleSubmit}>
			{(formik) => (
				<Form>
					<Flex
						minH={'100vh'}
						align={'center'}
						justify={'center'}
						bg={useColorModeValue('gray.50', 'gray.800')}>
						<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
							<Stack align={'center'}>
								<Heading fontSize={'4xl'} textAlign={'center'}>
									Verify Yourself
								</Heading>
								<Text fontSize={'lg'} color={'gray.600'}>
									to enjoy a seamless and cert-ain certification ✌️
								</Text>
							</Stack>
							<Box
								rounded={'lg'}
								bg={useColorModeValue('white', 'gray.700')}
								boxShadow={'lg'}
								p={8}>
								<Stack spacing={4}>
									<HStack>
										<Box>
											<FormControl id="firstName" isRequired>
												<FormLabel>First Name</FormLabel>
												<Input name="firstName" onChange={formik.handleChange} type="text"/>
											</FormControl>
										</Box>
										<Box>
											<FormControl id="lastName" isRequired>
												<FormLabel>Last Name</FormLabel>
												<Input name="lastName" onChange={formik.handleChange} type="text"/>
											</FormControl>
										</Box>
									</HStack>
									<FormControl id="email" isRequired>
										<FormLabel>Email address</FormLabel>
										<Input name="email" onChange={formik.handleChange} type="email"/>
									</FormControl>
									{/*						<FormControl id="password" isRequired>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input type={showPassword ? 'text' : 'password'} />
								<InputRightElement h={'full'}>
									<Button
										variant={'ghost'}
										onClick={() =>
											setShowPassword((showPassword) => !showPassword)
										}>
										{showPassword ? <ViewIcon /> : <ViewOffIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>*/}
									<Stack spacing={10} pt={2}>
										<Button
											loadingText="Submitting"
											size="lg"
											type="submit"
											bg={'blue.400'}
											color={'white'}
											_hover={{
												bg: 'blue.500'
											}}>
											Sign up
										</Button>
									</Stack>
									<Stack pt={6}>
										<Text align={'center'}>
											Already a user? <Link color={'blue.400'}>Login</Link>
										</Text>
									</Stack>
								</Stack>
							</Box>
						</Stack>
					</Flex>
				</Form>
			)}
		</Formik>

	);
}
