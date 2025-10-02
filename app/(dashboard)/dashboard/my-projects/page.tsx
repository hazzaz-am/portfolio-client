"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { projects } from "@/data/projects";
import { formatNumber } from "@/utils/formatNumber";
import {
	Code,
	Edit3,
	ExternalLink,
	Filter,
	GitBranch,
	Github,
	Plus,
	Search,
	Star,
	Trash2,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

// Extract unique categories and tags for filtering
const categories = [
	"All",
	...Array.from(new Set(projects.map((p) => p.category))),
];

export default function MyProjectsPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [selectedTag, setSelectedTag] = useState("All");
	const [selectedStatus, setSelectedStatus] = useState("All");
	const [projectList, setProjectList] = useState(projects);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(3); // 6 items per page

	// Filter projects based on search and filters
	const filteredProjects = useMemo(() => {
		return projectList.filter((project) => {
			const matchesSearch =
				project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
				project.technologies.some((tech) =>
					tech.toLowerCase().includes(searchTerm.toLowerCase())
				);
			const matchesCategory =
				selectedCategory === "All" || project.category === selectedCategory;

			return matchesSearch && matchesCategory;
		});
	}, [searchTerm, selectedCategory, selectedTag, selectedStatus, projectList]);

	// Pagination calculations
	const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentProjects = filteredProjects.slice(startIndex, endIndex);

	// Reset to first page when filters change
	const resetPagination = () => {
		setCurrentPage(1);
	};

	// Update search with pagination reset
	const handleSearchChange = (value: string) => {
		setSearchTerm(value);
		resetPagination();
	};

	// Update category with pagination reset
	const handleCategoryChange = (value: string) => {
		setSelectedCategory(value);
		resetPagination();
	};

	const handleDeleteProject = (projectId: number) => {
		setProjectList(projectList.filter((project) => project.id !== projectId));
	};

	return (
		<div className="flex-1 p-4 lg:p-6">
			<div className="max-w-7xl mx-auto space-y-6">
				{/* Header */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div>
						<h1 className="text-2xl lg:text-3xl font-bold text-slate-800 dark:text-white">
							My Projects
						</h1>
						<p className="text-slate-600 dark:text-slate-300 mt-1">
							Manage your project portfolio and showcase
						</p>
					</div>
					<Link href="/dashboard/create-project">
						<Button className="bg-orange-600 hover:bg-orange-700 text-white">
							<Plus className="w-4 h-4 mr-2" />
							Create Project
						</Button>
					</Link>
				</div>

				{/* Filters Section */}
				<div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur rounded-2xl shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] border border-white/20 dark:border-neutral-800/50 p-6">
					{/* Search Bar */}
					<div className="relative mb-6">
						<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500 dark:text-slate-400" />
						<input
							type="text"
							placeholder="Search projects, technologies, or descriptions..."
							value={searchTerm}
							onChange={(e) => handleSearchChange(e.target.value)}
							className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
						/>
					</div>

					{/* Filters and View Toggle */}
					<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
						{/* Filter Controls */}
						<div className="flex flex-col sm:flex-row gap-4 flex-1">
							{/* Category Filter */}
							<Select
								value={selectedCategory}
								onValueChange={handleCategoryChange}
							>
								<SelectTrigger className="w-full sm:w-[180px] bg-slate-50 dark:bg-neutral-800 border-slate-200 dark:border-neutral-700">
									<SelectValue placeholder="Select category" />
								</SelectTrigger>
								<SelectContent>
									{categories.map((category) => (
										<SelectItem key={category} value={category}>
											{category === "All" ? "All Categories" : category}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>

					{/* Results Count */}
					<div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
						Showing {startIndex + 1}-
						{Math.min(endIndex, filteredProjects.length)} of{" "}
						{filteredProjects.length} projects
					</div>
				</div>

				{/* Projects Display */}
				<div>
					{currentProjects.length === 0 ? (
						<div className="text-center py-16 bg-white/80 dark:bg-neutral-900/80 backdrop-blur rounded-2xl shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] border border-white/20 dark:border-neutral-800/50">
							<Filter className="w-16 h-16 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
							<h3 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">
								No projects found
							</h3>
							<p className="text-slate-500 dark:text-slate-400">
								Try adjusting your search or filter criteria
							</p>
						</div>
					) : (
						<div className="space-y-4">
							{currentProjects.map((project) => (
								<div
									key={project.id}
									className={`bg-white/80 dark:bg-neutral-900/80 backdrop-blur rounded-2xl shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] border border-white/20 dark:border-neutral-800/50 hover:shadow-[0_0_32px_rgba(34,42,53,0.08),0_2px_2px_rgba(0,0,0,0.06),0_0_0_1px_rgba(34,42,53,0.05),0_0_6px_rgba(34,42,53,0.1),0_20px_80px_rgba(47,48,55,0.07)] transition-all duration-300`}
								>
									<div className="flex flex-col lg:flex-row gap-4 lg:gap-6 p-4 lg:p-6">
										{/* Image */}
										<div className="lg:w-1/4 flex-shrink-0">
											<div className="relative w-full h-32 lg:h-28 rounded-xl overflow-hidden bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20">
												<img
													src={project.thumbnail}
													alt={project.title}
													className="w-full h-full object-cover"
												/>
											</div>
										</div>

										{/* Content */}
										<div className="lg:w-3/4 space-y-3">
											{/* Tags and Title */}
											<div className="space-y-2">
												<div className="flex items-center gap-2 flex-wrap">
													<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800/50">
														{project.category}
													</span>
												</div>
												<h3 className="text-xl font-bold text-slate-800 dark:text-white">
													{project.title}
												</h3>
											</div>

											{/* Technologies */}
											<div className="flex items-center gap-1 flex-wrap">
												<div className="flex items-center gap-2">
													<Code className="w-4 h-4 text-orange-600" />
													<span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
														Technologies:
													</span>
												</div>{" "}
												<div className="flex flex-wrap gap-1">
													{project.technologies.map((tech, index) => (
														<span
															key={index}
															className="text-xs bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded"
														>
															{tech}
														</span>
													))}
												</div>
											</div>

											{/* Meta Info and Actions */}
											<div className="flex flex-col gap-3 border-slate-200 dark:border-neutral-700">
												<div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
													<div className="flex items-center gap-1">
														<Star className="w-4 h-4 fill-current text-yellow-500" />
														<span>{formatNumber(project.stars)}</span>
													</div>
													<div className="flex items-center gap-1">
														<GitBranch className="w-4 h-4 text-orange-600" />
														<span>{formatNumber(project.forks)}</span>
													</div>
												</div>

												{/* Actions */}
												<div className="flex gap-2 border-t pt-2 flex-wrap">
													<a
														href={project.liveUrl}
														target="_blank"
														rel="noopener noreferrer"
														className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-neutral-700 transition-colors text-sm"
													>
														<ExternalLink className="w-4 h-4" />
														Live Demo
													</a>
													<a
														href={project.githubUrl}
														target="_blank"
														rel="noopener noreferrer"
														className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
													>
														<Github className="w-4 h-4" />
														Code
													</a>
													<Link
														href={`/dashboard/edit-project/${project.id}`}
														className="flex items-center gap-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors text-sm"
													>
														<Edit3 className="w-4 h-4" />
														Edit
													</Link>
													<AlertDialog>
														<AlertDialogTrigger asChild>
															<button className="flex items-center gap-2 px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors text-sm">
																<Trash2 className="w-4 h-4" />
																Delete
															</button>
														</AlertDialogTrigger>
														<AlertDialogContent>
															<AlertDialogHeader>
																<AlertDialogTitle>
																	Delete Project
																</AlertDialogTitle>
																<AlertDialogDescription>
																	Are you sure you want to delete "
																	{project.title}
																	"? This action cannot be undone.
																</AlertDialogDescription>
															</AlertDialogHeader>
															<AlertDialogFooter>
																<AlertDialogCancel>Cancel</AlertDialogCancel>
																<AlertDialogAction
																	onClick={() =>
																		handleDeleteProject(project.id)
																	}
																	className="bg-red-600 hover:bg-red-700"
																>
																	Delete
																</AlertDialogAction>
															</AlertDialogFooter>
														</AlertDialogContent>
													</AlertDialog>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Pagination */}
				{totalPages > 1 && (
					<div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur rounded-2xl shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] border border-white/20 dark:border-neutral-800/50 p-4">
						<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
							{/* Page Info */}
							<div className="text-sm text-slate-600 dark:text-slate-400">
								Page {currentPage} of {totalPages} ({filteredProjects.length}{" "}
								projects)
							</div>

							{/* Pagination Controls */}
							<div className="flex items-center gap-2">
								{/* Previous Button */}
								<Button
									variant="outline"
									size="sm"
									onClick={() => setCurrentPage(currentPage - 1)}
									disabled={currentPage === 1}
									className="px-3 py-2"
								>
									Previous
								</Button>

								{/* Page Numbers */}
								<div className="flex items-center gap-1">
									{Array.from({ length: totalPages }, (_, index) => {
										const pageNumber = index + 1;
										const isActive = pageNumber === currentPage;

										// Show first page, last page, current page, and pages around current
										const shouldShow =
											pageNumber === 1 ||
											pageNumber === totalPages ||
											(pageNumber >= currentPage - 1 &&
												pageNumber <= currentPage + 1);

										const showLeftEllipsis =
											pageNumber === 2 && currentPage > 4;
										const showRightEllipsis =
											pageNumber === totalPages - 1 &&
											currentPage < totalPages - 3;

										if (
											!shouldShow &&
											!showLeftEllipsis &&
											!showRightEllipsis
										) {
											return null;
										}

										if (showLeftEllipsis || showRightEllipsis) {
											return (
												<span
													key={`ellipsis-${pageNumber}`}
													className="px-2 py-1 text-slate-500 dark:text-slate-400"
												>
													...
												</span>
											);
										}

										return (
											<Button
												key={pageNumber}
												variant={isActive ? "default" : "outline"}
												size="sm"
												onClick={() => setCurrentPage(pageNumber)}
												className={`px-3 py-2 min-w-[40px] ${
													isActive
														? "bg-orange-600 hover:bg-orange-700 text-white"
														: ""
												}`}
											>
												{pageNumber}
											</Button>
										);
									})}
								</div>

								{/* Next Button */}
								<Button
									variant="outline"
									size="sm"
									onClick={() => setCurrentPage(currentPage + 1)}
									disabled={currentPage === totalPages}
									className="px-3 py-2"
								>
									Next
								</Button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
