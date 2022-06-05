import { gql } from '@apollo/client';

export const QUERY_PROFILES_STATUS = gql`
	query profiles( $kycStatus: KycStatusEnum) {
        profiles(kycStatus: $kycStatus){
        documentUrl
        emailAddress
        firstName
        rejectedCount
        approvedCount
    id
    institutionName
    institutionType
    kycStatus
    lastName
    user {
      id
      walletAddress
    }
        }
}
`

export const PROFILE_MUTATION = gql`
  mutation updateKycStatus($input: UpdateKycStatusInput!) {
    updateKycStatus(input: $input) {
    approvedCount
    documentUrl
    emailAddress
    firstName
    id
    inProgressCount
    institutionName
    institutionType
    kycStatus
    lastName
    rejectedCount
    user {
      id
      walletAddress
    }
    }
  }
`;
