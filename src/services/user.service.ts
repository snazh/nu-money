import { prisma } from "../lib/prisma";
import type { User } from "../lib/types/user.type";

interface TelegramProfile {
	id: number;
	username?: string;
	first_name: string;
}

function toUser(row: {
	id: number;
	tgId: bigint | null;
	tgUsername: string | null;
	createdAt: Date;
}): User {
	return {
		id: row.id,
		tgId: row.tgId !== null ? row.tgId.toString() : null,
		tgUsername: row.tgUsername,
		createdAt: row.createdAt,
	};
}

export const UserService = {
	async getById(id: number): Promise<User | null> {
		const row = await prisma.user.findUnique({ where: { id } });
		return row ? toUser(row) : null;
	},
	async upsertFromTelegram(profile: TelegramProfile): Promise<User> {
		const tgId = BigInt(profile.id);
		const row = await prisma.user.upsert({
			where: { tgId },
			update: {
				tgUsername: profile.username,
			},
			create: {
				tgId,
				tgUsername: profile.username,
			},
		});
		return toUser(row);
	},
	async getStats(userId: number) {
		const [postedCount, openCount, assignedCount] = await Promise.all([
			prisma.task.count({ where: { userId } }),
			prisma.task.count({ where: { userId, status: { name: "open" } } }),
			prisma.taskAssignment.count({
				where: { assigneeId: userId, status: "approved" },
			}),
		]);
		return { postedCount, openCount, assignedCount };
	},
};
