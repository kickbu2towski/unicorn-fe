import { auth } from "$lib/server/lucia";
import { prisma } from "$lib/server/prisma";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const actions: Actions = {
  logout: async ({ locals }) => {
    const session = await locals.validate()
    if(!session) {
      return fail(400)
    }
    await auth.invalidateSession(session.sessionId)
    locals.setSession(null) 
  }
}