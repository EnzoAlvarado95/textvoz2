'use client';

import { useState } from 'react';
import { login } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import ThemeToggle from '@/components/lightordark/page';
import Image from 'next/image';

export default function LoginPage() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  //const [dark, setDark] = useState(true);

  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(correo, password);
      if (res.token) {
        router.push('/notas');
      } else {
        setError('Correo o contraseña incorrectos');
      }
    } catch {
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  }

  return (
   // <div className={`${dark ? 'dark' : ''}`}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-indigo-200 dark:from-slate-950 dark:to-indigo-950 px-4 transition-colors">

        {/* Switch Dark / Light */}
       <ThemeToggle />
 <main style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>TextVoz</h1>

      <Image
        src="/logo.jpeg"
        alt="Logo TextVoz"
        width={150}
        height={150}
        priority
      />

    </main>

        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md rounded-2xl bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-2xl p-8 space-y-6"
        >
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
              Bienvenido
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Accede a tu cuenta
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

          <div className="space-y-2">
            <label className="text-sm text-gray-700 dark:text-gray-300">
              Correo
            </label>
            <input
              type="email"
              value={correo}
              onChange={e => setCorreo(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-700 dark:text-gray-300">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 dark:text-gray-400"
              >
                {showPassword ? 'Ocultar' : 'Ver'}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => router.push('/forgot-password')}
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white py-2 rounded-lg font-medium transition"
          >
            {loading && (
              <span className="h-4 w-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
            )}
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            ¿No tienes cuenta?{' '}
            <button
              type="button"
              onClick={() => router.push('/register')}
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
            >
              Crear cuenta
            </button>
          </div>
        </motion.form>
      </div>
   // </div>
  );
}
