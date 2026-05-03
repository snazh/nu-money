import { z } from "zod";

const taskBase = {
	title: z.string().min(5),
	description: z.string().optional(),
	categoryNames: z.array(z.string()).default([]),
};
export const TaskCreateSchema = z.object({
	...taskBase,
	price: z.number().int().nonnegative(),
	deadline: z
		.union([z.string(), z.date()])
		.refine(
			(val) => {
				const date = new Date(val);
				const today = new Date();
				today.setHours(0, 0, 0, 0);
				return date >= today;
			},
			{
				message: "Deadline cannot be in the past",
			},
		)
		.transform((val) => new Date(val)),
});

export const APITaskCreateSchema = z.object({
	...taskBase,
	price: z.number(),
	deadline: z.date(),
});
export const DBTaskCreateSchema = z.object({
	...taskBase,
	price: z.number(),
	deadline: z.date(),
	userId: z.number(),
});

export type TaskCreate = z.input<typeof TaskCreateSchema>;
export type APITaskCreate = z.infer<typeof APITaskCreateSchema>;
export type DBTaskCreate = z.infer<typeof DBTaskCreateSchema>;
