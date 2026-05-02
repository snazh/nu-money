import z from "zod";

export const CategoryCreateSchema = z.object({
	name: z.string(),
});
export type CategoryCreate = z.infer<typeof CategoryCreateSchema>;
