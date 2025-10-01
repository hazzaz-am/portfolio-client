"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, Upload, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const imageSchema = z.object({
	src: z.string().min(1, "Image source is required"),
	altText: z.string().optional(),
	width: z.number().optional(),
	height: z.number().optional(),
});

type ImageFormData = z.infer<typeof imageSchema>;

interface ImageDialogProps {
	onInsert: (data: ImageFormData) => void;
	onClose: () => void;
}

export default function ImageDialog({ onInsert, onClose }: ImageDialogProps) {
	const [uploadMethod, setUploadMethod] = useState<"url" | "upload">("url");
	const [previewUrl, setPreviewUrl] = useState<string>("");
	const fileInputRef = useRef<HTMLInputElement>(null);

	const form = useForm<ImageFormData>({
		resolver: zodResolver(imageSchema),
		defaultValues: {
			src: "",
			altText: "",
		},
	});

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			if (file.type.startsWith("image/")) {
				const reader = new FileReader();
				reader.onload = (e) => {
					const url = e.target?.result as string;
					setPreviewUrl(url);
					form.setValue("src", url);
				};
				reader.readAsDataURL(file);
			} else {
				toast.error("Please select a valid image file");
			}
		}
	};

	const handleUrlChange = (url: string) => {
		form.setValue("src", url);
		setPreviewUrl(url);
	};

	const onSubmit = (data: ImageFormData) => {
		onInsert(data);
		onClose();
	};

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
			<Card className="w-full max-w-md bg-white/95 dark:bg-neutral-900/95 backdrop-blur rounded-2xl shadow-2xl border border-white/20 dark:border-neutral-800/50 p-6">
				{/* Header */}
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-xl font-semibold text-slate-900 dark:text-white">
						Insert Image
					</h2>
					<Button
						variant="ghost"
						size="sm"
						onClick={onClose}
						className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
					>
						<X className="w-4 h-4" />
					</Button>
				</div>

				{/* Method Toggle */}
				<div className="flex gap-2 mb-6">
					<Button
						type="button"
						variant={uploadMethod === "url" ? "default" : "outline"}
						size="sm"
						onClick={() => setUploadMethod("url")}
						className={`flex-1 ${
							uploadMethod === "url"
								? "bg-orange-600 hover:bg-orange-700 text-white"
								: ""
						}`}
					>
						<Link className="w-4 h-4 mr-2" />
						URL
					</Button>
					<Button
						type="button"
						variant={uploadMethod === "upload" ? "default" : "outline"}
						size="sm"
						onClick={() => setUploadMethod("upload")}
						className={`flex-1 ${
							uploadMethod === "upload"
								? "bg-orange-600 hover:bg-orange-700 text-white"
								: ""
						}`}
					>
						<Upload className="w-4 h-4 mr-2" />
						Upload
					</Button>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						{/* Image Source */}
						{uploadMethod === "url" ? (
							<FormField
								control={form.control}
								name="src"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Image URL</FormLabel>
										<FormControl>
											<Input
												placeholder="https://example.com/image.jpg"
												{...field}
												onChange={(e) => {
													field.onChange(e);
													handleUrlChange(e.target.value);
												}}
												className="bg-white/50 dark:bg-neutral-800/50 border-slate-200 dark:border-neutral-700 focus:border-orange-400 dark:focus:border-orange-400"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						) : (
							<div>
								<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
									Upload Image
								</label>
								<input
									ref={fileInputRef}
									type="file"
									accept="image/*"
									onChange={handleFileUpload}
									className="hidden"
								/>
								<Button
									type="button"
									variant="outline"
									onClick={() => fileInputRef.current?.click()}
									className="w-full border-dashed border-2 border-slate-300 dark:border-neutral-600 hover:border-orange-400 dark:hover:border-orange-400 h-20"
								>
									<div className="text-center">
										<Upload className="w-6 h-6 mx-auto mb-2 text-slate-400" />
										<span className="text-sm text-slate-600 dark:text-slate-400">
											Click to upload image
										</span>
									</div>
								</Button>
							</div>
						)}

						{/* Preview */}
						{previewUrl && (
							<div className="mt-4">
								<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
									Preview
								</label>
								<div className="border border-slate-200 dark:border-neutral-700 rounded-lg p-2 bg-slate-50 dark:bg-neutral-800/50">
									<img
										src={previewUrl}
										alt="Preview"
										className="max-w-full h-auto max-h-40 mx-auto rounded"
										onError={() => {
											setPreviewUrl("");
											toast.error("Failed to load image");
										}}
									/>
								</div>
							</div>
						)}

						{/* Alt Text */}
						<FormField
							control={form.control}
							name="altText"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Alt Text (Optional)</FormLabel>
									<FormControl>
										<Input
											placeholder="Describe the image..."
											{...field}
											className="bg-white/50 dark:bg-neutral-800/50 border-slate-200 dark:border-neutral-700 focus:border-orange-400 dark:focus:border-orange-400"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Actions */}
						<div className="flex gap-3 pt-4">
							<Button
								type="button"
								variant="outline"
								onClick={onClose}
								className="flex-1"
							>
								Cancel
							</Button>
							<Button
								type="submit"
								disabled={!form.watch("src")}
								className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
							>
								Insert Image
							</Button>
						</div>
					</form>
				</Form>
			</Card>
		</div>
	);
}
