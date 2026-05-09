import type { Task } from "../../lib/types/task.type";
import TaskCard from "./TaskCard";

interface TaskListProps {
	tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
	if (!tasks || tasks.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
				<p className="text-slate-500 font-medium">No tasks yet</p>
			</div>
		);
	}
	return (
		<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6 px-2 md:px-0 items-stretch">
			{tasks.map((task) => (
				<TaskCard key={task.id} task={task} />
			))}
		</div>
	);
}
