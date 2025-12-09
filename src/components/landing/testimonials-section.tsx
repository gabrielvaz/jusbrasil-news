"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const testimonials = [
    {
        name: "Dra. Ana Paula",
        role: "Advogada Trabalhista",
        initials: "AP",
        content:
            "O Jusbrasil News mudou minha rotina. Recebo apenas o que é relevante para meus processos, sem perder tempo procurando.",
    },
    {
        name: "Dr. Carlos Mendes",
        role: "Sócio Sênior",
        initials: "CM",
        content:
            "A curadoria é excelente. As fontes são super confiáveis e o resumo diário me ajuda a me manter atualizado rapidamente.",
    },
    {
        name: "Mariana Silva",
        role: "Advogada Autônoma",
        initials: "MS",
        content:
            "Simples e direto ao ponto. Configurei minhas áreas e pronto. Recomendo para todo colega que quer otimizar tempo.",
    },
];

export function TestimonialsSection() {
    return (
        <section className="w-full py-20 bg-muted/30">
            <div className="container px-4 md:px-6 mx-auto">
                <h2 className="text-3xl font-bold text-center tracking-tighter sm:text-4xl md:text-5xl mb-12">
                    O que dizem nossos assinantes
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="border-none shadow-sm bg-background">
                            <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                <Avatar>
                                    <AvatarImage src="" />
                                    <AvatarFallback>{testimonial.initials}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <p className="text-sm font-medium leading-none">
                                        {testimonial.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
