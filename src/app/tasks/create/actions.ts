"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { APITaskCreateSchema, type TaskCreate } from "@/lib/schemas/task.schema";
import { TaskService } from "@/services/task.service";

type CreateTaskResult =
	| { success: true; taskId: number }
	| { success: false; message: string };

export async function createTaskAction(
	input: TaskCreate,
): Promise<CreateTaskResult> {
	const user = await requireUser();

	const parsed = APITaskCreateSchema.safeParse({
		...input,
		deadline: new Date(input.deadline),
	});
	if (!parsed.success) {
		return { success: false, message: "Invalid task data" };
	}

	const task = await TaskService.create({ ...parsed.data, userId: user.id });
	revalidatePath("/tasks");
	return { success: true, taskId: task.id };
}
