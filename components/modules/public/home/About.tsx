
import AboutHeader from "./AboutHeader";
import PersonalInformation from "./PersonalInformation";
import WorkExperience from "./WorkExperience";


export default function About() {
	return (
		<section id="about" className="pb-20 px-4">
			<div className="max-w-6xl mx-auto">
				<AboutHeader />
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
					<PersonalInformation />
					<WorkExperience />
				</div>
			</div>
		</section>
	);
}
