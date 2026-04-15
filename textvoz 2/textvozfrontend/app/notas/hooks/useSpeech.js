import { useRef } from "react";

export default function useSpeech(setTexto) {

  const recognitionRef = useRef(null);

  const iniciar = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "es-ES";
    recognition.continuous = true;

    recognition.onresult = (event) => {
      let textoNuevo = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        textoNuevo += event.results[i][0].transcript;
      }
      setTexto(prev => prev + textoNuevo);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const detener = () => {
    recognitionRef.current?.stop();
  };

  return { iniciar, detener };
}