import { get } from "@/lib/redis";
import { SESSION_COOKIE, SESSION_MAX_AGE, signSession } from "@/lib/session";
import { UserService } from "@/services/user.service";
import { type NextRequest, NextResponse } from "next/server";

interface RedisSession {
	status: "pending" | "confirmed" | "expired";
	user?: {
		id: number;
		username?: string;
		first_name: string;
	};
}
export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const token = searchParams.get("token");
	if (!token) {
		return NextResponse.json({ error: "Token is required" }, { status: 400 });
	}
	const data = await get<RedisSession>(token);

	if (!data) {
		return NextResponse.json(
			{ error: "Token expired or invalid" },
			{ status: 404 },
		);
	}

	if (data.status === "confirmed" && data.user) {
		const user = await UserService.upsertFromTelegram(data.user);
		const response = NextResponse.json({
			status: "authenticated",
			user: data.user,
		});
		response.cookies.set(SESSION_COOKIE, signSession({ userId: user.id }), {
			httpOnly: true,
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
			path: "/",
			maxAge: SESSION_MAX_AGE,
		});
		return response;
	}
	return NextResponse.json({ status: "pending" });
}
