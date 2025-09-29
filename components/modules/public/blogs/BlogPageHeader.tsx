import { motion } from "motion/react";

export default function BlogPageHeader() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className="text-center mb-12"
		>
			<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
				All Blogs
			</h1>
			<p className="text-slate-600 dark:text-slate-300 text-lg max-w-3xl mx-auto">
				Explore my thoughts, tutorials, and insights on web development,
				technology trends, and programming best practices
			</p>
		</motion.div>
	);
}
