"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="btn-secondary !px-4 !py-2.5 text-sm">
      <Printer className="w-4 h-4" aria-hidden="true" />
      Print
    </button>
  );
}
