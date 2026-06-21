import type { BadgeColor } from "../../components/ui/Badge";

const STATUS_COLORS: Record<string, BadgeColor> = {
	open: "indigo",
	taken: "amber",
	completed: "emerald",
};

export function getStatusBadgeColor(statusName: string): BadgeColor {
	return STATUS_COLORS[statusName] ?? "slate";
}
