"use client";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import TaskDetails from "@/src/components/TaskDetails";
import type { Task } from "@/src/lib/types/task.type";
export default function TaskDetailsPage() {
	const params = useParams();
	const taskId = params.id;

	const [task, setTask] = useState<Task>();
	const [error, setError] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`/api/tasks/${taskId}`);
				if (!response.ok) {
					setError(true);
				}
				const data = await response.json();
				setTask(data);
			} catch (error) {
				console.error("Failed to fetch task with ID", error);
				setError(true);
			} finally {
				setIsLoading(false);
			}
		};
		if (taskId) fetchData();
	}, [taskId]);
	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="animate-pulse text-indigo-600 font-bold">
					Task is loading...
				</div>
			</div>
		);
	}
	if (error || !task) {
		notFound();
	}
	return <TaskDetails task={task} />;
}
