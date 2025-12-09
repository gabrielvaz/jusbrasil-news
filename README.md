# Jusbrasil News

**Jusbrasil News** é uma plataforma de curadoria informativa automática para advogados e profissionais do direito. O sistema permite que o usuário selecione suas áreas de atuação (ex: Direito Civil, Trabalhista, Penal), temas de interesse e fontes preferidas para receber resumos diários ou semanais personalizados.

## 🚀 Tecnologias Utilizadas

- **Next.js 16 (App Router)**: Framework React moderno para renderização híbrida e rotas.
- **TypeScript**: Superset JavaScript para tipagem estática e segurança.
- **Tailwind CSS v4**: Framework de estilização utilitária (com tema "Farol" customizado).
- **Framer Motion**: Biblioteca para animações fluidas e transições.
- **ShadCN UI**: Componentes de interface reutilizáveis e acessíveis.
- **Lucide React**: Ícones modernos e leves.

## ✨ Funcionalidades

- **Landing Page Otimizada**:
    - **Hero Section**: Proposta de valor clara com design moderno.
    - **Logos das Fontes**: Exibição das principais fontes monitoradas (Migalhas, JOTA, STJ, etc.).
    - **Testimonials**: Prova social de outros advogados.
    - **Animações**: Efeito de fundo "Aurora" e transições suaves.
- **Onboarding Interativo (Wizard)**:
    - Fluxo passo-a-passo para personalização da curadoria.
    - Seleção de Áreas de Atuação e Temas Específicos.
    - Escolha de Fontes e Frequência de envio.
    - **Preview de Email**: Visualização imediata de como será o resumo recebido.

## 🎨 Design System (Farol)

O projeto segue uma estética minimalista e profissional, inspirada e adaptada do **Farol Design System**:
- **Tipografia**: Uso global da fonte **Inter**.
- **Cores**: Paleta sóbria com destaque para o verde institucional (#007A5F).
- **Consistência**: Buttons, Cards e Inputs padronizados.

## 🛠️ Como Rodar Localmente

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/gabrielvaz/jusbrasil-news.git
    cd jusbrasil-news
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    pnpm install
    ```

3.  **Rode o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  Acesse `http://localhost:3000` no seu navegador.

## 📦 Deploy no Vercel

O projeto está otimizado para deploy na Vercel:

1.  Faça o push para o GitHub.
2.  Importe o projeto no dashboard da Vercel.
3.  As configurações de build (`next build`) são detectadas automaticamente.
4.  Pronto! Seu projeto estará online.

---

Desenvolvido como parte de um projeto de refinamento de UX para a Jusbrasil.
