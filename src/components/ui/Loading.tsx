interface LoadingProps {
	message: string;
}

export default function Loading({ message }: LoadingProps) {
	return (
		<div className="flex flex-col items-center justify-center min-h-[60vh]">
			<div className="relative mb-6">
				<div className="w-12 h-12 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div>
			</div>
			<p className="text-slate-500 font-medium animate-pulse tracking-wide text-sm uppercase">
				{message}...
			</p>
		</div>
	);
}
