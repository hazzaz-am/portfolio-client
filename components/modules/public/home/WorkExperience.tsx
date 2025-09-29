"use client";

import { motion } from "motion/react";
import { Calendar } from "lucide-react";

const workExperience = [
	{
		company: "NexaLance",
		position: "Frontend Developer",
		duration: "2025 - Present",
		description:
			"Developed responsive web applications and e-commerce platforms. Collaborated with design teams to implement pixel-perfect UI components.",
	},
	{
		company: "Coderammer IT Solution",
		position: "Intern Frontend Developer",
		duration: "January 2025 - May 2025",
		description:
			"Learn and assisted in developing web applications using React and Next.js. Gained hands-on experience in frontend development and version control.",
	},
];

const skills = [
	{
		category: "Frontend",
		items: ["React", "Next.js", "TypeScript", "Redux", "Tailwind CSS"],
	},
	{
		category: "Backend",
		items: ["Node.js", "Express", "PostgreSQL", "MongoDB"],
	},
	{
		category: "Tools",
		items: ["Git", "Docker", "Postman", "Swagger", "Vercel", "Figma"],
	},
	{
		category: "Soft Skills",
		items: ["Problem Solving", "Communication", "Adaptability"],
	},
];

export default function WorkExperience() {
	return (
		<div className="lg:col-span-2 space-y-6 lg:space-y-8">
			{/* Work Experience */}
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				viewport={{ once: false, amount: 0 }}
				transition={{ duration: 0.9, delay: 0.2 }}
				className="p-4 sm:p-6 lg:p-8 bg-white/80 dark:bg-neutral-900/80 backdrop-blur rounded-2xl shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] border border-white/20 dark:border-neutral-800/50 transition-all duration-300"
			>
				<h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-6 sm:mb-8 flex items-center">
					<Calendar className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-orange-600" />
					Work Experience
				</h3>

				<div className="space-y-6 sm:space-y-8">
					{workExperience.map((exp, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: false, amount: 0 }}
							transition={{ duration: 0.9, delay: 0.4 + index * 0.1 }}
							className="relative pl-6 sm:pl-8 border-l-2 border-orange-200 dark:border-orange-800 hover:border-orange-400 dark:hover:border-orange-600 transition-colors"
						>
							<div className="absolute -left-[9px] top-2 w-4 h-4 bg-orange-600 rounded-full border-4 border-white dark:border-neutral-800 shadow-lg"></div>
							<div className="bg-slate-50 dark:bg-neutral-800/50 rounded-xl p-4 sm:p-6 hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors">
								<h4 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-white mb-1">
									{exp.position}
								</h4>
								<p className="text-orange-600 dark:text-orange-400 font-medium mb-2">
									{exp.company}
								</p>
								<p className="text-sm text-slate-500 dark:text-neutral-400 mb-3">
									{exp.duration}
								</p>
								<p className="text-sm sm:text-base text-slate-600 dark:text-neutral-300 leading-relaxed">
									{exp.description}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</motion.div>

			{/* Skills */}
			<motion.div
				initial={{ opacity: 0}}
				whileInView={{ opacity: 1}}
				exit={{ opacity: 0 }}
				viewport={{ once: false, amount: 0 }}
				transition={{ duration: 0.9, delay: 0.3 }}
				className="p-4 sm:p-6 lg:p-8 bg-white/80 dark:bg-neutral-900/80 backdrop-blur rounded-2xl shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] border border-white/20 dark:border-neutral-800/50 transition-all duration-300"
			>
				<h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-6 sm:mb-8">
					Skills & Expertise
				</h3>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
					{skills.map((skillGroup, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, scale: 0.95 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: false, amount: 0 }}
							transition={{ duration: 0.9, delay: 0.4 + index * 0.1 }}
							className="bg-slate-50 dark:bg-neutral-800/50 rounded-xl p-4 sm:p-6 hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
						>
							<h4 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-white mb-3 sm:mb-4">
								{skillGroup.category}
							</h4>
							<div className="flex flex-wrap gap-2">
								{skillGroup.items.map((skill, skillIndex) => (
									<motion.span
										key={skillIndex}
										initial={{ opacity: 0, scale: 0.8 }}
										whileInView={{ opacity: 1, scale: 1 }}
										viewport={{ once: false, amount: 0 }}
										exit={{ opacity: 0, scale: 0.8 }}
										transition={{
											duration: 0.9,
											delay: 0.7 + skillIndex * 0.05,
										}}
										className="px-2 sm:px-3 py-1 dark:bg-neutral-700/80 rounded-full text-xs sm:text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
									>
										{skill}
									</motion.span>
								))}
							</div>
						</motion.div>
					))}
				</div>
			</motion.div>
		</div>
	);
}
