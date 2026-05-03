import type { Category } from "./category.type";

export interface Status {
	id: number;
	name: string;
}
export interface Task {
	id: number;
	title: string;
	description: string;
	status: Status;
	price: number;
	deadline: Date;
	createdAt: Date;
	categories: Category[];
}
