//'use client';

//import { useEffect } from 'react';
//import { useRouter } from 'next/navigation';

//export default function HomePage() {
 // const router = useRouter();

//  useEffect(() => {
//    const token = localStorage.getItem('token');

 //   if (token) {
 //     router.push('/notas');   // Usuario logueado
 //   } else {
 //     router.push('/login');   // Usuario no logueado
 //   }
 // }, [router]);

 // return (
 //   <main style={{ padding: '2rem', textAlign: 'center' }}>
  //    <h1>TextVoz</h1>
  //    <p>Cargando...</p>
  //  </main>
//  );
//}

'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {

  const router = useRouter()

  useEffect(() => {

    const registerSW = async () => {
      if ("serviceWorker" in navigator) {
        try {
          const reg = await navigator.serviceWorker.register("/sw.js")
          console.log("SW registrado", reg)
        } catch (err) {
          console.log("Error SW", err)
        }
      }
    }

    registerSW()

    const token = localStorage.getItem("token")

    setTimeout(() => {
      if (token) {
        router.push("/notas")
      } else {
        router.push("/login")
      }
    }, 500)

  }, [router])

  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>TextVoz</h1>
      <p>Cargando...</p>
    </main>
  )
}
