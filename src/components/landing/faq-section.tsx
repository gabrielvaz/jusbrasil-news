
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
    const faqs = [
        {
            question: "Com que frequência recebo as notícias?",
            answer: "Você escolhe! Pode receber um resumo diário com as principais atualizações ou um compilado semanal. É possível alterar essa frequência a qualquer momento."
        },
        {
            question: "Posso mudar minhas áreas de interesse depois?",
            answer: "Sim. No rodapé de cada e-mail há um link para gerenciar suas preferências. Você pode adicionar ou remover áreas e subtemas quando quiser."
        },
        {
            question: "O serviço é gratuito?",
            answer: "Sim, o plano básico de curadoria é 100% gratuito. Nosso objetivo é facilitar o acesso à informação jurídica relevante."
        },
        {
            question: "As fontes são confiáveis?",
            answer: "Utilizamos apenas fontes oficiais (Tribunais, Diários Oficiais) e portais jurídicos reconhecidos pelo mercado (Migalhas, ConJur, JOTA, etc.)."
        },
        {
            question: "Consigo cancelar quando quiser?",
            answer: "Sim, o cancelamento é imediato através do link de unsubscribe presente em todos os nossos e-mails."
        }
    ];

    return (
        <section className="py-24 bg-muted/30">
            <div className="container px-4 md:px-6 mx-auto max-w-3xl">
                <div className="text-center mb-12 space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Perguntas Frequentes</h2>
                </div>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left text-lg font-medium">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
