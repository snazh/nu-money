import { forwardRef, type InputHTMLAttributes, useId } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, error, className = "", ...props }, ref) => {
		const id = useId();

		return (
			<div className={`flex flex-col gap-1.5 ${className}`}>
				{label && (
					<label htmlFor={id} className="text-sm font-medium text-slate-700">
						{label}
					</label>
				)}
				<input
					id={id}
					ref={ref} // ПЕРЕДАЕМ REF СЮДА
					className={`w-full rounded-xl border bg-slate-50 px-4 py-2.5 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 ${
						error
							? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
							: "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10"
					}`}
					{...props}
				/>
				{error && (
					<span className="text-xs text-red-500 font-medium">{error}</span>
				)}
			</div>
		);
	},
);

Input.displayName = "Input";

export default Input;
