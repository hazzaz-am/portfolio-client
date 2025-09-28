"use client";

import { motion } from "motion/react";
import Image from "next/image";
import profilePhoto from "../../../.././public/hazzaz.jpg";

import {
	Github,
	Globe,
	Linkedin,
	Mail,
	MapPin,
	Phone,
} from "lucide-react";

const personalInfo = {
	name: "Hazzaz Abdul Mannan",
	title: "Full Stack Developer",
	bio: "Passionate full-stack developer with 1+ years of experience creating innovative web applications. I specialize in modern JavaScript frameworks and have a keen eye for user experience design.",
	location: "Dhaka, Bangladesh",
	email: "hazzazabdulmannan@gmail.com",
	phone: "+880 1771-817843",
	website: "https://hazzaz-am.dev",
	github: "https://github.com/hazzaz-am",
	linkedin: "https://www.linkedin.com/in/hazzaz01",
};

export default function PersonalInformation() {
	return (
		<motion.div
			initial={{ opacity: 0, x: -20 }}
			whileInView={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -20 }}
			viewport={{ once: false, amount: 0.1 }}
			transition={{ duration: 0.6, delay: 0.2 }}
			className="lg:col-span-1"
		>
			<div className="p-4 sm:p-6 lg:p-8 bg-white/80 dark:bg-neutral-900/80 backdrop-blur rounded-2xl shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] border border-white/20 dark:border-neutral-800/50 transition-all duration-300">
				{/* Profile Image Placeholder */}
				<div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full mx-auto mb-4 sm:mb-6 overflow-hidden">
					<Image
						src={profilePhoto}
						alt="Hazzaz"
						className="object-cover w-full h-full rounded-full"
					/>
				</div>

				<h3 className="text-xl sm:text-2xl font-bold text-center text-slate-800 dark:text-white mb-2">
					{personalInfo.name}
				</h3>
				<p className="text-sm sm:text-base text-orange-600 dark:text-orange-400 text-center font-semibold mb-4 sm:mb-6">
					{personalInfo.title}
				</p>

				<p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 text-center mb-6 sm:mb-8 leading-relaxed">
					{personalInfo.bio}
				</p>

				{/* Contact Information */}
				<div className="space-y-4">
					<div className="flex items-center text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
						<MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-orange-600 flex-shrink-0" />
						<span className="text-sm sm:text-base">
							{personalInfo.location}
						</span>
					</div>
					<div className="flex items-center text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
						<Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-orange-600 flex-shrink-0" />
						<a
							href={`mailto:${personalInfo.email}`}
							className="hover:underline text-sm sm:text-base break-all"
						>
							{personalInfo.email}
						</a>
					</div>
					<div className="flex items-center text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
						<Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-orange-600 flex-shrink-0" />
						<a
							href={`tel:${personalInfo.phone}`}
							className="hover:underline text-sm sm:text-base"
						>
							{personalInfo.phone}
						</a>
					</div>
				</div>

				{/* Social Links */}
				<div className="flex justify-center space-x-3 sm:space-x-4 mt-6 sm:mt-8">
					<a
						href={personalInfo.website}
						className="p-3 bg-slate-100 dark:bg-neutral-800 rounded-full hover:bg-orange-100 dark:hover:bg-orange-600 transition-colors group"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Globe className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-orange-600" />
					</a>
					<a
						href={personalInfo.github}
						className="p-3 bg-slate-100 dark:bg-neutral-800 rounded-full hover:bg-orange-100 dark:hover:bg-orange-600 transition-colors group"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Github className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-orange-600" />
					</a>
					<a
						href={personalInfo.linkedin}
						className="p-3 bg-slate-100 dark:bg-neutral-800 rounded-full hover:bg-orange-100 dark:hover:bg-orange-600 transition-colors group"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Linkedin className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-orange-600" />
					</a>
				</div>
			</div>
		</motion.div>
	);
}
