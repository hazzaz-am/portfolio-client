"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, Loader2, Save } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

// Zod validation schema
const projectSchema = z.object({
	thumbnail: z
		.string()
		.url({ message: "Please enter a valid URL for the thumbnail image" })
		.min(1, { message: "Thumbnail image URL is required" }),
	title: z
		.string()
		.min(3, { message: "Title must be at least 3 characters" })
		.max(100, { message: "Title must not exceed 100 characters" }),
	description: z
		.string()
		.min(10, { message: "Description must be at least 10 characters" })
		.max(500, { message: "Description must not exceed 500 characters" }),
	githubUrl: z
		.string()
		.url({ message: "Please enter a valid GitHub URL" })
		.min(1, { message: "GitHub URL is required" }),
	liveUrl: z
		.string()
		.url({ message: "Please enter a valid live URL" })
		.min(1, { message: "Live URL is required" }),
	technologies: z
		.string()
		.min(1, { message: "At least one technology is required" })
		.refine(
			(val) =>
				val.split(",").filter((tech) => tech.trim().length > 0).length >= 1,
			{ message: "Please enter at least one technology" }
		),
	category: z.string().min(1, { message: "Please select a category" }),
	features: z
		.string()
		.min(1, { message: "At least one feature is required" })
		.refine(
			(val) =>
				val.split(",").filter((feature) => feature.trim().length > 0).length >=
				1,
			{ message: "Please enter at least one feature" }
		),
	stars: z.number().min(0, { message: "Stars must be a positive number" }),
	forks: z.number().min(0, { message: "Forks must be a positive number" }),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

const projectCategories = [
	"Frontend",
	"Backend",
	"Full Stack",
	"Mobile",
	"Desktop",
	"DevOps",
	"Machine Learning",
	"Data Science",
	"Game Development",
	"Other",
];

export default function EditProjectPage() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<ProjectFormValues>({
		resolver: zodResolver(projectSchema),
		defaultValues: {
			thumbnail: "",
			title: "",
			description: "",
			githubUrl: "",
			liveUrl: "",
			technologies: "",
			category: "",
			features: "",
			stars: 0,
			forks: 0,
		},
	});

	const onSubmit = async (values: ProjectFormValues) => {
		setIsSubmitting(true);

		try {
			// Process technologies and features arrays
			const processedValues = {
				...values,
				technologies: values.technologies
					.split(",")
					.map((tech) => tech.trim())
					.filter((tech) => tech.length > 0),
				features: values.features
					.split(",")
					.map((feature) => feature.trim())
					.filter((feature) => feature.length > 0),
			};

			// Here you would typically send the data to your API
			console.log("Project data:", processedValues);

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			toast.success("Project edited successfully!");
			form.reset();
		} catch (error) {
			console.error("Error editing project:", error);
			toast.error("Failed to edit project. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="container mx-auto max-w-4xl p-4 space-y-6">
			<div className="text-center space-y-2">
				<h1 className="text-3xl font-bold tracking-tight">
					Update Your Project
				</h1>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Save className="h-5 w-5" />
						Update Project Details
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<div className="grid grid-cols-1 gap-6">
								{/* Left Column */}
								<div className="space-y-6">
									{/* Thumbnail Image */}
									<FormField
										control={form.control}
										name="thumbnail"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-base font-semibold">
													Thumbnail Image URL *
												</FormLabel>
												<FormControl>
													<Input
														placeholder="https://example.com/image.jpg"
														{...field}
														className="h-11"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									{/* Title */}
									<FormField
										control={form.control}
										name="title"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-base font-semibold">
													Project Title *
												</FormLabel>
												<FormControl>
													<Input
														placeholder="My Awesome Project"
														{...field}
														className="h-11"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									{/* Description */}
									<FormField
										control={form.control}
										name="description"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-base font-semibold">
													Description *
												</FormLabel>
												<FormControl>
													<Textarea
														placeholder="A brief description of your project..."
														className="min-h-[120px] resize-none"
														{...field}
													/>
												</FormControl>
												<FormMessage />
												<p className="text-xs text-muted-foreground">
													{field.value?.length || 0}/500 characters
												</p>
											</FormItem>
										)}
									/>

									{/* GitHub URL */}
									<FormField
										control={form.control}
										name="githubUrl"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-base font-semibold">
													GitHub URL *
												</FormLabel>
												<FormControl>
													<Input
														placeholder="https://github.com/username/repo"
														{...field}
														className="h-11"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									{/* Live URL */}
									<FormField
										control={form.control}
										name="liveUrl"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-base font-semibold">
													Live URL *
												</FormLabel>
												<FormControl>
													<Input
														placeholder="https://myproject.vercel.app"
														{...field}
														className="h-11"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								{/* Right Column */}
								<div className="space-y-6">
									{/* Technologies */}
									<FormField
										control={form.control}
										name="technologies"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-base font-semibold">
													Technologies *
												</FormLabel>
												<FormControl>
													<Textarea
														placeholder="React, TypeScript, Tailwind CSS, Node.js, MongoDB"
														className="min-h-[80px] resize-none"
														{...field}
													/>
												</FormControl>
												<FormMessage />
												<p className="text-xs text-muted-foreground">
													Separate technologies with commas
												</p>
											</FormItem>
										)}
									/>

									{/* Category */}
									<FormField
										control={form.control}
										name="category"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-base font-semibold">
													Category *
												</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger className="h-11 w-full">
															<SelectValue placeholder="Select a category" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{projectCategories.map((category) => (
															<SelectItem key={category} value={category}>
																{category}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>

									{/* Features */}
									<FormField
										control={form.control}
										name="features"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-base font-semibold">
													Features *
												</FormLabel>
												<FormControl>
													<Textarea
														placeholder="User Authentication, Real-time Updates, Responsive Design"
														className="min-h-[100px] resize-none"
														{...field}
													/>
												</FormControl>
												<FormMessage />
												<p className="text-xs text-muted-foreground">
													Separate features with commas
												</p>
											</FormItem>
										)}
									/>

									{/* Stats Row */}
									<div className="grid grid-cols-2 gap-4">
										{/* Stars */}
										<FormField
											control={form.control}
											name="stars"
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-base font-semibold">
														Stars
													</FormLabel>
													<FormControl>
														<Input
															type="number"
															min="0"
															max="10000"
															placeholder="0"
															{...field}
															onChange={(e) =>
																field.onChange(parseInt(e.target.value) || 0)
															}
															className="h-11"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										{/* Forks */}
										<FormField
											control={form.control}
											name="forks"
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-base font-semibold">
														Forks
													</FormLabel>
													<FormControl>
														<Input
															type="number"
															min="0"
															max="10000"
															placeholder="0"
															{...field}
															onChange={(e) =>
																field.onChange(parseInt(e.target.value) || 0)
															}
															className="h-11"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
							</div>

							{/* Submit Button */}
							<div className="flex justify-end pt-6 border-t">
								<Button
									type="submit"
									disabled={isSubmitting}
									className="min-w-[150px] h-11"
								>
									{isSubmitting ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Updating...
										</>
									) : (
										<>
											<Save className="mr-2 h-4 w-4" />
											Update Project
										</>
									)}
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
