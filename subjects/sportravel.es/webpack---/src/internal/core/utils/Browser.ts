// Also detects iOS
export function isSafari(): boolean {
	return /apple/i.test(navigator.vendor);
}

export function isInternetExplorer(): boolean {
	return /MSIE |Trident\//.test(navigator.userAgent);
}



// WEBPACK FOOTER //
// ../../../../../src/.internal/core/utils/Browser.ts