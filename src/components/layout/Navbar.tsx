import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-blue-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            CR
          </div>
          <span className="text-lg font-bold text-slate-900">Elecciones CR 2026</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
            Partidos
          </Link>
          <Link href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
            Candidatos
          </Link>
          <Link href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
            Estadísticas
          </Link>
          <Link href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
            ¿Cómo votar?
          </Link>
        </div>
      </div>
    </nav>
  );
};
