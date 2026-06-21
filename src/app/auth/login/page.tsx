import { redirect } from "next/navigation";
import { TelegramConnectButton } from "@/components/auth/TelegramConnectButton";
import Card from "@/components/ui/Card";
import { getCurrentUser } from "@/lib/auth";

export default async function LoginPage() {
	const user = await getCurrentUser();
	if (user) redirect("/profile");

	return (
		<div className="max-w-md mx-auto px-4 py-20">
			<div className="text-center mb-10">
				<h1 className="text-3xl font-black text-slate-900 tracking-tight">
					Sign in to NU Money
				</h1>
				<p className="text-slate-500 mt-2">
					Use your Telegram account to sign in or create an account.
				</p>
			</div>
			<Card className="p-8">
				<TelegramConnectButton />
			</Card>
		</div>
	);
}
