"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full border border-dark-300 px-4 py-2.5 text-sm font-semibold text-dark-700 hover:border-primary-500 hover:text-primary-600 transition-colors">
      <Printer className="w-4 h-4" aria-hidden="true" />
      Print
    </button>
  );
}
