import React from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-slate-50 py-20 sm:py-32">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="relative container mx-auto px-4 text-center md:px-6">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              Tu guía inteligente para las <span className="text-blue-600">Elecciones 2026</span>
            </h1>
            <p className="text-lg text-slate-600">
              Pregunta lo que quieras sobre los partidos políticos, candidatos y propuestas de Costa Rica. 
              Nuestra IA analiza miles de documentos para darte respuestas veraces.
            </p>
          </div>

          <div className="mx-auto max-w-2xl">
            <div className="flex flex-col gap-4 sm:flex-row">
              <Input 
                placeholder="Ej: ¿Cuál es la propuesta de educación del PLN?" 
                className="h-12 text-lg shadow-sm"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                }
              />
              <Button size="lg" className="shrink-0">
                Buscar
              </Button>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-slate-500">
              <span>Tendencias:</span>
              <button className="rounded-full bg-blue-50 px-3 py-1 text-blue-600 hover:bg-blue-100">Impuestos</button>
              <button className="rounded-full bg-blue-50 px-3 py-1 text-blue-600 hover:bg-blue-100">Seguridad</button>
              <button className="rounded-full bg-blue-50 px-3 py-1 text-blue-600 hover:bg-blue-100">Infraestructura</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
