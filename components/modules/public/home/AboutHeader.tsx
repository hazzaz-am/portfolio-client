"use client";
import { motion } from "motion/react";

export default function AboutHeader() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 20 }}
			viewport={{ once: false, amount: 0.1 }}
			transition={{ duration: 0.6 }}
			className="text-center mb-16"
		>
			<h2 className="text-4xl md:text-5xl font-bold bg-clip-text mb-4">
				About Me
			</h2>
		</motion.div>
	);
}
