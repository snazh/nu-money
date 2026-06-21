"use client";

import { useState } from "react";
import {
	approveRequestAction,
	rejectRequestAction,
} from "@/app/tasks/[id]/actions";
import Alert from "../ui/Alert";
import Button from "../ui/Button";
import Card from "../ui/Card";

interface PendingRequest {
	id: number;
	assignee: { id: number; tgUsername: string | null };
}

interface TaskRequestsPanelProps {
	taskId: number;
	requests: PendingRequest[];
}

export function TaskRequestsPanel({ taskId, requests }: TaskRequestsPanelProps) {
	const [resolvedIds, setResolvedIds] = useState<Set<number>>(new Set());
	const [pendingId, setPendingId] = useState<number | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handle = async (assignmentId: number, action: "approve" | "reject") => {
		setError(null);
		setPendingId(assignmentId);
		const result =
			action === "approve"
				? await approveRequestAction(assignmentId, taskId)
				: await rejectRequestAction(assignmentId, taskId);
		setPendingId(null);

		if (!result.success) {
			setError(result.message);
			return;
		}
		setResolvedIds((prev) => new Set(prev).add(assignmentId));
	};

	const visibleRequests = requests.filter((r) => !resolvedIds.has(r.id));

	if (visibleRequests.length === 0) return null;

	return (
		<Card className="p-6 mb-6">
			<h2 className="text-lg font-bold text-slate-900 mb-4">
				Requests to Take This Task
			</h2>
			{error && (
				<div className="mb-4">
					<Alert
						variant="error"
						title="Action failed"
						message={error}
						onClose={() => setError(null)}
					/>
				</div>
			)}
			<ul className="space-y-3">
				{visibleRequests.map((request) => (
					<li
						key={request.id}
						className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50"
					>
						<span className="font-medium text-slate-700">
							{request.assignee.tgUsername
								? `@${request.assignee.tgUsername}`
								: `User #${request.assignee.id}`}
						</span>
						<div className="flex gap-2">
							<Button
								size="sm"
								variant="primary"
								disabled={pendingId === request.id}
								onClick={() => handle(request.id, "approve")}
							>
								Approve
							</Button>
							<Button
								size="sm"
								variant="outline"
								disabled={pendingId === request.id}
								onClick={() => handle(request.id, "reject")}
							>
								Reject
							</Button>
						</div>
					</li>
				))}
			</ul>
		</Card>
	);
}
