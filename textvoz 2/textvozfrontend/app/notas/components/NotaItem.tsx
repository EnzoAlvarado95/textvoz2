'use client';

import { useState } from 'react';
import { actualizarNota, eliminarNota, obtenerNotas } from '@/services/notas.service';
import CompartirModal from './CompartirModal';

export default function NotaItem({ nota, setNotas }: any) {

  const [editando, setEditando] = useState(false);
  const [texto, setTexto] = useState(nota.texto);
  const [mostrarModal, setMostrarModal] = useState(false);

  async function guardar() {
    await actualizarNota(nota.id, texto);
    setEditando(false);
    setNotas(await obtenerNotas());
  }

  async function borrar() {
    if (!confirm('¿Eliminar?')) return;
    await eliminarNota(nota.id);
    setNotas(await obtenerNotas());
  }

  return (
    <div className="border p-3 rounded bg-white shadow space-y-2">

      {editando ? (
        <textarea
          value={texto}
          onChange={e => setTexto(e.target.value)}
          className="w-full border p-2"
        />
      ) : (
        <p>{nota.texto}</p>
      )}

      <div className="flex gap-2">

        {editando ? (
          <>
            <button onClick={guardar} className="bg-green-600 text-white px-2">Guardar</button>
            <button onClick={() => setEditando(false)} className="bg-gray-400 px-2">Cancelar</button>
          </>
        ) : (
          <>
            <button onClick={() => setEditando(true)} className="bg-indigo-600 text-white px-2">Editar</button>
            <button onClick={borrar} className="bg-red-600 text-white px-2">Eliminar</button>
          </>
        )}

        <button
          onClick={() => setMostrarModal(true)}
          className="bg-blue-600 text-white px-2"
        >
          Compartir
        </button>
      </div>

      {mostrarModal && (
        <CompartirModal
          notaId={nota.id}
          onClose={() => setMostrarModal(false)}
        />
      )}

    </div>
  );
}