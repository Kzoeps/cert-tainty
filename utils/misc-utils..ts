export const downloadFile = (url: string) => {
	const link = document.createElement('a');
	link.href = `${process.env.NEXT_PUBLIC_RR_API}/${url}`;
	link.setAttribute("download", "certificate.pdf");
	link.setAttribute("target", "_blank");
	document.body.appendChild(link);
	link.click();
}
