import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
	// A list of all locales that are supported
	locales: ['en', 'pt'],

	// Used when no locale matches
	defaultLocale: 'en',

	// The prefix strategy for locale detection
	// 'as-needed' - only add prefix for non-default locales
	localePrefix: 'as-needed',

	// Detect locale from Accept-Language header
	localeDetection: true,
});

export type Locale = (typeof routing.locales)[number];
