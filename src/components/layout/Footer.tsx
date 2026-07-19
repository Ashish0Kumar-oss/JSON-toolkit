import React from 'react';
import { NavLink } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-[#262626] bg-[#0A0A0A]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight mb-4 text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black">
                <span className="font-mono font-bold">{'{'}</span>
              </div>
              <span>JSONToolkit</span>
            </div>
            <p className="mt-4 text-sm text-gray-500 max-w-sm">
              Free, fast, and secure developer tools for JSON and XML formatting, parsing, and validation. Works entirely in your browser with zero data sent to servers.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Tools</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><NavLink to="/tool/json-formatter" className="hover:text-white transition-colors">JSON Formatter</NavLink></li>
              <li><NavLink to="/tool/json-validator" className="hover:text-white transition-colors">JSON Validator</NavLink></li>
              <li><NavLink to="/tool/xml-formatter" className="hover:text-white transition-colors">XML Formatter</NavLink></li>
              <li><NavLink to="/tool/json-to-xml" className="hover:text-white transition-colors">JSON to XML</NavLink></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><NavLink to="/privacy" className="hover:text-white transition-colors">Privacy Policy</NavLink></li>
              <li><NavLink to="/terms" className="hover:text-white transition-colors">Terms of Service</NavLink></li>
              <li><NavLink to="/about" className="hover:text-white transition-colors">About Us</NavLink></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-[#262626] pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} JSONToolkit. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Operational
            </div>
            <span>Designed for developers.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
