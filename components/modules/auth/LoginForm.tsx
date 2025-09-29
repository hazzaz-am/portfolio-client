"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import PasswordInput from "@/components/ui/password-input";

const formSchema = z.object({
	email: z.email(),
	password: z
		.string()
		.min(8, "Must be at least 8 characters long")
		.regex(/[A-Z]/, "Must contain at least one uppercase letter")
		.regex(/[a-z]/, "Must contain at least one lowercase letter")
		.regex(/[0-9]/, "Must contain at least one number")
		.regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
});

export function LoginForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		if (
			values.email === "hazzazabdulmannan@gmail.com" &&
			values.password === "Admin@123"
		) {
			toast.success("Login successful!");
			redirect("/dashboard");
		} else {
			toast.error("Invalid credentials");
		}
		form.reset();
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="shadcn@example.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<PasswordInput {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full">
					Submit
				</Button>
			</form>
		</Form>
	);
}
