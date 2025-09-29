"use client";

import ProjectCard from "@/components/modules/public/home/ProjectCard";
import FilterSection from "@/components/modules/public/projects/FilterSection";
import ProjectListCard from "@/components/modules/public/projects/ProjectListCard";
import ProjectPageHeader from "@/components/modules/public/projects/ProjectPageHeader";
import { Filter } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

// Sample project data - import from actual data source
const projects = [
	{
		id: 1,
		title: "Online Marketplace",
		description:
			"A full-stack marketplace platform built with React, featuring user authentication, dashboard, and real-time job posts management.",
		thumbnail:
			"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center",
		githubUrl: "https://github.com/hazzaz-am/online-marketplace",
		liveUrl: "https://online-marketplace-16cef.web.app",
		technologies: [
			"React.js",
			"Tailwind CSS",
			"Firebase",
			"Node.js",
			"Express",
			"MongoDB",
		],
		category: "Full Stack",
		features: [
			"User Authentication & Authorization",
			"Apply for Jobs",
			"Post & Manage Jobs",
			"User Dashboard",
		],
		stars: 45,
		forks: 12,
	},
	{
		id: 2,
		title: "Book Store Management",
		description:
			"A comprehensive book store management system with features for inventory management, order processing, and customer management.",
		thumbnail:
			"https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&crop=center",
		githubUrl: "https://github.com/hazzaz-am/book-store",
		liveUrl: "https://book-store-eta-coral.vercel.app",
		technologies: [
			"React",
			"Redux",
			"Tailwind CSS",
			"Node.js",
			"MongoDB",
			"Express",
		],
		category: "Frontend",
		features: [
			"Inventory Management",
			"Order Processing",
			"Customer Management",
			"Advanced Analytics",
		],
		stars: 32,
		forks: 8,
	},
	{
		id: 3,
		title: "Digital Wallet Platform",
		description:
			"A modern, responsive digital wallet platform for seamless transactions, balance management, and transaction history tracking.",
		thumbnail:
			"https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop&crop=center",
		githubUrl: "https://github.com/hazzaz-am/digital-wallet-frontend",
		liveUrl: "https://digital-wallet-eight.vercel.app",
		technologies: [
			"React.js",
			"Redux Toolkit",
			"TypeScript",
			"Node.js",
			"Express",
			"MongoDB",
		],
		category: "Full Stack",
		features: [
			"User Authentication & Authorization",
			"Wallet Top-up & Withdrawal",
			"Transaction History",
			"Balance Management",
		],
		stars: 28,
		forks: 15,
	},
	{
		id: 4,
		title: "Tour Booking Management System",
		description:
			"A comprehensive tour management system with features for itinerary planning, booking management, and customer reviews.",
		thumbnail:
			"https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop&crop=center",
		githubUrl: "https://github.com/hazzaz-am/tour-management-system",
		liveUrl: "https://tour-management-system.vercel.app",
		technologies: [
			"React",
			"Typescript",
			"Node.js",
			"Express",
			"MongoDB",
			"Shadcn UI",
		],
		category: "Backend",
		features: [
			"Itinerary Planning",
			"Booking Management",
			"Customer Reviews",
			"Payment Integration",
		],
		stars: 19,
		forks: 6,
	},
	{
		id: 5,
		title: "Live Group Chat Application",
		description:
			"Real-time chat application with group messaging, file sharing, emoji reactions, voice messages, and end-to-end encryption for secure communication.",
		thumbnail:
			"https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&h=400&fit=crop&crop=center",
		githubUrl: "#",
		liveUrl: "#",
		technologies: [
			"React Native",
			"Firebase",
			"Socket.io",
			"Node.js",
			"Express",
		],
		category: "Mobile",
		features: [
			"Real-time Messaging",
			"Group Chat Support",
			"File Sharing",
			"Voice Messages",
			"End-to-end Encryption",
		],
		stars: 67,
		forks: 21,
	},
	{
		id: 6,
		title: "Learning Management System",
		description:
			"A complete LMS platform for online education with course management, student progress tracking, video streaming, and interactive quizzes.",
		thumbnail:
			"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&crop=center",
		githubUrl: "#",
		liveUrl: "#",
		technologies: [
			"Next.js",
			"Prisma",
			"PostgreSQL",
			"Clerk Auth",
			"Mux",
			"Stripe",
		],
		category: "Full Stack",
		features: [
			"Course Management",
			"Video Streaming",
			"Progress Tracking",
			"Interactive Quizzes",
			"Certificate Generation",
		],
		stars: 89,
		forks: 34,
	},
];

// Extract unique categories and technologies for filtering
const categories = [
	"All",
	...Array.from(new Set(projects.map((p) => p.category))),
];

const technologies = [
	"All",
	...Array.from(new Set(projects.flatMap((p) => p.technologies))),
];

export default function ProjectsPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [selectedTechnology, setSelectedTechnology] = useState("All");
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

	// Filter projects based on search and filters
	const filteredProjects = useMemo(() => {
		return projects.filter((project) => {
			const matchesSearch =
				project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
				project.technologies.some((tech) =>
					tech.toLowerCase().includes(searchTerm.toLowerCase())
				);

			const matchesCategory =
				selectedCategory === "All" || project.category === selectedCategory;

			const matchesTechnology =
				selectedTechnology === "All" ||
				project.technologies.includes(selectedTechnology);

			return matchesSearch && matchesCategory && matchesTechnology;
		});
	}, [searchTerm, selectedCategory, selectedTechnology]);

	return (
		<div className="py-20 px-4">
			<div className="max-w-7xl mx-auto">
				<ProjectPageHeader />

				{/* Filters Section */}
				<FilterSection
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
					selectedTechnology={selectedTechnology}
					setSelectedTechnology={setSelectedTechnology}
					categories={categories}
					technologies={technologies}
					viewMode={viewMode}
					setViewMode={setViewMode}
					filteredProjects={filteredProjects}
					projects={projects}
				/>

				{/* Projects Grid/List */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					{filteredProjects.length === 0 ? (
						<div className="text-center py-16">
							<Filter className="w-16 h-16 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
							<h3 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">
								No projects found
							</h3>
							<p className="text-slate-500 dark:text-slate-400">
								Try adjusting your search or filter criteria
							</p>
						</div>
					) : (
						<div
							className={
								viewMode === "grid"
									? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
									: "flex flex-col gap-6"
							}
						>
							{filteredProjects.map((project, index) => (
								<motion.div
									key={project.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									className={viewMode === "list" ? "w-full" : ""}
								>
									{viewMode === "grid" ? (
										<ProjectCard project={project} index={index} />
									) : (
										<ProjectListCard project={project} />
									)}
								</motion.div>
							))}
						</div>
					)}
				</motion.div>
			</div>
		</div>
	);
}
