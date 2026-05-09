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
