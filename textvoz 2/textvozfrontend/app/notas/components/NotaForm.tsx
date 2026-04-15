'use client';

import { useState, useEffect } from 'react';
import { crearNota, obtenerNotas } from '@/services/notas.service';
import { db } from "@/lib/db";

export default function NotaForm({ setNotas }: any) {

  const [texto, setTexto] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ FORZAR CREACIÓN DE IndexedDB
  useEffect(() => {
    db.open();
  }, []);

  async function guardar() {
    if (!texto.trim()) return;

    setLoading(true);

    // 🟡 Guardar SIEMPRE en IndexedDB
    await db.table("notas").add({ texto });

    try {
      // 🟢 Intentar guardar en servidor
      await crearNota(texto);
    } catch {
      console.log("Sin internet → guardado local");
    }

    setTexto('');

    // 🔄 Obtener datos (online u offline)
    const data = await obtenerNotas().catch(async () => {
      return await db.table("notas").toArray();
    });

    setNotas(data);
    setLoading(false);
  }

  return (
    <div className="bg-white p-4 rounded shadow space-y-3">
      <textarea
        value={texto}
        onChange={e => setTexto(e.target.value)}
        placeholder="Escribe tu nota..."
        className="w-full border p-2 rounded"
      />

      <button
        onClick={guardar}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Guardando...' : 'Guardar'}
      </button>
    </div>
  );
}