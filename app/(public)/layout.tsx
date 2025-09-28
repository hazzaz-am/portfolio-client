import Footer from "@/components/layout/footer/footer";
import Navbar from "@/components/layout/navbar/Navbar";

export default function PublicLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<section className="min-h-screen flex flex-col">
			<Navbar />
			<main className="grow">{children}</main>
			<Footer />
		</section>
	);
}
