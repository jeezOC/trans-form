import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-language_tools";

interface TextEditorProps {
  code: string;
  setCode?: (code: string) => void;
  readonly?: boolean;
}
function TextEditor(
  { code, setCode, readonly }: TextEditorProps
) {

  const handleOnChange = (value: string) => {
    // console.log(value);
    if (!setCode) return;
    setCode!(value);
  }

  return (
    <div className="flex flex-row w-full flex-grow gap-4">
      <AceEditor
        className="rounded-xl"
        height="100%"
        width="100%"
        value={code}
        onChange={(value) => handleOnChange(`${value}`)}
        mode="typescript"
        theme="tomorrow"
        fontSize="16px"
        highlightActiveLine={true}
        readOnly={readonly}
        setOptions={{
          enableLiveAutocompletion: true,
          showLineNumbers: true,
          tabSize: 2,
          showPrintMargin: false,

        }}
      />
    </div>
  );
}
export default TextEditor;