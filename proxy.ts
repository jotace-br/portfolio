import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
	// Skip middleware for static assets and API routes early
	const { pathname } = request.nextUrl;

	// Fast path: skip processing for paths that don't need locale handling
	const hasFileExtension = /\.[^/]+$/.test(pathname);
	if (
		pathname.startsWith('/_next') ||
		pathname.startsWith('/api') ||
		hasFileExtension
	) {
		return;
	}

	const response = intlMiddleware(request);

	// Add pathname to headers so not-found can detect locale
	response.headers.set('x-pathname', pathname);

	return response;
}

export const config = {
	// Optimized matcher - more specific patterns reduce middleware invocations
	matcher: [
		// Match root
		'/',
		// Match locale prefixes
		'/(en|pt)/:path*',
		// Match paths that aren't static files, api, or internal
		'/((?!api|_next/static|_next/image|_vercel|favicon.ico|.*\\..*).*)',
	],
};
