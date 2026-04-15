'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function GrabarPage() {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [grabando, setGrabando] = useState(false);

  const iniciarGrabacion = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
      };

      mediaRecorder.start();
      setGrabando(true);

    } catch (error) {
      alert('No se pudo acceder al micrófono');
    }
  };

  const detenerGrabacion = () => {
    mediaRecorderRef.current?.stop();
    setGrabando(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-gradient-to-br from-slate-100 to-indigo-200
                    dark:from-slate-950 dark:to-indigo-950 px-4">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/80 dark:bg-white/10
                   backdrop-blur-xl rounded-2xl p-6
                   shadow-2xl space-y-6 text-center">

        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          🎙 Grabadora de Voz
        </h1>

        <div className="flex justify-center gap-4">

          <button
            onClick={iniciarGrabacion}
            disabled={grabando}
            className="bg-green-600 text-white px-5 py-2 rounded-lg
                       hover:bg-green-500 transition disabled:opacity-50">
            🎤 Iniciar
          </button>

          <button
            onClick={detenerGrabacion}
            disabled={!grabando}
            className="bg-red-600 text-white px-5 py-2 rounded-lg
                       hover:bg-red-500 transition disabled:opacity-50">
            ⏹ Detener
          </button>

        </div>

        {grabando && (
          <p className="text-red-500 animate-pulse">
            🔴 Grabando...
          </p>
        )}

        {audioURL && (
          <div className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              🎧 Escuchar grabación:
            </p>
            <audio controls src={audioURL} className="w-full" />
          </div>
        )}

      </motion.div>
    </div>
  );
}
