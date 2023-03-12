import { z } from "zod";

export const ProjectSchema = z.object({
	name: z.string(),
	color: z.string(),
  edit: z.enum(["true", "false"]),
  projectId: z.string().optional(),
})

export const AuthSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.min(1, { message: 'Email is required' })
		.email({ message: 'Email must be a valid email address' }),
	password: z
		.string({ required_error: 'Password is required' })
		.min(6, { message: 'Password must be at least 6 characters' })
		.max(32, { message: 'Password must be less than 32 characters' })
		.trim()
});

const TodoKeywordSchema = z.object({
	name: z.string().min(2),
	color: z.string(),
	isActionable: z.boolean(),
})

export const TodoKeywordsPayloadSchema = z.array(TodoKeywordSchema)

export const TodoKeywordsSchema = TodoKeywordSchema.merge(z.object({
	id: z.number()
}))

export const SettingsSchema = z.object({
	todoKeywords: z.array(TodoKeywordsSchema),
	deletedIds: z.array(z.number()),
})