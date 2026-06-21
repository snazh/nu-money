import Redis from "ioredis";
import { config } from "../env.config";

import { logger } from "./logger";

const globalForRedis = global as unknown as { redis: Redis | undefined };

const getClient = (): Redis => {
	if (globalForRedis.redis) return globalForRedis.redis;

	const redisUrl = config.redis.REDIS_URL;

	if (!redisUrl) {
		throw new Error("REDIS_URL is not defined in .env file");
	}

	const client = new Redis(redisUrl, {
		maxRetriesPerRequest: 3,
		connectTimeout: 5500,
		retryStrategy(times) {
			const delay = Math.min(times * 50, 2000);
			return delay;
		},
	});

	if (process.env.NODE_ENV !== "production") {
		globalForRedis.redis = client;
	}

	return client;
};

const getFullKey = (key: string) => {
	return `nu-money-${key}`;
};
const processValue = <T>(data: T) => {
	const value =
		typeof data === "string" || data instanceof Buffer
			? data
			: JSON.stringify(data);
	return value;
};

export async function set<T>(key: string, data: T, ttl: number = 60) {
	try {
		const client = getClient();
		return await client.set(getFullKey(key), processValue<T>(data), "EX", ttl);
	} catch (err) {
		logger.warn({ err, key }, "redis SET failed");
		return null;
	}
}

export async function get<T>(key: string): Promise<T | null> {
	try {
		const client = getClient();
		const value = await client.get(getFullKey(key));
		if (!value) return null;
		if (!value) return null;

		try {
			return JSON.parse(value) as T;
		} catch {
			return value as unknown as T;
		}
	} catch (err) {
		logger.warn({ err, key }, "redis GET failed");
		return null;
	}
}

export async function del(key: string) {
	try {
		const client = getClient();
		return await client.del(getFullKey(key));
	} catch (err) {
		logger.warn({ err, key }, "redis DEL failed");
		return null;
	}
}
