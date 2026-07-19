import React from 'react';
import { NavLink } from 'react-router-dom';
import { tools } from '../../lib/tools';
import { cn } from '../../lib/utils';
import { Code, FileJson, CheckCircle, Minimize, Minimize2, ArrowRightLeft } from 'lucide-react';

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'FileJson': return <FileJson className="h-4 w-4" />;
    case 'CheckCircle': return <CheckCircle className="h-4 w-4" />;
    case 'Minimize': return <Minimize className="h-4 w-4" />;
    case 'Minimize2': return <Minimize2 className="h-4 w-4" />;
    case 'Code': return <Code className="h-4 w-4" />;
    case 'ArrowRightLeft': return <ArrowRightLeft className="h-4 w-4" />;
    default: return <FileJson className="h-4 w-4" />;
  }
};

export function Sidebar() {
  const categories = ['JSON', 'XML', 'Converters'];

  return (
    <div className="w-64 flex-shrink-0 border-r border-[#262626] bg-transparent p-4 flex flex-col gap-6 hidden lg:flex overflow-y-auto">
      {categories.map(category => (
        <div key={category}>
          <h4 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-3">
            {category} Tools
          </h4>
          <div className="space-y-1">
            {tools.filter(t => t.category === category).map(tool => (
              <NavLink
                key={tool.id}
                to={`/tool/${tool.id}`}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm cursor-pointer transition-all",
                  isActive
                    ? "bg-white/5 text-white border border-white/10 shadow-sm"
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                )}
              >
                {getIcon(tool.icon)}
                {tool.name}
              </NavLink>
            ))}
          </div>
        </div>
      ))}
      <div className="mt-auto border-t border-[#262626] pt-4">
        <div className="bg-[#171717] p-3 rounded-lg border border-[#333]">
          <p className="text-[10px] text-gray-500 mb-1">OFFLINE MODE</p>
          <p className="text-[11px] text-white leading-tight">All processing happens in your browser. No data leaves your machine.</p>
        </div>
      </div>
    </div>
  );
}
