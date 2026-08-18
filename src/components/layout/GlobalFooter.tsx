import React from 'react';
import { Globe, Tag } from 'lucide-react';

export function GlobalFooter() {
  return (
    <footer className="h-6 bg-white border-t border-zinc-200 flex items-center justify-end px-4 text-xs text-zinc-500 shrink-0">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5" />
          IP: 127.0.0.1
        </span>
        <span className="flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5" />
          v1.0.0
        </span>
      </div>
    </footer>
  );
}
