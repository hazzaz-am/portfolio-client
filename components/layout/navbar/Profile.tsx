import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDashboard } from "@tabler/icons-react";
import { User, User2 } from "lucide-react";
import Link from "next/link";

export default function Profile() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size="icon" className="rounded-full" variant="outline">
					<User className="h-5 w-5" />
					<span className="sr-only">Profile</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="center">
				<Link href="/dashboard">
					<DropdownMenuItem>
						<IconDashboard className="mr-2 h-4 w-4" />
						Dashboard
					</DropdownMenuItem>
				</Link>
				<Link href="/dashboard/profile">
					<DropdownMenuItem>
						<User2 className="mr-2 h-4 w-4" />
						My Profile
					</DropdownMenuItem>
				</Link>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
