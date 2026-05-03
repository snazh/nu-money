import Link from "next/link";
import { CreateTaskForm } from "@/src/components/task/СreateTask";

export default function CreateTaskPage() {
	return (
		<div className="max-w-4xl mx-auto px-4 py-12">
			<div className="mb-10 text-center">
				<Link
					href="/"
					className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors uppercase tracking-widest"
				>
					← Back to Home
				</Link>
				<h1 className="text-4xl font-black text-slate-900 mt-4 tracking-tight">
					Post a New Task
				</h1>
				<p className="text-slate-500 mt-2">
					Fill out the form below to find the best freelancer for your project.
				</p>
			</div>
			<CreateTaskForm />
		</div>
	);
}
