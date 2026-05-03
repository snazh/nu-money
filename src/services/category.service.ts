import { prisma } from "../lib/prisma";
import type { CategoryCreate } from "../lib/schemas/category.schema";

export const CategoryService = {
	async getOne(categoryName: string) {
		return await prisma.taskCategory.findUnique({
			where: { name: categoryName },
		});
	},
	async getAll() {
		return await prisma.taskCategory.findMany();
	},
	async create(categoryData: CategoryCreate) {
		const newCategory = await prisma.taskCategory.create({
			data: {
				...categoryData,
			},
		});
		return newCategory;
	},
};
