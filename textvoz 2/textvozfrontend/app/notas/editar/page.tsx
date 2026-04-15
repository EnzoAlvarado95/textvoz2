'use client';

import { useEffect, useState } from 'react';
import { actualizarUsuario } from '@/services/auth.service';

export default function EditarPerfilPage() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [cel, setCel] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const [error, setError] = useState(false);

  // ✅ obtener userId SOLO en cliente
  useEffect(() => {
    const id = localStorage.getItem('userId');

    if (!id) {
      setError(true);
      return;
    }

    setUserId(Number(id));
  }, []);

  const guardarCambios = async () => {
    if (!userId) {
      setMensaje('❌ Usuario no autenticado');
      return;
    }

    if (!usuario && !password && !cel) {
      setMensaje('⚠️ Debes modificar al menos un campo');
      return;
    }

    try {
      setLoading(true);
      setMensaje('');

      await actualizarUsuario(userId, {
        usuario: usuario || undefined,
        password: password || undefined,
        cel: cel || undefined,
      });

      setMensaje('✅ Perfil actualizado correctamente');
      setPassword('');
    } catch (err: any) {
      setMensaje(`❌ ${err.message || 'Error inesperado'}`);
    } finally {
      setLoading(false);
    }
  };

  // 🛑 si no hay sesión
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <p>❌ No hay sesión activa. Inicia sesión.</p>
      </div>
    );
  }

  // ⏳ mientras carga userId
  if (userId === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        Cargando perfil...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900 flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8 w-full max-w-md space-y-4 text-white">

        <h1 className="text-2xl font-semibold text-center">
          Editar perfil
        </h1>

        <input
          value={usuario}
          onChange={e => setUsuario(e.target.value)}
          placeholder="Nuevo usuario"
          className="w-full p-3 rounded bg-slate-900 outline-none"
        />

        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Nueva contraseña"
          className="w-full p-3 rounded bg-slate-900 outline-none"
        />

        <input
          value={cel}
          onChange={e => setCel(e.target.value)}
          placeholder="Nuevo celular"
          className="w-full p-3 rounded bg-slate-900 outline-none"
        />

        {mensaje && (
          <p className="text-center text-sm opacity-90">{mensaje}</p>
        )}

        <button
          onClick={guardarCambios}
          disabled={loading}
          className="w-full bg-indigo-600 py-3 rounded-xl font-medium hover:bg-indigo-500 transition disabled:opacity-60"
        >
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>
    </main>
  );
}
