import { useEffect, useState } from "react";
import type { Category } from "../lib/types/category.type";

export function useCategories() {
	const [categories, setCategories] = useState<Category[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch("/api/categories")
			.then((res) => res.json())
			.then((data) => {
				setCategories(data);
				setIsLoading(false);
			});
	}, []);

	return { categories, isLoading };
}
