export interface VerificationFormI {
	firstName: string;
	lastName: string;
	email: string;
	institutionName: string;
	files: File[];
	institutionType: string;
}

export const VERIFICATION_FORM_INIT = {
	firstName: '',
	lastName: '',
	institutionName: '',
	institutionType: '',
	email: '',
	files: []
}
