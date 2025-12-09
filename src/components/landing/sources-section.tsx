"use client";

import Image from "next/image";

const sources = [
    { name: "Migalhas", logo: "/logos/migalhas.png" },
    { name: "JOTA", logo: "/logos/jota.png" },
    { name: "ConJur", logo: "/logos/conjur.png" },
    { name: "STF", logo: "/logos/stf.png" },
    { name: "STJ", logo: "/logos/stj.png" },
];

export function SourcesSection() {
    return (
        <section className="w-full py-16 bg-muted/20 border-y">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col items-center justify-center space-y-10 text-center">

                    <div className="space-y-4 max-w-3xl">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary/90">
                            A melhor newsletter de Direito do Brasil, enviada para você de forma personalizada
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Esqueça os "clippings" genéricos. Aqui você define exatamente o que quer receber.
                        </p>
                    </div>

                    {/* Demonstration of Personalization */}
                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border text-muted-foreground">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            Suas Fontes
                        </div>
                        <div className="w-8 h-[1px] bg-border hidden md:block"></div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border text-muted-foreground">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            Sua Área de Atuação
                        </div>
                        <div className="w-8 h-[1px] bg-border hidden md:block"></div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border text-muted-foreground">
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                            Seus Assuntos
                        </div>
                    </div>

                    <div className="w-full max-w-5xl pt-8">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-8">
                            Monitoramos as principais fontes do mercado
                        </p>
                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                            {sources.map((source) => (
                                <div key={source.name} className="relative h-12 w-32 flex items-center justify-center">
                                    <Image
                                        src={source.logo}
                                        alt={source.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
