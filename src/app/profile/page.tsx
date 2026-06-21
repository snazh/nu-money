import { ProfileCard } from "@/components/profile/ProfileCard";
import { requireUser } from "@/lib/auth";

export default async function ProfilePage() {
	const user = await requireUser();

	return (
		<div className="max-w-2xl mx-auto px-4 py-12">
			<ProfileCard user={user} />
		</div>
	);
}
