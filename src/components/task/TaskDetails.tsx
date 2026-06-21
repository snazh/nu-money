import Link from "next/link";
import type { TaskDetail, TaskOwner } from "../../lib/types/task.type";
import { getStatusBadgeColor } from "../../lib/utils/status";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { RequestTaskButton } from "./RequestTaskButton";
import { TaskRequestsPanel } from "./TaskRequestsPanel";

interface PendingRequest {
	id: number;
	assignee: { id: number; tgUsername: string | null };
}

export type ViewerAction =
	| { type: "owner"; pendingRequests: PendingRequest[]; contactTarget: TaskOwner | null }
	| { type: "approved"; contactTarget: TaskOwner }
	| { type: "pending" }
	| { type: "rejected" }
	| { type: "can-request" }
	| { type: "signed-out" }
	| { type: "unavailable" };

interface TaskDetailsProps {
	task: TaskDetail;
	viewerAction: ViewerAction;
}

function TelegramContactLink({ target }: { target: TaskOwner }) {
	if (!target.tgUsername) {
		return (
			<p className="text-sm font-semibold text-slate-500">
				This user has no public Telegram username yet.
			</p>
		);
	}
	return (
		<a href={`https://t.me/${target.tgUsername}`} target="_blank" rel="noopener noreferrer">
			<Button variant="primary" size="lg" className="flex-1 sm:flex-none">
				Message on Telegram
			</Button>
		</a>
	);
}

export default function TaskDetails({ task, viewerAction }: TaskDetailsProps) {
	const formattedDeadline = task.deadline
		? new Date(task.deadline).toLocaleDateString("en-GB")
		: "No deadline";

	return (
		<div className="max-w-5xl mx-auto px-4 py-12">
			{viewerAction.type === "owner" && viewerAction.pendingRequests.length > 0 && (
				<TaskRequestsPanel taskId={task.id} requests={viewerAction.pendingRequests} />
			)}

			<Card className="p-10">
				<div className="flex items-center gap-3 mb-6">
					<Badge color={getStatusBadgeColor(task.status.name)}>
						{task.status.name}
					</Badge>
					<span className="text-sm text-slate-400 font-medium">
						Task ID: {task.id}
					</span>
				</div>

				<h1 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
					{task.title}
				</h1>

				<p className="text-slate-600 text-lg leading-relaxed mb-8">
					{task.description}
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100 mb-8">
					<div>
						<p className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-1">
							Price
						</p>
						<p className="text-2xl font-black text-slate-900">₸ {task.price}</p>
					</div>
					<div>
						<p className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-1">
							Deadline
						</p>
						<p className="text-2xl font-black text-slate-900">
							{formattedDeadline}
						</p>
					</div>
				</div>

				<div className="flex flex-wrap items-center gap-4">
					{viewerAction.type === "owner" && (
						<>
							{viewerAction.contactTarget ? (
								<TelegramContactLink target={viewerAction.contactTarget} />
							) : (
								<span className="text-sm font-semibold text-slate-500">
									{task.status.name === "open"
										? "Posted by you. Approve a request above to confirm a helper."
										: "Posted by you."}
								</span>
							)}
						</>
					)}

					{viewerAction.type === "approved" && (
						<TelegramContactLink target={viewerAction.contactTarget} />
					)}

					{viewerAction.type === "pending" && (
						<span className="text-sm font-semibold text-slate-500">
							Request sent — waiting for the poster to approve.
						</span>
					)}

					{viewerAction.type === "rejected" && (
						<>
							<span className="text-sm font-semibold text-slate-500">
								Your previous request was declined.
							</span>
							<RequestTaskButton taskId={task.id} />
						</>
					)}

					{viewerAction.type === "can-request" && (
						<RequestTaskButton taskId={task.id} />
					)}

					{viewerAction.type === "signed-out" && (
						<Link href="/auth/login">
							<Button variant="primary" size="lg" className="flex-1 sm:flex-none">
								Sign in to Request
							</Button>
						</Link>
					)}

					{viewerAction.type === "unavailable" && (
						<span className="text-sm font-semibold text-slate-500">
							This task is no longer open.
						</span>
					)}

					<Button variant="outline" size="lg" className="flex-1 sm:flex-none">
						Save
					</Button>
				</div>
			</Card>
		</div>
	);
}
