import { NextResponse } from "next/server";
import { CategoryService } from "@/src/services/category.service";

export async function GET(request: Request) {
	const categories = await CategoryService.getAll();
	return NextResponse.json(categories, { status: 200 });
}

export async function POST(request: Request) {
	const body = await request.json();
	return NextResponse.json({ received: body }, { status: 200 });
}
