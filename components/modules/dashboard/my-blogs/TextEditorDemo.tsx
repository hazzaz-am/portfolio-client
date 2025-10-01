"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EditorState } from "lexical";
import { FileText } from "lucide-react";
import { useState } from "react";
import TextEditor from "./TextEditor";

export default function TextEditorDemo() {
	const [editorContent, setEditorContent] = useState<string>("");
	const [showPreview, setShowPreview] = useState(false);

	const handleEditorChange = (editorState: EditorState) => {
		const content = editorState.read(() => {
			const root = editorState._nodeMap.get("root");
			return root ? root.getTextContent() : "";
		});
		setEditorContent(content);
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
							Rich Text Editor Demo
						</h1>
					</div>
					<p className="text-slate-600 dark:text-slate-400 text-lg">
						Experience the power of Lexical rich text editing
					</p>
				</div>

				{/* Controls */}
				<div className="mb-4 flex flex-wrap gap-2">
					<Button
						variant="outline"
						onClick={() => setShowPreview(!showPreview)}
						className="text-slate-600 dark:text-slate-400 border-slate-300 dark:border-neutral-600"
					>
						{showPreview ? "Hide Preview" : "Show Preview"}
					</Button>
				</div>

				{/* Editor */}
				<div
					className={showPreview ? "grid grid-cols-1 lg:grid-cols-2 gap-6" : ""}
				>
					<div>
						<TextEditor
							onChange={handleEditorChange}
							placeholder="Try these features:
• Type # for headings (H1, H2, H3)
• Use **bold** and *italic* formatting
• Create > blockquotes
• Add - bullet lists or 1. numbered lists
• Use `inline code` or ```code blocks```
• Click the image button to insert images
• Press Ctrl+Z/Cmd+Z for undo"
							className="min-h-[500px]"
						/>
					</div>

					{showPreview && (
						<div>
							<Card className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur rounded-xl shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] border border-white/20 dark:border-neutral-800/50 p-6">
								<h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
									Content Preview
								</h3>
								<div className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
									{editorContent || "Start typing to see preview..."}
								</div>
							</Card>
						</div>
					)}
				</div>

				{/* Features List */}
				<Card className="mt-8 bg-white/80 dark:bg-neutral-900/80 backdrop-blur rounded-xl shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] border border-white/20 dark:border-neutral-800/50 p-6">
					<h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
						Features
					</h3>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-slate-600 dark:text-slate-400">
						<div>✨ Rich text formatting</div>
						<div>📝 Markdown shortcuts</div>
						<div>📱 Fully responsive</div>
						<div>🎨 Glass morphism design</div>
						<div>🌙 Dark mode support</div>
						<div>⌨️ Keyboard shortcuts</div>
						<div>📋 Copy/paste support</div>
						<div>↩️ Undo/redo functionality</div>
						<div>🎯 Focus management</div>
						<div>🖼️ Image insertion</div>
						<div>🔗 Auto-link detection</div>
						<div>📊 Code syntax highlighting</div>
					</div>
				</Card>
			</div>
		</div>
	);
}
