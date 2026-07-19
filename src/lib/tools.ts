import { XMLParser, XMLBuilder } from "fast-xml-parser";
import { Tool } from "../types";

const jsonParser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
const xmlBuilderFormatted = new XMLBuilder({ ignoreAttributes: false, attributeNamePrefix: "@_", format: true });
const xmlBuilderMinified = new XMLBuilder({ ignoreAttributes: false, attributeNamePrefix: "@_", format: false });

export const tools: Tool[] = [
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description: "Format and beautify your JSON data for easier reading.",
    category: "JSON",
    icon: "FileJson",
    editorLanguage: "json",
    outputLanguage: "json",
    defaultInput: `{"hello":"world","tools":["format","minify","validate"]}`,
    process: (input) => {
      try {
        const parsed = JSON.parse(input);
        return { result: JSON.stringify(parsed, null, 2) };
      } catch (e: any) {
        return { error: e.message };
      }
    },
  },
  {
    id: "json-minifier",
    name: "JSON Minifier",
    description: "Minify JSON data to save space and reduce file size.",
    category: "JSON",
    icon: "Minimize",
    editorLanguage: "json",
    outputLanguage: "json",
    defaultInput: `{\n  "hello": "world",\n  "tools": [\n    "format",\n    "minify",\n    "validate"\n  ]\n}`,
    process: (input) => {
      try {
        const parsed = JSON.parse(input);
        return { result: JSON.stringify(parsed) };
      } catch (e: any) {
        return { error: e.message };
      }
    },
  },
  {
    id: "json-validator",
    name: "JSON Validator",
    description: "Validate your JSON structure and find syntax errors.",
    category: "JSON",
    icon: "CheckCircle",
    editorLanguage: "json",
    outputLanguage: "json",
    defaultInput: `{\n  "hello": "world"\n  "missing_comma": true\n}`,
    process: (input) => {
      if (!input.trim()) return { result: "Please enter JSON to validate." };
      try {
        JSON.parse(input);
        return { result: "Valid JSON" };
      } catch (e: any) {
        return { error: e.message };
      }
    },
  },
  {
    id: "xml-formatter",
    name: "XML Formatter",
    description: "Format and beautify XML strings.",
    category: "XML",
    icon: "Code",
    editorLanguage: "xml",
    outputLanguage: "xml",
    defaultInput: `<root><item>Hello</item><item>World</item></root>`,
    process: (input) => {
      try {
        const obj = jsonParser.parse(input);
        if (Object.keys(obj).length === 0) throw new Error("Invalid XML");
        return { result: xmlBuilderFormatted.build(obj) };
      } catch (e: any) {
        return { error: e.message || "Failed to format XML" };
      }
    },
  },
  {
    id: "xml-minifier",
    name: "XML Minifier",
    description: "Minify XML strings by removing whitespace.",
    category: "XML",
    icon: "Minimize2",
    editorLanguage: "xml",
    outputLanguage: "xml",
    defaultInput: `<root>\n  <item>Hello</item>\n  <item>World</item>\n</root>`,
    process: (input) => {
      try {
        const obj = jsonParser.parse(input);
        if (Object.keys(obj).length === 0) throw new Error("Invalid XML");
        return { result: xmlBuilderMinified.build(obj) };
      } catch (e: any) {
        return { error: e.message || "Failed to minify XML" };
      }
    },
  },
  {
    id: "json-to-xml",
    name: "JSON to XML",
    description: "Convert JSON objects to XML format.",
    category: "Converters",
    icon: "ArrowRightLeft",
    editorLanguage: "json",
    outputLanguage: "xml",
    defaultInput: `{"root":{"item":["Hello","World"]}}`,
    process: (input) => {
      try {
        const parsed = JSON.parse(input);
        return { result: xmlBuilderFormatted.build(parsed) };
      } catch (e: any) {
        return { error: e.message };
      }
    },
  },
  {
    id: "xml-to-json",
    name: "XML to JSON",
    description: "Convert XML data into a JSON object.",
    category: "Converters",
    icon: "ArrowRightLeft",
    editorLanguage: "xml",
    outputLanguage: "json",
    defaultInput: `<root><item>Hello</item><item>World</item></root>`,
    process: (input) => {
      try {
        const obj = jsonParser.parse(input);
        if (Object.keys(obj).length === 0) throw new Error("Invalid XML");
        return { result: JSON.stringify(obj, null, 2) };
      } catch (e: any) {
        return { error: e.message || "Failed to parse XML" };
      }
    },
  },
];
