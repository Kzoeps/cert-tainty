import SuccessHeadline from '../../../components/success-headline/success-headline';

export default function Success() {
	const description = `You will soon receive a confirmation email from us regarding the verification. Please contact us if it doesnt arrive in 2 working days`;
	return (
		<SuccessHeadline headline="You've successfully uploaded your documents" description={description}/>
	);
}
