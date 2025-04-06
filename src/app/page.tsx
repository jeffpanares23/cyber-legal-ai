'use client';

import { ArrowRight } from 'lucide-react';
import Navbar from './components/Navbar';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-800 flex flex-col">
      <Navbar />
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 bg-gradient-to-br from-blue-50 to-indigo-100">
        <h1 className="text-5xl md:text-6xl font-bold text-indigo-700 mb-6">Cyberlegal.AI</h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
          Your AI-powered legal assistant for Philippine cyber law. Ask questions, get legal insights, and find relevant case references instantly.
        </p>
        <a href="/login" className="inline-flex items-center px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition font-medium shadow">
          Try It Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </a>
      </section>

      {/* Features */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Key Features</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">PH Jurisprudence Search</h3>
            <p className="text-gray-600">Search Philippine Supreme Court and Court of Appeals decisions related to cyber law.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">AI Legal Summaries</h3>
            <p className="text-gray-600">Understand complex decisions with plain-language AI summaries.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">US Law Fallback</h3>
            <p className="text-gray-600">No PH case found? Relevant US case will be referenced with clear disclaimer.</p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-gray-50 px-6 py-20">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold">How It Works</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <span className="text-4xl text-indigo-600 font-bold">1</span>
            <h3 className="text-xl font-semibold mt-4 mb-2">Ask a Legal Question</h3>
            <p className="text-gray-600">Type your cyber law-related query in natural language.</p>
          </div>
          <div>
            <span className="text-4xl text-indigo-600 font-bold">2</span>
            <h3 className="text-xl font-semibold mt-4 mb-2">AI Retrieves & Summarizes</h3>
            <p className="text-gray-600">It fetches Philippine cases and summarizes key points for you.</p>
          </div>
          <div>
            <span className="text-4xl text-indigo-600 font-bold">3</span>
            <h3 className="text-xl font-semibold mt-4 mb-2">Learn & Stay Informed</h3>
            <p className="text-gray-600">Get citations, understand implications, and make informed decisions.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white px-6 py-8 text-sm text-center">
        <p>© 2025 Cyberlegal.AI · All rights reserved.</p>
        {/* <p className="mt-2 text-gray-400">This platform provides AI-generated legal insights and is not a substitute for professional legal advice.</p> */}
      </footer>
    </main>
  );
}
