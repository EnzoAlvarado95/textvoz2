'use client';

import NotaItem from './NotaItem';

export default function NotaList({ notas, setNotas }: any) {

  // ✅ Validación segura
  if (!Array.isArray(notas) || notas.length === 0) {
    return <p>No hay notas</p>;
  }

  return (
    <div className="space-y-3">
      {notas.map((nota: any) => (
        <NotaItem key={nota.id} nota={nota} setNotas={setNotas} />
      ))}
    </div>
  );
}