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
        <section className="w-full py-12 bg-muted/20">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col items-center justify-center space-y-8">
                    <h2 className="text-xl font-medium text-muted-foreground uppercase tracking-widest">
                        Monitoramos todas as fontes relevantes
                    </h2>
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
        </section>
    );
}
