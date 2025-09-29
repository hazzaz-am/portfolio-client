import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Grid3X3, List, Search } from "lucide-react";
import { motion } from "motion/react";

export default function BlogFilterSection({
	searchTerm,
	setSearchTerm,
	selectedCategory,
	setSelectedCategory,
	selectedTag,
	setSelectedTag,
	categories,
	tags,
	viewMode,
	setViewMode,
	filteredBlogs,
	blogs,
}: {
	searchTerm: string;
	setSearchTerm: (term: string) => void;
	selectedCategory: string;
	setSelectedCategory: (category: string) => void;
	selectedTag: string;
	setSelectedTag: (tag: string) => void;
	categories: string[];
	tags: string[];
	viewMode: "grid" | "list";
	setViewMode: (mode: "grid" | "list") => void;
	filteredBlogs: any[];
	blogs: any[];
}) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: 0.1 }}
			className="mb-8"
		>
			<div className="p-6 bg-white/80 dark:bg-neutral-900/80 backdrop-blur rounded-2xl shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] border border-white/20 dark:border-neutral-800/50">
				{/* Search Bar */}
				<div className="relative mb-6">
					<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500 dark:text-slate-400" />
					<input
						type="text"
						placeholder="Search blogs, tags, or descriptions..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
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
							onValueChange={setSelectedCategory}
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

						{/* Tag Filter */}
						<Select value={selectedTag} onValueChange={setSelectedTag}>
							<SelectTrigger className="w-full sm:w-[180px] bg-slate-50 dark:bg-neutral-800 border-slate-200 dark:border-neutral-700">
								<SelectValue placeholder="Select tag" />
							</SelectTrigger>
							<SelectContent>
								{tags.map((tag) => (
									<SelectItem key={tag} value={tag}>
										{tag === "All" ? "All Tags" : tag}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					{/* View Mode Toggle */}
					<div className="flex items-center gap-2 bg-slate-100 dark:bg-neutral-800 rounded-lg p-1">
						<Button
							variant={viewMode === "grid" ? "default" : "ghost"}
							size="sm"
							onClick={() => setViewMode("grid")}
							className={`px-3 py-2 ${
								viewMode === "grid" ? "bg-orange-600 hover:bg-orange-700" : ""
							}`}
						>
							<Grid3X3 className="w-4 h-4" />
						</Button>
						<Button
							variant={viewMode === "list" ? "default" : "ghost"}
							size="sm"
							onClick={() => setViewMode("list")}
							className={`px-3 py-2 ${
								viewMode === "list" ? "bg-orange-600 hover:bg-orange-700" : ""
							}`}
						>
							<List className="w-4 h-4" />
						</Button>
					</div>
				</div>

				{/* Results Count */}
				<div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
					Showing {filteredBlogs.length} of {blogs.length} blogs
				</div>
			</div>
		</motion.div>
	);
}
