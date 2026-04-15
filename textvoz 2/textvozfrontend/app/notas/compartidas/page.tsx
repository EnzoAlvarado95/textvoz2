'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { obtenerNotasCompartidas } from '@/services/notascompartivas.service';

interface NotaCompartida {
  id: number;
  texto: string;
  fecha: string;
  dueño: string;
}

export default function NotasCompartidasPage() {
  const [notas, setNotas] = useState<NotaCompartida[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerNotasCompartidas()
      .then(setNotas)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-200 dark:from-slate-950 dark:to-indigo-950 p-6">
      <h1 className="text-3xl font-semibold text-center mb-6 dark:text-white">
        Notas compartidas conmigo
      </h1>

      {loading && (
        <p className="text-center text-gray-500">Cargando...</p>
      )}

      {!loading && notas.length === 0 && (
        <p className="text-center text-gray-500">
          No tienes notas compartidas
        </p>
      )}

      <div className="max-w-3xl mx-auto grid gap-4">
        {notas.map((nota, i) => (
          <motion.div
            key={nota.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white/80 dark:bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-black/5 dark:border-white/10 shadow"
          >
            <p className="text-gray-800 dark:text-white">
              {nota.texto}
            </p>

            <div className="text-sm text-gray-500 mt-2">
              Compartida por: <b>{nota.dueño}</b>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
