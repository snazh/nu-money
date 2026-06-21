import { getCurrentUser } from "@/lib/auth";
import { TaskService } from "@/services/task.service";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
	const url = new URL(request.url);
	const { searchParams } = url;
	const statuses = searchParams.getAll("status");
	const categories = searchParams.getAll("category");

	const tasks = await TaskService.getAll({ statuses, categories });
	return NextResponse.json(tasks, { status: 200 });
}

export async function POST(request: Request) {
	const user = await getCurrentUser();
	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
	const body = await request.json();
	const newTask = await TaskService.create({ ...body, userId: user.id });
	return NextResponse.json(newTask, { status: 200 });
}
