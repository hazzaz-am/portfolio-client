import Link from "next/link";
import BlogButton from "./BlogButton";
import BlogCard from "./BlogCard";
import BlogHeading from "./BlogHeading";

// Sample blog data - replace with your actual blog data
export const blogPosts = [
	{
		id: 1,
		title: "Building Modern Web Applications with Next.js 15",
		description:
			"Explore the latest features of Next.js 15 and learn how to build scalable, performant web applications with the newest React patterns and server components.",
		image:
			"https://media.geeksforgeeks.org/wp-content/uploads/20250826180914639441/next.webp",
		tag: "Web Development",
		author: "Hazzaz Abdul Mannan",
		publishedAt: "2025-01-15",
		readTime: "8 min read",
		views: 1234,
		loves: 89,
		category: "Web Application",
		topics: ["Next.js", "Server Components", "Performance", "TypeScript"],
	},
	{
		id: 2,
		title: "Mastering TypeScript: Advanced Patterns and Best Practices",
		description:
			"Deep dive into advanced TypeScript concepts, design patterns, and best practices that will make your code more maintainable and type-safe.",
		image:
			"https://wearedevelopers.imgix.net/magazine/articles/554/images/hero/odPaQHSbArSIFzZbUzlE-1740483365.jpeg?w=720&auto=compress,format",
		tag: "TypeScript",
		author: "Hazzaz Abdul Mannan",
		publishedAt: "2025-01-10",
		readTime: "12 min read",
		views: 2156,
		loves: 145,
		category: "Languages",
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
		description:
			"Understanding micro-frontends architecture and how it's revolutionizing the way we build and scale large frontend applications in enterprise environments.",
		image:
			"https://d2ms8rpfqc4h24.cloudfront.net/what_is_microfrontend_e628b39c29.jpg",
		tag: "Architecture",
		author: "Hazzaz Abdul Mannan",
		publishedAt: "2025-01-05",
		readTime: "15 min read",
		views: 987,
		loves: 67,
		category: "Software Architecture",
		topics: ["Micro-Frontends", "Scalability", "Enterprise", "Webpack"],
	},
	// {
	// 	id: 4,
	// 	title: "Optimizing React Performance: Tips and Techniques",
	// 	description:
	// 		"Learn proven strategies to optimize your React applications for better performance, including code splitting, memoization, and virtual scrolling.",
	// 	image:
	// 		"https://cloudinary-marketing-res.cloudinary.com/images/w_1000,c_scale/v1728825907/React_optimization_header/React_optimization_header-jpg?_i=AA",
	// 	tag: "React",
	// 	author: "Hazzaz Abdul Mannan",
	// 	publishedAt: "2024-12-28",
	// 	readTime: "10 min read",
	// 	views: 3421,
	// 	loves: 234,
	// 	category: "Engineering",
	// 	topics: [
	// 		"Performance",
	// 		"Optimization",
	// 		"React",
	// 		"Code Splitting",
	// 		"Memoization",
	// 	],
	// },
	// {
	// 	id: 5,
	// 	title: "CSS Grid vs Flexbox: When to Use What",
	// 	description:
	// 		"A comprehensive guide comparing CSS Grid and Flexbox, with practical examples and use cases to help you choose the right layout method.",
	// 	image:
	// 		"https://miro.medium.com/v2/resize:fit:720/format:webp/1*k64zdk6Y8nTjBXo5Emn1jQ.png",
	// 	tag: "CSS",
	// 	author: "Hazzaz Abdul Mannan",
	// 	publishedAt: "2024-12-20",
	// 	readTime: "6 min read",
	// 	views: 1876,
	// 	loves: 156,
	// 	category: "Design",
	// 	topics: ["Tailwind CSS", "Responsive Design", "UI/UX Design"],
	// },
	// {
	// 	id: 6,
	// 	title: "Building Responsive Design Systems with Tailwind CSS",
	// 	description:
	// 		"Create scalable and maintainable design systems using Tailwind CSS, including custom components, themes, and responsive design patterns.",
	// 	image:
	// 		"https://miro.medium.com/v2/resize:fit:720/format:webp/0*Dc8tcF_RAaw0DWiK",
	// 	tag: "Design System",
	// 	author: "Hazzaz Abdul Mannan",
	// 	publishedAt: "2024-12-15",
	// 	readTime: "14 min read",
	// 	views: 2543,
	// 	loves: 198,
	// 	category: "Design",
	// 	topics: [
	// 		"Tailwind CSS",
	// 		"Design Systems",
	// 		"Responsive Design",
	// 		"Component Libraries",
	// 		"UI/UX Design",
	// 	],
	// },
];

export default function BlogSection() {
	return (
		<section id="blogs" className="py-28 px-4">
			<div className="max-w-7xl mx-auto">
				<BlogHeading />

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
					{blogPosts.map((post, index) => (
						<Link key={post.id} href={`/blogs/${post.id}`}>
							<BlogCard post={post} index={index} />
						</Link>
					))}
				</div>

				{/* <BlogButton /> */}
			</div>
		</section>
	);
}
