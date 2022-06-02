import type { UseToastOptions } from "@chakra-ui/react"

export const SUCCESS_T_CONST: Partial<UseToastOptions> = {
	status: 'success',
	isClosable: true
}

export const ERROR_T_CONST: Partial<UseToastOptions> = {
	status: 'error',
	isClosable: false
}
