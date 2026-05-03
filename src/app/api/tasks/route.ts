import { NextResponse } from "next/server";
import { TaskService } from "@/src/services/task.service";
export async function GET(request: Request) {
	const url = new URL(request.url);
	const { searchParams } = url;
	const statuses = searchParams.getAll("status");
	const categories = searchParams.getAll("category");

	const tasks = await TaskService.getAll({ statuses, categories });
	return NextResponse.json(tasks, { status: 200 });
}

export async function POST(request: Request) {
	const body = await request.json();
	const userId = 1; // until auth
	const newTask = await TaskService.create({ ...body, userId });
	return NextResponse.json(newTask, { status: 200 });
}
