import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="border-t border-blue-100 bg-slate-50">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-600 text-white">
                <span className="text-xs font-bold">CR</span>
              </div>
              <span className="text-lg font-bold text-slate-900">Elecciones 2026</span>
            </div>
            <p className="text-sm text-slate-500">
              Plataforma informativa neutral sobre el proceso electoral de Costa Rica 2026.
              Información verificada y accesible para todos los ciudadanos.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Plataforma</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="#" className="hover:text-blue-600">Inicio</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Buscador IA</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Partidos Políticos</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Calendario Electoral</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Recursos</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="#" className="hover:text-blue-600">TSE</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Reglamento</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Datos Abiertos</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Prensa</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Legal</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="#" className="hover:text-blue-600">Privacidad</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Términos de Uso</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Cookies</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-blue-100 pt-8 text-center text-sm text-slate-500">
          © 2026 Elecciones CR. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};
