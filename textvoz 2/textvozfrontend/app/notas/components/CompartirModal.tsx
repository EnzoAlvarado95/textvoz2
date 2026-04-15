'use client';

import { useState } from 'react';
import { compartirNota } from '@/services/notascompartivas.service';

export default function CompartirModal({ notaId, onClose }: any) {

  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);

  async function enviar() {
    if (!correo.trim()) return;

    try {
      setLoading(true);
      await compartirNota(notaId, correo);
      setMensaje('✅ Compartido correctamente');
    } catch (err: any) {
      setMensaje('❌ Error al compartir');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white p-5 rounded shadow space-y-3 w-80">

        <h2>Compartir Nota</h2>

        <input
          type="email"
          value={correo}
          onChange={e => setCorreo(e.target.value)}
          placeholder="correo@ejemplo.com"
          className="border p-2 w-full"
        />

        {mensaje && <p>{mensaje}</p>}

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancelar</button>

          <button
            onClick={enviar}
            className="bg-indigo-600 text-white px-3"
          >
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </div>

      </div>

    </div>
  );
}