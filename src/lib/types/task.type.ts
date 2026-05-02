export interface Category {
	id: number;
	name: string;
}
export interface Status {
	id: number;
	name: string;
}
export interface Task {
	id: number;
	title: string;
	description: string;
	status: Status;
	categories: Category[];
}
