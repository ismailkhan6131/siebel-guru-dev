
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import ArchitectureStack from './components/ArchitectureStack';
import InteractiveVisualizer from './components/InteractiveVisualizer';
import WorkflowLab from './components/WorkflowLab';
import ConfigurationShowcase from './components/ConfigurationShowcase';
import OpenUIShowcase from './components/OpenUIShowcase';
import OpenUIInteractiveLab from './components/OpenUIInteractiveLab';
import OpenUICheatSheet from './components/OpenUICheatSheet';
import EScriptLab from './components/EScriptLab';
import NewsSection from './components/NewsSection';
import { geminiService } from './services/geminiService';
import { Message } from './types';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Welcome to your command center. I'm the Siebel Guru. From deep architectural shifts to low-level eScript debugging, I possess the knowledge to guide your implementation. What complex challenge shall we solve today?" }
  ]);
  const [recentQueries, setRecentQueries] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const addRecentQuery = (query: string) => {
    setRecentQueries(prev => {
      const filtered = prev.filter(q => q.toLowerCase() !== query.toLowerCase());
      return [query, ...filtered].slice(0, 5);
    });
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;
    
    addRecentQuery(text);
    setMessages(prev => [...prev, { role: 'user', text }]);
    setIsTyping(true);

    const history: { role: 'user' | 'model', parts: [{ text: string }] }[] = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }] as [{ text: string }]
    }));

    const response = await geminiService.sendMessage(text, history);
    
    setMessages(prev => [...prev, { 
      role: 'model', 
      text: response.text,
      citations: response.citations 
    }]);
    setIsTyping(false);
  };

  const triggerSearchResponse = useCallback(async (query: string) => {
    if (isTyping) return;
    handleSendMessage(`Search and explain: ${query}`);
  }, [isTyping]);

  useEffect(() => {
    const handleSiebelSearch = (event: any) => {
      const query = event.detail;
      triggerSearchResponse(query);
    };

    window.addEventListener('siebelSearch', handleSiebelSearch);
    return () => window.removeEventListener('siebelSearch', handleSiebelSearch);
  }, [triggerSearchResponse]);

  const handleSend = () => {
    handleSendMessage(input);
    setInput('');
  };

  const quickActions = [
    { label: 'eScript Logic', prompt: 'Generate a high-performance Siebel eScript Business Service method template with error handling and BC nulling.' },
    { label: 'Config Blueprint', prompt: 'Show a typical XML configuration for a Siebel List Applet including List Columns and Web Template Items.' },
    { label: 'Open UI Physical Model', prompt: 'Show an example of a Siebel Open UI Physical Model script with standard lifecycle methods (Init, Setup, ShowSelection).' },
    { label: 'Exception Handling', prompt: 'Show the XML structure for a Workflow Error Exception step and explain how to catch specific SBL errors.' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="siebel-gradient py-24 px-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-500 rounded-full blur-3xl animate-pulse delay-700"></div>
          </div>
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-200 text-xs font-black uppercase tracking-[0.3em] mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Definitive CRM Expertise
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-none">
              The <span className="text-[#C74634]">Siebel Guru</span> Experience
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
              Architectural clarity, declarative precision, and engineering excellence. The ultimate ecosystem for modern Siebel developers.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href="#architecture" 
                className="group relative flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-bold transition-all hover:bg-white/20 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95"
              >
                <div className="flex flex-col items-center justify-center">
                  <svg className="w-5 h-5 text-blue-300 group-hover:translate-y-[-2px] transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[10px] uppercase tracking-widest opacity-60 font-black">Engineering</span>
                  <span className="text-lg">Object Hierarchy</span>
                </div>
              </a>

              <a href="#expert" className="flex items-center gap-3 bg-[#C74634] text-white px-8 py-4 rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg hover:shadow-2xl active:scale-95">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <span className="text-lg">Ask the Guru</span>
              </a>
            </div>
          </div>
        </section>

        {/* Architecture Section */}
        <section id="architecture" className="py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">The Siebel Stack</h2>
              <p className="text-slate-600 text-lg">Mastering the 4-layer architecture ensures scalable, upgrade-safe customizations.</p>
            </div>
            <ArchitectureStack />
            
            <div className="mt-20">
              <InteractiveVisualizer />
            </div>
          </div>
        </section>

        {/* XML Showcase Section */}
        <section id="xml-showcase" className="py-24 px-4 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Metadata Blueprint</h2>
              <p className="text-slate-600 text-lg">Definitive XML structures for mission-critical Repository objects.</p>
            </div>
            <ConfigurationShowcase />
          </div>
        </section>

        {/* EScript Section */}
        <section id="scripting" className="py-24 px-4 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 text-center md:text-left">
              <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Scripting Excellence</h2>
              <p className="text-slate-600 text-lg max-w-2xl">
                Deploy high-performance eScript patterns that minimize overhead and maximize stability.
              </p>
            </div>
            <EScriptLab onAskGuru={handleSendMessage} />
          </div>
        </section>

        {/* Open UI Section */}
        <section id="open-ui" className="py-24 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Open UI Framework</h2>
              <p className="text-slate-600 text-lg">Transform the presentation layer with advanced PM/PR logic and modern theming.</p>
            </div>
            <OpenUIShowcase />
            
            <div className="mt-16">
              <div className="mb-8">
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Interactive UX Lab</h3>
                <p className="text-slate-500">Real-time simulation of client-side event propagation and DOM rendering.</p>
              </div>
              <OpenUIInteractiveLab />
            </div>

            <div className="mt-16">
              <OpenUICheatSheet />
            </div>
          </div>
        </section>

        {/* Workflow Lab Section */}
        <section id="workflows" className="py-24 px-4 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Workflow Orchestration</h2>
              <p className="text-slate-600 text-lg">Visually model complex business processes with full snap-to-grid declarative logic.</p>
            </div>
            <WorkflowLab onAskGuru={(query) => {
               window.location.hash = '#expert';
               handleSendMessage(query);
            }} />
          </div>
        </section>

        {/* News Section */}
        <NewsSection />

        {/* Guru Section */}
        <section id="expert" className="py-24 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block bg-indigo-100 text-[#003580] px-4 py-1 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-4">
                Guru Neural Link
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">The Siebel Guru</h2>
              <p className="text-slate-600">Definitive intelligence on eScript, Tools configuration, and Architecture patterns.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar Controls */}
              <div className="w-full md:w-72 flex flex-col gap-6">
                 {/* Connection Status Badge */}
                 <div className="p-4 rounded-2xl border flex items-center gap-3 shadow-sm transition-all bg-indigo-50 border-indigo-200">
                    <div className="w-3 h-3 rounded-full animate-pulse bg-indigo-600"></div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest text-indigo-700">
                        Guru Online
                      </span>
                      <span className="text-[10px] text-indigo-500 font-medium">Ready for Consultation</span>
                    </div>
                 </div>

                 {/* Quick Snippets Actions */}
                 <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Guru Shortcuts</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {quickActions.map((action, i) => (
                        <button
                          key={i}
                          onClick={() => handleSendMessage(action.prompt)}
                          disabled={isTyping}
                          className="text-left p-3 rounded-xl border border-slate-100 hover:border-[#003580] hover:bg-[#003580]/5 transition-all group disabled:opacity-50"
                        >
                          <div className="text-xs font-bold text-slate-700 group-hover:text-[#003580]">{action.label}</div>
                          <div className="text-[9px] text-slate-400 mt-1">Deploy proven patterns</div>
                        </button>
                      ))}
                    </div>
                 </div>

                 <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Consultation History</h3>
                    <div className="space-y-2">
                      {recentQueries.length === 0 ? (
                        <p className="text-xs text-slate-400 italic">No recent sessions</p>
                      ) : (
                        recentQueries.map((q, i) => (
                          <button
                            key={i}
                            onClick={() => handleSendMessage(q)}
                            disabled={isTyping}
                            className="w-full text-left text-sm text-slate-600 hover:text-[#003580] hover:bg-slate-50 p-2 rounded-lg transition-all line-clamp-2"
                          >
                            {q}
                          </button>
                        ))
                      )}
                    </div>
                 </div>
              </div>

              {/* Chat Container */}
              <div className="flex-1 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col h-[700px] relative">
                <div className="bg-slate-900 p-4 flex items-center justify-between z-10">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${isTyping ? 'bg-amber-500 animate-pulse' : 'bg-[#C74634]'}`}></div>
                    <span className="text-white font-black text-xs tracking-[0.2em] uppercase">
                      Principal Architect Interface
                    </span>
                  </div>
                </div>

                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#f8fafc]">
                  {messages.map((m, i) => {
                    const hasSblError = m.text.toUpperCase().includes('SBL-');
                    return (
                      <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                        <div className={`max-w-[95%] p-5 rounded-2xl shadow-sm border ${
                          m.role === 'user' 
                            ? 'bg-[#003580] text-white border-transparent rounded-tr-none' 
                            : 'bg-white border-slate-200 text-slate-800 rounded-tl-none'
                        }`}>
                          <div className="prose prose-slate prose-sm max-w-none prose-headings:text-slate-900 prose-strong:text-slate-900 prose-p:leading-relaxed whitespace-pre-wrap">
                            {m.text}
                          </div>
                        </div>
                        
                        {m.role === 'model' && m.citations && m.citations.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2 max-w-[95%]">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block w-full mb-1">
                              {hasSblError ? '🛠️ Guru Troubleshooting Sources:' : 'Guru Architectural References:'}
                            </span>
                            {m.citations.map((cite, idx) => (
                              <a 
                                key={idx} 
                                href={cite.uri} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`text-[10px] bg-white border text-indigo-600 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shadow-sm font-bold ${
                                  hasSblError ? 'border-amber-200 hover:border-amber-400' : 'border-slate-200 hover:border-indigo-400'
                                }`}
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                {cite.title}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none flex flex-col gap-3 shadow-sm min-w-[200px]">
                        <div className="flex gap-1.5">
                          <div className="w-2 h-2 bg-[#C74634] rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-[#C74634] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                          <div className="w-2 h-2 bg-[#C74634] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">The Guru is thinking...</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 bg-white border-t border-slate-100">
                  <div className="relative flex items-center gap-3">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      disabled={isTyping}
                      placeholder="Consult the Guru on eScript, XML metadata, or SBL error codes..."
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#003580] transition-all disabled:opacity-50 text-sm shadow-inner"
                    />
                    <button
                      onClick={handleSend}
                      disabled={isTyping || !input.trim()}
                      className="bg-[#003580] text-white p-4 rounded-2xl hover:bg-blue-800 transition-all disabled:opacity-50 shadow-lg hover:shadow-blue-200 active:scale-95"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-2 text-center">
                    <span className="text-[10px] text-slate-400 font-medium tracking-tight">Direct consult via neural link (Gemini 3 Pro) active.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#003580] to-[#1e40af] rounded flex items-center justify-center text-white">
                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4L5 20H19L12 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-white font-black text-xl tracking-tight">Siebel Guru</span>
            </div>
            <p className="text-sm max-w-sm leading-relaxed">
              The premium independent resource for professional Oracle Siebel CRM developers. Engineered for architectural excellence.
            </p>
            <div className="mt-6 pt-6 border-t border-slate-800">
               <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] block mb-2">Author Credit</span>
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">PI</div>
                 <div>
                   <div className="text-slate-200 font-bold text-sm">Patan Ismail</div>
                   <div className="text-xs text-slate-500">Principal Consultant - Siebel Systems</div>
                 </div>
               </div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 tracking-tight uppercase text-xs">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline decoration-dotted">Guru Billing Link</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bookshelf Index</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Open UI Framework</a></li>
              <li><a href="#" className="hover:text-white transition-colors">IP2024 Changelog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 tracking-tight uppercase text-xs">Community</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Siebel Hub</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Oracle Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Open Source Siebel</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs">
          <p>© {new Date().getFullYear()} Siebel Guru. All trademarks are the property of their respective owners (Oracle Corp). Non-official technical guide.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
