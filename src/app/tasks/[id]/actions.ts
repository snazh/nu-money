"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { TaskService } from "@/services/task.service";

type ActionResult =
	| { success: true }
	| { success: false; message: string };

export async function requestTaskAction(taskId: number): Promise<ActionResult> {
	const user = await requireUser();
	const result = await TaskService.requestTask(taskId, user.id);

	if (result.success) {
		revalidatePath(`/tasks/${taskId}`);
	}
	return result;
}

export async function approveRequestAction(
	assignmentId: number,
	taskId: number,
): Promise<ActionResult> {
	const user = await requireUser();
	const result = await TaskService.approveRequest(assignmentId, user.id);

	if (result.success) {
		revalidatePath(`/tasks/${taskId}`);
		revalidatePath("/tasks");
		revalidatePath("/dashboard");
	}
	return result;
}

export async function rejectRequestAction(
	assignmentId: number,
	taskId: number,
): Promise<ActionResult> {
	const user = await requireUser();
	const result = await TaskService.rejectRequest(assignmentId, user.id);

	if (result.success) {
		revalidatePath(`/tasks/${taskId}`);
	}
	return result;
}
