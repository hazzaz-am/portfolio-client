"use client";
import { motion } from "motion/react";

export default function BlogHeading() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 20 }}
			viewport={{ once: false, amount: 0 }}
			transition={{ duration: 0.6 }}
			className="text-center mb-12 sm:mb-16"
		>
			<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text mb-4">
				Latest Blogs
			</h2>
			<p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
				Insights, tutorials, and thoughts on web development, programming, and
				technology trends
			</p>
		</motion.div>
	);
}
