import { prisma } from '$lib/server/prisma';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ locals, params }) => {
	const session = await locals.validate();
	const id = params.id;

	try {
		if (!session) {
			return json({ message: 'auth check failed' });
		}

		await prisma.project.delete({
			where: {
				id: Number(id)
			}
		});
    
    return json({ message: 'deletion successful'})
	} catch (err) {
    return new Response(null);
  }
};
