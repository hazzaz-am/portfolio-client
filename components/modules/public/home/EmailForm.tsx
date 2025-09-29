"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, Mail, SendHorizonal } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function EmailForm() {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [isValid, setIsValid] = useState(false);

	// Universal email regex validation
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	const validateEmail = (emailValue: string) => {
		if (!emailValue.trim()) {
			setError("");
			setIsValid(false);
			return false;
		}

		if (!emailRegex.test(emailValue)) {
			setError("(e.g., user@domain.com)");
			setIsValid(false);
			return false;
		}

		setError("");
		setIsValid(true);
		return true;
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setEmail(value);
		validateEmail(value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!validateEmail(email)) {
			return;
		}

		toast.success("I'll get back to you soon.");
		setEmail("");
		setIsValid(false);
	};

	return (
		<div className="mx-auto mt-10 max-w-sm lg:mt-12">
			<form onSubmit={handleSubmit}>
				<div
					className={`bg-background relative grid grid-cols-[1fr_auto] items-center rounded-[calc(var(--radius)+0.75rem)] border pr-3 shadow shadow-zinc-950/5 transition-colors ${
						error
							? "border-red-500 has-[input:focus]:ring-red-500/20"
							: isValid
							? "border-green-500 has-[input:focus]:ring-green-500/20"
							: "has-[input:focus]:ring-muted has-[input:focus]:ring-2"
					}`}
				>
					<Mail className="text-caption text-orange-600 pointer-events-none absolute inset-y-0 left-5 my-auto size-5" />

					<input
						placeholder="Your email address"
						className="h-14 w-full bg-transparent pl-12 focus:outline-none"
						type="email"
						value={email}
						onChange={handleEmailChange}
					/>

					<div className="md:pr-1.5 lg:pr-0">
						<Button
							aria-label="submit"
							className="rounded-(--radius)"
							disabled={!isValid}
						>
							<span className="hidden md:block">Get Started</span>
							<SendHorizonal
								className="relative mx-auto size-5 md:hidden"
								strokeWidth={2}
							/>
						</Button>
					</div>
				</div>
			</form>

			{/* Error message */}
			{error && (
				<div className="mt-2 flex items-center gap-2 text-sm text-red-500">
					<AlertCircle className="h-4 w-4" />
					<span>{error}</span>
				</div>
			)}
		</div>
	);
}
