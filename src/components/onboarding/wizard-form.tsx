
"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronRight, ChevronLeft, Check, Briefcase, Gavel, Scale, Building2, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type FormData = {
    email: string;
    occupation: string;
    occupationOther?: string;
    areas: string[];
    themes: Record<string, string[]>;
    sources: string[];
    frequency: "daily" | "weekly";
};

const OCCUPATIONS = [
    { id: "advogado", label: "Advogado", icon: Briefcase },
    { id: "juiz", label: "Juiz", icon: Gavel },
    { id: "promotor", label: "Promotor", icon: Scale },
    { id: "departamento", label: "Departamento Jurídico", icon: Building2 },
    { id: "outro", label: "Outro", icon: User },
];

type Source = {
    name: string;
    premium?: boolean;
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

const SOURCES: Source[] = [
    { name: "Curadoria Jusbrasil" },
    { name: "Migalhas" },
    { name: "Âmbito Jurídico" },
    { name: "Blog Flávio Tartuce" },
    { name: "IBDCivil" },
    { name: "Guia Trabalhista" },
    { name: "STF (Supremo Tribunal Federal)" },
    { name: "STJ (Superior Tribunal de Justiça)" },
    { name: "TST (Tribunal Superior do Trabalho)" },
    { name: "Diários Oficiais" },
    { name: "JOTA", premium: true },
    { name: "ConJur", premium: true },
    { name: "Revista LTr", premium: true }
];

export function WizardForm() {
    const [step, setStep] = useState(1);
    const [data, setData] = useState<FormData>({
        email: "",
        occupation: "",
        areas: [],
        themes: {},
        sources: [],
        frequency: "weekly"
    });

    const [submitted, setSubmitted] = useState(false);

    const totalSteps = 6;
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

    const toggleSource = (sourceName: string) => {
        setData(prev => {
            const newSources = prev.sources.includes(sourceName)
                ? prev.sources.filter(s => s !== sourceName)
                : [...prev.sources, sourceName];
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
                    {/* Step 1: Occupation */}
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
                                <h2 className="text-2xl font-bold">Qual é a sua ocupação atual?</h2>
                                <p className="text-muted-foreground">Isso nos ajuda a selecionar o conteúdo mais relevante para o seu dia a dia.</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                                {OCCUPATIONS.map((occ) => {
                                    const Icon = occ.icon;
                                    const isSelected = data.occupation === occ.id;
                                    return (
                                        <div
                                            key={occ.id}
                                            className={`flex flex-col items-center justify-center space-y-3 border p-6 rounded-lg cursor-pointer transition-all hover:bg-muted/50 ${isSelected ? 'border-primary bg-primary/5 ring-1 ring-primary' : ''}`}
                                            onClick={() => setData({ ...data, occupation: occ.id })}
                                        >
                                            <div className={`p-3 rounded-full ${isSelected ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <Label className="font-medium cursor-pointer text-center">{occ.label}</Label>
                                        </div>
                                    );
                                })}
                            </div>
                            {data.occupation === "outro" && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="pt-2"
                                >
                                    <Label htmlFor="other-occupation" className="sr-only">Especifique</Label>
                                    <Input
                                        id="other-occupation"
                                        placeholder="Digite sua ocupação..."
                                        value={data.occupationOther || ""}
                                        onChange={(e) => setData({ ...data, occupationOther: e.target.value })}
                                    />
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {/* Step 2: Email */}
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
                                <h2 className="text-2xl font-bold">Vamos continuar. Qual é o seu e-mail?</h2>
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

                    {/* Step 3: Areas */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                        >
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold">Quais áreas você tem interesse em ser informado na Jusbrasil News?</h2>
                                <p className="text-muted-foreground">Selecione as áreas para personalizar sua curadoria.</p>
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

                    {/* Step 4: Themes */}
                    {step === 4 && (
                        <motion.div
                            key="step4"
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

                    {/* Step 5: Sources */}
                    {step === 5 && (
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
                                        key={source.name}
                                        className={`flex items-center space-x-3 border p-4 rounded-lg cursor-pointer transition-all ${data.sources.includes(source.name) ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:bg-muted/50'}`}
                                        onClick={() => toggleSource(source.name)}
                                    >
                                        <Checkbox
                                            checked={data.sources.includes(source.name)}
                                            onCheckedChange={() => toggleSource(source.name)}
                                        />
                                        <Label className="font-medium cursor-pointer flex-1 flex items-center gap-2">
                                            {source.name}
                                            {source.premium && (
                                                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700 uppercase tracking-wide">
                                                    Premium
                                                </span>
                                            )}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 6: Frequency & Confirmation */}
                    {step === 6 && (
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
                            <Button onClick={() => setSubmitted(true)} className="gap-2 px-8">
                                Finalizar cadastro
                            </Button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

import confetti from "canvas-confetti";
import { useEffect, useMemo } from "react";
import { ExternalLink, CheckCircle } from "lucide-react";

function EmailPreview({ data }: { data: FormData }) {
    useEffect(() => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const random = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti({ ...defaults, particleCount, origin: { x: random(0.1, 0.3), y: random(0.1, 0.2) } });
            confetti({ ...defaults, particleCount, origin: { x: random(0.7, 0.9), y: random(0.1, 0.2) } });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    const emailProviderUrl = useMemo(() => {
        const email = data.email.toLowerCase();
        if (email.includes("@gmail.com")) return "https://mail.google.com/";
        if (email.includes("@outlook.com") || email.includes("@hotmail.com") || email.includes("@live.com")) return "https://outlook.live.com/";
        if (email.includes("@yahoo.com")) return "https://mail.yahoo.com/";
        return null;
    }, [data.email]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl mx-auto"
        >
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6">
                    <CheckCircle className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Bem vindo ao Jusbrasil News</h2>
                <div className="text-lg text-muted-foreground max-w-lg mx-auto space-y-2">
                    <p>
                        Você receberá seu resumo {data.frequency === 'daily' ? 'diário' : 'semanal'} com as principais novidades.
                    </p>
                    <p className="font-medium text-foreground bg-yellow-100 border-yellow-200 border p-3 rounded-md text-base mt-2">
                        ⚠️ Para começar a receber, você precisa confirmar sua inscrição clicando no link que enviamos para o seu e-mail.
                    </p>
                </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 border rounded-xl shadow-sm overflow-hidden p-6 md:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">E-mail Cadastrado</p>
                            <p className="text-lg font-semibold break-all">{data.email || "email@exemplo.com"}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Frequência</p>
                            <p className="text-lg font-semibold">{data.frequency === 'daily' ? 'Diário' : 'Semanal'}</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Áreas de Interesse</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {data.areas.length > 0 ? (
                                    data.areas.map(area => (
                                        <span key={area} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {area}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-gray-500">Nenhuma área selecionada</span>
                                )}
                            </div>
                        </div>
                        <div className="border-t pt-4 mt-2">
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Fontes Selecionadas</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {data.sources.length > 0 ? (
                                    data.sources.map(source => (
                                        <span key={source} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                            {source}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-gray-500">Nenhuma fonte selecionada</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {emailProviderUrl && (
                    <div className="pt-6 border-t flex justify-center">
                        <Link href={emailProviderUrl} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="gap-2 w-full md:w-auto" size="lg">
                                Ir para o E-mail
                                <ExternalLink className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                )}
            </div>

            <div className="flex justify-center mt-8">
                <Link href="https://www.jusbrasil.com.br">
                    <Button size="lg" className="px-12 h-14 text-lg">
                        Ir para o Jusbrasil
                    </Button>
                </Link>
            </div>
        </motion.div>
    );
}
