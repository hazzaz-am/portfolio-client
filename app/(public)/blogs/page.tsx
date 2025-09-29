"use client";

import BlogFilterSection from "@/components/modules/public/blogs/BlogFilterSection";
import BlogListCard from "@/components/modules/public/blogs/BlogListCard";
import BlogPageHeader from "@/components/modules/public/blogs/BlogPageHeader";
import BlogCard from "@/components/modules/public/home/BlogCard";
import { Filter } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useMemo, useState } from "react";

// Extended blog data with more comprehensive information
export const blogs = [
	{
		id: 1,
		title: "Building Modern Web Applications with Next.js 15",
		excerpt:
			"Explore the latest features of Next.js 15 and learn how to build scalable, performant web applications with the newest React patterns and server components.",
		image:
			"https://media.geeksforgeeks.org/wp-content/uploads/20250826180914639441/next.webp",
		tag: "Web Development",
		author: "Hazzaz Abdul Mannan",
		publishedAt: "2025-01-15",
		readTime: "8 min read",
		views: 1234,
		likes: 89,
		category: "Frontend",
		topics: [
			"Next.js",
			"React",
			"Server Components",
			"Performance",
			"TypeScript",
		],
	},
	{
		id: 2,
		title: "Mastering TypeScript: Advanced Patterns and Best Practices",
		excerpt:
			"Deep dive into advanced TypeScript concepts, design patterns, and best practices that will make your code more maintainable and type-safe.",
		image:
			"https://wearedevelopers.imgix.net/magazine/articles/554/images/hero/odPaQHSbArSIFzZbUzlE-1740483365.jpeg?w=720&auto=compress,format",
		tag: "TypeScript",
		category: "Programming",
		author: "Hazzaz Abdul Mannan",
		publishedAt: "2025-01-10",
		readTime: "12 min read",
		views: 2156,
		likes: 145,
		topics: [
			"TypeScript",
			"Design Patterns",
			"Type Safety",
			"Advanced Types",
			"Generics",
		],
	},
	{
		id: 3,
		title: "The Future of Frontend: Micro-Frontends Architecture",
		excerpt:
			"Understanding micro-frontends architecture and how it's revolutionizing the way we build and scale large frontend applications in enterprise environments.",
		image:
			"https://d2ms8rpfqc4h24.cloudfront.net/what_is_microfrontend_e628b39c29.jpg",
		tag: "Architecture",
		category: "System Design",
		author: "Hazzaz Abdul Mannan",
		publishedAt: "2025-01-05",
		readTime: "15 min read",
		views: 987,
		likes: 67,
		topics: [
			"Micro-frontends",
			"Scalability",
			"Enterprise",
			"Webpack",
			"Module Federation",
		],
	},
	{
		id: 4,
		title: "Optimizing React Performance: Tips and Techniques",
		excerpt:
			"Learn proven strategies to optimize your React applications for better performance, including code splitting, memoization, and virtual scrolling.",
		image:
			"https://cloudinary-marketing-res.cloudinary.com/images/w_1000,c_scale/v1728825907/React_optimization_header/React_optimization_header-jpg?_i=AA",
		tag: "React",
		category: "Performance",
		author: "Hazzaz Abdul Mannan",
		publishedAt: "2024-12-28",
		readTime: "10 min read",
		views: 3421,
		likes: 234,
		topics: [
			"React",
			"Performance",
			"Code Splitting",
			"Memoization",
			"Virtual Scrolling",
		],
	},
	{
		id: 5,
		title: "CSS Grid vs Flexbox: When to Use What",
		excerpt:
			"A comprehensive guide comparing CSS Grid and Flexbox, with practical examples and use cases to help you choose the right layout method.",
		image:
			"https://miro.medium.com/v2/resize:fit:720/format:webp/1*k64zdk6Y8nTjBXo5Emn1jQ.png",
		tag: "CSS",
		category: "UI/UX",
		author: "Hazzaz Abdul Mannan",
		publishedAt: "2024-12-20",
		readTime: "6 min read",
		views: 1876,
		likes: 156,
		topics: ["CSS Grid", "Flexbox", "Layout", "Responsive Design", "CSS"],
	},
	{
		id: 6,
		title: "Building Responsive Design Systems with Tailwind CSS",
		excerpt:
			"Create scalable and maintainable design systems using Tailwind CSS, including custom components, themes, and responsive design patterns.",
		image:
			"https://miro.medium.com/v2/resize:fit:720/format:webp/0*Dc8tcF_RAaw0DWiK",
		tag: "Design System",
		category: "UI/UX",
		author: "Hazzaz Abdul Mannan",
		publishedAt: "2024-12-15",
		readTime: "14 min read",
		views: 2543,
		likes: 198,
		topics: [
			"Tailwind CSS",
			"Design Systems",
			"Components",
			"Themes",
			"Responsive Design",
		],
	},
	{
		id: 7,
		title: "API Design Best Practices: RESTful vs GraphQL",
		excerpt:
			"Compare RESTful APIs and GraphQL approaches, exploring when to use each and how to design APIs that are maintainable and efficient.",
		image:
			"https://thenthbit.com/wp-content/uploads/2023/08/restful-APIs-design-post-image.jpg",
		tag: "API Design",
		category: "Backend",
		author: "Hazzaz Abdul Mannan",
		publishedAt: "2024-12-10",
		readTime: "11 min read",
		views: 1687,
		likes: 123,
		topics: ["REST API", "GraphQL", "API Design", "Backend", "Schema Design"],
	},
	{
		id: 8,
		title: "Database Optimization Strategies for Modern Apps",
		excerpt:
			"Learn advanced database optimization techniques including indexing, query optimization, and caching strategies for high-performance applications.",
		image:
			"https://www.awardspace.com/wp-content/uploads/2020/08/what-is-database-1.jpg",
		tag: "Database",
		category: "Backend",
		author: "Hazzaz Abdul Mannan",
		publishedAt: "2024-12-05",
		readTime: "13 min read",
		views: 2134,
		likes: 178,
		topics: ["Database", "Optimization", "Indexing", "Caching", "Performance"],
	},
];

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
										<Link href={`/blogs/${blog.id}`}>
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
