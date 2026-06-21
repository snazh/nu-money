import { z } from "zod";

export const redisSchema = z
	.object({
		REDIS_HOST: z.string(),
		REDIS_PORT: z.string().transform((val) => Number(val)),
	})
	.transform((data) => ({
		...data,
		REDIS_URL: `redis://${data.REDIS_HOST}:${data.REDIS_PORT}`,
	}));
const dbSchema = z
	.object({
		DB_USER: z.string(),
		DB_NAME: z.string(),
		DB_PORT: z.string().transform((val) => Number(val)),
		DB_HOST: z.string(),
		DB_PASSWORD: z.string(),
	})
	.transform((data) => ({
		...data,
		DATABASE_URL: `postgresql://${data.DB_USER}:${data.DB_PASSWORD}@${data.DB_HOST}:${data.DB_PORT}/${data.DB_NAME}?schema=public"`,
	}));
const tgSchema = z
	.object({
		TG_BOT_USERNAME: z.string(),
		TG_BOT_TOKEN: z.string(),
	})
	.transform((data) => ({
		...data,
		TG_URL: `https://t.me/${data.TG_BOT_USERNAME}`,
	}));
const authSchema = z.object({
	SESSION_SECRET: z.string(),
});
export const config = {
	mode: process.env.NODE_ENV || "development",
	isDev: process.env.NODE_ENV !== "production",

	db: dbSchema.parse(process.env),
	redis: redisSchema.parse(process.env),
	tg: tgSchema.parse(process.env),
	auth: authSchema.parse(process.env),
} as const;

export type Config = typeof config;
