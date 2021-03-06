import {
	Box,
	Button,
	Collapse,
	Flex,
	Icon,
	IconButton, Image,
	Link,
	Popover,
	PopoverTrigger,
	Stack,
	Text,
	useBreakpointValue,
	useColorModeValue,
	useDisclosure
} from '@chakra-ui/react';
import {ChevronDownIcon, CloseIcon, HamburgerIcon} from '@chakra-ui/icons';
import Logo from '../../public/assets/hacket-small.png';
import {useRouter} from 'next/router';

export default function Navigation() {
	const {isOpen, onToggle} = useDisclosure();
	const router = useRouter();

	return (
		<Box>
			<Flex
				bg={useColorModeValue('white', 'gray.800')}
				color={useColorModeValue('gray.600', 'white')}
				minH={'60px'}
				py={{base: 2}}
				px={{base: 4}}
				borderBottom={1}
				borderStyle={'solid'}
				borderColor={useColorModeValue('gray.200', 'gray.900')}
				align={'center'}>
				<Flex
					flex={{base: 1, md: 'auto'}}
					ml={{base: -2}}
					display={{base: 'flex', md: 'none'}}>
					<IconButton
						onClick={onToggle}
						icon={
							isOpen ? <CloseIcon w={3} h={3}/> : <HamburgerIcon w={5} h={5}/>
						}
						variant={'ghost'}
						aria-label={'Toggle Navigation'}
					/>
				</Flex>
				<Flex flex={{base: 1}} justify={{base: 'center', md: 'start'}}>
					<img width={'35px'} alt={'logo'} src={'/assets/hacket-small.png'}/>
					<Flex display={{base: 'none', md: 'flex'}} ml={10}>
						<DesktopNav/>
					</Flex>
				</Flex>

				<Stack
					flex={{base: 1, md: 0}}
					justify={'flex-end'}
					direction={'row'}
					spacing={6}>
					<Button
						as={'a'}
						fontSize={'sm'}
						fontWeight={400}
						variant={'link'}
						onClick={() => router.push(`/sign-in`)}
						>
						Sign In
					</Button>
					<Button
						display={{base: 'none', md: 'inline-flex'}}
						fontSize={'sm'}
						fontWeight={600}
						color={'white'}
						bg={'green.400'}
						onClick={() => router.push('/sign-up')}
						_hover={{
							bg: 'green.600'
						}}>
						Sign Up
					</Button>
				</Stack>
			</Flex>

			<Collapse in={isOpen} animateOpacity>
				<MobileNav/>
			</Collapse>
		</Box>
	);
}

const DesktopNav = () => {
	const linkColor = useColorModeValue('gray.600', 'gray.200');
	const linkHoverColor = useColorModeValue('gray.800', 'white');
	const popoverContentBgColor = useColorModeValue('white', 'gray.800');

	return (
		<Stack direction={'row'} spacing={4}>
			{NAV_ITEMS.map((navItem) => (
				<Box key={navItem.label}>
					<Popover trigger={'hover'} placement={'bottom-start'}>
						<PopoverTrigger>
							<Link
								p={2}
								href={navItem.href ?? '#'}
								fontSize={'sm'}
								fontWeight={500}
								color={linkColor}
								_hover={{
									textDecoration: 'none',
									color: linkHoverColor
								}}>
								{navItem.label}
							</Link>
						</PopoverTrigger>
					</Popover>
				</Box>
			))}
		</Stack>
	);
};

const MobileNav = () => {
	return (
		<Stack
			bg={useColorModeValue('white', 'gray.800')}
			p={4}
			display={{md: 'none'}}>
			{NAV_ITEMS.map((navItem) => (
				<MobileNavItem key={navItem.label} {...navItem} />
			))}
		</Stack>
	);
};

const MobileNavItem = ({label, children, href}: NavItem) => {
	const {isOpen, onToggle} = useDisclosure();

	return (
		<Stack spacing={4} onClick={children && onToggle}>
			<Flex
				py={2}
				as={Link}
				href={href ?? '#'}
				justify={'space-between'}
				align={'center'}
				_hover={{
					textDecoration: 'none'
				}}>
				<Text
					fontWeight={600}
					color={useColorModeValue('gray.600', 'gray.200')}>
					{label}
				</Text>
				{children && (
					<Icon
						as={ChevronDownIcon}
						transition={'all .25s ease-in-out'}
						transform={isOpen ? 'rotate(180deg)' : ''}
						w={6}
						h={6}
					/>
				)}
			</Flex>

			<Collapse in={isOpen} animateOpacity style={{marginTop: '0!important'}}>
				<Stack
					mt={2}
					pl={4}
					borderLeft={1}
					borderStyle={'solid'}
					borderColor={useColorModeValue('gray.200', 'gray.700')}
					align={'start'}>
					{children &&
					children.map((child) => (
						<Link key={child.label} py={2} href={child.href}>
							{child.label}
						</Link>
					))}
				</Stack>
			</Collapse>
		</Stack>
	);
};

interface NavItem {
	label: string;
	subLabel?: string;
	children?: Array<NavItem>;
	href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
	{
		label: 'Admin',
		href: '/admin-dashboard'
	},
	{
		label: 'Mint Certificate',
		href: '/mint'
	},
	{
		label: 'Pricing',
		href: '/pricing'
	},
	{
		label: 'Search NFT',
		href: '#'
	},{
		label: 'Letter',
		href: '/recommendation'
	}
];
