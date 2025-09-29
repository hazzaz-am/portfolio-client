import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Admin - Login",
};

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
