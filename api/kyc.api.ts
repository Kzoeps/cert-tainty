import { gql } from '@apollo/client';

export const VERIFY_KYC = gql`
	mutation updateKyc($attributes: SendForKycInput!) {
		sendForKyc(input: $attributes) {
			id
		}
	}
`

export const QUERY_VERIFICATION_STATUS = gql`
	query verificationStatus {
		profile {
			kycStatus
		}
	}
`
