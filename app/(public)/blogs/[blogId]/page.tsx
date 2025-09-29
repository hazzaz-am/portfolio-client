"use client";
import { marked } from "marked";
import { blogs } from "@/app/(public)/blogs/page";
import BlogCard from "@/components/modules/public/home/BlogCard";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/formatDate";
import { formatNumber } from "@/utils/formatNumber";
import {
	ArrowLeft,
	Calendar,
	Clock,
	Copy,
	Eye,
	Heart,
	Linkedin,
	Share2,
	User,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";

// Extended blog content for demonstration
const blogContent: { [key: number]: string } = {
	1: `
## Introduction to Next.js 15
Next.js 15 represents a significant leap forward in React-based web development, introducing groundbreaking features that revolutionize how we build modern applications. With enhanced server components, improved performance optimizations, and a more intuitive developer experience, this latest version sets new standards for full-stack React frameworks.

## Server Components Revolution
One of the most significant improvements in Next.js 15 is the enhanced server components architecture. These components run on the server, reducing client-side bundle size and improving initial page load times dramatically.

### Key Benefits:
- **Reduced Bundle Size:** Server components don't ship JavaScript to the client  
- **Direct Database Access:** Access databases and APIs directly without exposing sensitive data  
- **Improved SEO:** Content is rendered on the server, making it easily indexable  
- **Better Performance:** Faster initial page loads and reduced hydration time  

## Performance Optimizations
Next.js 15 introduces several performance enhancements that make applications faster and more efficient:

### 1. Turbopack Integration
The new Rust-based bundler provides up to 700x faster updates than Webpack, dramatically improving development experience.

### 2. Image Optimization
Enhanced image optimization with automatic format selection, lazy loading, and responsive image generation.

### 3. Edge Runtime
Improved edge runtime support allows functions to run closer to users, reducing latency significantly.

## Developer Experience Improvements
Next.js 15 focuses heavily on improving the developer experience with better tooling, clearer error messages, and enhanced TypeScript support.

### Enhanced TypeScript Support
Better type inference and automatic type generation for API routes and server components make development more robust and enjoyable.

## Migration Guide
Upgrading to Next.js 15 is straightforward, but there are some breaking changes to be aware of:

### Steps to Migrate:
1. Update your Next.js version to 15.x  
2. Update React to version 18+  
3. Review and update deprecated APIs  
4. Test server components thoroughly  
5. Update your deployment configuration  

## Best Practices
To get the most out of Next.js 15, follow these best practices:

- Use server components for data fetching and rendering  
- Implement proper error boundaries  
- Optimize images and assets  
- Leverage the new caching mechanisms  
- Use TypeScript for better development experience  

## Conclusion
Next.js 15 is a game-changer for React developers, offering unprecedented performance improvements and developer experience enhancements. By embracing server components and the new architecture, developers can build faster, more efficient applications that provide excellent user experiences.

The future of web development is here, and Next.js 15 is leading the way. Whether you're building a simple blog or a complex enterprise application, the new features and optimizations make it easier than ever to create high-quality web applications.
`,

	2: `
## Understanding TypeScript's Type System
TypeScript's type system is one of its most powerful features, enabling developers to write more robust and maintainable code. In this comprehensive guide, we'll explore advanced patterns and best practices that will elevate your TypeScript skills.

## Advanced Type Patterns
Let's dive into some of the most useful advanced TypeScript patterns that every developer should know.

### 1. Conditional Types
Conditional types allow you to create types that depend on conditions, making your code more flexible and reusable.

### 2. Mapped Types
Mapped types let you create new types based on existing ones, transforming properties in powerful ways.

### 3. Template Literal Types
Template literal types enable you to create types from string templates, perfect for API endpoints and configuration.

## Generic Constraints and Utilities
Understanding how to properly use generics with constraints opens up a world of possibilities for creating flexible, type-safe APIs.

## Design Patterns in TypeScript
Implementing classic design patterns in TypeScript requires understanding both the pattern itself and how TypeScript's type system can enhance it.

## Best Practices for Large Applications
When working on large TypeScript applications, certain patterns and practices become essential for maintainability and team productivity.
`,

	3: `
## Mastering React Hooks
React hooks have transformed how developers write React components. They simplify state management, side effects, and reusability without relying on class components.

### Commonly Used Hooks
- **useState** for managing component state  
- **useEffect** for handling side effects  
- **useContext** for accessing context  
- **useReducer** for complex state logic  
- **useMemo** and **useCallback** for performance optimizations  

## Custom Hooks
You can build custom hooks to encapsulate reusable logic, making your components cleaner and more maintainable.

## Best Practices
- Keep hooks simple and focused  
- Always follow the [rules of hooks](https://reactjs.org/docs/hooks-rules.html)  
- Extract complex logic into custom hooks  
`,

	4: `
## Introduction to Node.js
Node.js allows developers to build scalable and fast server-side applications using JavaScript.

### Key Features
- Event-driven architecture  
- Non-blocking I/O model  
- Huge npm ecosystem  

## Use Cases
- REST APIs  
- Real-time applications (chat apps, games)  
- Microservices  
- CLI tools  
`,

	5: `
## Getting Started with Git and GitHub
Version control is essential for modern development, and Git combined with GitHub provides powerful collaboration tools.

### Common Commands
- \`git init\` – Initialize a repository  
- \`git clone\` – Clone a repository  
- \`git add .\` – Stage changes  
- \`git commit -m "message"\` – Commit changes  
- \`git push origin main\` – Push to GitHub  

## Best Practices
- Commit often with meaningful messages  
- Use branches for new features  
- Review code with pull requests  
`,

	6: `
## Tailwind CSS Crash Course
Tailwind CSS is a utility-first CSS framework that speeds up styling with predefined classes.

### Benefits
- No need to write custom CSS for everything  
- Consistent design system  
- Great for rapid prototyping  

## Example
\`\`\`html
<div class="bg-blue-500 text-white p-4 rounded-lg">
  Hello Tailwind!
</div>
\`\`\`
`,

	7: `
## Introduction to Docker
Docker allows developers to package applications with all dependencies into lightweight containers.

### Benefits
- Consistency across environments  
- Easy scaling  
- Simplified deployments  

## Common Commands
- \`docker build -t app .\`  
- \`docker run -p 3000:3000 app\`  
- \`docker ps\` – List containers  
`,

	8: `
## Exploring GraphQL
GraphQL is a query language for APIs that provides a more flexible and efficient alternative to REST.

### Benefits
- Fetch only the data you need  
- Strongly typed schema  
- Single endpoint for queries and mutations  

## Example Query
\`\`\`graphql
{
  user(id: "1") {
    id
    name
    email
  }
}
\`\`\`
`,
};

export default function BlogDetailsPage({
	params,
}: {
	params: { blogId: string };
}) {
	const [copySuccess, setCopySuccess] = useState(false);
	const blogId = parseInt(params.blogId);
	const blog = blogs.find((b) => b.id === blogId);

	if (!blog) {
		notFound();
	}

	// Get same category blogs (excluding current blog)
	const sameCategoryBlogs = blogs
		.filter((b) => b.category === blog.category && b.id !== blog.id)
		.slice(0, 3);

	const handleCopyUrl = async () => {
		try {
			await navigator.clipboard.writeText(window.location.href);
			setCopySuccess(true);
			setTimeout(() => setCopySuccess(false), 2000);
		} catch (err) {
			console.error("Failed to copy URL:", err);
		}
	};

	const handleLinkedInShare = () => {
		const url = encodeURIComponent(window.location.href);
		const title = encodeURIComponent(blog.title);
		const summary = encodeURIComponent(blog.excerpt);
		window.open(
			`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`,
			"_blank",
			"width=600,height=400"
		);
	};

	const content =
		blogContent[blogId] || "<p>Full blog content coming soon...</p>";

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-neutral-900 dark:to-neutral-800 py-20 px-4">
			<div className="max-w-5xl mx-auto">
				{/* Back Button */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6 }}
					className="mb-8"
				>
					<Link
						href="/blogs"
						className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
					>
						<ArrowLeft className="w-4 h-4" />
						Back to Blogs
					</Link>
				</motion.div>

				{/* Main Content */}
				<motion.article
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.1 }}
					className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur rounded-2xl shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] border border-white/20 dark:border-neutral-800/50 overflow-hidden"
				>
					<div className="p-6 sm:p-8 lg:p-12">
						{/* 1. Topics */}
						<div className="mb-6">
							<div className="flex flex-wrap gap-2">
								{blog.topics.map((topic, index) => (
									<span
										key={index}
										className="px-3 py-1 text-sm bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 rounded-full border border-orange-200 dark:border-orange-800/50"
									>
										{topic}
									</span>
								))}
							</div>
						</div>

						{/* 2. Title */}
						<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white mb-4 leading-tight">
							{blog.title}
						</h1>

						{/* 3. Short Description */}
						<p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
							{blog.excerpt}
						</p>

						{/* 4. Image */}
						<div className="relative w-full h-64 sm:h-80 lg:h-96 mb-8 rounded-xl overflow-hidden bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20">
							<Image
								src={blog.image}
								alt={blog.title}
								fill
								className="object-cover"
								priority
							/>
						</div>

						{/* 5. Author, Views, Likes */}
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 mb-8 border-b border-slate-200 dark:border-neutral-700">
							<div className="flex flex-wrap items-center gap-4">
								<div className="flex items-center gap-2">
									<User className="w-4 h-4 text-orange-600" />
									<span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
										{blog.author.split(" ").slice(0, 2).join(" ")}
									</span>
								</div>
								<div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
									<div className="flex items-center gap-1">
										<Calendar className="w-4 h-4 text-orange-600" />
										<span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
											{formatDate(blog.publishedAt)}
										</span>
									</div>
									<div className="flex items-center gap-1">
										<Clock className="w-4 h-4 text-orange-600" />
										<span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
											{blog.readTime}
										</span>
									</div>
								</div>
							</div>
							<div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
								<div className="flex items-center gap-1">
									<Eye className="w-4 h-4" />
									<span>{formatNumber(blog.views)}</span>
								</div>
								<div className="flex items-center gap-1">
									<Heart className="w-4 h-4 fill-current text-red-500" />
									<span>{formatNumber(blog.likes)}</span>
								</div>
							</div>
						</div>

						{/* 6. Full Blog Content */}
						<div
							className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-slate-800 dark:prose-headings:text-white prose-h2:text-xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3 prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-4 prose-li:text-slate-600 dark:prose-li:text-slate-300 prose-strong:text-slate-800 dark:prose-strong:text-white prose-ul:my-4 prose-ol:my-4 whitespace-pre-wrap"
							dangerouslySetInnerHTML={{ __html: marked(content) }}
						/>

						{/* 7. Share Options */}
						<div className="mt-12 pt-8 border-t border-slate-200 dark:border-neutral-700">
							<div className="flex flex-col sm:flex-row sm:items-center gap-4">
								<div className="flex items-center gap-2">
									<Share2 className="w-5 h-5 text-slate-600 dark:text-slate-300" />
									<span className="text-slate-700 dark:text-slate-200 font-medium">
										Share this article:
									</span>
								</div>
								<div className="flex gap-3">
									<Button
										onClick={handleLinkedInShare}
										variant="outline"
										size="sm"
										className="flex items-center gap-2"
									>
										<Linkedin className="w-4 h-4" />
										LinkedIn
									</Button>
									<Button
										onClick={handleCopyUrl}
										variant="outline"
										size="sm"
										className="flex items-center gap-2"
									>
										<Copy className="w-4 h-4" />
										{copySuccess ? "Copied!" : "Copy URL"}
									</Button>
								</div>
							</div>
						</div>
					</div>
				</motion.article>

				{/* 8. Same Category Blogs */}
				{sameCategoryBlogs.length > 0 && (
					<motion.section
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="mt-16"
					>
						<h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-8 text-center">
							More in{" "}
							<span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
								{blog.category}
							</span>
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
							{sameCategoryBlogs.map((relatedBlog, index) => (
								<Link key={relatedBlog.id} href={`/blogs/${relatedBlog.id}`}>
									<BlogCard
										post={{
											...relatedBlog,
											description: relatedBlog.excerpt,
											loves: relatedBlog.likes,
										}}
										index={index}
									/>
								</Link>
							))}
						</div>
					</motion.section>
				)}
			</div>
		</div>
	);
}
