import type { Category } from "./category.type";

export interface Status {
	id: number;
	name: string;
}
export interface Task {
	id: number;
	title: string;
	description: string | null;
	status: Status;
	price: number;
	deadline: Date | null;
	createdAt: Date;
	categories: Category[];
}

export interface TaskOwner {
	id: number;
	tgUsername: string | null;
}

export interface TaskDetail extends Task {
	user: TaskOwner;
}
