"use client";

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Link from "next/link";

export default function BlogButton() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 20 }}
			viewport={{ once: false, amount: 0 }}
			transition={{ duration: 0.6, delay: 0.4 }}
			className="text-center mt-10 sm:mt-12"
		>
			<Link href="/blogs">
				<Button className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm sm:text-base">
					View All Blogs
				</Button>
			</Link>
		</motion.div>
	);
}
