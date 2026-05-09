import Redis from "ioredis";
import { config } from "../env.config";

const globalForRedis = global as unknown as { redis: Redis | undefined };

export const redis =
	globalForRedis.redis ??
	new Redis(config.redis.REDIS_URL, {
		maxRetriesPerRequest: null,
		retryStrategy(times) {
			const delay = Math.min(times * 50, 2000);
			return delay;
		},
	});

if (config.mode !== "production") globalForRedis.redis = redis;
