import Link from "next/link";
import { getCurrentUser } from "../lib/auth";
import { logoutAction } from "../lib/actions/auth.actions";
import Button from "./ui/Button";
import Input from "./ui/Input";

export default async function Navbar() {
	const user = await getCurrentUser();

	return (
		<nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
			<div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
				<Link href="/" className="flex items-center gap-2 group">
					<div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-sm">
						NU
					</div>
					<span className="text-xl font-bold text-slate-900 tracking-tight">
						Money
					</span>
				</Link>

				<form
					action="/tasks"
					method="GET"
					className="hidden md:block flex-1 max-w-sm mx-8"
				>
					<Input
						name="search"
						placeholder="Search tasks..."
						className="!mb-0 shadow-none"
					/>
				</form>

				<div className="flex items-center gap-6 text-sm font-medium">
					<Link
						href="/"
						className="text-slate-600 hover:text-indigo-600 transition"
					>
						Home
					</Link>
					<Link
						href="/tasks"
						className="text-slate-600 hover:text-indigo-600 transition"
					>
						Browse Tasks
					</Link>
					{user ? (
						<>
							<Link
								href="/dashboard"
								className="text-slate-600 hover:text-indigo-600 transition"
							>
								Dashboard
							</Link>
							<Link
								href="/profile"
								className="text-slate-600 hover:text-indigo-600 transition"
							>
								{user.tgUsername ? `@${user.tgUsername}` : "Profile"}
							</Link>
							<form action={logoutAction}>
								<Button type="submit" variant="secondary" size="sm">
									Sign out
								</Button>
							</form>
						</>
					) : (
						<Link href="/auth/login">
							<Button size="sm">Sign in</Button>
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
}
