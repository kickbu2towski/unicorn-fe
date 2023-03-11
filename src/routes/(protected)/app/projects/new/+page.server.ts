import { prisma } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	addProject: async ({ request, url, locals }) => {
		const session = await locals.validate();
		try {
			const { name } = Object.fromEntries(await request.formData());
			const color = url.searchParams.get('color');
			const edit = url.searchParams.get('edit');
			const projectId = url.searchParams.get('id');

			if (!session || !name || !color || typeof color !== 'string' || typeof name !== 'string') {
				return fail(400);
			}

			if (edit === "false") {
				const project = await prisma.project.create({
					data: {
						color,
						user_id: session?.userId,
						name
					}
				});
				return { success: true, projectId: project.id };
			}

			if (edit === "true" && projectId) {
				await prisma.project.update({
					data: {
						name,
						color
					},
					where: {
						id: Number(projectId)
					}
				});
				return { success: true, projectId };
			}
		} catch (e) {
			return fail(400);
		}
	}
};
