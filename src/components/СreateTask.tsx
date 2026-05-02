import Button from "./ui/Button";
import Card from "./ui/Card";
import Input from "./ui/Input";

export default function CreateTaskPage() {
	return (
		<div className="max-w-7xl mx-auto px-4 py-12">
			<div className="flex flex-col lg:flex-row gap-8">
				{/* Левая колонка: Форма */}
				<div className="flex-1">
					<h1 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">
						Создание новой задачи
					</h1>

					<Card className="space-y-6">
						{/* Название задачи */}
						<Input
							label="Название проекта"
							placeholder="Например: Разработать дизайн логотипа"
						/>

						{/* Описание */}
						<div className="flex flex-col gap-1.5">
							<label className="text-sm font-medium text-slate-700">
								Описание задачи
							</label>
							<textarea
								className="w-full min-h-[200px] rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
								placeholder="Подробно опишите, что нужно сделать..."
							/>
						</div>

						{/* Категории и Бюджет */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<Input label="Бюджет ($)" type="number" placeholder="500" />
							<div className="flex flex-col gap-1.5">
								<label className="text-sm font-medium text-slate-700">
									Категория
								</label>
								<select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:bg-white focus:border-indigo-500 transition-all">
									<option>Дизайн</option>
									<option>Разработка</option>
									<option>Маркетинг</option>
								</select>
							</div>
						</div>

						{/* Срок выполнения */}
						<Input label="Крайний срок (Deadline)" type="date" />

						{/* Кнопки действий */}
						<div className="pt-6 border-t border-slate-100 flex gap-4">
							<Button variant="primary" size="lg" className="flex-1">
								Опубликовать задачу
							</Button>
							<Button variant="secondary" size="lg">
								Черновик
							</Button>
						</div>
					</Card>
				</div>

				{/* Правая колонка: Советы */}
				<div className="w-full lg:w-80">
					<Card className="bg-indigo-600 border-none text-white sticky top-24">
						<h3 className="text-lg font-bold mb-4">
							Как найти лучшего исполнителя?
						</h3>
						<ul className="space-y-4 text-sm text-indigo-100">
							<li className="flex gap-3">
								<span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold">
									1
								</span>
								Подробно опишите требования к результату.
							</li>
							<li className="flex gap-3">
								<span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold">
									2
								</span>
								Укажите реальный бюджет и сроки.
							</li>
							<li className="flex gap-3">
								<span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold">
									3
								</span>
								Прикрепите примеры того, что вам нравится (референсы).
							</li>
						</ul>
					</Card>
				</div>
			</div>
		</div>
	);
}
