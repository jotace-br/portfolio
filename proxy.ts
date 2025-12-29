import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
	const response = intlMiddleware(request);
	
	// Add pathname to headers so not-found can detect locale
	response.headers.set('x-pathname', request.nextUrl.pathname);
	
	return response;
}

export const config = {
	// Match all pathnames except for
	// - … api routes
	// - … _next (Next.js internals)
	// - … _vercel (Vercel internals)
	// - … all files in public (e.g. favicon.ico, og images, etc.)
	matcher: [
		'/((?!api|_next|_vercel|.*\\..*).*)',
		// Also match the root explicitly
		'/',
	],
};
