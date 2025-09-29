"use client";
import { formatDate } from "@/utils/formatDate";
import { formatNumber } from "@/utils/formatNumber";
import { Calendar, Clock, Eye, Heart, User } from "lucide-react";
import { motion } from "motion/react";
import { blogPosts } from "./Blog";
import Image from "next/image";

export default function BlogCard({
	post,
	index,
}: {
	post: (typeof blogPosts)[0];
	index: number;
}) {
	return (
		<motion.article
			key={post.id}
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 30 }}
			viewport={{ once: false, amount: 0 }}
			transition={{ duration: 0.6, delay: index * 0.1 }}
			className="group cursor-pointer"
		>
			<div className="h-full p-4 sm:p-6 bg-white/80 dark:bg-neutral-900/80 backdrop-blur rounded-2xl shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] border border-white/20 dark:border-neutral-800/50 hover:shadow-[0_0_32px_rgba(34,42,53,0.08),0_2px_2px_rgba(0,0,0,0.06),0_0_0_1px_rgba(34,42,53,0.05),0_0_6px_rgba(34,42,53,0.1),0_20px_80px_rgba(47,48,55,0.07)] transition-all duration-300">
				{/* Blog Image */}
				<div className="relative w-full h-48 sm:h-52 mb-4 sm:mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20">
					<Image src={post.image} alt={post.title} layout="fill" objectFit="cover" />
				</div>

				{/* Content */}
				<div className="space-y-3 sm:space-y-4">
					{/* Tag Badge */}
					<div className="flex items-center gap-2">
						<span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border border-orange-200 dark:border-orange-800/50">
							{post.tag}
						</span>
					</div>

					{/* Title */}
					<h3
						className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors overflow-hidden"
						style={{
							display: "-webkit-box",
							WebkitLineClamp: 2,
							WebkitBoxOrient: "vertical" as const,
						}}
					>
						{post.title}
					</h3>

					{/* Description */}
					<p
						className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed overflow-hidden"
						style={{
							display: "-webkit-box",
							WebkitLineClamp: 3,
							WebkitBoxOrient: "vertical" as const,
						}}
					>
						{post.description}
					</p>

					{/* Author & Date */}
					<div className="flex items-center gap-3 sm:gap-4 pt-2 border-t border-slate-200/50 dark:border-neutral-700/50">
						<div className="flex items-center gap-2">
							<User className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
							<span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
								{post.author.split(" ").slice(0, 2).join(" ")}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
							<span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
								{formatDate(post.date)}
							</span>
						</div>
					</div>

					{/* Stats */}
					<div className="flex items-center justify-between pt-2">
						<div className="flex items-center gap-3 sm:gap-4">
							<div className="flex items-center gap-1">
								<Clock className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />
								<span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
									{post.readTime}
								</span>
							</div>
							<div className="flex items-center gap-1">
								<Eye className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />
								<span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
									{formatNumber(post.views)}
								</span>
							</div>
						</div>
						<div className="flex items-center gap-1">
							<Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 fill-current" />
							<span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
								{formatNumber(post.loves)}
							</span>
						</div>
					</div>
				</div>
			</div>
		</motion.article>
	);
}
