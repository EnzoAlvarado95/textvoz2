import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TextVoz',
  description: 'Aplicación para crear notas con texto y voz',
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6366f1" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}