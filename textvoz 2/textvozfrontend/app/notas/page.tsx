'use client';

import { useEffect, useState } from 'react';
import { obtenerNotas } from '@/services/notas.service';
import NotaForm from './components/NotaForm';
import NotaList from './components/NotaList';
import { Nota } from '@/types/nota';

export default function NotasPage() {

   const [notas, setNotas] = useState<Nota[]>([]); 

  useEffect(() => {
    obtenerNotas().then(setNotas);
  }, []);

  return (
    <div>
      <h1>Mis Notas</h1>

      <NotaForm setNotas={setNotas} />
      <NotaList notas={notas} setNotas={setNotas} />

    </div>
  );
}