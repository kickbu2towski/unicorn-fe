import { prisma } from "$lib/server/prisma";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const projectId = params.slug
  const project = await prisma.project.findUnique({
    where: {
      id: Number(projectId),
    }
  })
  return {
    project
  }
}