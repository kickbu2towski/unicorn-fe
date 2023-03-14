import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const session = await locals.validate();
	if(!session) {
		throw redirect(303, '/login')
	}

	const [projects, todoKeywords] = await prisma.$transaction([
		prisma.project.findMany({
			where: {
				user_id: session?.userId
			}
		}),

		prisma.todoKeywords.findMany({
			where: {
				user_id: session?.userId
			}
		})
	]);

	return {
		projects,
		todoKeywords
	};
};
