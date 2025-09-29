import About from "@/components/modules/public/home/About";
import BlogSection from "@/components/modules/public/home/Blog";
import CallToAction from "@/components/modules/public/home/CallToAction";
import { Hero } from "@/components/modules/public/home/Hero";
import ProjectsSection from "@/components/modules/public/home/ProjectsSection";

export default function HomePage() {
	return (
		<section>
			<Hero />
			<About />
			<ProjectsSection />
			<BlogSection />
			<CallToAction />
		</section>
	);
}
