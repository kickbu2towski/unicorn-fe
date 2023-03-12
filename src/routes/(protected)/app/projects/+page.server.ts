import { prisma } from '$lib/server/prisma';
import { ProjectSchema } from '$lib/zodSchemas';
import { fail, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	addProject: async ({ request, url, locals }) => {
		const session = await locals.validate();
		try {
			const { name } = Object.fromEntries(await request.formData());
			const color = url.searchParams.get('color');
			const edit = url.searchParams.get('edit');
			const projectId = url.searchParams.get('id');

			if (!session) {
				return fail(400);
			}

			const data = ProjectSchema.parse({
				name,
				color,
				edit,
				projectId
			})

			if (data.edit === "false") {
				const project = await prisma.project.create({
					data: {
						color: data.color,
						user_id: session?.userId,
						name: data.name,
					}
				});
				return { success: true, projectId: project.id };
			}

			if (data.edit === "true" && data.projectId) {
				await prisma.project.update({
					data: {
						name: data.name,
						color: data.color,
					},
					where: {
						id: Number(data.projectId)
					}
				});
				return { success: true, projectId };
			}
		} catch (e) {
			return fail(400);
		}
	}
};
