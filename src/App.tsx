import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Home } from './pages/Home';
import { ToolPage } from './pages/ToolPage';
import { SimplePage } from './components/layout/SimplePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="tool/:id" element={<ToolPage />} />
          <Route path="tools" element={<Navigate to="/tool/json-formatter" replace />} />
          
          <Route path="about" element={
            <SimplePage title="About Us">
              <p>Welcome to JSONToolkit, the premium destination for developer utilities.</p>
              <p>Our mission is to provide lightning-fast, secure, and beautiful tools for developers to work with JSON and XML data without their data ever leaving their browser.</p>
            </SimplePage>
          } />
          
          <Route path="contact" element={
            <SimplePage title="Contact">
              <p>Have a question or feedback? We'd love to hear from you.</p>
              <form className="mt-8 space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input type="text" className="w-full bg-[#171717] border border-[#333] rounded-md p-2 text-sm focus:outline-none focus:border-white text-white transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input type="email" className="w-full bg-[#171717] border border-[#333] rounded-md p-2 text-sm focus:outline-none focus:border-white text-white transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea rows={4} className="w-full bg-[#171717] border border-[#333] rounded-md p-2 text-sm focus:outline-none focus:border-white text-white transition-all"></textarea>
                </div>
                <button type="button" className="rounded-md bg-white px-4 py-2 text-black hover:bg-gray-200 font-semibold transition-colors">
                  Send Message
                </button>
              </form>
            </SimplePage>
          } />

          <Route path="privacy" element={
            <SimplePage title="Privacy Policy">
              <h2>1. Data Collection</h2>
              <p>All processing is done completely locally in your browser. We do not store or transmit any of the data you enter into our tools.</p>
              <h2>2. Analytics</h2>
              <p>We use minimal analytics to understand how many people visit the site.</p>
            </SimplePage>
          } />

          <Route path="terms" element={
            <SimplePage title="Terms of Service">
              <p>By using JSONToolkit, you agree to our terms of service.</p>
              <p>The tools are provided "as is" without any warranty of any kind.</p>
            </SimplePage>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
