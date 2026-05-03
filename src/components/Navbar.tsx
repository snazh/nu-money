import Link from "next/link";
import Button from "./ui/Button";
import Input from "./ui/Input";

export default function Navbar() {
	return (
		<nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
			<div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
				{/* Логотип */}
				<Link href="/" className="flex items-center gap-2 group">
					<div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-sm">
						NU
					</div>
					<span className="text-xl font-bold text-slate-900 tracking-tight">
						Money
					</span>
				</Link>

				<div className="hidden md:block flex-1 max-w-sm mx-8">
					<Input placeholder="Search tasks..." className="!mb-0 shadow-none" />
				</div>

				<div className="flex items-center gap-6 text-sm font-medium">
					<Link
						href="/cart"
						className="text-slate-600 hover:text-indigo-600 transition"
					>
						Dashboard
					</Link>
					<Link href="/auth/login">
						<Button size="sm">Sign in</Button>
					</Link>
				</div>
			</div>
		</nav>
	);
}
