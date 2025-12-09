
"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type FormData = {
    email: string;
    areas: string[];
    themes: Record<string, string[]>;
    sources: string[];
    frequency: "daily" | "weekly";
};

const AREAS = [
    "Direito Civil",
    "Direito Trabalhista",
    "Direito Tributário",
    "Direito Penal",
    "Direito Previdenciário",
    "Direito do Consumidor",
    "Direito Empresarial",
    "Direito Administrativo",
    "Direito Constitucional",
    "Direito de Família",
    "Direito Ambiental",
    "Direito Digital"
];

const THEMES_BY_AREA: Record<string, string[]> = {
    "Direito Civil": ["Contratos", "Responsabilidade Civil", "Sucessões", "Obrigações"],
    "Direito Trabalhista": ["Reforma Trabalhista", "Jurisprudência TST", "Acordos Coletivos", "Direito Sindical"],
    "Direito Tributário": ["Reforma Tributária", "ICMS", "Imposto de Renda", "Planejamento Tributário", "CARF"],
    "Direito Penal": ["Processo Penal", "Crimes de Colarinho Branco", "Execução Penal", "Tribunal do Júri"],
    "Direito Previdenciário": ["Reforma da Previdência", "Benefícios", "BPC/LOAS"],
    "Direito do Consumidor": ["Superendividamento", "Planos de Saúde", "Comércio Eletrônico"],
    "Direito Empresarial": ["Falências e Recuperação", "Societário", "Propriedade Intelectual"],
    // Default fallback
    "default": ["Jurisprudência Recente", "Doutrina", "Legislação"]
};

const SOURCES = [
    "Migalhas",
    "JOTA",
    "ConJur",
    "Âmbito Jurídico",
    "STF (Supremo Tribunal Federal)",
    "STJ (Superior Tribunal de Justiça)",
    "TST (Tribunal Superior do Trabalho)",
    "Diários Oficiais"
];

