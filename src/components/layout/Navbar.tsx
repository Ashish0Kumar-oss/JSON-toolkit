import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FileJson, Code, ArrowRightLeft, Menu, X, Github, Search } from 'lucide-react';
import { cn } from '../../lib/utils';
import { tools } from '../../lib/tools';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showResults, setShowResults] = React.useState(false);
  const navigate = useNavigate();

  const filteredTools = searchQuery
    ? tools.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const handleSearchSelect = (toolId: string) => {
    navigate(`/tool/${toolId}`);
    setSearchQuery('');
    setShowResults(false);
    setIsOpen(false);
  };

  return (
    <nav className="flex h-14 items-center justify-between px-6 border-b border-[#262626] bg-[#0A0A0A]/80 backdrop-blur-md z-50 sticky top-0 w-full">
      <div className="flex w-full mx-auto max-w-7xl items-center justify-between relative">
        <div className="flex items-center gap-8">
          <NavLink to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 border-2 border-black rotate-45"></div>
            </div>
            <span className="font-bold tracking-tight text-white text-lg">JSONToolkit</span>
          </NavLink>
          
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-400 font-medium">
            <NavLink to="/" className={({isActive}) => cn("hover:text-white transition-colors", isActive ? "text-white" : "")}>
              Home
            </NavLink>
            <div className="group relative">
              <button className="hover:text-white transition-colors flex items-center gap-1 py-4">
                JSON Tools
              </button>
              <div className="absolute left-0 top-full hidden w-52 rounded-md border border-[#333] bg-[#171717] p-2 shadow-xl group-hover:block z-50">
                {tools.filter(t => t.category === 'JSON').map(t => (
                  <NavLink key={t.id} to={`/tool/${t.id}`} className="block rounded-md px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                    {t.name}
                  </NavLink>
                ))}
              </div>
            </div>
            <div className="group relative">
              <button className="hover:text-white transition-colors flex items-center gap-1 py-4">
                XML Tools
              </button>
              <div className="absolute left-0 top-full hidden w-52 rounded-md border border-[#333] bg-[#171717] p-2 shadow-xl group-hover:block z-50">
                {tools.filter(t => t.category === 'XML').map(t => (
                  <NavLink key={t.id} to={`/tool/${t.id}`} className="block rounded-md px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                    {t.name}
                  </NavLink>
                ))}
              </div>
            </div>
            <NavLink to="/about" className={({isActive}) => cn("hover:text-white transition-colors", isActive ? "text-white" : "")}>
              About
            </NavLink>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Functional Search Input */}
          <div className="relative flex items-center">
            <span className="absolute left-3 text-gray-500">
              <Search className="h-3.5 w-3.5" />
            </span>
            <input 
              type="text" 
              placeholder="Search tools..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              className="bg-[#171717] border border-[#333] rounded-md pl-9 pr-4 py-1.5 text-xs w-40 sm:w-48 focus:outline-none focus:border-white text-white transition-all focus:ring-1 focus:ring-white/20" 
            />
            {showResults && filteredTools.length > 0 && (
              <div className="absolute top-full right-0 mt-2 w-64 rounded-md border border-[#333] bg-[#171717] p-2 shadow-2xl z-50 max-h-60 overflow-y-auto">
                <p className="text-[10px] uppercase font-bold text-gray-500 px-3 py-1 border-b border-[#262626] mb-1">Suggested Tools</p>
                {filteredTools.map(t => (
                  <button
                    key={t.id}
                    onClick={() => handleSearchSelect(t.id)}
                    className="w-full text-left rounded-md px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors block"
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors hidden sm:block">
            <Github className="h-4 w-4" />
          </a>
          
          <button className="md:hidden p-2 text-gray-400 hover:text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 w-full border-b border-[#262626] bg-[#0A0A0A] p-4 md:hidden flex flex-col gap-2 z-50 max-h-[80vh] overflow-y-auto">
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-3 mb-1">Navigation</div>
          <NavLink to="/" onClick={() => setIsOpen(false)} className="block rounded-md px-3 py-2 text-sm text-gray-400 hover:bg-white/5 hover:text-white">
            Home
          </NavLink>
          <NavLink to="/about" onClick={() => setIsOpen(false)} className="block rounded-md px-3 py-2 text-sm text-gray-400 hover:bg-white/5 hover:text-white">
            About Us
          </NavLink>
          
          <div className="border-t border-[#262626] my-2"></div>
          
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-3 mb-1">JSON Tools</div>
          {tools.filter(t => t.category === 'JSON').map(t => (
            <NavLink key={t.id} to={`/tool/${t.id}`} onClick={() => setIsOpen(false)} className="block rounded-md px-3 py-2 text-xs text-gray-400 hover:bg-white/5 hover:text-white">
              {t.name}
            </NavLink>
          ))}

          <div className="border-t border-[#262626] my-2"></div>

          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-3 mb-1">XML Tools</div>
          {tools.filter(t => t.category === 'XML').map(t => (
            <NavLink key={t.id} to={`/tool/${t.id}`} onClick={() => setIsOpen(false)} className="block rounded-md px-3 py-2 text-xs text-gray-400 hover:bg-white/5 hover:text-white">
              {t.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
