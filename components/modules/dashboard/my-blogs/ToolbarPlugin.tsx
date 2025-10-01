"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { $createCodeNode } from "@lexical/code";
import {
	INSERT_ORDERED_LIST_COMMAND,
	INSERT_UNORDERED_LIST_COMMAND,
	REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
	$createHeadingNode,
	$createQuoteNode,
	HeadingTagType,
} from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import { mergeRegister } from "@lexical/utils";
import {
	$createParagraphNode,
	$getSelection,
	$isRangeSelection,
	FORMAT_TEXT_COMMAND,
	REDO_COMMAND,
	SELECTION_CHANGE_COMMAND,
	UNDO_COMMAND,
} from "lexical";
import {
	Bold,
	Code,
	Heading1,
	Heading2,
	Heading3,
	Image,
	Italic,
	List,
	ListOrdered,
	Quote,
	Redo,
	Strikethrough,
	Type,
	Underline,
	Undo,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import ImageDialog from "./ImageDialog";
import { INSERT_IMAGE_COMMAND } from "./ImagesPlugin";

const LowPriority = 1;

interface ToolbarState {
	isBold: boolean;
	isItalic: boolean;
	isUnderline: boolean;
	isStrikethrough: boolean;
	isCode: boolean;
	blockType: string;
}

export default function ToolbarPlugin() {
	const [editor] = useLexicalComposerContext();
	const [showImageDialog, setShowImageDialog] = useState(false);
	const [toolbarState, setToolbarState] = useState<ToolbarState>({
		isBold: false,
		isItalic: false,
		isUnderline: false,
		isStrikethrough: false,
		isCode: false,
		blockType: "paragraph",
	});

	const updateToolbar = useCallback(() => {
		const selection = $getSelection();
		if ($isRangeSelection(selection)) {
			const anchorNode = selection.anchor.getNode();
			const element =
				anchorNode.getKey() === "root"
					? anchorNode
					: anchorNode.getTopLevelElementOrThrow();
			const elementKey = element.getKey();
			const elementDOM = editor.getElementByKey(elementKey);

			setToolbarState({
				isBold: selection.hasFormat("bold"),
				isItalic: selection.hasFormat("italic"),
				isUnderline: selection.hasFormat("underline"),
				isStrikethrough: selection.hasFormat("strikethrough"),
				isCode: selection.hasFormat("code"),
				blockType: element.getType(),
			});
		}
	}, [editor]);

	useEffect(() => {
		return mergeRegister(
			editor.registerUpdateListener(({ editorState }) => {
				editorState.read(() => {
					updateToolbar();
				});
			}),
			editor.registerCommand(
				SELECTION_CHANGE_COMMAND,
				(_payload, newEditor) => {
					updateToolbar();
					return false;
				},
				LowPriority
			)
		);
	}, [editor, updateToolbar]);

	const formatParagraph = () => {
		if (toolbarState.blockType !== "paragraph") {
			editor.update(() => {
				const selection = $getSelection();
				if ($isRangeSelection(selection)) {
					$setBlocksType(selection, () => $createParagraphNode());
				}
			});
		}
	};

	const formatHeading = (headingSize: HeadingTagType) => {
		if (toolbarState.blockType !== headingSize) {
			editor.update(() => {
				const selection = $getSelection();
				if ($isRangeSelection(selection)) {
					$setBlocksType(selection, () => $createHeadingNode(headingSize));
				}
			});
		}
	};

	const formatQuote = () => {
		if (toolbarState.blockType !== "quote") {
			editor.update(() => {
				const selection = $getSelection();
				if ($isRangeSelection(selection)) {
					$setBlocksType(selection, () => $createQuoteNode());
				}
			});
		}
	};

	const formatCode = () => {
		if (toolbarState.blockType !== "code") {
			editor.update(() => {
				const selection = $getSelection();
				if ($isRangeSelection(selection)) {
					$setBlocksType(selection, () => $createCodeNode());
				}
			});
		}
	};

	const formatBulletList = () => {
		if (toolbarState.blockType !== "bullet") {
			editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
		} else {
			editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
		}
	};

	const formatNumberedList = () => {
		if (toolbarState.blockType !== "number") {
			editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
		} else {
			editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
		}
	};

	const insertImage = () => {
		setShowImageDialog(true);
	};

	const handleImageInsert = (data: {
		src: string;
		altText?: string;
		width?: number;
		height?: number;
	}) => {
		editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
			src: data.src,
			altText: data.altText || "",
			maxWidth: 800,
			width: data.width,
			height: data.height,
		});
	};

	const ToolbarButton = ({
		onClick,
		disabled = false,
		isActive = false,
		children,
		"aria-label": ariaLabel,
	}: {
		onClick: () => void;
		disabled?: boolean;
		isActive?: boolean;
		children: React.ReactNode;
		"aria-label": string;
	}) => (
		<Button
			variant="ghost"
			size="sm"
			type="button"
			onClick={onClick}
			disabled={disabled}
			aria-label={ariaLabel}
			className={`h-8 w-8 p-0 hover:bg-orange-50 dark:hover:bg-orange-900/20 ${
				isActive
					? "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
					: "text-slate-600 dark:text-slate-400"
			}`}
		>
			{children}
		</Button>
	);

	return (
		<>
			<div className="flex flex-wrap items-center gap-1 p-3 bg-white/50 dark:bg-neutral-800/50 border-b border-slate-200 dark:border-neutral-700 rounded-t-xl">
				{/* History Controls */}
				<div className="flex items-center gap-1">
					<ToolbarButton
						onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
						aria-label="Undo"
					>
						<Undo className="w-4 h-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
						aria-label="Redo"
					>
						<Redo className="w-4 h-4" />
					</ToolbarButton>
				</div>

				<Separator orientation="vertical" className="h-6 mx-1" />

				{/* Block Type Controls */}
				<div className="flex items-center gap-1">
					<ToolbarButton
						onClick={formatParagraph}
						isActive={toolbarState.blockType === "paragraph"}
						aria-label="Normal Text"
					>
						<Type className="w-4 h-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => formatHeading("h1")}
						isActive={toolbarState.blockType === "h1"}
						aria-label="Heading 1"
					>
						<Heading1 className="w-4 h-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => formatHeading("h2")}
						isActive={toolbarState.blockType === "h2"}
						aria-label="Heading 2"
					>
						<Heading2 className="w-4 h-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => formatHeading("h3")}
						isActive={toolbarState.blockType === "h3"}
						aria-label="Heading 3"
					>
						<Heading3 className="w-4 h-4" />
					</ToolbarButton>
				</div>

				<Separator orientation="vertical" className="h-6 mx-1" />

				{/* Text Formatting */}
				<div className="flex items-center gap-1">
					<ToolbarButton
						onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
						isActive={toolbarState.isBold}
						aria-label="Bold"
					>
						<Bold className="w-4 h-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={() =>
							editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
						}
						isActive={toolbarState.isItalic}
						aria-label="Italic"
					>
						<Italic className="w-4 h-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={() =>
							editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
						}
						isActive={toolbarState.isUnderline}
						aria-label="Underline"
					>
						<Underline className="w-4 h-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={() =>
							editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
						}
						isActive={toolbarState.isStrikethrough}
						aria-label="Strikethrough"
					>
						<Strikethrough className="w-4 h-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")}
						isActive={toolbarState.isCode}
						aria-label="Inline Code"
					>
						<Code className="w-4 h-4" />
					</ToolbarButton>
				</div>

				<Separator orientation="vertical" className="h-6 mx-1" />

				{/* Block Elements */}
				<div className="flex items-center gap-1">
					<ToolbarButton
						onClick={formatQuote}
						isActive={toolbarState.blockType === "quote"}
						aria-label="Quote"
					>
						<Quote className="w-4 h-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={formatCode}
						isActive={toolbarState.blockType === "code"}
						aria-label="Code Block"
					>
						<Code className="w-4 h-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={formatBulletList}
						isActive={toolbarState.blockType === "bullet"}
						aria-label="Bullet List"
					>
						<List className="w-4 h-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={formatNumberedList}
						isActive={toolbarState.blockType === "number"}
						aria-label="Numbered List"
					>
						<ListOrdered className="w-4 h-4" />
					</ToolbarButton>
				</div>

				<Separator orientation="vertical" className="h-6 mx-1" />

				{/* Media Controls */}
				<div className="flex items-center gap-1">
					<ToolbarButton onClick={insertImage} aria-label="Insert Image">
						<Image className="w-4 h-4" />
					</ToolbarButton>
				</div>
			</div>

			{/* Image Dialog */}
			{showImageDialog && (
				<ImageDialog
					onInsert={handleImageInsert}
					onClose={() => setShowImageDialog(false)}
				/>
			)}
		</>
	);
}
