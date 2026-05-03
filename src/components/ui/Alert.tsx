"use client";

import {
	BanknotesIcon,
	ClockIcon,
	LightBulbIcon,
	ShieldExclamationIcon,
	XMarkIcon,
} from "@heroicons/react/24/solid";

interface AlertProps {
	variant?: "success" | "error" | "warning" | "info";
	title: string;
	message?: string;
	onClose?: () => void;
}

export default function Alert({
	variant = "info",
	title,
	message,
	onClose,
}: AlertProps) {
	const styles = {
		success: {
			container: "border-emerald-200 bg-emerald-50/50",
			iconBg: "bg-emerald-500",
			icon: <BanknotesIcon className="w-5 h-5 text-white" />,
			accent: "bg-emerald-500",
			textTitle: "text-emerald-900",
		},
		error: {
			container: "border-rose-200 bg-rose-50/50",
			iconBg: "bg-rose-500",
			icon: <ShieldExclamationIcon className="w-5 h-5 text-white" />,
			accent: "bg-rose-500",
			textTitle: "text-rose-900",
		},
		warning: {
			container: "border-amber-200 bg-amber-50/50",
			iconBg: "bg-amber-500",
			icon: <ClockIcon className="w-5 h-5 text-white" />,
			accent: "bg-amber-500",
			textTitle: "text-amber-900",
		},
		info: {
			container: "border-indigo-200 bg-indigo-50/50",
			iconBg: "bg-indigo-500",
			icon: <LightBulbIcon className="w-5 h-5 text-white" />,
			accent: "bg-indigo-500",
			textTitle: "text-indigo-900",
		},
	};

	const s = styles[variant];

	return (
		<div
			className={`relative overflow-hidden flex items-start gap-4 p-4 rounded-2xl border backdrop-blur-md ${s.container} transition-all duration-300 shadow-sm`}
		>
			{/* Боковая статусная полоска для акцента */}
			<div className={`absolute left-0 top-0 bottom-0 w-1 ${s.accent}`} />

			{/* Иконка в сплошном круге — выглядит более солидно */}
			<div
				className={`flex-shrink-0 w-10 h-10 rounded-full ${s.iconBg} flex items-center justify-center shadow-lg shadow-${variant}-500/20 mt-0.5`}
			>
				{s.icon}
			</div>

			<div className="flex-grow pr-6">
				<h4
					className={`text-sm font-black uppercase tracking-wider ${s.textTitle}`}
				>
					{title}
				</h4>
				{message && (
					<p className="mt-1 text-sm text-slate-600 font-medium leading-snug">
						{message}
					</p>
				)}
			</div>

			{onClose && (
				<button
					onClick={onClose}
					className="flex-shrink-0 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-all"
				>
					<XMarkIcon className="w-5 h-5" />
				</button>
			)}
		</div>
	);
}
