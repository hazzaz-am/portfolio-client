"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProjectsButton() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 20 }}
			viewport={{ once: false, amount: 0 }}
			transition={{ duration: 0.6, delay: 0.4 }}
			className="text-center mt-10 sm:mt-12"
		>
			<Link
				href="https://github.com/hazzaz-am"
				target="_blank"
				className="inline-flex items-center gap-2 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm sm:text-base"
			>
				<Button>
					View All Projects
					<ExternalLink className="w-4 h-4" />
				</Button>
			</Link>
		</motion.div>
	);
}
