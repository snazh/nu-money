import type { Task } from "../lib/types/task.type";
import TaskCard from "./TaskCard";

interface TaskListProps {
	tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
	if (!tasks || tasks.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
				<p className="text-slate-500 font-medium">Задач пока нет.</p>
			</div>
		);
	}

	return (
		<div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{tasks.map((task) => (
				<TaskCard key={task.id} task={task} />
			))}
		</div>
	);
}
