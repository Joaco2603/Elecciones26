import React from 'react';
import { PartyCard } from './PartyCard';

const parties = [
  {
    name: "Partido Liberación Nacional",
    acronym: "PLN",
    color: "#009640",
    description: "Partido de centro-izquierda fundado en 1951. Históricamente uno de los partidos más grandes del país.",
    candidate: "Por definir"
  },
  {
    name: "Partido Unidad Social Cristiana",
    acronym: "PUSC",
    color: "#183084",
    description: "Partido de centro-derecha, fundado en 1983. Promueve la economía social de mercado.",
    candidate: "Por definir"
  },
  {
    name: "Partido Progreso Social Democrático",
    acronym: "PPSD",
    color: "#005c5e",
    description: "Partido político costarricense fundado en 2018. Actualmente en el gobierno.",
    candidate: "Por definir"
  },
  {
    name: "Frente Amplio",
    acronym: "FA",
    color: "#ffed00",
    description: "Partido de izquierda, ecologista y socialista democrático.",
    candidate: "Por definir"
  },
  {
    name: "Partido Liberal Progresista",
    acronym: "PLP",
    color: "#ff6600",
    description: "Partido de derecha liberal, enfocado en la reducción del estado y libre mercado.",
    candidate: "Por definir"
  },
  {
    name: "Nueva República",
    acronym: "PNR",
    color: "#00458c",
    description: "Partido conservador de derecha, con énfasis en valores cristianos.",
    candidate: "Por definir"
  }
];

export const PartyGrid = () => {
  return (
    <section className="container mx-auto px-4 py-16 md:px-6">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Partidos Políticos</h2>
        <p className="mt-4 text-lg text-slate-600">Explora la información detallada de cada agrupación política.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {parties.map((party) => (
          <PartyCard key={party.acronym} {...party} />
        ))}
      </div>
    </section>
  );
};
