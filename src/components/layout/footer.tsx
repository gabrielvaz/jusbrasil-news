
import Link from "next/link";

export function Footer() {
    return (
        <footer className="py-12 border-t bg-background">
            <div className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col gap-2 text-center md:text-left">
                    <span className="text-lg font-bold tracking-tight">Jusbrasil News</span>
                    <p className="text-sm text-muted-foreground">
                        Curadoria inteligente para advogados.
                    </p>
                </div>
                <div className="flex gap-6 text-sm text-muted-foreground">
                    <Link href="#" className="hover:text-foreground transition-colors">Termos de Uso</Link>
                    <Link href="#" className="hover:text-foreground transition-colors">Privacidade</Link>
                    <Link href="#" className="hover:text-foreground transition-colors">Contato</Link>
                </div>
                <div className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Jusbrasil News.
                </div>
            </div>
        </footer>
    );
}
