import { auth } from "$lib/server/lucia";
import { prisma } from "$lib/server/prisma";
import { fail, redirect } from "@sveltejs/kit";
import { LuciaError } from "lucia-auth";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, url }) => {
  const { user, session } = await locals.validateUser()

  if(!session) {
   throw redirect(303, '/login') 
  }

  if(user?.activated) {
   throw redirect(303, '/app')
  }
 
  const token = url.searchParams.get("token")

  return {
    token
  }
}

export const actions: Actions = {
  default: async ({ url, locals }) => {
    try {
      const session = await locals.validate()
      const token = url.searchParams.get("token")
      if(!token || !session) {
        return fail(400)
      }

      await auth.validateKeyPassword("email-verification", session.userId, token)
      
			// activate user
			await prisma.user.update({
				data: {
					activated: true
				},
				where: {
					id: session.userId
				}
			})
    } catch(err) {
      if(err instanceof LuciaError) {
       return fail(400, { invalidToken: 'Invalid or expired token' }) 
      }
      return fail(400)
    }
  }
}