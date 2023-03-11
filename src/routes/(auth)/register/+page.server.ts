import { auth } from '$lib/server/lucia';
import { prisma } from '$lib/server/prisma';
import { authSchema } from '$lib/zodSchemas';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { ZodError } from 'zod'
import { generateRandomString } from 'lucia-auth'
import { sendMail } from '$lib/server/mail';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData())	
		
		try {
			const { email, password } = authSchema.parse(formData)

      const user = await prisma.user.findUnique({ where: {
        email
      }})

      if(user) {
        return fail(400, { emailUnavailable: "This email address is unavailable"})
      }

			const newUser = await auth.createUser({
				key: {
					password,
					providerId: 'email',
					providerUserId: email
				},
				attributes: {
          username: "",
					activated: false,
					email,
				}
			});
      const session = await auth.createSession(newUser.userId)

			const token = generateRandomString(26)

			// create a key
			await auth.createKey(newUser.userId, {
				providerId: "email-verification",
				providerUserId: newUser.userId,
				password: token,
				timeout: 60 * 60 * 24 * 3, // valid for 3 days
			})

			// send email
			await sendMail(email, token)
      locals.setSession(session)
		} catch(err) {
		  if(err instanceof ZodError)	{
				const { fieldErrors: errors } = err.flatten()
				return fail(400, errors)
			}
			return fail(400);
		}
	}
};
