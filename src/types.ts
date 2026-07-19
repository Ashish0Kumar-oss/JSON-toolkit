export type ToolCategory = "JSON" | "XML" | "Converters";

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string;
  process: (input: string) => { result?: string; error?: string };
  defaultInput?: string;
  editorLanguage: "json" | "xml" | "javascript" | "text";
  outputLanguage: "json" | "xml" | "javascript" | "text";
}
