import { useEditor, EditorContent as UnstyledEditorContent, Editor as EditorType, EditorEvents } from '@tiptap/react'
import styled from 'styled-components';
import { useCallback } from 'react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
const DEFAULT_CONTENT = `<P></P>`

const EditorContent = styled(UnstyledEditorContent)`
  min-height: var(--min-input-height);
  max-height: var(--max-input-height);
  overflow-y: auto;
  overflow-x: hidden;
  
  width: 100%;
  
  padding: 10px;
  
  font-size: ${props => props.theme.fs.sm};
  font-weight: 500;
  
  :focus {
    border: none;
    outline: none;
  }
`

interface EditorProps {
  defaultContent?: string;
  onContentChange: (content: string, editor: any) => void;
}

function StyledTiptapEditor({
  defaultContent = DEFAULT_CONTENT,
  onContentChange
}: EditorProps) {

  const handleUpdate = useCallback((props: EditorEvents["update"]) => {
    onContentChange(props.editor.getText(), props.editor)
  }, [onContentChange])

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Type your message...',
      })
    ],
    enableCoreExtensions: true,
    content: defaultContent,
    editable: true,
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
      }
    },
    autofocus: true,
    onUpdate: handleUpdate,
  })

  return <EditorContent editor={editor} data-editor-content />
}

export {
  StyledTiptapEditor
}