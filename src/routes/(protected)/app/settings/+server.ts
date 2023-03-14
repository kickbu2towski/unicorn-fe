import { prisma } from '$lib/server/prisma';
import { TodoKeywordsPayloadSchema, SettingsSchema } from '$lib/zodSchemas';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals, request }) => {
	const session = await locals.validate();
	if (!session) {
		return json({ status: 403, message: 'you need to be authenticated' });
	}

	try {
		const body = await request.json();
		const { todoKeywords, deletedIds } = SettingsSchema.parse(body);

		if (deletedIds.length) {
			await prisma.todoKeywords.deleteMany({
				where: {
					id: {
						in: deletedIds
					}
				}
			});
		}

		let newKeywords = todoKeywords.filter((keyword) => keyword.id < 0);
		const existingKeywords = todoKeywords.filter((keyword) => keyword.id > 0);

		let keywords = TodoKeywordsPayloadSchema.parse(newKeywords);
		if (keywords.length) {
			await prisma.todoKeywords.createMany({
				data: keywords.map((keyword) => ({ ...keyword, user_id: session.userId }))
			});
		}

		keywords = TodoKeywordsPayloadSchema.parse(existingKeywords);
		if (keywords.length) {
			prisma.$transaction(
				keywords.map((keyword, i) =>
					prisma.todoKeywords.update({
						where: {
							id: existingKeywords[i].id
						},
						data: keyword
					})
				)
			);
		}

		return json({ status: 200, message: 'settings updated successfully'});
	} catch (err) {
		return json({ status: 500, message: 'internal server error' });
	}
};
