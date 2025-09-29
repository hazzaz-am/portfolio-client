import { Code, ExternalLink, GitFork, Github, Star } from "lucide-react";
import Link from "next/link";

export default function ProjectListCard({ project }: { project: any }) {
	return (
		<div className="flex flex-col lg:flex-row gap-4 lg:gap-6 p-4 sm:p-6 bg-white/80 dark:bg-neutral-900/80 backdrop-blur rounded-2xl shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] border border-white/20 dark:border-neutral-800/50 hover:shadow-[0_0_32px_rgba(34,42,53,0.08),0_2px_2px_rgba(0,0,0,0.06),0_0_0_1px_rgba(34,42,53,0.05),0_0_6px_rgba(34,42,53,0.1),0_20px_80px_rgba(47,48,55,0.07)] transition-all duration-300">
			{/* List View Content */}
			<div className="lg:w-1/3 flex-shrink-0">
				<div className="relative w-full h-48 sm:h-56 lg:h-48 rounded-xl overflow-hidden bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20">
					<img
						src={project.thumbnail}
						alt={project.title}
						className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
					/>
				</div>
			</div>
			<div className="lg:w-2/3 space-y-3 sm:space-y-4">
				<div>
					<h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 transition-colors mb-2">
						{project.title}
					</h3>
					<p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
						{project.description}
					</p>
				</div>

				{/* Technologies */}
				<div className="space-y-2">
					<div className="flex items-center gap-2">
						<Code className="w-4 h-4 text-orange-600" />
						<span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
							Technologies:
						</span>
					</div>
					<div className="flex flex-wrap gap-2">
						{project.technologies.map((tech: string, techIndex: number) => (
							<span
								key={techIndex}
								className="px-2 py-1 text-xs bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-slate-300 rounded-md border border-slate-200 dark:border-neutral-700"
							>
								{tech}
							</span>
						))}
					</div>
				</div>

				{/* Features */}
				<div className="space-y-2 pt-2 border-t border-slate-200/50 dark:border-neutral-700/50">
					<span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
						Key Features:
					</span>
					<ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
						{project.features
							.slice(0, 4)
							.map((feature: string, featureIndex: number) => (
								<li
									key={featureIndex}
									className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2"
								>
									<div className="w-1 h-1 bg-orange-500 rounded-full flex-shrink-0"></div>
									{feature}
								</li>
							))}
						{project.features.length > 4 && (
							<li className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 italic col-span-full">
								+{project.features.length - 4} more features
							</li>
						)}
					</ul>
				</div>

				{/* Stats and Actions */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
					<div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
						<div className="flex items-center gap-1">
							<Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current text-yellow-500" />
							<span>{project.stars}</span>
						</div>
						<div className="flex items-center gap-1">
							<GitFork className="w-3 h-3 sm:w-4 sm:h-4" />
							<span>{project.forks}</span>
						</div>
					</div>
					<div className="flex items-center gap-3">
						<Link
							onClick={(e) => e.stopPropagation()}
							href={project.githubUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-neutral-700 transition-colors text-sm font-medium"
						>
							<Github className="w-4 h-4" />
							Code
						</Link>
						<Link
							onClick={(e) => e.stopPropagation()}
							href={project.liveUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-all duration-200 text-sm font-medium"
						>
							<ExternalLink className="w-4 h-4" />
							Live
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
