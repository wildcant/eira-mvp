export const load = async ({ request }) => {
	return {
		/** For reference @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#mobile_tablet_or_desktop */
		isMobile: request.headers.get('user-agent')?.includes('Mobi')
	};
};
