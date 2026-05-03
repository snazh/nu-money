"use client";
import type { Task } from "../../lib/types/task.type";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Card from "../ui/Card";

interface TaskDetailsProps {
	task: Task;
}
export default function TaskDetails({ task }: TaskDetailsProps) {
	const formattedDeadline = new Date(task.createdAt).toLocaleDateString(
		"en-GB",
	);
	return (
		<div className="max-w-5xl mx-auto px-4 py-12">
			<Card className="p-10">
				<div className="flex items-center gap-3 mb-6">
					<Badge color={task.status.name === "open" ? "indigo" : "rose"}>
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

				<div className="flex flex-wrap gap-4">
					<Button variant="primary" size="lg" className="flex-1 sm:flex-none">
						Take
					</Button>
					<Button variant="outline" size="lg" className="flex-1 sm:flex-none">
						Save
					</Button>
				</div>
			</Card>
		</div>
	);
}
