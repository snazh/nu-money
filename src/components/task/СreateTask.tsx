// src/app/tasks/create/_components/CreateTaskForm.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Alert from "@/src/components/ui/Alert";
import Button from "@/src/components/ui/Button";
import Card from "@/src/components/ui/Card";
import Input from "@/src/components/ui/Input";
import { useCategories } from "@/src/hooks/useCategories";
import {
	type APITaskCreate,
	type TaskCreate,
	TaskCreateSchema,
} from "@/src/lib/schemas/task.schema";

export function CreateTaskForm() {
	const { categories, isLoading } = useCategories();
	const [status, setStatus] = useState<{ sent: boolean; error: boolean }>({
		sent: false,
		error: false,
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<TaskCreate>({
		resolver: zodResolver(TaskCreateSchema),
		defaultValues: {
			title: "",
			description: "",
			price: 5000,
			deadline: "",
			categoryNames: [],
		},
	});

	const onSubmit = async (formData: TaskCreate) => {
		setStatus({ sent: false, error: false });

		const apiData: APITaskCreate = {
			...formData,
			deadline: new Date(formData.deadline),
			categoryNames: formData.categoryNames || [],
		};

		try {
			const response = await fetch("/api/tasks", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(apiData),
			});

			if (!response.ok) throw new Error();

			setStatus({ sent: true, error: false });
			reset();
			window.scrollTo({ top: 0, behavior: "smooth" });
		} catch {
			setStatus({ sent: false, error: true });
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="grid grid-cols-1 lg:grid-cols-3 gap-8"
		>
			{/* Статус-бары (Alerts) */}
			<div className="lg:col-span-3 space-y-4">
				{status.sent && (
					<Alert
						variant="success"
						title="Task Published"
						message="Your task is now visible to all NU freelancers."
						onClose={() => setStatus((prev) => ({ ...prev, sent: false }))}
					/>
				)}
				{status.error && (
					<Alert
						variant="error"
						title="Submission Failed"
						message="There was an error saving your task. Please try again."
						onClose={() => setStatus((prev) => ({ ...prev, error: false }))}
					/>
				)}
			</div>
			<div className="lg:col-span-2 space-y-6">
				<Card>
					<div className="space-y-6">
						<Input
							label="Project Title"
							placeholder="e.g., WCS 150 Essay 2"
							error={errors.title?.message}
							{...register("title")}
						/>

						<div className="flex flex-col gap-3">
							<span className="text-sm font-medium text-slate-700">
								Categories (Select all that apply)
							</span>
							{isLoading ? (
								<div className="text-sm text-slate-400 animate-pulse">
									Loading categories...
								</div>
							) : (
								<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
									{categories?.map((cat) => (
										<label
											key={cat.id}
											className="relative flex items-center p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-indigo-500 cursor-pointer transition-all group"
										>
											<input
												type="checkbox"
												value={cat.name}
												{...register("categoryNames")}
												className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 mr-3"
											/>
											<span className="text-sm text-slate-700 group-hover:text-indigo-600 font-medium">
												{cat.name}
											</span>
										</label>
									))}
								</div>
							)}
							{errors.categoryNames && (
								<span className="text-xs text-rose-500 font-bold uppercase">
									{errors.categoryNames.message}
								</span>
							)}
						</div>

						<div className="flex flex-col gap-1.5">
							<label
								htmlFor="description"
								className="text-sm font-medium text-slate-700"
							>
								Description
							</label>
							<textarea
								id="description"
								placeholder="Explain the task requirements..."
								className={`w-full min-h-[160px] rounded-xl border ${
									errors.description ? "border-rose-500" : "border-slate-200"
								} bg-slate-50 px-4 py-3 text-sm focus:bg-white focus:border-indigo-500 transition-all outline-none`}
								{...register("description")}
							/>
							{errors.description && (
								<span className="text-xs text-rose-500 font-bold uppercase">
									{errors.description.message}
								</span>
							)}
						</div>
					</div>
				</Card>

				<Card>
					<h3 className="text-lg font-bold text-slate-900 mb-6">
						Price & Deadline
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<Input
							label="Price (₸)"
							type="number"
							placeholder="5000"
							error={errors.price?.message}
							{...register("price", { valueAsNumber: true })}
						/>
						<Input
							label="Deadline"
							type="date"
							error={errors.deadline?.message}
							{...register("deadline")}
						/>
					</div>
				</Card>

				<div className="flex gap-4">
					<Button
						type="submit"
						variant="primary"
						size="lg"
						className="flex-1 shadow-xl shadow-indigo-600/20"
						disabled={isSubmitting}
					>
						{isSubmitting ? "Publishing..." : "Publish Task"}
					</Button>
					<Button type="button" variant="secondary" size="lg">
						Save Draft
					</Button>
				</div>
			</div>

			{/* Правая колонка: Tips */}
			<div className="space-y-6">
				<Card className="bg-indigo-600 border-none text-white p-8">
					<h4 className="text-lg font-bold mb-4 tracking-tight">
						Quick Tips 💡
					</h4>
					<ul className="space-y-4 text-sm text-indigo-100">
						<li className="flex gap-3">
							<span className="opacity-60">•</span> Select multiple categories
							to reach more freelancers.
						</li>
						<li className="flex gap-3">
							<span className="opacity-60">•</span> Realistic deadlines attract
							quality help.
						</li>
					</ul>
				</Card>
			</div>
		</form>
	);
}
