"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Alert from "../ui/Alert";
import Button from "../ui/Button";

interface LinkResponse {
	link: string;
	token: string;
}

interface StatusResponse {
	status: "pending" | "authenticated";
}

const POLL_INTERVAL_MS = 2000;

export function TelegramConnectButton() {
	const router = useRouter();
	const [link, setLink] = useState<string | null>(null);
	const [error, setError] = useState(false);
	const [isConnecting, setIsConnecting] = useState(false);
	const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const stopPolling = () => {
		if (pollRef.current) {
			clearInterval(pollRef.current);
			pollRef.current = null;
		}
	};

	const startPolling = (token: string) => {
		pollRef.current = setInterval(async () => {
			try {
				const res = await fetch(`/api/auth/telegram/status?token=${token}`);
				if (!res.ok) return;
				const data: StatusResponse = await res.json();
				if (data.status === "authenticated") {
					stopPolling();
					router.push("/profile");
					router.refresh();
				}
			} catch {
				// keep polling, transient network errors are fine
			}
		}, POLL_INTERVAL_MS);
	};

	const handleConnect = async () => {
		setError(false);
		setIsConnecting(true);
		try {
			const res = await fetch("/api/auth/telegram/link");
			if (!res.ok) throw new Error();
			const data: LinkResponse = await res.json();
			setLink(data.link);
			window.open(data.link, "_blank", "noopener,noreferrer");
			startPolling(data.token);
		} catch {
			setError(true);
		} finally {
			setIsConnecting(false);
		}
	};

	return (
		<div className="flex flex-col gap-4">
			{error && (
				<Alert
					variant="error"
					title="Connection Failed"
					message="Could not start the Telegram login. Please try again."
					onClose={() => setError(false)}
				/>
			)}
			<Button
				size="lg"
				fullWidth
				onClick={handleConnect}
				disabled={isConnecting}
			>
				{isConnecting ? "Connecting..." : "Continue with Telegram"}
			</Button>
			{link && (
				<p className="text-sm text-slate-500 text-center">
					Confirm the login in Telegram. Didn&apos;t open?{" "}
					<a
						href={link}
						target="_blank"
						rel="noopener noreferrer"
						className="text-indigo-600 font-medium hover:underline"
					>
						Open the link
					</a>
					.
				</p>
			)}
		</div>
	);
}
