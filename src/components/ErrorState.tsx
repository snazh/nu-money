"use client";

import Link from "next/link";
import Button from "./ui/Button";

interface ErrorStateProps {
	code?: string;
	title?: string;
}

export default function ErrorState({
	code = "404",
	title = "Page Not Found",
}: ErrorStateProps) {
	return (
		<div className="min-h-[75vh] flex items-center justify-center p-6 bg-white">
			<div className="max-w-md w-full text-center">
				<div className="relative flex justify-center items-center mb-16">
					<span className="text-[14rem] font-[1000] leading-none select-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-slate-50 opacity-80 drop-shadow-sm">
						{code}
					</span>
					<div className="absolute group">
						<div className="absolute inset-0 bg-indigo-500 rounded-[2rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>

						<div className="relative h-28 w-28 bg-indigo-600 rounded-[2.2rem] rotate-12 flex items-center justify-center shadow-2xl shadow-indigo-900/40 border border-indigo-400/20">
							<svg
								className="w-12 h-12 text-white -rotate-12"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2.5"
									d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
					</div>
				</div>

				<div className="relative z-10">
					<h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">
						{title}
					</h2>

					<div className="flex justify-center">
						<Link href="/" passHref>
							<Button
								variant="primary"
								size="lg"
								className="px-12 rounded-2xl shadow-xl shadow-indigo-500/20 hover:translate-y-[-2px] transition-all"
							>
								Take Me Home
							</Button>
						</Link>
					</div>
				</div>

				<p className="mt-20 text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
					Nu Money Security Protocol • 404_ERR
				</p>
			</div>
		</div>
	);
}
