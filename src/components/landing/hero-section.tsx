"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ShieldCheck, Mail, Filter } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40 bg-background overflow-hidden flex flex-col items-center">
      {/* Background decoration (optional) */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      {/* Main Logo - 24px from top */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-6 left-0 right-0 flex justify-center z-20"
      >
        <Image
          src="/logo-jusbrasil.png"
          alt="Jusbrasil Logo"
          width={160}
          height={36}
          priority
          className="h-auto w-auto"
        />
      </motion.div>

      <div className="container px-4 md:px-6 mx-auto mt-12 md:mt-0">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-4 max-w-4xl flex flex-col items-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white"
            >
              Fique sempre à frente: receba as principais novidades da sua área do Direito.
            </motion.h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Escolha suas áreas de atuação, selecione o que interessa — nós entregamos o resto.
            </p>
          </div>
          <div className="space-x-4">
            <Link href="/onboarding">
              <Button size="lg" className="h-12 px-8 text-lg">
                Começar agora
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-16 text-sm text-muted-foreground max-w-5xl">
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-muted/50 transition-colors">
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <span className="font-medium">Curadoria por área de atuação</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-muted/50 transition-colors">
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="font-medium">Fontes confiáveis do mercado</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-muted/50 transition-colors">
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <span className="font-medium">Recebimento diário ou semanal</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-muted/50 transition-colors">
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <Filter className="w-6 h-6" />
              </div>
              <span className="font-medium">Sem ruído — só o que interessa</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
