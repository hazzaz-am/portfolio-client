"use client"

import { motion } from "motion/react";
import EmailForm from "./EmailForm";

export default function CallToAction() {
	return (
		<section className="pb-28 px-4">
			<div className="max-w-7xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					viewport={{ once: false, amount: 0 }}
					transition={{ duration: 0.6 }}
				>
					<div className="p-4 sm:p-6 lg:p-8 bg-white/80 dark:bg-neutral-900/80 backdrop-blur rounded-2xl shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] border border-white/20 dark:border-neutral-800/50 transition-all duration-300">
						<h2 className="text-balance text-4xl font-semibold lg:text-5xl text-center">
							Let's connect!
						</h2>
						<p className="mt-4 text-center">
							Feel free to reach out for collaborations, freelance projects, or
							just a friendly chat.
						</p>

						<EmailForm />
					</div>
				</motion.div>
			</div>
		</section>
	);
}
