import {gql} from '@apollo/client';

export const MINT_CERTIFICATE = gql`
	mutation mintCertificate($attributes: CreateCertificateInput!) {
		createCertificate(input: $attributes) {
			id
		}
	}
`

export const GENERATE_CERTIFICATE = gql`
	mutation generateCertificate($attributes: GenerateCertificatePdfInput!) {
		generateCertificatePdf(input: $attributes) {
			url
		}
	}
`

export const GET_INSTITUTION_NAME = gql`
	query institutionName {
		profile {
			institutionName
		}
	}
`
