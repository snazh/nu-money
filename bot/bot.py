import json
import logging
import os

from redis.asyncio import Redis
from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

TG_BOT_TOKEN = os.environ["TG_BOT_TOKEN"]
REDIS_HOST = os.environ.get("REDIS_HOST", "redis")
REDIS_PORT = int(os.environ.get("REDIS_PORT", "6379"))
SESSION_TTL_SECONDS = 300

redis_client = Redis(host=REDIS_HOST, port=REDIS_PORT, decode_responses=True)


def redis_key(token: str) -> str:
    return f"nu-money-{token}"


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user = update.effective_user
    args = context.args

    if not args:
        await update.message.reply_text(
            "👋 Welcome to NU Money. Open the sign-in link on the website "
            "to link your Telegram account."
        )
        return

    token = args[0]
    key = redis_key(token)
    raw = await redis_client.get(key)

    if raw is None:
        await update.message.reply_text(
            "⚠️ This login link has expired. Please request a new one on the website."
        )
        return

    payload = {
        "status": "confirmed",
        "user": {
            "id": user.id,
            "username": user.username,
            "first_name": user.first_name,
        },
    }
    await redis_client.set(key, json.dumps(payload), ex=SESSION_TTL_SECONDS)

    await update.message.reply_text(
        "✅ You're linked! Go back to NU Money — you'll be signed in automatically."
    )


def main() -> None:
    app = Application.builder().token(TG_BOT_TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    logger.info("Bot starting, polling for updates")
    app.run_polling()


if __name__ == "__main__":
    main()
