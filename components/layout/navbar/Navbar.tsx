"use client";

import {
	MobileNav,
	MobileNavHeader,
	MobileNavMenu,
	MobileNavToggle,
	Navbar as ResizableNavbar,
	NavbarButton,
	NavbarLogo,
	NavBody,
	NavItems,
} from "@/components/ui/resizable-navbar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link";
import { useState } from "react";
import Profile from "./Profile";
import { Button } from "@/components/ui/button";
import { handleDownload } from "@/utils/downloadPdf";

const navItems = [
	{
		name: "Home",
		link: "/",
	},
	{
		name: "About",
		link: "#about",
	},
	{
		name: "Blogs",
		link: "/blogs",
	},
	{
		name: "Projects",
		link: "#projects",
	},
];

export default function Navbar() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<ResizableNavbar>
			{/* Desktop Navigation */}
			<NavBody>
				<NavbarLogo />
				<NavItems items={navItems} />
				<div className="flex items-center gap-4">
					{/* <Profile /> */}
					<Button onClick={handleDownload}>Download CV</Button>
					<ThemeToggle />
				</div>
			</NavBody>

			{/* Mobile Navigation */}
			<MobileNav>
				<MobileNavHeader>
					<NavbarLogo />
					<MobileNavToggle
						isOpen={isMobileMenuOpen}
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					/>
				</MobileNavHeader>

				<MobileNavMenu
					isOpen={isMobileMenuOpen}
					onClose={() => setIsMobileMenuOpen(false)}
				>
					<div className="flex w-full justify-between">
						{/* <Profile /> */}
						<Button onClick={handleDownload}>Download CV</Button>
						<ThemeToggle />
					</div>
					{navItems.map((item, idx) => (
						<Link
							key={`mobile-link-${idx}`}
							href={item.link}
							onClick={() => setIsMobileMenuOpen(false)}
							className="relative text-neutral-600 dark:text-neutral-300"
						>
							<span className="block">{item.name}</span>
						</Link>
					))}
				</MobileNavMenu>
			</MobileNav>
		</ResizableNavbar>
	);
}
