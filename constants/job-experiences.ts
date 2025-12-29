export interface JobExperienceData {
	id: string;
	translationKey: string;
	company: string;
	companyLink: string;
	logo: string;
}

export const JOB_EXPERIENCES: JobExperienceData[] = [
	{
		id: '1',
		translationKey: 'compareGames',
		company: 'Compare Games',
		companyLink: 'https://comparegames.com.br/',
		logo: '/logos/companies/compare-games.webp',
	},
	{
		id: '2',
		translationKey: 'audora',
		company: 'Audora Tecnologia e Serviços',
		companyLink: 'https://audora.com.br/',
		logo: '/logos/companies/audora.webp',
	},
	{
		id: '3',
		translationKey: 'xgrow',
		company: 'Xgrow Learning Experience',
		companyLink: 'https://www.xgrow.com/',
		logo: '/logos/companies/xgrow.webp',
	},
	{
		id: '4',
		translationKey: 'plataformaInternacional',
		company: 'Plataforma Internacional',
		companyLink: 'https://globalplatform.com.br/',
		logo: '/logos/companies/plataforma-internacional.webp',
	},
	{
		id: '5',
		translationKey: 'ifal',
		company: 'Instituto Federal de Alagoas',
		companyLink: 'https://www2.ifal.edu.br/',
		logo: '/logos/companies/ifal.webp',
	},
];
