import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  HighlighterIcon,
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
  placeholder = 'Start typing...',
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const toggleLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="border dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700 p-2 flex flex-wrap gap-1">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
            editor.isActive('bold') ? 'bg-gray-200 dark:bg-gray-700' : ''
          }`}
          title="Bold"
        >
          <Bold className="h-5 w-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
            editor.isActive('italic') ? 'bg-gray-200 dark:bg-gray-700' : ''
          }`}
          title="Italic"
        >
          <Italic className="h-5 w-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
            editor.isActive('underline') ? 'bg-gray-200 dark:bg-gray-700' : ''
          }`}
          title="Underline"
        >
          <UnderlineIcon className="h-5 w-5" />
        </button>
        <button
          onClick={toggleLink}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
            editor.isActive('link') ? 'bg-gray-200 dark:bg-gray-700' : ''
          }`}
          title="Add Link"
        >
          <LinkIcon className="h-5 w-5" />
        </button>
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1 self-center" />
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
            editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 dark:bg-gray-700' : ''
          }`}
          title="Heading 1"
        >
          <Heading1 className="h-5 w-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
            editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 dark:bg-gray-700' : ''
          }`}
          title="Heading 2"
        >
          <Heading2 className="h-5 w-5" />
        </button>
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1 self-center" />
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
            editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200 dark:bg-gray-700' : ''
          }`}
          title="Align Left"
        >
          <AlignLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
            editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200 dark:bg-gray-700' : ''
          }`}
          title="Align Center"
        >
          <AlignCenter className="h-5 w-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
            editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200 dark:bg-gray-700' : ''
          }`}
          title="Align Right"
        >
          <AlignRight className="h-5 w-5" />
        </button>
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1 self-center" />
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
            editor.isActive('bulletList') ? 'bg-gray-200 dark:bg-gray-700' : ''
          }`}
          title="Bullet List"
        >
          <List className="h-5 w-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
            editor.isActive('orderedList') ? 'bg-gray-200 dark:bg-gray-700' : ''
          }`}
          title="Numbered List"
        >
          <ListOrdered className="h-5 w-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
            editor.isActive('highlight') ? 'bg-gray-200 dark:bg-gray-700' : ''
          }`}
          title="Highlight"
        >
          <HighlighterIcon className="h-5 w-5" />
        </button>
      </div>
      <EditorContent
        editor={editor}
        className="prose dark:prose-invert max-w-none p-4 min-h-[200px] focus:outline-none"
      />
    </div>
  );
};

export default RichTextEditor;