import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NAPI Abelhas",
  description: "Sistema de Gestão de Amostras Apícolas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
