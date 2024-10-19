import StarterKit from '@tiptap/starter-kit'
import { SelectionExtension } from './selection'
import Placeholder from '@tiptap/extension-placeholder'
export const extensions = [
    StarterKit,
    SelectionExtension,
    Placeholder.configure({
        emptyEditorClass: 'is-editor-empty',
    })
]