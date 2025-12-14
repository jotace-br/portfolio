export function getBaseUrl() {
	if (typeof window !== 'undefined') {
		return window.location.origin;
	}

	if (process.env.NEXT_PUBLIC_SITE_URL) {
		return process.env.NEXT_PUBLIC_SITE_URL.endsWith('/')
			? process.env.NEXT_PUBLIC_SITE_URL.slice(0, -1)
			: process.env.NEXT_PUBLIC_SITE_URL;
	}

	return 'http://localhost:3000';
}

export function getFormattedUrl(params: string) {
	// sanitize params and remove leading slash
	params = params.replace(/^\/+/g, '');

	return `${getBaseUrl()}/${params}`;
}
