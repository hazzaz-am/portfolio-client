"use client";

import { cn } from "@/lib/utils";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { TRANSFORMERS } from "@lexical/markdown";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { EditorState } from "lexical";
import ToolbarPlugin from "./ToolbarPlugin";

const theme = {
	// Theme styling
	text: {
		bold: "font-bold",
		italic: "italic",
		underline: "underline",
		strikethrough: "line-through",
		code: "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-1 py-0.5 rounded text-sm font-mono",
	},
	paragraph: "mb-2 text-slate-700 dark:text-slate-300",
	quote:
		"border-l-4 border-orange-400 pl-4 italic text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 py-2 my-4 rounded-r",
	heading: {
		h1: "text-3xl font-bold text-slate-900 dark:text-white mb-4 mt-6",
		h2: "text-2xl font-bold text-slate-900 dark:text-white mb-3 mt-5",
		h3: "text-xl font-bold text-slate-900 dark:text-white mb-2 mt-4",
		h4: "text-lg font-bold text-slate-900 dark:text-white mb-2 mt-3",
		h5: "text-base font-bold text-slate-900 dark:text-white mb-2 mt-2",
		h6: "text-sm font-bold text-slate-900 dark:text-white mb-2 mt-2",
	},
	list: {
		nested: {
			listitem: "list-none",
		},
		ol: "list-decimal list-inside my-2 pl-4 space-y-1",
		ul: "list-disc list-inside my-2 pl-4 space-y-1",
		listitem: "text-slate-700 dark:text-slate-300",
	},
	code: "bg-slate-900 dark:bg-slate-950 text-slate-100 p-4 rounded-lg my-4 overflow-x-auto font-mono text-sm border border-slate-200 dark:border-slate-700",
	codeHighlight: {
		atrule: "text-purple-400",
		attr: "text-blue-400",
		boolean: "text-orange-400",
		builtin: "text-red-400",
		cdata: "text-gray-400",
		char: "text-green-400",
		class: "text-yellow-400",
		"class-name": "text-yellow-400",
		comment: "text-gray-500",
		constant: "text-orange-400",
		deleted: "text-red-400",
		doctype: "text-gray-400",
		entity: "text-orange-400",
		function: "text-blue-400",
		important: "text-red-400",
		inserted: "text-green-400",
		keyword: "text-purple-400",
		namespace: "text-yellow-400",
		number: "text-orange-400",
		operator: "text-gray-300",
		prolog: "text-gray-400",
		property: "text-blue-400",
		punctuation: "text-gray-300",
		regex: "text-green-400",
		selector: "text-yellow-400",
		string: "text-green-400",
		symbol: "text-orange-400",
		tag: "text-red-400",
		url: "text-blue-400",
		variable: "text-orange-400",
	},
	link: "text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 underline cursor-pointer",
	image: "my-2 mx-auto block",
};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
	console.error(error);
}

interface TextEditorProps {
	onChange?: (editorState: EditorState) => void;
	initialValue?: string;
	placeholder?: string;
	className?: string;
	readOnly?: boolean;
}

export default function TextEditor({
	onChange,
	initialValue,
	placeholder = "Start writing your content...",
	className,
	readOnly = false,
}: TextEditorProps) {
	const initialConfig = {
		namespace: "MyEditor",
		theme,
		onError,
		nodes: [
			HeadingNode,
			ListNode,
			ListItemNode,
			QuoteNode,
			CodeNode,
			LinkNode,
		],
		editorState: initialValue || null,
		editable: !readOnly,
	};

	return (
		<div
			className={cn(
				"bg-white/80 dark:bg-neutral-900/80 backdrop-blur rounded-xl shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] border border-white/20 dark:border-neutral-800/50 overflow-hidden",
				className
			)}
		>
			<LexicalComposer initialConfig={initialConfig}>
				{!readOnly && <ToolbarPlugin />}
				<div className="relative">
					<RichTextPlugin
						contentEditable={
							<ContentEditable
								className={cn(
									"min-h-[300px] p-4 focus:outline-none bg-transparent text-slate-700 dark:text-slate-300 leading-relaxed",
									"prose prose-slate dark:prose-invert max-w-none",
									"prose-headings:text-slate-900 dark:prose-headings:text-white",
									"prose-p:text-slate-700 dark:prose-p:text-slate-300",
									"prose-a:text-orange-600 dark:prose-a:text-orange-400",
									"prose-blockquote:border-orange-400 prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-slate-800/50",
									"prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:text-slate-800 dark:prose-code:text-slate-200",
									"prose-pre:bg-slate-900 dark:prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-200 dark:prose-pre:border-slate-700",
									"prose-strong:text-slate-900 dark:prose-strong:text-white",
									"prose-em:text-slate-700 dark:prose-em:text-slate-300",
									"resize-none overflow-hidden",
									readOnly && "cursor-default"
								)}
								spellCheck="true"
								data-testid="editor-input"
							/>
						}
						placeholder={
							<div className="absolute top-4 left-4 text-slate-400 dark:text-slate-500 pointer-events-none select-none">
								{placeholder}
							</div>
						}
						ErrorBoundary={LexicalErrorBoundary}
					/>
					<HistoryPlugin />
					<AutoFocusPlugin />
					<ListPlugin />
					<LinkPlugin />
					<MarkdownShortcutPlugin transformers={TRANSFORMERS} />
					{onChange && (
						<OnChangePlugin
							onChange={(editorState) => {
								onChange(editorState);
							}}
						/>
					)}
				</div>
			</LexicalComposer>
		</div>
	);
}

// Export a simple hook to get editor content as HTML
export function useEditorContent() {
	const getHTML = (editorState: EditorState): string => {
		return editorState.read(() => {
			const root = editorState._nodeMap.get("root");
			return root ? root.getTextContent() : "";
		});
	};

	const getJSON = (editorState: EditorState): string => {
		return JSON.stringify(editorState.toJSON());
	};

	return { getHTML, getJSON };
}
