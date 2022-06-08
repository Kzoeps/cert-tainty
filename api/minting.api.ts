import {gql} from '@apollo/client';
import {MintForm} from '../models/parchment.models';

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

export const DOWNLOAD_CERTIFICATE = gql`
	mutation downloadCertificate($attributes: GenerateCertificateWithQrInput!) {
		generateCertificateWithQr(input: $attributes) {
			url
		}
	}
`

export const generateMetaData = (values: MintForm & { pdfUrl: string }) => ({
	image: `${process.env.NEXT_PUBLIC_RR_API}${values.pdfUrl}`,
	// image: `${values.pdfUrl}`,
	description: values.description,
	name: values.awardedTo,
	attributes: [
		{
			trait_type: "Major",
			value: values.major
		},
		{
			trait_type: "Date Awarded",
			value: values.yearAwarded
		}
	]
})
