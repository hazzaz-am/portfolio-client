import ProjectsButton from "./ProjectsButton";
import ProjectCard from "./ProjectCard";
import ProjectHeader from "./ProjectHeader";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
	return (
		<section id="projects" className="py-28 px-4">
			<div className="max-w-7xl mx-auto">
				<ProjectHeader />

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
					{projects.map((project, index) => (
						<ProjectCard key={project.id} project={project} index={index} />
					))}
				</div>

				<ProjectsButton />
			</div>
		</section>
	);
}
