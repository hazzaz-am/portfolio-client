// utils/downloadPDF.js
const downloadPDF = (url: string, filename: string) => {
	const link = document.createElement("a");
	link.href = url;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

export const handleDownload = () => {
	const pdfUrl = "/Hazzaz_Abdul_Mannan_Frontend_Developer_Resume.pdf"; 
	const filename = "Hazzaz_Abdul_Mannan_Frontend_Developer_Resume.pdf"; 
	downloadPDF(pdfUrl, filename);
};
