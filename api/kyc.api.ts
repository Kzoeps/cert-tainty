import { gql } from '@apollo/client';

export const VERIFY_KYC = gql`
	mutation updateKyc($attributes: SendForKycInput!) {
		sendForKyc(input: $attributes) {
			profile {
				id
			}
		}
	}
`
