import { prisma } from "$lib/server/prisma";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
 const session  = await locals.validate()

  const projects = await prisma.project.findMany({
    where: {
      user_id: session?.userId
    }
  })

  return {
    projects
  } 
}