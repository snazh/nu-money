import Link from "next/link";
import TaskList from "@/components/task/TaskList";
import Button from "@/components/ui/Button";
import { TaskService } from "@/services/task.service";

const FEATURED_LIMIT = 4;

export default async function Home() {
	const tasks = await TaskService.getAll({ statuses: ["open"] });
	const featuredTasks = tasks.slice(0, FEATURED_LIMIT);

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<header className="text-center mb-16 py-10">
				<div className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-600 ring-1 ring-inset ring-indigo-600/20 mb-6">
					🚀 #1 Marketplace at Nazarbayev University
				</div>
				<h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
					Welcome to <span className="text-indigo-600">NU MONEY</span>
				</h1>
				<p className="max-w-2xl mx-auto text-xl text-slate-500 leading-relaxed mb-10">
					Your trusted platform for paid tasks and freelance projects within the
					university. Earn money by helping others achieve more.
				</p>
				<div className="flex justify-center gap-4">
					<Link href="/tasks/create">
						<Button size="lg">Post a Project</Button>
					</Link>
					<Link href="/tasks">
						<Button size="lg" variant="outline">
							Browse Tasks
						</Button>
					</Link>
				</div>
			</header>

			<section>
				<div className="flex items-center justify-between mb-8">
					<h2 className="text-2xl font-bold text-slate-900">Featured Tasks</h2>
					<Link
						href="/tasks"
						className="text-sm font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-widest"
					>
						View all →
					</Link>
				</div>

				<TaskList tasks={featuredTasks} />
			</section>
		</div>
	);
}
