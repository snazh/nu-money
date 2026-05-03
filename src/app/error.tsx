"use client";

import { useEffect } from "react";
import ErrorState from "../components/ErrorState";
import Button from "../components/ui/Button";

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="flex flex-col items-center">
			<ErrorState code="500" title="Something went wrong" />

			<div className="-mt-8 mb-20">
				<Button variant="secondary" onClick={() => reset()}>
					Retry
				</Button>
			</div>
		</div>
	);
}
