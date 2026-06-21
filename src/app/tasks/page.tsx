import type { SearchParams } from "next/dist/server/request/search-params";
import { Suspense } from "react";
import { TaskFilters } from "@/components/task/TaskFilters";
import TaskList from "@/components/task/TaskList";
import { CategoryService } from "@/services/category.service";
import { TaskService } from "@/services/task.service";

interface TasksPageProps {
	searchParams: Promise<SearchParams>;
}

function toStringArray(value: string | string[] | undefined): string[] {
	if (!value) return [];
	return Array.isArray(value) ? value : [value];
}

function toSingleString(value: string | string[] | undefined): string | undefined {
	return Array.isArray(value) ? value[0] : value;
}

export default async function TasksPage({ searchParams }: TasksPageProps) {
	const params = await searchParams;

	const categories = toStringArray(params.category);
	const search = toSingleString(params.search);
	const minPriceRaw = toSingleString(params.minPrice);
	const maxPriceRaw = toSingleString(params.maxPrice);
	const deadlineBeforeRaw = toSingleString(params.deadlineBefore);

	const [tasks, allCategories] = await Promise.all([
		TaskService.getAll({
			categories,
			search,
			minPrice: minPriceRaw ? Number(minPriceRaw) : undefined,
			maxPrice: maxPriceRaw ? Number(maxPriceRaw) : undefined,
			deadlineBefore: deadlineBeforeRaw ? new Date(deadlineBeforeRaw) : undefined,
		}),
		CategoryService.getAll(),
	]);

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<header className="flex items-center justify-between mb-8">
				<h1 className="text-3xl font-black text-slate-900 tracking-tight">
					Browse Tasks
				</h1>
				<span className="text-sm text-slate-400 font-medium">
					{tasks.length} active listings
				</span>
			</header>

			<Suspense>
				<TaskFilters categories={allCategories} />
			</Suspense>

			<TaskList tasks={tasks} />
		</div>
	);
}
