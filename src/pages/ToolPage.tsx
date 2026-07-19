import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { tools } from '../lib/tools';
import { Sidebar } from '../components/layout/Sidebar';
import Editor from '@monaco-editor/react';
import { Copy, Download, Trash2, Play, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

export function ToolPage() {
  const { id } = useParams();
  const tool = tools.find(t => t.id === id) || tools[0];
  
  const [input, setInput] = useState(tool.defaultInput || '');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Reset when tool changes
  useEffect(() => {
    setInput(tool.defaultInput || '');
    setOutput('');
    setError('');
  }, [tool]);

  const handleProcess = () => {
    if (!input.trim()) {
      setError('Please provide input data.');
      setOutput('');
      return;
    }
    const { result, error: processError } = tool.process(input);
    if (processError) {
      setError(processError);
      setOutput('');
    } else if (result !== undefined) {
      setOutput(result);
      setError('');
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setInput(text);
    } catch (err) {
      console.error('Failed to read clipboard', err);
    }
  };

  const handleLoadSample = () => {
    setInput(tool.defaultInput || '');
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `result.${tool.outputLanguage}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-1 overflow-hidden bg-[#0A0A0A]">
      <Sidebar />
      
      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        {/* Tool Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold text-white tracking-tight">{tool.name}</h1>
            <p className="text-xs text-gray-500">{tool.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setInput('')}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#333] text-white rounded text-xs hover:bg-[#1A1A1A] transition-all"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear
            </button>
            <button
              onClick={handleProcess}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-black rounded text-xs font-semibold hover:bg-gray-200 transition-all"
            >
              <Play className="h-3.5 w-3.5" />
              Process
            </button>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 grid lg:grid-cols-2 gap-4 overflow-y-auto lg:overflow-hidden min-h-0">
          {/* Input */}
          <div className="flex flex-col h-[350px] lg:h-full border border-[#262626] rounded-xl bg-[#0F0F0F] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#262626] bg-[#141414]">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Input</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <Editor
                height="100%"
                defaultLanguage={tool.editorLanguage}
                language={tool.editorLanguage}
                value={input}
                onChange={(val) => setInput(val || '')}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  wordWrap: 'on',
                  padding: { top: 16 },
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
            <div className="px-4 py-2 bg-[#141414] border-t border-[#262626] flex gap-4">
              <button onClick={handlePaste} className="text-[10px] text-gray-500 hover:text-white transition-colors">Paste from Clipboard</button>
              <button onClick={handleLoadSample} className="text-[10px] text-gray-500 hover:text-white transition-colors">Sample Data</button>
              <button onClick={() => setInput('')} className="text-[10px] text-gray-500 hover:text-white ml-auto transition-colors">Clear</button>
            </div>
          </div>

          {/* Output */}
          <div className="flex flex-col h-[350px] lg:h-full border border-[#262626] rounded-xl bg-[#0F0F0F] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#262626] bg-[#141414]">
              <div className="flex items-center gap-2">
                <span className={cn("w-2 h-2 rounded-full", output && !error ? "bg-green-500" : "bg-gray-500")}></span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Output</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopy}
                  disabled={!output}
                  className="text-[10px] text-blue-400 hover:underline disabled:opacity-50 disabled:no-underline flex items-center gap-1"
                  title="Copy to clipboard"
                >
                  {copied ? <CheckCircle2 className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  Copy Results
                </button>
                <button
                  onClick={handleDownload}
                  disabled={!output}
                  className="text-[10px] text-gray-400 hover:text-white disabled:opacity-50 flex items-center gap-1 transition-colors"
                  title="Download file"
                >
                  <Download className="h-3 w-3" />
                  Download
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden relative">
              {error ? (
                <div className="absolute inset-0 p-6 text-red-400 overflow-auto bg-red-950/20 font-mono text-xs">
                  <h4 className="font-bold mb-2">Error Processing Input</h4>
                  <pre className="whitespace-pre-wrap">{error}</pre>
                </div>
              ) : (
                <Editor
                  height="100%"
                  defaultLanguage={tool.outputLanguage}
                  language={tool.outputLanguage}
                  value={output}
                  theme="vs-dark"
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 13,
                    wordWrap: 'on',
                    padding: { top: 16 },
                    scrollBeyondLastLine: false,
                  }}
                />
              )}
            </div>
            <div className="px-4 py-2 bg-[#141414] border-t border-[#262626] flex gap-4">
              <button onClick={handleCopy} disabled={!output} className="text-[10px] text-gray-500 hover:text-white transition-colors disabled:opacity-50">Copy Output</button>
              <button onClick={handleDownload} disabled={!output} className="text-[10px] text-gray-500 hover:text-white transition-colors disabled:opacity-50">Download File</button>
            </div>
          </div>
        </div>
        
        {/* Feature Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 shrink-0">
          <div className="bg-[#111] border border-[#222] p-3 rounded-lg">
            <span className="text-[10px] text-gray-500 block">TOTAL JOBS</span>
            <span className="text-lg font-bold text-white">1.2M+</span>
          </div>
          <div className="bg-[#111] border border-[#222] p-3 rounded-lg">
            <span className="text-[10px] text-gray-500 block">PRIVACY RATING</span>
            <span className="text-lg font-bold text-green-500">A+ (LOCAL)</span>
          </div>
          <div className="bg-[#111] border border-[#222] p-3 rounded-lg">
            <span className="text-[10px] text-gray-500 block">AVERAGE LATENCY</span>
            <span className="text-lg font-bold text-white">0.02ms</span>
          </div>
          <div className="bg-[#111] border border-[#222] p-3 rounded-lg flex items-center justify-center border-dashed border-gray-700">
            <span className="text-[10px] text-gray-600">SPONSORED PLACEMENT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
