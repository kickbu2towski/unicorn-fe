import { auth } from '$lib/server/lucia';
import { authSchema } from '$lib/zodSchemas';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { LuciaError } from 'lucia-auth';
import { z, ZodError } from 'zod';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData());
		try {
			const result = authSchema.parse(formData);
			const user = await auth.validateKeyPassword('email', result.email, result.password);
			const session = await auth.createSession(user.userId);
			locals.setSession(session);
		} catch (err) {
			if (err instanceof LuciaError) {
				return fail(400, {
					incorrectAuth: 'Incorrect email or password'
				});
			}
			if (err instanceof ZodError) {
				const { fieldErrors: errors } = err.flatten();
				return fail(400, errors);
			}
			return fail(400);
		}
	}
};
