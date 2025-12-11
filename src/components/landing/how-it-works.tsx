
import { Target, Newspaper, Mail, ArrowRight } from "lucide-react";

export function HowItWorks() {
    const steps = [
        {
            icon: <Target className="w-12 h-12 text-primary mb-4" />,
            title: "1. Defina seus interesses",
            description: "Selecione suas áreas de atuação (Civil, Trabalhista, Tributário, etc.) e os temas específicos que importam para você."
        },
        {
            icon: <Newspaper className="w-12 h-12 text-primary mb-4" />,
            title: "2. Escolha suas fontes",
            description: "Indique de quais tribunais, portais de notícias e diários oficiais você deseja receber atualizações."
        },
        {
            icon: <Mail className="w-12 h-12 text-primary mb-4" />,
            title: "3. Receba por e-mail",
            description: "Diariamente ou semanalmente, entregamos um resumo curado direto na sua caixa de entrada. Sem spam, sem ruído."
        }
    ];

    return (
        <section className="py-24 bg-muted/40">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Como funciona</h2>
                    <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                        Simples, direto e personalizado para a sua rotina.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connecting lines for desktop (optional decorative) */}
                    <div className="hidden md:block absolute top-[28%] left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -z-10" />

                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-6 bg-background rounded-2xl border shadow-sm relative z-10 hover:shadow-md transition-shadow">
                            <div className="bg-muted p-4 rounded-full mb-4 w-20 h-20 flex items-center justify-center">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
