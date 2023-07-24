/** Set the initial language cookie. */
export function setInitialLanguageCookie() {
	const getCookie = (name: string) => {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null;
		return null;
	};
	const locale = getCookie('lang');
	if (!locale) {
		document.cookie = `lang=en;path=/`;
	}
}

export const setLanguageCookie = (lang: string) => {
	document.cookie = `lang=${lang};path=/`;
};
