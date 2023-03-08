import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const { session, user } = await locals.validateUser() 
 
  if(!session) {
    throw redirect(303, '/login')
  }

  if(session && !user.activated) {
    throw redirect(303, '/verify')
  }
  
  throw redirect(303, '/app')
}