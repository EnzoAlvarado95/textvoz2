'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import ThemeToggle from '@/components/lightordark/page';
import { apiFetch } from '@/utils/api';

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    usuario: '',
    correo: '',
    password: '',
    cel: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [aceptaAviso, setAceptaAviso] = useState(false);
  const [mostrarAviso, setMostrarAviso] = useState(false);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Error al registrar');
      } else {
        router.push('/login');
      }
    } catch {
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen flex items-center justify-center
        bg-gradient-to-br from-slate-100 to-indigo-200
        dark:from-slate-950 dark:to-indigo-950
        transition-colors px-4
      "
    >
      <ThemeToggle />

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="
          w-full max-w-md rounded-2xl
          bg-white/80 dark:bg-white/10
          backdrop-blur-xl
          border border-black/5 dark:border-white/10
          shadow-2xl p-8 space-y-5
        "
      >
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Crear cuenta
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Regístrate para continuar
          </p>
        </div>

        {/* Error elegante */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-red-500 bg-red-500/10 rounded-lg px-3 py-2"
          >
            {error}
          </motion.div>
        )}

        <input
          name="usuario"
          placeholder="Usuario"
          required
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg
            bg-white dark:bg-slate-900
            border border-gray-300 dark:border-slate-700
            text-gray-900 dark:text-white
            focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <input
          name="correo"
          type="email"
          placeholder="Correo"
          required
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg
            bg-white dark:bg-slate-900
            border border-gray-300 dark:border-slate-700
            text-gray-900 dark:text-white
            focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          required
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg
            bg-white dark:bg-slate-900
            border border-gray-300 dark:border-slate-700
            text-gray-900 dark:text-white
            focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <input
          name="cel"
          placeholder="Celular (opcional)"
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg
            bg-white dark:bg-slate-900
            border border-gray-300 dark:border-slate-700
            text-gray-900 dark:text-white
            focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">

  <div className="flex items-start gap-2">
    <input
      type="checkbox"
      checked={aceptaAviso}
      onChange={(e) => setAceptaAviso(e.target.checked)}
      className="mt-1"
    />

    <span>
      Acepto el tratamiento de mis datos personales conforme al{" "}
      <button
        type="button"
        onClick={() => setMostrarAviso(!mostrarAviso)}
        className="text-indigo-600 dark:text-indigo-400 underline"
      >
        Aviso de Privacidad
      </button>
    </span>
  </div>

  {/* Aviso desplegable */}
  {mostrarAviso && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.3 }}
      className="bg-white/70 dark:bg-slate-800/70
                 border border-gray-300 dark:border-slate-700
                 rounded-lg p-4 text-xs leading-relaxed
                 max-h-40 overflow-y-auto"
    >
      <p>
        En cumplimiento con la Ley Federal de Protección de Datos Personales,
        informamos que los datos proporcionados (usuario, correo y número
        telefónico) serán utilizados únicamente para la creación y gestión
        de su cuenta dentro de la plataforma.
      </p>

      <p className="mt-2">
        Sus datos no serán compartidos con terceros y serán almacenados
        de forma segura. Puede solicitar la modificación o eliminación
        de su información en cualquier momento.
      </p>
    </motion.div>
  )}

</div>



        <button
  type="submit"
  disabled={loading || !aceptaAviso}
  className="
    w-full flex justify-center items-center gap-2
    bg-indigo-600 hover:bg-indigo-500
    disabled:opacity-60 disabled:cursor-not-allowed
    text-white py-2 rounded-lg font-medium transition
  "
>

          {loading && (
            <span className="h-4 w-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
          )}
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          ¿Ya tienes cuenta?{' '}
          <button
            type="button"
            onClick={() => router.push('/login')}
            className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
          >
            Iniciar sesión
          </button>
        </div>
      </motion.form>
    </div>
  );
}
