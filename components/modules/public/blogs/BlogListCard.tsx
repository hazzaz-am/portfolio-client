import { formatDate } from "@/utils/formatDate";
import { formatNumber } from "@/utils/formatNumber";
import {
	Calendar,
	Clock,
	Code,
	ExternalLink,
	Eye,
	Heart,
	User,
} from "lucide-react";
import Link from "next/link";

export default function BlogListCard({ blog }: { blog: any }) {
	return (
		<div className="flex flex-col lg:flex-row gap-4 lg:gap-6 p-4 sm:p-6 bg-white/80 dark:bg-neutral-900/80 backdrop-blur rounded-2xl shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] border border-white/20 dark:border-neutral-800/50 hover:shadow-[0_0_32px_rgba(34,42,53,0.08),0_2px_2px_rgba(0,0,0,0.06),0_0_0_1px_rgba(34,42,53,0.05),0_0_6px_rgba(34,42,53,0.1),0_20px_80px_rgba(47,48,55,0.07)] transition-all duration-300">
			{/* List View Content */}
			<div className="lg:w-1/3 flex-shrink-0">
				<div className="relative w-full h-48 sm:h-56 lg:h-48 rounded-xl overflow-hidden bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20">
					<img
						src={blog.image}
						alt={blog.title}
						className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
					/>
				</div>
			</div>
			<div className="lg:w-2/3 space-y-3 sm:space-y-4">
				<div>
					<div className="flex items-center gap-2 mb-2">
						<span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border border-orange-200 dark:border-orange-800/50">
							{blog.tag}
						</span>
						<span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800/50">
							{blog.category}
						</span>
					</div>
					<h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 transition-colors mb-2">
						{blog.title}
					</h3>
					<p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
						{blog.excerpt}
					</p>
				</div>

				{/* Author & Meta Info */}
				<div className="space-y-2">
					<div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
						<div className="flex items-center gap-1">
							<Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
							<span>{formatDate(blog.publishedAt)}</span>
						</div>
						<div className="flex items-center gap-1">
							<Clock className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
							<span>{blog.readTime}</span>
						</div>
						<div className="flex items-center gap-2">
							<User className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
							<span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
								{blog.author.split(" ").slice(0, 2).join(" ")}
							</span>
						</div>
					</div>
				</div>

				{/* Key Topics */}

				<div className="space-y-4 pt-2 border-t border-slate-200/50 dark:border-neutral-700/50">
					<div className="flex items-center gap-2">
						<Code className="w-4 h-4 text-orange-600" />
						<span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
							Key Topics:
						</span>
					</div>
					<div className="flex flex-wrap gap-1">
						{blog.topics.map((topic: string, topicIndex: number) => (
							<span
								key={topicIndex}
								className="px-2 py-1 text-xs bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-slate-300 rounded-md border border-slate-200 dark:border-neutral-700"
							>
								{topic}
							</span>
						))}
					</div>
				</div>

				{/* Stats and Actions */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
					<div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
						<div className="flex items-center gap-1">
							<Heart className="w-3 h-3 sm:w-4 sm:h-4 fill-current text-red-500" />
							<span>{formatNumber(blog.likes)}</span>
						</div>
						<div className="flex items-center gap-1">
							<Eye className="w-3 h-3 sm:w-4 sm:h-4" />
							<span>{formatNumber(blog.views)}</span>
						</div>
					</div>
					<div className="flex gap-2">
						<Link
							href={`/blogs/${blog.id}`}
							className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-all duration-200 text-sm font-medium"
						>
							<ExternalLink className="w-4 h-4" />
							Read More
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
