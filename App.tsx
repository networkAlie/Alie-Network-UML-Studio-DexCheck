
import React, { useState, useEffect } from 'react';
import mermaid from 'mermaid';
import { diagrams } from './constants';
import Sidebar from './components/Sidebar';
import MermaidRenderer from './components/MermaidRenderer';
import { copyToClipboard, downloadSvg } from './utils/helpers';

const initMermaid = (isDark: boolean) => {
  mermaid.initialize({
    startOnLoad: false,
    theme: isDark ? 'dark' : 'default',
    securityLevel: 'loose',
    flowchart: { htmlLabels: true, diagramPadding: 8 },
    sequence: { actorMargin: 30 },
  });
};

export default function App() {
  const [selectedDiagram, setSelectedDiagram] = useState(diagrams[0]);
  const [svgContent, setSvgContent] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [copyStatus, setCopyStatus] = useState('Copy Mermaid');

  useEffect(() => {
    // Check for user's system preference for dark mode
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    initMermaid(isDarkMode);
    // Force re-render of the current diagram when theme changes
    setSelectedDiagram(prev => ({...prev}));
  }, [isDarkMode]);

  const handleCopyToClipboard = () => {
    copyToClipboard(selectedDiagram.code).then(success => {
      if (success) {
        setCopyStatus('Copied!');
        setTimeout(() => setCopyStatus('Copy Mermaid'), 2000);
      }
    });
  };

  const handleDownload = () => {
    downloadSvg(selectedDiagram.title, svgContent);
  };
  
  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  
  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      <header className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">DexCheck UML Studio</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 hidden sm:block">Visualizing the architecture and features of the DexCheck AI platform.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="flex items-center justify-center w-10 h-10 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              title="Toggle dark mode"
            >
              <span className="sr-only">Toggle dark mode</span>
              {isDarkMode ? 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg> : 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 14.464A1 1 0 106.465 13.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1-1H3a1 1 0 110-2h1a1 1 0 011 1zm4.95-4.95a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
              }
            </button>
            <button
              onClick={handleCopyToClipboard}
              className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm font-medium shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-all w-32"
              title="Copy Mermaid code"
            >
              {copyStatus}
            </button>
            <button
              onClick={handleDownload}
              className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Export as SVG file"
              disabled={!svgContent}
            >
              Export SVG
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-6 p-4 md:flex-row sm:px-6 lg:px-8">
        <Sidebar items={diagrams} currentId={selectedDiagram.id} onSelect={(d) => setSelectedDiagram(d)} />

        <section className="flex w-full flex-col gap-4">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">Diagram</div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">{selectedDiagram.title}</h2>
            </div>
            <div className="p-4">
                <MermaidRenderer key={selectedDiagram.id + (isDarkMode ? '-dark': '-light')} code={selectedDiagram.code} onRender={setSvgContent} />
            </div>
          </div>

          <details className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
            <summary className="cursor-pointer p-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Show Mermaid Source Code
            </summary>
            <div className="border-t border-gray-200 dark:border-gray-800 p-4">
                <pre className="overflow-auto rounded-xl bg-gray-100 dark:bg-gray-950 p-3 text-xs leading-relaxed text-gray-800 dark:text-gray-200">{selectedDiagram.code}</pre>
            </div>
          </details>
        </section>
      </main>

      <footer className="mx-auto max-w-7xl px-4 py-8 text-center text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} DexCheck UML Studio. For illustrative purposes only. Always conduct your own research.
      </footer>
    </div>
  );
}
