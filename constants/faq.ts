export interface FaqItem {
	id: string;
	question: string;
	answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
	{
		id: 'faq-1',
		question: 'What technologies do you specialize in?',
		answer:
			'I specialize in React, Next.js (App Router), TypeScript and Tailwind CSS. I also work with state management (Zustand, Redux), testing (Jest, React Testing Library), and modern build/CI workflows. I prefer a component-driven architecture with strong typing and automated tests.',
	},
	{
		id: 'faq-2',
		question: 'Do you build accessible interfaces?',
		answer:
			'Yes. Accessibility (WCAG) is part of my standard delivery: semantic HTML, keyboard navigation, ARIA where appropriate, and automated/auditory checks during CI. I include accessibility testing in acceptance criteria.',
	},
	{
		id: 'faq-3',
		question:
			'Can you work with existing design systems or component libraries?',
		answer:
			'Absolutely. I integrate with existing design systems and can either adapt components to match the system or create a scalable component library (tokens, stories, docs) when one is missing.',
	},
	{
		id: 'faq-4',
		question: 'What is your development workflow?',
		answer:
			'I follow feature-branch Git workflow, small PRs with descriptive commits, peer reviews, automated tests, and CI that runs linting, type checks and tests. Releases are automated via CI/CD with versioned deployments and changelogs when needed.',
	},
	{
		id: 'faq-5',
		question: 'Do you write tests? What kind?',
		answer:
			'Yes. I write unit and integration tests using Jest and React Testing Library, and add end-to-end tests with Playwright or Cypress for critical flows. Tests are part of the definition of done.',
	},
	{
		id: 'faq-6',
		question: 'How do you approach performance optimization?',
		answer:
			'I optimize performance via code-splitting, lazy-loading, image optimization, caching headers, and careful bundle analysis. I also measure using Lighthouse and real-user metrics when available.',
	},
	{
		id: 'faq-7',
		question: 'Do you handle SEO and metadata for projects?',
		answer:
			'Yes. For public-facing sites I implement semantic markup, structured data (JSON-LD), proper meta tags and server-side rendering or static rendering strategies for crawlability.',
	},
	{
		id: 'faq-8',
		question: 'Are you available for remote work and collaboration?',
		answer:
			'Yes, I collaborate remotely using asynchronous tools (Slack, Notion, Figma, GitHub). I align work with your timezone and team rituals and use frequent check-ins for alignment.',
	},
	{
		id: 'faq-9',
		question:
			'What is your typical delivery timeline for a medium-sized feature?',
		answer:
			'A medium feature (component + integration + tests + docs) typically takes 2–5 working days, depending on complexity and review cycles. I prioritize incremental delivery so you get working value early.',
	},
	{
		id: 'faq-10',
		question:
			'How do you handle design handoffs and collaboration with designers?',
		answer:
			'I collaborate closely with designers using Figma: tokens extraction, responsive specs, and component parity. I provide prototypes and work with designers to keep components consistent and maintainable.',
	},
	{
		id: 'faq-11',
		question: 'Will I own the code and intellectual property?',
		answer:
			'Yes. Unless otherwise agreed in a contract, delivered code and assets are transferred to the client with clear licensing and repository access. I can sign any standard IP assignment if required.',
	},
	{
		id: 'faq-12',
		question: 'Do you provide post-launch support and maintenance?',
		answer:
			'Yes. I offer post-launch support packages for bug fixes, performance monitoring, and small improvements. I also recommend maintenance plans for dependency updates and security patches.',
	},
	{
		id: 'faq-13',
		question: 'How do you price projects or features?',
		answer:
			'Pricing can be hourly or fixed depending on scope. I prefer fixed-price for well-defined scopes and hourly for exploratory work. I always provide a clear proposal breaking down deliverables, milestones and payment terms.',
	},
	{
		id: 'faq-14',
		question: 'Can you help with architecture decisions for larger apps?',
		answer:
			'Yes. I provide architecture guidance including modularization, boundaries between frontend and backend, state management strategy, performance budgets, and CI/CD recommendations to scale the team and codebase.',
	},
	{
		id: 'faq-15',
		question: 'Do you contribute to open-source or provide references?',
		answer:
			'I contribute to and maintain open-source projects and can share references or case studies on request. Open-source work demonstrates my coding standards and collaboration style.',
	},
	{
		id: 'faq-16',
		question: 'How should I get in touch to discuss a project?',
		answer:
			'The best way is via the contact form below or a direct email. Provide a short brief, your goals, timeline, and any relevant links and I will respond with next steps and availability.',
	},
];
