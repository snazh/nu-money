import { logoutAction } from "../../lib/actions/auth.actions";
import type { User } from "../../lib/types/user.type";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Card from "../ui/Card";

interface ProfileCardProps {
	user: User;
}

export function ProfileCard({ user }: ProfileCardProps) {
	const displayName = user.tgUsername || `NU Member #${user.id}`;
	const joined = new Date(user.createdAt).toLocaleDateString("en-GB", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<Card className="p-10">
			<div className="flex items-center gap-4 mb-8">
				<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white text-2xl font-black">
					{displayName[0]?.toUpperCase()}
				</div>
				<div>
					<h1 className="text-2xl font-black text-slate-900 tracking-tight">
						{displayName}
					</h1>
					{user.tgUsername && <Badge color="indigo">@{user.tgUsername}</Badge>}
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100 mb-8">
				<div>
					<p className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-1">
						Member ID
					</p>
					<p className="text-sm font-semibold text-slate-900">#{user.id}</p>
				</div>
				<div>
					<p className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-1">
						Member Since
					</p>
					<p className="text-sm font-semibold text-slate-900">{joined}</p>
				</div>
			</div>

			<form action={logoutAction}>
				<Button type="submit" variant="outline">
					Sign out
				</Button>
			</form>
		</Card>
	);
}
