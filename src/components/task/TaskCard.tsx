import Link from "next/link";
import type { Task } from "../../lib/types/task.type";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Card from "../ui/Card";

interface TaskCardProps {
	task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
	const formattedDate = new Date(task.createdAt).toLocaleDateString("en-GB");
	return (
		<Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full">
			<div>
				<div className="flex items-center justify-between mb-4">
					<Badge
						color={task.status.name === "Выполнено" ? "emerald" : "indigo"}
					>
						{task.status.name}
					</Badge>
					<span className="text-xs font-medium text-slate-400">
						{String(formattedDate)}
					</span>
				</div>

				<div className="mb-6">
					<h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">
						{task.title}
					</h3>
					<p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
						{task.description}
					</p>
				</div>
			</div>

			<div className="pt-4 border-t border-slate-100 flex flex-col gap-4">
				<div className="flex flex-wrap gap-1.5">
					{task.categories?.length ? (
						task.categories.map((cat) => (
							<Badge key={cat.id} color="slate">
								{cat.name}
							</Badge>
						))
					) : (
						<span className="text-xs text-slate-300 italic font-medium">
							no categories
						</span>
					)}
				</div>

				<div className="flex items-center justify-between">
					<span className="text-lg font-black text-slate-900 tracking-tight">
						₸ {task.price}
					</span>
					<Link href={`/tasks/${task.id}`}>
						<Button variant="outline" size="sm">
							Details
						</Button>
					</Link>
				</div>
			</div>
		</Card>
	);
}
