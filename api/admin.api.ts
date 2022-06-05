import { gql } from '@apollo/client';

export const QUERY_PROFILES_STATUS = gql`
	query profiles( $kycStatus: KycStatusEnum) {
        profiles(kycStatus: $kycStatus){
        documentUrl
        emailAddress
        firstName
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