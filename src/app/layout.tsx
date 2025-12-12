import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jusbrasil News - Sua curadoria jurídica personalizada",
  description: "Receba as notícias jurídicas que realmente importam. Personalize sua newsletter por área de atuação e fontes.",
  icons: {
    icon: "/icon.png",
  },
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