export function WizardForm() {
    const [step, setStep] = useState(1);
    const [data, setData] = useState<FormData>({
        email: "",
        areas: [],
        themes: {},
        sources: [],
        frequency: "weekly"
    });

    const [submitted, setSubmitted] = useState(false);

    const totalSteps = 5;
    const progress = (step / totalSteps) * 100;

    const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    const toggleArea = (area: string) => {
        setData(prev => {
            const newAreas = prev.areas.includes(area)
                ? prev.areas.filter(a => a !== area)
                : [...prev.areas, area];
            return { ...prev, areas: newAreas };
        });
    };

    const toggleTheme = (area: string, theme: string) => {
        setData(prev => {
            const currentThemes = prev.themes[area] || [];
            const newThemes = currentThemes.includes(theme)
                ? currentThemes.filter(t => t !== theme)
                : [...currentThemes, theme];
            return { ...prev, themes: { ...prev.themes, [area]: newThemes } };
        });
    };

    const toggleSource = (source: string) => {
        setData(prev => {
            const newSources = prev.sources.includes(source)
                ? prev.sources.filter(s => s !== source)
                : [...prev.sources, source];
            return { ...prev, sources: newSources };
        });
    };

    if (submitted) {
        return <EmailPreview data={data} />;
    }

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium text-muted-foreground">
                    <span>Passo {step} de {totalSteps}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
            </div>

            <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                    {/* Step 1: Email */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                        >
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold">Vamos começar. Qual é o seu e-mail?</h2>
                                <p className="text-muted-foreground">É onde você receberá sua curadoria personalizada.</p>
                            </div>
                            <div className="pt-4">
                                <Label htmlFor="email" className="sr-only">E-mail</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="seunome@advocacia.com.br"
                                    className="h-14 text-lg"
                                    value={data.email}
                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                />
                                <p className="text-sm text-muted-foreground mt-2">
                                    Não enviaremos spam. Apenas o conteúdo que você escolher.
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Areas */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                        >
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold">Quais são suas áreas de atuação?</h2>
                                <p className="text-muted-foreground">Selecione todas que se aplicam.</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                {AREAS.map((area) => (
                                    <div
                                        key={area}
                                        className={`flex items-center space-x-3 border p-4 rounded-lg cursor-pointer transition-all ${data.areas.includes(area) ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:bg-muted/50'}`}
                                        onClick={() => toggleArea(area)}
                                    >
                                        <Checkbox
                                            checked={data.areas.includes(area)}
                                            onCheckedChange={() => toggleArea(area)}
                                        />
                                        <Label className="font-medium cursor-pointer flex-1">{area}</Label>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Themes */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold">Temas específicos</h2>
                                <p className="text-muted-foreground">Refine sua curadoria dentro de cada área selecionada.</p>
                            </div>
                            <div className="space-y-6">
                                {data.areas.length === 0 ? (
                                    <div className="text-center p-8 border border-dashed rounded-lg text-muted-foreground">
                                        Nenhuma área selecionada no passo anterior.
                                    </div>
                                ) : (
                                    data.areas.map((area) => (
                                        <div key={area} className="space-y-3">
                                            <h3 className="font-semibold text-lg">{area}</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                {(THEMES_BY_AREA[area] || THEMES_BY_AREA["default"]).map((theme) => (
                                                    <div
                                                        key={`${area}-${theme}`}
                                                        className={`flex items-center space-x-2 border p-3 rounded-md cursor-pointer text-sm ${data.themes[area]?.includes(theme) ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'}`}
                                                        onClick={() => toggleTheme(area, theme)}
                                                    >
                                                        <Checkbox
                                                            checked={data.themes[area]?.includes(theme)}
                                                            onCheckedChange={() => toggleTheme(area, theme)}
                                                        />
                                                        <span>{theme}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 4: Sources */}
                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                        >
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold">Suas fontes preferidas</h2>
                                <p className="text-muted-foreground">Escolha de onde você quer receber as notícias.</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                {SOURCES.map((source) => (
                                    <div
                                        key={source}
                                        className={`flex items-center space-x-3 border p-4 rounded-lg cursor-pointer transition-all ${data.sources.includes(source) ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:bg-muted/50'}`}
                                        onClick={() => toggleSource(source)}
                                    >
                                        <Checkbox
                                            checked={data.sources.includes(source)}
                                            onCheckedChange={() => toggleSource(source)}
                                        />
                                        <Label className="font-medium cursor-pointer flex-1">{source}</Label>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 5: Frequency & Confirmation */}
                    {step === 5 && (
                        <motion.div
                            key="step5"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold">Frequência de envio</h2>
                                <p className="text-muted-foreground">Como você prefere receber seu resumo?</p>
                            </div>

                            <RadioGroup
                                value={data.frequency}
                                onValueChange={(val: "daily" | "weekly") => setData({ ...data, frequency: val })}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                            >
                                <label className={`flex flex-col items-start gap-2 border p-6 rounded-xl cursor-pointer hover:bg-muted/50 ${data.frequency === 'daily' ? 'border-primary ring-1 ring-primary bg-primary/5' : ''}`}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="daily" id="daily" />
                                        <span className="font-bold text-lg">Diário</span>
                                    </div>
                                    <span className="text-muted-foreground pl-6">Resumo objetivo toda manhã com o que é essencial para começar o dia.</span>
                                </label>
                                <label className={`flex flex-col items-start gap-2 border p-6 rounded-xl cursor-pointer hover:bg-muted/50 ${data.frequency === 'weekly' ? 'border-primary ring-1 ring-primary bg-primary/5' : ''}`}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="weekly" id="weekly" />
                                        <span className="font-bold text-lg">Semanal</span>
                                    </div>
                                    <span className="text-muted-foreground pl-6">Compilado completo toda sexta-feira com os destaques da semana.</span>
                                </label>
                            </RadioGroup>

                            <div className="pt-6 border-t mt-6">
                                <h3 className="font-semibold mb-4">Resumo das suas preferências:</h3>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex justify-between">
                                        <span>E-mail:</span>
                                        <span className="font-medium text-foreground">{data.email}</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Áreas:</span>
                                        <span className="font-medium text-foreground">{data.areas.join(", ")}</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Fontes:</span>
                                        <span className="font-medium text-foreground">{data.sources.join(", ")}</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Frequência:</span>
                                        <span className="font-medium text-foreground uppercase">{data.frequency === 'daily' ? 'Diário' : 'Semanal'}</span>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="flex justify-between pt-8 border-t">
                {!submitted && (
                    <>
                        <Button
                            variant="outline"
                            onClick={prevStep}
                            disabled={step === 1}
                            className="gap-2"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Voltar
                        </Button>

                        {step < totalSteps ? (
                            <Button onClick={nextStep} className="gap-2 px-8">
                                Próximo
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        ) : (
                            <Button onClick={() => setSubmitted(true)} className="gap-2 px-8 bg-green-600 hover:bg-green-700 text-white">
                                Finalizar cadastro
                                <Check className="w-4 h-4" />
                            </Button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

function EmailPreview({ data }: { data: FormData }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl mx-auto"
        >
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                    <Check className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Tudo pronto!</h2>
                <p className="text-muted-foreground">
                    Você receberá seu primeiro resumo {data.frequency === 'daily' ? 'amanhã' : 'na próxima semana'}.
                    <br />
                    Veja abaixo uma prévia do que esperar na sua caixa de entrada:
                </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 border rounded-xl shadow-lg overflow-hidden">
                {/* Email Header Mock */}
                <div className="bg-zinc-100 dark:bg-zinc-800 p-4 border-b flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">JB</div>
                    <div>
                        <div className="font-semibold text-sm">Jusbrasil News</div>
                        <div className="text-xs text-muted-foreground">Para: {data.email}</div>
                    </div>
                    <div className="ml-auto text-xs text-muted-foreground">Agora</div>
                </div>

                {/* Email Body */}
                <div className="p-8 space-y-6">
                    <div className="text-center pb-6 border-b">
                        <h1 className="text-xl font-bold font-serif text-zinc-800 dark:text-zinc-100 mb-2">
                            Seu Resumo Jurídico {data.frequency === 'daily' ? 'Diário' : 'Semanal'}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            As principais atualizações em {data.areas.slice(0, 2).join(" e ")}.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {/* Mock Article 1 */}
                        <div className="group cursor-pointer">
                            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                                {data.areas[0] || "Geral"} • STJ
                            </span>
                            <h3 className="text-lg font-semibold mt-1 group-hover:text-blue-600 transition-colors">
                                Nova decisão sobre prescrição intercorrente impacta processos trabalhistas
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                                A 3ª Turma uniformizou o entendimento sobre o marco inicial da contagem do prazo, estabelecendo que...
                            </p>
                        </div>

                        {/* Mock Article 2 */}
                        <div className="group cursor-pointer pt-4 border-t border-dashed">
                            <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">
                                {data.areas[1] || "Jurisprudência"} • Migalhas
                            </span>
                            <h3 className="text-lg font-semibold mt-1 group-hover:text-blue-600 transition-colors">
                                Avanços na regulamentação da IA no Judiciário
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                                Conselho Nacional de Justiça debate novas diretrizes para uso de ferramentas generativas em sentenças...
                            </p>
                        </div>
                    </div>

                    <div className="pt-6 border-t text-center">
                        <Button variant="outline" size="sm" className="rounded-full">
                            Ler resumo completo
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-8">
                <Link href="/">
                    <Button variant="ghost" className="gap-2">
                        <ChevronLeft className="w-4 h-4" />
                        Voltar ao início
                    </Button>
                </Link>
            </div>
        </motion.div>
    );
}
