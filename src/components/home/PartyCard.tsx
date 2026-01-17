import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';

interface PartyCardProps {
  name: string;
  acronym: string;
  color: string;
  description: string;
  candidate: string;
}

export const PartyCard: React.FC<PartyCardProps> = ({ name, acronym, color, description, candidate }) => {
  return (
    <Card className="overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className={`h-2 w-full`} style={{ backgroundColor: color }}></div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-700`}>
              {acronym.substring(0, 2)}
            </div>
            <div>
              <CardTitle className="text-lg">{name}</CardTitle>
              <span className="text-sm font-medium text-slate-500">{acronym}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-slate-600 line-clamp-3">
            {description}
          </p>
          <div className="rounded-lg bg-slate-50 p-3">
            <span className="block text-xs font-medium text-slate-500 uppercase">Candidato Presidencial</span>
            <span className="font-medium text-slate-900">{candidate}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-slate-100 bg-slate-50/50">
        <Button variant="ghost" className="w-full justify-between text-blue-600 hover:text-blue-700">
          Ver Plan de Gobierno
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Button>
      </CardFooter>
    </Card>
  );
};
