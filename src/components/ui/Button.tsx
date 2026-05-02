import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "outline" | "danger";
	size?: "sm" | "md" | "lg";
	fullWidth?: boolean;
}

export default function Button({
	children,
	variant = "primary",
	size = "md",
	fullWidth = false,
	className = "",
	...props
}: ButtonProps) {
	const baseStyles =
		"inline-flex items-center justify-center font-semibold rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

	const variants = {
		primary:
			"bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-600/20 focus:ring-indigo-500",
		secondary:
			"bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-500",
		outline:
			"border-2 border-slate-200 bg-transparent text-slate-700 hover:border-indigo-600 hover:text-indigo-600 focus:ring-indigo-500",
		danger: "bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-500",
	};

	const sizes = {
		sm: "px-3 py-1.5 text-xs",
		md: "px-5 py-2.5 text-sm",
		lg: "px-6 py-3.5 text-base",
	};

	return (
		<button
			className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
}
