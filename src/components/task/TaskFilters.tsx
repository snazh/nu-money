"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import type { Category } from "@/lib/types/category.type";
import Button from "../ui/Button";
import Input from "../ui/Input";

interface TaskFiltersProps {
	categories: Category[];
}

const SEARCH_DEBOUNCE_MS = 400;

export function TaskFilters({ categories }: TaskFiltersProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const selectedCategories = new Set(searchParams.getAll("category"));

	const submitForm = (form: HTMLFormElement) => {
		const formData = new FormData(form);
		const params = new URLSearchParams();
		for (const [key, value] of formData.entries()) {
			if (typeof value === "string" && value.trim() !== "") {
				params.append(key, value);
			}
		}
		router.push(params.toString() ? `${pathname}?${params}` : pathname);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		submitForm(e.currentTarget);
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const form = e.currentTarget.form;
		if (!form) return;
		if (debounceRef.current) clearTimeout(debounceRef.current);
		debounceRef.current = setTimeout(() => submitForm(form), SEARCH_DEBOUNCE_MS);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4 mb-8">
			<Input
				name="search"
				placeholder="Search tasks by title..."
				defaultValue={searchParams.get("search") ?? ""}
				onChange={handleSearchChange}
			/>

			{categories.length > 0 && (
				<div className="flex flex-wrap gap-2">
					{categories.map((cat) => (
						<label
							key={cat.id}
							className="relative flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-white hover:border-indigo-500 cursor-pointer transition-all text-sm font-medium text-slate-700"
						>
							<input
								type="checkbox"
								name="category"
								value={cat.name}
								defaultChecked={selectedCategories.has(cat.name)}
								onChange={(e) => e.currentTarget.form?.requestSubmit()}
								className="w-3.5 h-3.5 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
							/>
							{cat.name}
						</label>
					))}
				</div>
			)}

			<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 items-end">
				<Input
					name="minPrice"
					type="number"
					label="Min Price"
					placeholder="0"
					defaultValue={searchParams.get("minPrice") ?? ""}
				/>
				<Input
					name="maxPrice"
					type="number"
					label="Max Price"
					placeholder="Any"
					defaultValue={searchParams.get("maxPrice") ?? ""}
				/>
				<Input
					name="deadlineBefore"
					type="date"
					label="Deadline Before"
					defaultValue={searchParams.get("deadlineBefore") ?? ""}
				/>
				<div className="flex gap-2">
					<Button type="submit" fullWidth>
						Apply
					</Button>
					<Button
						type="button"
						variant="secondary"
						onClick={() => router.push(pathname)}
					>
						Clear
					</Button>
				</div>
			</div>
		</form>
	);
}
