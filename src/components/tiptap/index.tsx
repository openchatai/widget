import { useEditor, EditorContent as UnstyledEditorContent, Editor as EditorType, EditorEvents } from '@tiptap/react'
import { extensions } from "./extensions";
import styled from 'styled-components';
import { useCallback } from 'react';

const DEFAULT_CONTENT = `<P></P>`

const EditorContent = styled(UnstyledEditorContent)`
  min-height: var(--min-input-height);
  max-height: var(--max-input-height);
  overflow-y: auto;
  overflow-x: hidden;
  
  width: 100%;
  
  padding: 10px;
  font-size: ${props => props.theme.fs.xs};
  border: none;
  outline: none;

  p.is-editor-empty:first-child::before {
    color: #adb5bd;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }
  
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
    // 
  }, [onContentChange])

  const editor = useEditor({
    extensions,
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