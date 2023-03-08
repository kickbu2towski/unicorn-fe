import { auth } from '$lib/server/lucia';
import { handleHooks } from '@lucia-auth/sveltekit';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const protectRoutes: Handle = async ({ event, resolve }) => {
	const { locals, route, url } = event;
	const { session, user } = await locals.validateUser();

	if (route.id?.includes('auth') && session) {
		throw redirect(303, '/app');
	}

	if (route.id?.includes('protected') && !session) {
		throw redirect(303, '/login');
	}

	if (route.id?.includes('protected') && session && !user.activated) {
		throw redirect(303, '/verify');
	}

	return resolve(event);
};

export const handle = sequence(handleHooks(auth), protectRoutes);
