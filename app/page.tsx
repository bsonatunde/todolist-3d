"use client";

import { useState } from "react";
import {
	LayoutDashboard,
	Folder,
	Users,
	Calendar,
	Settings,
	ChevronDown,
	ChevronRight,
	Search,
	Bell,
	Calendar as CalendarIcon,
	LayoutGrid,
	Plus,
	SlidersHorizontal,
	ArrowUpDown,
	MoreHorizontal,
	Sun,
	Moon,
} from "lucide-react";
import Image from "next/image";
import ProgressCube from "../components/ProgressCube";
import { useTheme } from "./layout";
import { ColumnsProvider, useColumns } from "../components/ColumnsContext";

function SidebarSection({
	title,
	items,
	defaultOpen = false,
}: {
	title: string;
	items: string[];
	defaultOpen?: boolean;
}) {
	const [open, setOpen] = useState(defaultOpen);

	return (
		<div>
			<button
				onClick={() => setOpen(!open)}
				className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-600 mb-3"
			>
				<span>{title}</span>
				{open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
			</button>

			{open && (
				<ul className="space-y-2 ml-2">
					{items.map((item, index) => (
						<li
							key={index}
							className={`px-3 py-2 rounded-full text-sm cursor-pointer ${
								item === "Design system"
									? "bg-gray-100 font-medium"
									: "text-gray-500 hover:bg-gray-50"
							}`}
						>
							{item}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

// top-level page exported to wrap in provider
export default function Page() {
	return (
		<ColumnsProvider>
			<Dashboard />
		</ColumnsProvider>
	);
}

function Dashboard() {
	const { dark, setDark } = useTheme();
	const [active, setActive] = useState("projects");
	const { columns, completeTask, completionRatio } = useColumns();

	return (
		<div>
			<div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
				{/* ========== ICON SIDEBAR ========== */}
				<div className="w-16 bg-gray-900 dark:bg-black text-white flex flex-col items-center py-6 space-y-8">
					<div className="text-2xl font-bold">⋮</div>

					<button
						onClick={() => setActive("dashboard")}
						className={`p-3 rounded-xl ${
							active === "dashboard" ? "bg-gray-700" : ""
						}`}
					>
						<LayoutDashboard size={20} />
					</button>

					<button
						onClick={() => setActive("projects")}
						className={`p-3 rounded-xl ${
							active === "projects" ? "bg-gray-700" : ""
						}`}
					>
						<Folder size={20} />
					</button>

					<button
						onClick={() => setActive("team")}
						className={`p-3 rounded-xl ${
							active === "team" ? "bg_gray-700" : ""
						}`}
					>
						<Users size={20} />
					</button>

					<button
						onClick={() => setActive("calendar")}
						className={`p-3 rounded-xl ${
							active === "calendar" ? "bg-gray-700" : ""
						}`}
					>
						<Calendar size={20} />
					</button>

					<div className="mt-auto">
						<Settings size={20} />
					</div>
				</div>

				{/* ========== MAIN SIDEBAR ========== */}
				<aside className="w-72 bg-white dark:bg-gray-800 border-r dark:border-gray-700 p-6">
					<div className="flex items-center justify-between mb-8">
						<h1 className="text-2xl font-semibold dark:text-white">
							Projects
						</h1>

						<button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
							<Plus size={18} />
						</button>
					</div>

					<div className="space-y-8">
						<SidebarSection
							title="Team"
							items={["Members", "Analytics", "Reports"]}
						/>

						<SidebarSection
							title="Projects"
							items={[
								"All projects (3)",
								"Design system",
								"User flow",
								"UX research",
							]}
							defaultOpen
						/>

						<SidebarSection
							title="Tasks"
							items={[
								"All tasks (11)",
								"To do (4)",
								"In progress (4)",
								"Done (3)",
							]}
							defaultOpen
						/>

						<SidebarSection
							title="Reminders"
							items={["Upcoming", "Completed"]}
						/>

						<SidebarSection
							title="Messengers"
							items={["Slack", "Email", "Teams"]}
						/>
					</div>

					{/* Light / Dark Toggle */}
					<div className="mt-10 flex bg-gray-200 dark:bg-gray-700 rounded-full p-1 w-fit transition">
					  {/* LIGHT BUTTON */}
					  <button
					    onClick={() => setDark(false)}
					    className={`flex items-center gap-2 px-4 py-1.5 text-sm rounded-full transition-all duration-200 ${
					      !dark
					        ? "bg-white dark:bg-gray-800 shadow text-black dark:text-white"
					        : "text-gray-600 dark:text-gray-400"
					    }`}
					  >
					    <Sun size={16} />
					    Light
					  </button>

					  {/* DARK BUTTON */}
					  <button
					    onClick={() => setDark(true)}
					    className={`flex items-center gap-2 px-4 py-1.5 text-sm rounded-full transition-all duration-200 ${
					      dark
					        ? "bg-white dark:bg-gray-800 shadow text-black dark:text-white"
					        : "text-gray-600 dark:text-gray-400"
					    }`}
					  >
					    <Moon size={16} />
					    Dark
					  </button>
					</div>
				</aside>

				{/* ========== MAIN CONTENT ========== */}
				<main className="flex-1 px-10 py-6 overflow-x-auto bg-gray-50 dark:bg-gray-900">
					{/* ===== TOP HEADER ROW ===== */}
					<div className="flex justify-between items-center mb-8">
						<h2 className="text-2xl font-semibold dark:text-white">
							Welcome back, Vincent 👋
						</h2>

						<div className="flex items-center gap-6 text-gray-600">
							<Search size={20} className="cursor-pointer" />
							<Bell size={20} className="cursor-pointer" />
							<CalendarIcon size={20} className="cursor-pointer" />

							<div className="text-sm text-gray-500">19 May 2022</div>

							<Image
								src="https://i.pravatar.cc/40"
								width={36}
								height={36}
								className="rounded-full"
								alt="profile"
							/>
						</div>
					</div>

					{/* ===== VIEW + ACTION ROW ===== */}
					<div className="flex justify-between items-center mb-8">
						{/* Left side */}
						<div className="flex items-center gap-6">
							<div className="flex items-center gap-2 border-b-2 border-black pb-2 dark:border-white">
								<LayoutGrid size={18} />
								<span className="font-medium dark:text-white">
									Board view
								</span>
							</div>

							<div className="flex items-center gap-2 text-gray-500 cursor-pointer dark:text-gray-300">
								<Plus size={18} />
								<span>Add view</span>
							</div>
						</div>

						{/* Right side */}
						<div className="flex items-center gap-6 text-gray-600">
							<div className="flex items-center gap-2 cursor-pointer">
								<SlidersHorizontal size={18} />
								<span className="text-sm">Filter</span>
							</div>

							<div className="flex items-center gap-2 cursor-pointer">
								<ArrowUpDown size={18} />
								<span className="text-sm">Sort</span>
							</div>

							<MoreHorizontal size={20} className="cursor-pointer" />

							<button className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium">
								New template
							</button>
						</div>
					</div>

					{/* 3D widget */}
					<div className="mb-8">
						<ProgressCube ratio={completionRatio} />
					</div>

					{/* board grid will follow below */}
					<div className="grid md:grid-cols-3 gap-6">
						{columns.map((column, i) => (
							<div
								key={i}
								className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-dashed"
							>
								<div className="flex justify-between mb-4">
									<h3 className="font-semibold dark:text-white">
										{column.title}
									</h3>
									<button className="text-sm text-gray-500">
										+ Add new task
									</button>
								</div>

								<div className="space-y-4">
									{column.tasks.map((task, idx) => (
										<div
											key={idx}
											className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-sm"
										>
											<h4 className="font-semibold dark:text-white">
												{task.title}
											</h4>

											<div className="w-full bg-gray-200 dark:bg-gray-600 h-2 rounded-full mt-3">
												<div
													className={`h-2 rounded-full ${
														task.progress === 100
															? "bg-green-500"
															: "bg-orange-500"
													}`}
													style={{ width: `${task.progress}%` }}
												/>
											</div>

											<div className="text-xs text-gray-400 mt-2 dark:text-gray-300">
												{task.progress}%
											</div>

											{task.progress < 100 && (
												<button
													onClick={() => completeTask(i, idx)}
													className="text-blue-500 text-xs mt-2"
												>
													Mark done
												</button>
											)}
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</main>
			</div>
		</div>
	);
}
