import { useEditor, EditorContent as UnstyledEditorContent, FloatingMenu, BubbleMenu, Editor as EditorType, EditorEvents } from '@tiptap/react'
import { extensions } from "./extensions";
import styled from 'styled-components';
import { useCallback, useState } from 'react';

const DEFAULT_CONTENT = `<P></P>`

const EditorContainer = styled.div``

const EditorContent = styled(UnstyledEditorContent)``

interface EditorProps {
  content: string;
  onContentChange: (content: string, editor: any) => void;
}

function Editor({
  defaultContent = DEFAULT_CONTENT,
  onContentChange
}: {
  defaultContent?: string;
  onContentChange: (_editor: EditorType) => void;
}) {

  const handleUpdate = useCallback((props: EditorEvents["update"]) => {
    // 
  }, [onContentChange])

  const editor = useEditor({
    extensions,
    content: defaultContent,
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

  return <EditorContainer>
    <EditorContent editor={editor} data-editor-content />
  </EditorContainer>
}

export {
  Editor
}