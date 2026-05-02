import Link from "next/link";

export default function Footer() {
	return (
		<footer className="bg-slate-950 border-t border-slate-900 mt-auto pt-16 pb-8 text-slate-400">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
					{/* Brand Info */}
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
							Платформа для поиска задач и фрилансеров. Зарабатывайте безопасно
							и быстро вместе с NU Money.
						</p>
					</div>

					{/* Links Column 1 */}
					<div>
						<h4 className="text-white font-semibold mb-4">Платформа</h4>
						<ul className="space-y-3 text-sm">
							<li>
								<Link
									href="/tasks"
									className="hover:text-indigo-400 transition-colors"
								>
									Поиск задач
								</Link>
							</li>
							<li>
								<Link
									href="/freelancers"
									className="hover:text-indigo-400 transition-colors"
								>
									Фрилансеры
								</Link>
							</li>
							<li>
								<Link
									href="/categories"
									className="hover:text-indigo-400 transition-colors"
								>
									Категории
								</Link>
							</li>
						</ul>
					</div>

					{/* Links Column 2 */}
					<div>
						<h4 className="text-white font-semibold mb-4">Поддержка</h4>
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
									Контакты
								</Link>
							</li>
							<li>
								<Link
									href="/rules"
									className="hover:text-indigo-400 transition-colors"
								>
									Правила сервиса
								</Link>
							</li>
						</ul>
					</div>

					{/* Newsletter / Legal */}
					<div>
						<h4 className="text-white font-semibold mb-4">
							Правовая информация
						</h4>
						<ul className="space-y-3 text-sm">
							<li>
								<Link
									href="/terms"
									className="hover:text-indigo-400 transition-colors"
								>
									Пользовательское соглашение
								</Link>
							</li>
							<li>
								<Link
									href="/privacy"
									className="hover:text-indigo-400 transition-colors"
								>
									Политика конфиденциальности
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
					<p>© {new Date().getFullYear()} NU Money. Все права защищены.</p>
					<div className="flex items-center gap-4">
						<span className="text-slate-500">Сделано с любовью</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
