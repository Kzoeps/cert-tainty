import {
	Avatar,
	AvatarGroup,
	Box,
	Container,
	Flex,
	Heading,
	Icon,
	IconProps,
	SimpleGrid,
	Stack,
	Text,
	useBreakpointValue
} from '@chakra-ui/react';
import {WalletList} from '../../components/wallet-list/wallet-list';

const avatars = [
	{
		name: 'Ryan Florence',
		url: 'https://bit.ly/ryan-florence',
	},
	{
		name: 'Segun Adebayo',
		url: 'https://bit.ly/sage-adebayo',
	},
	{
		name: 'Kent Dodds',
		url: 'https://bit.ly/kent-c-dodds',
	},
	{
		name: 'Prosper Otemuyiwa',
		url: 'https://bit.ly/prosper-baba',
	},
	{
		name: 'Christian Nwamba',
		url: 'https://bit.ly/code-beast',
	},
];

export default function SignUp() {
	return (
		<Box bg={'gray.50'} position={'relative'}>
			<Container
				as={SimpleGrid}
				maxW={'7xl'}
				columns={{ base: 1, md: 2 }}
				spacing={{ base: 10, lg: 32 }}
				py={{ base: 10, sm: 20, lg: 32 }}>
				<Stack spacing={{ base: 10, md: 20 }}>
					<Heading
						lineHeight={1.1}
						fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
						Certificate Minting{' '}
						<Text
							as={'span'}
							bgGradient="linear(to-r, green.400,green.800)"
							bgClip="text">
							&
						</Text>{' '}
						Certificate Verification
					</Heading>
					<Stack direction={'row'} spacing={4} align={'center'}>
						<AvatarGroup>
							{avatars.map((avatar) => {
								/* eslint-disable */
								return (
									<Avatar
										key={avatar.name}
										name={avatar.name}
										src={avatar.url}
										size={useBreakpointValue({base: 'md', md: 'lg'})}
										position={'relative'}
										zIndex={2}
										_before={{
											content: '""',
											width: 'full',
											height: 'full',
											rounded: 'full',
											transform: 'scale(1.125)',
											bgGradient: 'linear(to-bl, green.400,green.800)',
											position: 'absolute',
											zIndex: -1,
											top: 0,
											left: 0
										}}
									/>
								)
								/* eslint-disable */
							})}
						</AvatarGroup>
						<Text fontFamily={'heading'} fontSize={{ base: '4xl', md: '6xl' }}>
							+
						</Text>
						<Flex
							align={'center'}
							justify={'center'}
							fontFamily={'heading'}
							fontSize={{ base: 'sm', md: 'lg' }}
							bg={'gray.800'}
							color={'white'}
							rounded={'full'}
							width={useBreakpointValue({ base: '44px', md: '60px' })}
							height={useBreakpointValue({ base: '44px', md: '60px' })}
							position={'relative'}
							_before={{
								content: '""',
								width: 'full',
								height: 'full',
								rounded: 'full',
								transform: 'scale(1.125)',
								bgGradient: 'linear(to-bl, orange.400,yellow.400)',
								position: 'absolute',
								zIndex: -1,
								top: 0,
								left: 0,
							}}>
							YOU
						</Flex>
					</Stack>
				</Stack>
				<Stack
					bg={'gray.200'}
					rounded={'xl'}
					p={{ base: 4, sm: 6, md: 8 }}
					spacing={{ base: 8 }}
					maxW={{ lg: 'lg' }}>
					<Stack spacing={4}>
						<Heading
							color={'gray.800'}
							lineHeight={1.1}
							fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
							Welcome Back
							<Text
								as={'span'}
								bgGradient="linear(to-r, green.400,green.800)"
								bgClip="text">
								!
							</Text>
						</Heading>
						<Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
							Thanks for being part of our amazing team. We look forward to revolutionizing the space of education with you!
						</Text>
					</Stack>
					<Box as={'form'} mt={10}>
						<WalletList isSignUp={false}/>
					</Box>
					form
				</Stack>
			</Container>
		</Box>
	);
}

export const Blur = (props: IconProps) => {
	return (
		<Icon
			width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
			zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
			height="560px"
			viewBox="0 0 528 560"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}>
			<circle cx="71" cy="61" r="111" fill="#F56565" />
			<circle cx="244" cy="106" r="139" fill="#ED64A6" />
			<circle cy="291" r="139" fill="#ED64A6" />
			<circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
			<circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
			<circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
			<circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
		</Icon>
	);
};
