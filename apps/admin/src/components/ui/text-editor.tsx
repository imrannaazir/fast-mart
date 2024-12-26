import JoditEditor from "jodit-react";
import { FC, useMemo, useRef } from "react";
import { SetFieldValue } from "react-hook-form";

type TTextEditorProps = {
  value: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: SetFieldValue<any>;
  fieldName?: string;
};
const TextEditor: FC<TTextEditorProps> = ({ value, setValue, fieldName = "description" }) => {
  const editor = useRef(null);
  const config = useMemo(
    () => ({
      readonly: false,
      height: "200px",
      toolbarAdaptive: false,
      statusbar: false,
      buttons: [
        "ai-commands",
        "paragraph",
        "bold",
        "italic",
        "underline",
        "font",
        "fontsize",
        "ul",
        "ol",
        "lineHeight",
        "image",
        "video",
        "hr",
        "table",
        "link",
        "indent",
        "outdent",
        "left",
        "source",
      ],
    }),
    []
  );

  return (
    <JoditEditor
      className="rounded-3xl border-2"
      ref={editor}
      value={value}
      config={config}
      onBlur={(content: string) => setValue(fieldName, content)}
    />
  );
};

export default TextEditor;
