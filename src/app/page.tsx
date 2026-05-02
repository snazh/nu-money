"use client";
import { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import type { Task } from "../lib/types/task.type";

export default function Home() {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("api/tasks");
				const result = await response.json();
				setTasks(result);
			} catch (error) {
				console.error("Failed fetch tasks", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);
	return (
		<div className="text-center">
			<h1 className="text-4xl font-bold mb-4">Welcome to NU MONEY!</h1>
			<p className="text-lg text-gray-600 mb-8">
				Your service for payed task at NU
			</p>

			<TaskList tasks={tasks}></TaskList>
		</div>
	);
}
