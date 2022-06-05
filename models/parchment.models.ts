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

export interface MintForm {
	awardedTo: string;
	major: string;
	yearAwarded?: string | Date;
	description: string;
}

export const MINT_FORM_INIT: Record<keyof MintForm, string> = {
	awardedTo: '',
	major: '',
	yearAwarded: '',
	description: ''
}

export const KYC_ROUTE_ENUMS = [KycStatusEnum.approved, KycStatusEnum.in_progress, KycStatusEnum.rejected];
