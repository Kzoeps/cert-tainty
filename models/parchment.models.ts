export enum InstitutionEnum {
	college= 'college',
    school = 'school'
}

export enum KycStatusEnum {
	approved = 'approved',
	in_progress = 'in_progress',
	rejected = 'rejected'
}


export const KYC_PROGRESS_ROUTES = {
	[KycStatusEnum.rejected]: 'rejected',
	[KycStatusEnum.in_progress]: 'in-progress',
	[KycStatusEnum.approved]: ''
}

export const KYC_ROUTE_ENUMS = [KycStatusEnum.approved, KycStatusEnum.in_progress, KycStatusEnum.rejected];
