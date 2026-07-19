import React from 'react';
import { Link } from 'react-router-dom';
import { tools } from '../lib/tools';
import { Code, FileJson, CheckCircle, ArrowRight, Zap, Shield, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export function Home() {
  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl mb-6"
          >
            The Ultimate Developer <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Toolkit for JSON & XML
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto max-w-2xl text-lg text-gray-400 mb-10"
          >
            Format, validate, parse, and convert JSON and XML instantly. Free, entirely client-side, and designed with a premium experience for modern developers.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/tool/json-formatter" className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-sm font-medium text-black shadow transition-colors hover:bg-gray-200">
              Format JSON Now
            </Link>
            <Link to="/tool/xml-formatter" className="inline-flex h-12 items-center justify-center rounded-lg border border-[#333] bg-[#0A0A0A] px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#1A1A1A]">
              Explore XML Tools
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-[#262626] bg-[#0A0A0A] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white">Why developers love JSONToolkit</h2>
            <p className="mt-4 text-gray-400">Everything you need, running lightning fast in your browser.</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "Built with React and Vite. Zero server roundtrips means instant formatting." },
              { icon: Shield, title: "100% Private", desc: "Your data never leaves your browser. No databases, no external APIs." },
              { icon: Globe, title: "Works Offline", desc: "Install as a PWA and use all our tools anywhere, even without internet." }
            ].map((f, i) => (
              <div key={i} className="rounded-2xl border border-[#262626] bg-[#0F0F0F] p-8 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#1A1A1A]">
                  <f.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{f.title}</h3>
                <p className="text-sm text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tool Grid Section */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white">Popular Tools</h2>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map(tool => (
              <Link key={tool.id} to={`/tool/${tool.id}`} className="group relative rounded-xl border border-[#262626] bg-[#0F0F0F] p-6 transition-all hover:border-white hover:shadow-lg">
                <h3 className="mb-2 text-lg font-semibold text-white group-hover:text-white flex items-center gap-2">
                  {tool.name}
                </h3>
                <p className="text-sm text-gray-400">
                  {tool.description}
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                  Try it out <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
