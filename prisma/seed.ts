import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

function daysFromNow(days: number): Date {
	const date = new Date();
	date.setDate(date.getDate() + days);
	return date;
}

async function main() {
	await prisma.taskAssignment.deleteMany();
	await prisma.task.deleteMany();
	await prisma.taskCategory.deleteMany();
	await prisma.taskStatus.deleteMany();
	await prisma.user.deleteMany();

	const [open, taken, completed] = await Promise.all([
		prisma.taskStatus.create({ data: { name: "open" } }),
		prisma.taskStatus.create({ data: { name: "taken" } }),
		prisma.taskStatus.create({ data: { name: "completed" } }),
	]);

	const categoryNames = [
		"Essay Writing",
		"Programming",
		"Math",
		"Design",
		"Tutoring",
		"Translation",
	];
	const categories = Object.fromEntries(
		await Promise.all(
			categoryNames.map(async (name) => [
				name,
				await prisma.taskCategory.create({ data: { name } }),
			]),
		),
	);

	const [alice, bob, carol, dave] = await Promise.all([
		prisma.user.create({ data: { tgId: BigInt(1001), tgUsername: "alice_nu" } }),
		prisma.user.create({ data: { tgId: BigInt(1002), tgUsername: "bob_nu" } }),
		prisma.user.create({ data: { tgId: BigInt(1003), tgUsername: "carol_nu" } }),
		// no tgUsername, to exercise the "no public username" UI path
		prisma.user.create({ data: { tgId: BigInt(1004), tgUsername: null } }),
	]);

	const openTasks = await Promise.all([
		prisma.task.create({
			data: {
				title: "Write Econometrics Term Paper",
				description:
					"Need a 12-page term paper on labor market econometrics, APA format.",
				price: 15000,
				deadline: daysFromNow(10),
				statusId: open.id,
				userId: alice.id,
				categories: { connect: [{ id: categories["Essay Writing"].id }] },
			},
		}),
		prisma.task.create({
			data: {
				title: "Build React Landing Page",
				description:
					"Single-page marketing site for a student startup, Tailwind preferred.",
				price: 25000,
				deadline: daysFromNow(20),
				statusId: open.id,
				userId: bob.id,
				categories: { connect: [{ id: categories.Programming.id }] },
			},
		}),
		prisma.task.create({
			data: {
				title: "Calculus II Tutoring (3 sessions)",
				description: "Looking for help with integration techniques before midterm.",
				price: 9000,
				deadline: daysFromNow(5),
				statusId: open.id,
				userId: carol.id,
				categories: { connect: [{ id: categories.Tutoring.id }] },
			},
		}),
		prisma.task.create({
			data: {
				title: "Translate Research Abstract RU->EN",
				description: "One-page abstract, academic tone, due soon.",
				price: 4000,
				deadline: daysFromNow(3),
				statusId: open.id,
				userId: dave.id,
				categories: { connect: [{ id: categories.Translation.id }] },
			},
		}),
		prisma.task.create({
			data: {
				title: "Design Instagram Carousel for Club",
				description: "5-slide carousel announcing a club event, brand colors provided.",
				price: 6000,
				deadline: daysFromNow(7),
				statusId: open.id,
				userId: alice.id,
				categories: { connect: [{ id: categories.Design.id }] },
			},
		}),
		prisma.task.create({
			data: {
				title: "Fix Bug in Python Data Pipeline",
				description: "Pandas script throws on empty CSVs, needs a quick fix.",
				price: 12000,
				deadline: daysFromNow(2),
				statusId: open.id,
				userId: bob.id,
				categories: { connect: [{ id: categories.Programming.id }] },
			},
		}),
	]);

	const takenTask = await prisma.task.create({
		data: {
			title: "Linear Algebra Homework Set",
			description: "Problem set on eigenvalues and eigenvectors, already assigned.",
			price: 5000,
			deadline: daysFromNow(-1),
			statusId: taken.id,
			userId: carol.id,
			categories: { connect: [{ id: categories.Math.id }] },
		},
	});
	await prisma.taskAssignment.create({
		data: {
			taskId: takenTask.id,
			assignerId: carol.id,
			assigneeId: dave.id,
			status: "approved",
		},
	});

	const completedTask = await prisma.task.create({
		data: {
			title: "Proofread Thesis Chapter 3",
			description: "Grammar and clarity pass on a 20-page chapter, already delivered.",
			price: 8000,
			deadline: daysFromNow(-5),
			statusId: completed.id,
			userId: dave.id,
			categories: { connect: [{ id: categories["Essay Writing"].id }] },
		},
	});
	await prisma.taskAssignment.create({
		data: {
			taskId: completedTask.id,
			assignerId: dave.id,
			assigneeId: bob.id,
			status: "approved",
		},
	});

	// a pending request on an otherwise-open task, to exercise the owner's approve/reject UI
	await prisma.taskAssignment.create({
		data: {
			taskId: openTasks[5].id,
			assignerId: bob.id,
			assigneeId: carol.id,
			status: "pending",
		},
	});

	console.log(
		`Seeded ${openTasks.length + 2} tasks, 4 users, ${categoryNames.length} categories, 3 statuses.`,
	);
}

main()
	.catch((err) => {
		console.error(err);
		process.exitCode = 1;
	})
	.finally(async () => {
		await prisma.$disconnect();
		await pool.end();
	});
