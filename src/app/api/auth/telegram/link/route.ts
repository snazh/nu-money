import { config } from "@/env.config";
import { set } from "@/lib/redis";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
export async function GET() {
	const token = uuidv4();

	await set(token, { status: "pending" }, 300);

	const link = `${config.tg.TG_URL}?start=${token}`;

	return NextResponse.json({ link, token });
}
