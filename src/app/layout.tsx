import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from '@clerk/localizations'
import { dark } from '@clerk/themes'
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Playlist",
  description:
    "Escucha tus musicas favoritas con un poco de estilo, desde tu PC o tu móvil. También incluye musicas online sin anuncios.",
};

const localization = {
  ...esES,
  signIn: {
    start:{
      title: "Iniciar sesión",
      subtitle: "Inicia sesión para continuar"
    }
  },
  signUp: {
    start: {
      title: "Registrarse",
      subtitle: "Registrate para continuar"
    }
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={
      localization
     }
    appearance={{baseTheme: dark}}>
      <html lang="es">
        <body
          className={`${inter.variable} ${montserrat.variable} antialiased`}
        >
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
