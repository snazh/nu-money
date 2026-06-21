import Card from "../ui/Card";

interface DashboardStatsProps {
	postedCount: number;
	openCount: number;
	assignedCount: number;
}

export function DashboardStats({
	postedCount,
	openCount,
	assignedCount,
}: DashboardStatsProps) {
	const stats = [
		{ label: "Posted Tasks", value: postedCount },
		{ label: "Open Listings", value: openCount },
		{ label: "Assignments Taken", value: assignedCount },
	];

	return (
		<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
			{stats.map((stat) => (
				<Card key={stat.label}>
					<p className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2">
						{stat.label}
					</p>
					<p className="text-3xl font-black text-slate-900">{stat.value}</p>
				</Card>
			))}
		</div>
	);
}
