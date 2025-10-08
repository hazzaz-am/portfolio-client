import { Separator } from "@/components/ui/separator";
import { GithubIcon, LinkedinIcon } from "lucide-react";
import Link from "next/link";

const footerLinks = [
	{
		title: "Home",
		href: "/",
	},
	{
		title: "About",
		href: "#about",
	},
	{
		title: "Blogs",
		href: "/blogs",
	},
	{
		title: "Projects",
		href: "/projects",
	},
];

const Footer = () => {
	return (
		<div className="flex flex-col">
			<div className="grow bg-muted" />
			<footer className="border-t">
				<div className="max-w-(--breakpoint-xl) mx-auto">
					<div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
						{/* Copyright */}
						<span className="text-muted-foreground">
							&copy; {new Date().getFullYear()}{" "}
							<Link href="/" target="_blank">
								Hazzaz
							</Link>
							. All rights reserved.
						</span>

						<div className="flex items-center gap-5 text-muted-foreground">
							<Link href="https://www.linkedin.com/in/hazzaz01" target="_blank">
								<LinkedinIcon className="h-5 w-5" />
							</Link>
							<Link href="https://github.com/hazzaz-am" target="_blank">
								<GithubIcon className="h-5 w-5" />
							</Link>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
