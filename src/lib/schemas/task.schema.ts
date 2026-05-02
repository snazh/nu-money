import { z } from "zod";

export const TaskCreateSchema = z.object({
	title: z.string(),
	description: z.string(),
	userId: z.number(),
	categoryNames: z.array(z.string()).default([]),
});
export type TaskCreate = z.infer<typeof TaskCreateSchema>;
