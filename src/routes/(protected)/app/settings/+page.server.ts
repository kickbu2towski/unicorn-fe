import { prisma } from "$lib/server/prisma";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.validate()

  if(!session) {
    throw redirect(303, '/login')
  }
 
  const todoKeywords = await prisma.todoKeywords.findMany({
    where: {
      user_id: session.userId
    }
  })
 
  return {
    todoKeywords
  }
}