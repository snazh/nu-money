"use client";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import TaskDetails from "@/src/components/task/TaskDetails";
import Loading from "@/src/components/ui/Loading";
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
		return <Loading message="Task is loading" />;
	}
	if (error || !task) {
		notFound();
	}
	return <TaskDetails task={task} />;
}
