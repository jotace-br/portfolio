export function getBaseUrl() {
	if (typeof window !== 'undefined') {
		return window.location.origin;
	}

	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
	if (siteUrl) {
		return siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;
	}

	const vercelUrl = process.env.VERCEL_URL;
	if (vercelUrl) {
		return `https://${vercelUrl}`;
	}

	return 'http://localhost:3000';
}

export function getBaseUrlObject(): URL {
	return new URL(getBaseUrl());
}

export function getFormattedUrl(pathname: string): string {
	const sanitizedPathname = pathname.replace(/^\/+/g, '');
	return `${getBaseUrl()}/${sanitizedPathname}`;
}

export function getAbsoluteUrl(pathname: string): string {
	const sanitizedPathname = pathname.replace(/^\/+/g, '');
	return new URL(sanitizedPathname, getBaseUrlObject()).toString();
}
