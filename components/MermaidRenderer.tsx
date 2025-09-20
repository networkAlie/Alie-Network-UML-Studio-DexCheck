
import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidRendererProps {
  code: string;
  onRender: (svg: string) => void;
}

const MermaidRenderer: React.FC<MermaidRendererProps> = ({ code, onRender }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    if (ref.current) {
      ref.current.innerHTML = '<div class="flex justify-center items-center p-8"><svg class="animate-spin h-8 w-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div>';
    }
    
    const id = `mermaid-graph-${Math.random().toString(36).substring(2, 9)}`;

    mermaid.render(id, code)
      .then(({ svg }) => {
        if (!active) return;
        if (ref.current) {
          ref.current.innerHTML = svg;
          onRender(svg);
        }
      })
      .catch((err) => {
        if (!active || !ref.current) return;
        const errorMessage = String(err).replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const errorCode = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        ref.current.innerHTML = `
          <div class="p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg">
            <h4 class="font-bold mb-2">Mermaid Render Error</h4>
            <pre class="text-sm whitespace-pre-wrap font-mono">${errorMessage}</pre>
            <hr class="my-2 border-red-200" />
            <h5 class="font-semibold mt-2">Code:</h5>
            <pre class="text-xs whitespace-pre-wrap font-mono mt-1 bg-red-100 p-2 rounded">${errorCode}</pre>
          </div>`;
        onRender('');
      });

    return () => {
      active = false;
    };
  }, [code, onRender]);

  return <div ref={ref} className="w-full min-h-[200px] overflow-auto" />;
};

export default MermaidRenderer;
