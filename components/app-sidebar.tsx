"use client";

import * as React from "react";
import { GalleryVertical, Newspaper, FolderKanban } from "lucide-react";
import Link from "next/link";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
	navMain: [
		{
			title: "Blogs",
			url: "/dashboard/my-blogs",
			icon: Newspaper,
			isActive: true,
			items: [
				{
					title: "All Blogs",
					url: "/dashboard/my-blogs",
				},
				{
					title: "Create New",
					url: "/dashboard/create-blog",
				},
			],
		},
		{
			title: "Projects",
			url: "/dashboard/my-projects",
			icon: FolderKanban,
			items: [
				{
					title: "All Projects",
					url: "/dashboard/my-projects",
				},
				{
					title: "Create New",
					url: "/dashboard/create-project",
				},
			],
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<div className="flex gap-2 items-center">
					<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
						<GalleryVertical className="size-4" />
					</div>
					<div className="grid flex-1 text-left text-sm leading-tight">
						<Link href="/" className="truncate font-medium">
							Home
						</Link>
					</div>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
