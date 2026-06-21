import Link from "next/link";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import TaskList from "@/components/task/TaskList";
import Button from "@/components/ui/Button";
import { requireUser } from "@/lib/auth";
import { TaskService } from "@/services/task.service";
import { UserService } from "@/services/user.service";

export default async function DashboardPage() {
	const user = await requireUser();

	const [stats, myTasks] = await Promise.all([
		UserService.getStats(user.id),
		TaskService.getByUserId(user.id),
	]);

	return (
		<div className="max-w-7xl mx-auto px-4 py-12">
			<header className="flex items-center justify-between mb-10">
				<div>
					<h1 className="text-3xl font-black text-slate-900 tracking-tight">
						Dashboard
					</h1>
					<p className="text-slate-500 mt-1">
						Welcome back, {user.tgUsername ? `@${user.tgUsername}` : "there"}.
					</p>
				</div>
				<Link href="/tasks/create">
					<Button size="lg">Post a Task</Button>
				</Link>
			</header>

			<div className="mb-12">
				<DashboardStats
					postedCount={stats.postedCount}
					openCount={stats.openCount}
					assignedCount={stats.assignedCount}
				/>
			</div>

			<section>
				<h2 className="text-2xl font-bold text-slate-900 mb-6">
					My Posted Tasks
				</h2>
				<TaskList tasks={myTasks} />
			</section>
		</div>
	);
}
