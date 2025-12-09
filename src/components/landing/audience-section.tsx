
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, Briefcase, Scale } from "lucide-react";

export function AudienceSection() {
    const profiles = [
        {
            icon: <User className="w-8 h-8 text-primary mb-4" />,
            title: "Advogado Autônomo",
            description: "Economize horas de pesquisa diária. Tenha um assistente virtual que filtra o que é relevante para seus casos."
        },
        {
            icon: <Briefcase className="w-8 h-8 text-primary mb-4" />,
            title: "Pequenos e Médios Escritórios",
            description: "Mantenha toda a equipe atualizada sobre mudanças legislativas e jurisprudenciais sem precisar de um departamento de research."
        },
        {
            icon: <Scale className="w-8 h-8 text-primary mb-4" />,
            title: "Especialistas",
            description: "Receba apenas conteúdo de alta profundidade técnica na sua área (Tributário, Penal, etc.), sem notícias genéricas."
        }
    ];

    return (
        <section className="py-24 bg-background">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Para quem é o Jusbrasil News?</h2>
                    <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                        Desenvolvido para profissionais que valorizam seu tempo.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {profiles.map((profile, index) => (
                        <Card key={index} className="border-muted bg-muted/20 hover:bg-muted/40 transition-colors">
                            <CardHeader>
                                {profile.icon}
                                <CardTitle>{profile.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base text-muted-foreground">
                                    {profile.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
