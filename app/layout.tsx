import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { toastOptions } from "@/utils/toastOptions";

const inter = Inter({
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Portfolio - Next.js Template",
	description:
		"A modern, responsive, and accessible Next.js template with Tailwind CSS and Radix UI.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<Toaster
						position="top-right"
						gutter={8}
						containerClassName="z-50"
						toastOptions={toastOptions}
					/>
				</ThemeProvider>
			</body>
		</html>
	);
}
