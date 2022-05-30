import {Button, ButtonProps, Center, Text} from '@chakra-ui/react';
import React, {ReactElement} from 'react';

export interface IconButtonProps extends ButtonProps{
	title: string;
	icon: ReactElement;
}

export default function CertIconButton({title, icon, ...restProps}: IconButtonProps) {
	return (
		<Center p={2} w={'full'}>
			<Button
				{...restProps}
				style={{width: '100%'}}
				w={'full'}
				maxW={'md'}
				variant={'outline'}
				rightIcon={icon}>
				<Center>
					<Text>{title}</Text>
				</Center>
			</Button>
		</Center>
	);
}
