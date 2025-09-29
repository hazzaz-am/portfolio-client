import About from "@/components/modules/public/home/About";
import BlogSection from "@/components/modules/public/home/Blog";
import { Hero } from "@/components/modules/public/home/Hero";

export default function HomePage() {
	return (
		<section>
			<Hero />
			<About />
			<BlogSection />
		</section>
	);
}
