import React from "react";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

export function Hero() {
	return (
		<div className="relative flex min-h-screen w-full flex-col items-start justify-start overflow-hidden -mt-16">
			<BackgroundRippleEffect rows={10}/>
			<div className="w-full px-4 absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<h2 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-neutral-800 md:text-4xl lg:text-7xl dark:text-neutral-100">
					Building Tomorrow&apos;s Digital Experiences
				</h2>
				<p className="relative z-10 mx-auto mt-4 max-w-xl text-center text-neutral-800 dark:text-neutral-500">
					Software Developer with 1+ years creating robust applications and
					user centric solutions
				</p>
			</div>
		</div>
	);
}
