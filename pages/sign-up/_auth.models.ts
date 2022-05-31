export interface VerificationFormI {
	firstName: string;
	lastName: string;
	email: string;
	files: File[];
}

export const VERIFICATION_FORM_INIT = {
	firstName: '',
	lastName: '',
	email: '',
	files: []
}
