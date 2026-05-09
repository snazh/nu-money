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

export const config = {
	mode: process.env.NODE_ENV || "development",
	isDev: process.env.NODE_ENV !== "production",

	db: dbSchema.parse(process.env),
	redis: redisSchema.parse(process.env),
} as const;

export type Config = typeof config;
