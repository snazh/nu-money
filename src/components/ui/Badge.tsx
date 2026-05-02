import type React from "react";

interface BadgeProps {
	children: React.ReactNode;
	color?: "indigo" | "emerald" | "slate" | "amber" | "rose";
}

export default function Badge({ children, color = "slate" }: BadgeProps) {
	const colors = {
		indigo: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
		emerald: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
		slate: "bg-slate-100 text-slate-700 ring-slate-500/20",
		amber: "bg-amber-50 text-amber-700 ring-amber-600/20",
		rose: "bg-rose-50 text-rose-700 ring-rose-600/20",
	};

	return (
		<span
			className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${colors[color]}`}
		>
			{children}
		</span>
	);
}
