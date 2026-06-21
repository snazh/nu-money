import { createHmac, timingSafeEqual } from "node:crypto";
import { config } from "../env.config";

export const SESSION_COOKIE = "nu_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

interface SessionPayload {
	userId: number;
}

function sign(value: string): string {
	return createHmac("sha256", config.auth.SESSION_SECRET)
		.update(value)
		.digest("base64url");
}

export function signSession(payload: SessionPayload): string {
	const value = Buffer.from(JSON.stringify(payload)).toString("base64url");
	return `${value}.${sign(value)}`;
}

export function verifySession(cookieValue: string): SessionPayload | null {
	const [value, signature] = cookieValue.split(".");
	if (!value || !signature) return null;

	const expectedSignature = sign(value);
	const a = Buffer.from(signature);
	const b = Buffer.from(expectedSignature);
	if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

	try {
		const payload = JSON.parse(Buffer.from(value, "base64url").toString());
		if (typeof payload?.userId !== "number") return null;
		return payload;
	} catch {
		return null;
	}
}
