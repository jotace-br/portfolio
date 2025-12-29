export interface EducationData {
	id: string;
	translationKey: string;
	company: string;
	companyLink: string;
	logo: string;
}

export const EDUCATION_EXPERIENCES: EducationData[] = [
	{
		id: '1',
		translationKey: 'uninter',
		company: 'UNINTER - Centro Universitário Internacional',
		companyLink: 'https://www.uninter.com/',
		logo: '/logos/companies/uninter.webp',
	},
];
