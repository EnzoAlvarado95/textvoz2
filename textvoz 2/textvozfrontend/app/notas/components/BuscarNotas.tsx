'use client';

import { useState } from 'react';
import { buscarNotas } from '@/services/notas.service';

export default function BuscarNotas({ setNotas }: any) {

  const [busqueda, setBusqueda] = useState('');

  async function buscar() {
    if (!busqueda.trim()) return;
    const data = await buscarNotas(busqueda);
    setNotas(data);
  }

  return (
    <div className="flex gap-2">
      <input
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        placeholder="Buscar..."
        className="border p-2 w-full"
      />

      <button onClick={buscar} className="bg-indigo-600 text-white px-4">
        Buscar
      </button>
    </div>
  );
}