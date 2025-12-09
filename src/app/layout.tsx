import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jusbrasil News",
  description: "Curadoria informativa automática para advogados.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className="font-sans antialiased"
      >
        <div className="aurora-bg" />
        {children}
      </body>
    </html>
  );
}
