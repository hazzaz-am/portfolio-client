"use client";

import UploadImage from "@/components/modules/dashboard/UploadImage";
import TextEditor from "@/components/modules/dashboard/my-blogs/TextEditor";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditorState } from "lexical";
import { ChartBarStacked, FileText, Hash, Save, Tag, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const createBlogSchema = z.object({
	title: z
		.string()
		.min(5, "Title must be at least 5 characters")
		.max(100, "Title must not exceed 100 characters"),
	excerpt: z
		.string()
		.min(10, "Excerpt must be at least 10 characters")
		.max(300, "Excerpt must not exceed 300 characters"),
	content: z
		.string()
		.min(10, "Content must be at least 300 characters")
		.max(1000, "Content must not exceed 1000 characters"),
	tag: z
		.string()
		.min(2, "Tag must be at least 2 characters")
		.max(50, "Tag must not exceed 50 characters"),
	author: z
		.string()
		.min(2, "Author name must be at least 2 characters")
		.max(50, "Author name must not exceed 50 characters"),
	category: z
		.string()
		.min(2, "Category must be at least 2 characters")
		.max(30, "Category must not exceed 30 characters"),
	topics: z
		.string()
		.min(5, "Topics must be at least 5 characters")
		.max(200, "Topics must not exceed 200 characters"),
});

type CreateBlogFormData = z.infer<typeof createBlogSchema>;

export default function CreateBlogPage() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<CreateBlogFormData>({
		resolver: zodResolver(createBlogSchema),
		defaultValues: {
			title: "",
			excerpt: "",
			tag: "",
			author: "",
			category: "",
			topics: "",
			content: "",
		},
	});

	const onSubmit = async (data: CreateBlogFormData) => {
		setIsSubmitting(true);
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 2000));

			console.log("Blog data:", data);
			toast.success("Blog created successfully!");
			form.reset();
		} catch (error) {
			toast.error("Failed to create blog. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleEditorChange = (editorState: EditorState) => {
		// Convert editor state to string for form validation
		const content = editorState.read(() => {
			return editorState.read(() => {
				const root = editorState._nodeMap.get("root");
				return root ? root.getTextContent() : "";
			});
		});

		// Update the form field value
		form.setValue("content", content, {
			shouldValidate: true,
			shouldDirty: true,
		});
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800 p-4 sm:p-6 lg:p-8">
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="mb-8">
					<div className="flex items-center gap-3 mb-2">
						<div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
							<FileText className="w-6 h-6 text-orange-600 dark:text-orange-400" />
						</div>
						<h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
							Create New Blog
						</h1>
					</div>
					<p className="text-slate-600 dark:text-slate-400 text-lg">
						Share your thoughts and ideas with the world
					</p>
				</div>

				{/* Upload Image Banner */}
				<UploadImage />
				{/* Form Card */}
				<Card className="mt-8 bg-white/80 dark:bg-neutral-900/80 backdrop-blur rounded-2xl shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] border border-white/20 dark:border-neutral-800/50 p-6 sm:p-8">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							{/* Title Field */}
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
											<FileText className="w-4 h-4" />
											Blog Title
										</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter an engaging blog title..."
												className="h-12 bg-white/50 dark:bg-neutral-800/50 border-slate-200 dark:border-neutral-700 focus:border-orange-400 dark:focus:border-orange-400"
												{...field}
											/>
										</FormControl>
										<FormMessage className="text-red-500" />
									</FormItem>
								)}
							/>

							{/* Excerpt Field */}
							<FormField
								control={form.control}
								name="excerpt"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
											<FileText className="w-4 h-4" />
											Excerpt
										</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Write a brief description of your blog post..."
												className="min-h-[100px] bg-white/50 dark:bg-neutral-800/50 border-slate-200 dark:border-neutral-700 focus:border-orange-400 dark:focus:border-orange-400"
												{...field}
											/>
										</FormControl>
										<FormMessage className="text-red-500" />
									</FormItem>
								)}
							/>

							{/* Two Column Layout for Medium and Large Screens */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Tag Field */}
								<FormField
									control={form.control}
									name="tag"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
												<Tag className="w-4 h-4" />
												Tag
											</FormLabel>
											<FormControl>
												<Input
													placeholder="e.g., Technology"
													className="h-12 bg-white/50 dark:bg-neutral-800/50 border-slate-200 dark:border-neutral-700 focus:border-orange-400 dark:focus:border-orange-400"
													{...field}
												/>
											</FormControl>
											<FormMessage className="text-red-500" />
										</FormItem>
									)}
								/>

								{/* Author Field */}
								<FormField
									control={form.control}
									name="author"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
												<User className="w-4 h-4" />
												Author
											</FormLabel>
											<FormControl>
												<Input
													placeholder="Your name"
													className="h-12 bg-white/50 dark:bg-neutral-800/50 border-slate-200 dark:border-neutral-700 focus:border-orange-400 dark:focus:border-orange-400"
													{...field}
												/>
											</FormControl>
											<FormMessage className="text-red-500" />
										</FormItem>
									)}
								/>

								{/* Category Field */}
								<FormField
									control={form.control}
									name="category"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
												<ChartBarStacked className="w-4 h-4" />
												Category
											</FormLabel>
											<FormControl>
												<Input
													placeholder="e.g., Tutorial"
													className="h-12 bg-white/50 dark:bg-neutral-800/50 border-slate-200 dark:border-neutral-700 focus:border-orange-400 dark:focus:border-orange-400"
													{...field}
												/>
											</FormControl>
											<FormMessage className="text-red-500" />
										</FormItem>
									)}
								/>

								{/* Topics Field */}
								<FormField
									control={form.control}
									name="topics"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
												<Hash className="w-4 h-4" />
												Topics
											</FormLabel>
											<FormControl>
												<Input
													placeholder="React, JavaScript, Web Development"
													className="h-12 bg-white/50 dark:bg-neutral-800/50 border-slate-200 dark:border-neutral-700 focus:border-orange-400 dark:focus:border-orange-400"
													{...field}
												/>
											</FormControl>
											<FormMessage className="text-red-500" />
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name="content"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
											<FileText className="w-4 h-4" />
											Blog Content
										</FormLabel>
										<FormControl>
											<TextEditor
												onChange={handleEditorChange}
												placeholder="Start writing your blog content... Use markdown shortcuts like # for headings, **bold**, *italic*, > for quotes"
												className="min-h-[400px]"
											/>
										</FormControl>
										<FormMessage className="text-red-500" />
									</FormItem>
								)}
							/>

							{/* Submit Button */}
							<div className="flex flex-col sm:flex-row gap-4 pt-6">
								<Button
									type="submit"
									disabled={isSubmitting}
									className="flex-1 sm:flex-none bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white h-12 px-8 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
								>
									{isSubmitting ? (
										<div className="flex items-center gap-2">
											<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
											Creating Blog...
										</div>
									) : (
										<div className="flex items-center gap-2">
											<Save className="w-4 h-4" />
											Create Blog
										</div>
									)}
								</Button>

								<Button
									type="button"
									variant="outline"
									onClick={() => form.reset()}
									className="flex-1 sm:flex-none h-12 px-8 border-slate-300 dark:border-neutral-600 hover:bg-slate-50 dark:hover:bg-neutral-800"
								>
									Reset Form
								</Button>
							</div>
						</form>
					</Form>
				</Card>
			</div>
		</div>
	);
}
