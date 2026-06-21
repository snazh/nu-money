import { prisma } from "../lib/prisma";
import type { DBTaskCreate } from "../lib/schemas/task.schema";

interface TaskFilter {
	statuses?: string[] | null;
	categories?: string[];
	search?: string;
	minPrice?: number;
	maxPrice?: number;
	deadlineAfter?: Date;
	deadlineBefore?: Date;
}

export const TaskService = {
	async getOne(taskId: number) {
		return await prisma.task.findUnique({
			where: { id: taskId },
			include: {
				categories: true,
				status: true,
				user: { select: { id: true, tgUsername: true } },
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
				title: filters?.search
					? { contains: filters.search, mode: "insensitive" }
					: undefined,
				price:
					filters?.minPrice !== undefined || filters?.maxPrice !== undefined
						? { gte: filters?.minPrice, lte: filters?.maxPrice }
						: undefined,
				deadline:
					filters?.deadlineAfter || filters?.deadlineBefore
						? { gte: filters?.deadlineAfter, lte: filters?.deadlineBefore }
						: undefined,
			},
			include: {
				categories: true,
				status: true,
			},
			orderBy: { createdAt: "desc" },
		});
	},
	async getByUserId(userId: number) {
		return await prisma.task.findMany({
			where: { userId },
			include: {
				categories: true,
				status: true,
			},
			orderBy: { createdAt: "desc" },
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
	async requestTask(taskId: number, assigneeId: number) {
		const task = await prisma.task.findUnique({
			where: { id: taskId },
			include: { status: true },
		});

		if (!task) {
			return { success: false as const, message: "Task not found" };
		}
		if (task.status.name !== "open") {
			return { success: false as const, message: "This task is no longer open" };
		}
		if (task.userId === assigneeId) {
			return {
				success: false as const,
				message: "You can't request your own task",
			};
		}

		const existing = await prisma.taskAssignment.findFirst({
			where: { taskId, assigneeId, status: { in: ["pending", "approved"] } },
		});
		if (existing) {
			return {
				success: false as const,
				message: "You already requested this task",
			};
		}

		await prisma.taskAssignment.create({
			data: { taskId, assignerId: task.userId, assigneeId, status: "pending" },
		});
		return { success: true as const };
	},
	async getPendingRequests(taskId: number) {
		return prisma.taskAssignment.findMany({
			where: { taskId, status: "pending" },
			include: { assignee: { select: { id: true, tgUsername: true } } },
			orderBy: { createdAt: "asc" },
		});
	},
	async getMyRequest(taskId: number, userId: number) {
		return prisma.taskAssignment.findFirst({
			where: { taskId, assigneeId: userId },
			orderBy: { createdAt: "desc" },
		});
	},
	async getApprovedAssignment(taskId: number) {
		return prisma.taskAssignment.findFirst({
			where: { taskId, status: "approved" },
			include: { assignee: { select: { id: true, tgUsername: true } } },
		});
	},
	async approveRequest(assignmentId: number, ownerId: number) {
		const assignment = await prisma.taskAssignment.findUnique({
			where: { id: assignmentId },
			include: { task: { include: { status: true } } },
		});

		if (!assignment) {
			return { success: false as const, message: "Request not found" };
		}
		if (assignment.task.userId !== ownerId) {
			return { success: false as const, message: "Not your task" };
		}
		if (assignment.status !== "pending") {
			return {
				success: false as const,
				message: "This request was already resolved",
			};
		}
		if (assignment.task.status.name !== "open") {
			return { success: false as const, message: "This task is no longer open" };
		}

		await prisma.$transaction([
			prisma.taskAssignment.update({
				where: { id: assignmentId },
				data: { status: "approved" },
			}),
			prisma.taskAssignment.updateMany({
				where: {
					taskId: assignment.taskId,
					status: "pending",
					id: { not: assignmentId },
				},
				data: { status: "rejected" },
			}),
			prisma.task.update({
				where: { id: assignment.taskId },
				data: {
					status: {
						connectOrCreate: {
							where: { name: "taken" },
							create: { name: "taken" },
						},
					},
				},
			}),
		]);

		return { success: true as const };
	},
	async rejectRequest(assignmentId: number, ownerId: number) {
		const assignment = await prisma.taskAssignment.findUnique({
			where: { id: assignmentId },
			include: { task: true },
		});

		if (!assignment) {
			return { success: false as const, message: "Request not found" };
		}
		if (assignment.task.userId !== ownerId) {
			return { success: false as const, message: "Not your task" };
		}
		if (assignment.status !== "pending") {
			return {
				success: false as const,
				message: "This request was already resolved",
			};
		}

		await prisma.taskAssignment.update({
			where: { id: assignmentId },
			data: { status: "rejected" },
		});
		return { success: true as const };
	},
};
