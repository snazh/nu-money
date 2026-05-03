import Link from "next/link";

export default function Footer() {
	return (
		<footer className="bg-slate-950 border-t border-slate-900 mt-auto pt-16 pb-8 text-slate-400">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
					<div className="md:col-span-1">
						<Link href="/" className="flex items-center gap-2 mb-4">
							<div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white">
								<span className="text-sm font-bold tracking-tighter">NU</span>
							</div>
							<span className="text-xl font-bold text-white tracking-tight">
								Money
							</span>
						</Link>
						<p className="text-sm text-slate-500 leading-relaxed mb-6">
							Money earn platform
						</p>
					</div>

					<div>
						<h4 className="text-white font-semibold mb-4">Платформа</h4>
						<ul className="space-y-3 text-sm">
							<li>
								<Link
									href="/tasks"
									className="hover:text-indigo-400 transition-colors"
								>
									Search Tasks
								</Link>
							</li>
							<li>
								<Link
									href="/freelancers"
									className="hover:text-indigo-400 transition-colors"
								>
									Freelancers
								</Link>
							</li>
							<li>
								<Link
									href="/categories"
									className="hover:text-indigo-400 transition-colors"
								>
									Categories
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="text-white font-semibold mb-4">Support</h4>
						<ul className="space-y-3 text-sm">
							<li>
								<Link
									href="/faq"
									className="hover:text-indigo-400 transition-colors"
								>
									FAQ
								</Link>
							</li>
							<li>
								<Link
									href="/contacts"
									className="hover:text-indigo-400 transition-colors"
								>
									Contacts
								</Link>
							</li>
							<li>
								<Link
									href="/rules"
									className="hover:text-indigo-400 transition-colors"
								>
									Service rules
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
					<p>© {new Date().getFullYear()} NU Money. All rights protected.</p>
				</div>
			</div>
		</footer>
	);
}
