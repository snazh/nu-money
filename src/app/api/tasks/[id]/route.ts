import { TaskService } from "@/services/task.service";
import { NextResponse } from "next/server";
export async function GET(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id } = await params;
	const task = await TaskService.getOne(Number(id));

	return NextResponse.json(task, { status: 200 });
}

export async function POST(request: Request) {
	const body = await request.json();
	return NextResponse.json({ received: body });
}
