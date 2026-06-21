"use client";

import { useState } from "react";
import { requestTaskAction } from "@/app/tasks/[id]/actions";
import Alert from "../ui/Alert";
import Button from "../ui/Button";

interface RequestTaskButtonProps {
	taskId: number;
}

export function RequestTaskButton({ taskId }: RequestTaskButtonProps) {
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [sent, setSent] = useState(false);

	const handleClick = async () => {
		setError(null);
		setIsPending(true);
		const result = await requestTaskAction(taskId);
		setIsPending(false);

		if (!result.success) {
			setError(result.message);
			return;
		}
		setSent(true);
	};

	if (sent) {
		return (
			<Alert
				variant="success"
				title="Request sent"
				message="The poster will review your request. You'll be able to message them on Telegram once approved."
			/>
		);
	}

	return (
		<div className="flex flex-col gap-3 flex-1 sm:flex-none">
			{error && (
				<Alert
					variant="error"
					title="Couldn't send request"
					message={error}
					onClose={() => setError(null)}
				/>
			)}
			<Button
				variant="primary"
				size="lg"
				className="flex-1 sm:flex-none"
				onClick={handleClick}
				disabled={isPending}
			>
				{isPending ? "Sending..." : "Request to Take"}
			</Button>
		</div>
	);
}
