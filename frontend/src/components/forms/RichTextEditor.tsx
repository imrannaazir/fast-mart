import React, { useState } from "react";
import { EditorState, convertToRaw, RawDraftContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface RichTextEditorProps {
  onChange: (content: RawDraftContentState) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  onChange,
  placeholder,
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
    if (onChange) {
      onChange(convertToRaw(state.getCurrentContent()));
    }
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleEditorChange}
      placeholder={placeholder}
    />
  );
};

export default RichTextEditor;
