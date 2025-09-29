import Link from "next/link";
import ProjectsButton from "./ProjectsButton";
import ProjectCard from "./ProjectCard";
import ProjectHeader from "./ProjectHeader";

// Sample project data - replace with your actual projects
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
		technologies: ["React", "Redux", "Tailwind CSS", "Node.js", "MongoDB", "Express"],
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

export default function ProjectsSection() {
	return (
		<section id="projects" className="pb-20 px-4">
			<div className="max-w-7xl mx-auto">
				<ProjectHeader />

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
					{projects.map((project, index) => (
						<Link key={project.id} href={`/projects/${project.id}`}>
							<ProjectCard project={project} index={index} />
						</Link>
					))}
				</div>

				<ProjectsButton />
			</div>
		</section>
	);
}
