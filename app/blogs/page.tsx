"use client";

import BlogFilterSection from "@/components/modules/public/blogs/BlogFilterSection";
import BlogListCard from "@/components/modules/public/blogs/BlogListCard";
import BlogPageHeader from "@/components/modules/public/blogs/BlogPageHeader";
import BlogCard from "@/components/modules/public/home/BlogCard";
import { blogs } from "@/data/blogs";
import { Filter } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useMemo, useState } from "react";

// Extract unique categories and tags for filtering
const categories = [
	"All",
	...Array.from(new Set(blogs.map((b) => b.category))),
];

const tags = ["All", ...Array.from(new Set(blogs.map((b) => b.tag)))];

export default function BlogsPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [selectedTag, setSelectedTag] = useState("All");
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

	// Filter blogs based on search and filters
	const filteredBlogs = useMemo(() => {
		return blogs.filter((blog) => {
			const matchesSearch =
				blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
				blog.topics.some((topic) =>
					topic.toLowerCase().includes(searchTerm.toLowerCase())
				) ||
				blog.tag.toLowerCase().includes(searchTerm.toLowerCase());

			const matchesCategory =
				selectedCategory === "All" || blog.category === selectedCategory;

			const matchesTag = selectedTag === "All" || blog.tag === selectedTag;

			return matchesSearch && matchesCategory && matchesTag;
		});
	}, [searchTerm, selectedCategory, selectedTag]);

	return (
		<div className="py-20 px-4">
			<div className="max-w-7xl mx-auto">
				<BlogPageHeader />

				{/* Filters Section */}
				<BlogFilterSection
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
					selectedTag={selectedTag}
					setSelectedTag={setSelectedTag}
					categories={categories}
					tags={tags}
					viewMode={viewMode}
					setViewMode={setViewMode}
					filteredBlogs={filteredBlogs}
					blogs={blogs}
				/>

				{/* Blogs Grid/List */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					{filteredBlogs.length === 0 ? (
						<div className="text-center py-16">
							<Filter className="w-16 h-16 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
							<h3 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">
								No blogs found
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
							{filteredBlogs.map((blog, index) => (
								<motion.div
									key={blog.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									className={viewMode === "list" ? "w-full" : ""}
								>
									{viewMode === "grid" ? (
										<Link href={`/blogs/1`}>
											<BlogCard
												post={{
													...blog,
													description: blog.excerpt,
													loves: blog.likes,
												}}
												index={index}
											/>
										</Link>
									) : (
										<BlogListCard blog={blog} />
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
