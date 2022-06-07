import type { UseToastOptions } from "@chakra-ui/react"
import ParchmentContract from '../utils/contract.json';

export const SUCCESS_T_CONST: Partial<UseToastOptions> = {
	status: 'success',
	isClosable: true
}

export const ERROR_T_CONST: Partial<UseToastOptions> = {
	status: 'error',
	isClosable: false
}

export const CONTRACT_ADDRESS = "0xf400307CB62B999BcDfC211F7183A61807c4AC2f";
export const ABI = ParchmentContract.abi;
