export interface VerificationFormI {
	firstName: string;
	lastName: string;
	email: string;
	institutionName: string;
	files: File[];
}

export const VERIFICATION_FORM_INIT = {
	firstName: '',
	lastName: '',
	institutionName: '',
	email: '',
	files: []
}
