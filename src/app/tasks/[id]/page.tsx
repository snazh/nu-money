import { notFound } from "next/navigation";
import TaskDetails, { type ViewerAction } from "@/components/task/TaskDetails";
import { getCurrentUser } from "@/lib/auth";
import { TaskService } from "@/services/task.service";

interface TaskDetailsPageProps {
	params: Promise<{ id: string }>;
}

export default async function TaskDetailsPage({
	params,
}: TaskDetailsPageProps) {
	const { id } = await params;
	const taskId = Number(id);

	const [task, currentUser] = await Promise.all([
		TaskService.getOne(taskId),
		getCurrentUser(),
	]);

	if (!task) notFound();

	const isOwner = currentUser?.id === task.user.id;
	const isOpen = task.status.name === "open";

	let viewerAction: ViewerAction;

	if (isOwner) {
		const [pendingRequests, approvedAssignment] = await Promise.all([
			isOpen ? TaskService.getPendingRequests(taskId) : Promise.resolve([]),
			isOpen ? Promise.resolve(null) : TaskService.getApprovedAssignment(taskId),
		]);
		viewerAction = {
			type: "owner",
			pendingRequests,
			contactTarget: approvedAssignment?.assignee ?? null,
		};
	} else if (!currentUser) {
		viewerAction = { type: "signed-out" };
	} else {
		const myRequest = await TaskService.getMyRequest(taskId, currentUser.id);

		if (myRequest?.status === "approved") {
			viewerAction = { type: "approved", contactTarget: task.user };
		} else if (!isOpen) {
			viewerAction = { type: "unavailable" };
		} else if (myRequest?.status === "pending") {
			viewerAction = { type: "pending" };
		} else if (myRequest?.status === "rejected") {
			viewerAction = { type: "rejected" };
		} else {
			viewerAction = { type: "can-request" };
		}
	}

	return <TaskDetails task={task} viewerAction={viewerAction} />;
}
