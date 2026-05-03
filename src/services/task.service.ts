import { prisma } from "../lib/prisma";
import type { DBTaskCreate } from "../lib/schemas/task.schema";

interface TaskFilter {
	statuses?: string[] | null;
	categories?: string[];
}

export const TaskService = {
	async getOne(taskId: number) {
		return await prisma.task.findUnique({
			where: { id: taskId },
			include: {
				categories: true,
				status: true,
			},
		});
	},
	async getAll(filters?: TaskFilter) {
		return await prisma.task.findMany({
			where: {
				status: filters?.statuses?.length
					? { name: { in: filters.statuses } }
					: undefined,
				categories: filters?.categories?.length
					? {
							some: {
								name: {
									in: filters.categories,
								},
							},
						}
					: undefined,
			},
			include: {
				categories: true,
				status: true,
			},
		});
	},
	async create(taskData: DBTaskCreate) {
		const { categoryNames, userId, ...task } = taskData;
		const newTask = await prisma.task.create({
			data: {
				...task,
				status: {
					connectOrCreate: {
						where: { name: "open" },
						create: { name: "open" },
					},
				},
				user: {
					connect: { id: userId },
				},
				categories: {
					connect: categoryNames.map((name) => ({ name })),
				},
			},
			include: {
				categories: true,
				status: true,
			},
		});
		return newTask;
	},
};
