import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserService } from "../services/user.service";
import { SESSION_COOKIE, verifySession } from "./session";
import type { User } from "./types/user.type";

export async function getCurrentUser(): Promise<User | null> {
	const cookieStore = await cookies();
	const cookieValue = cookieStore.get(SESSION_COOKIE)?.value;
	if (!cookieValue) return null;

	const session = verifySession(cookieValue);
	if (!session) return null;

	return UserService.getById(session.userId);
}

export async function requireUser(): Promise<User> {
	const user = await getCurrentUser();
	if (!user) redirect("/auth/login");
	return user;
}
