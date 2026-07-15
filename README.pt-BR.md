# SPA Candidato Prefeitura

*[Read in English](README.md)*

Um site de campanha de página única para um candidato fictício a prefeito — biografia, propostas, agenda de eventos e contato — construído pra praticar composição de componentes, integração de biblioteca de UI de terceiros, e design responsivo baseado em CSS no React, sem nenhum backend ou busca de dado envolvida.

Stack: **React 19, Material UI (MUI) + Emotion, React Icons, CSS Modules, Create React App**.

## Sumário

- [Problema](#problema)
- [Decisões de arquitetura](#decisões-de-arquitetura)
- [Rodando localmente](#rodando-localmente)
- [Estrutura do projeto](#estrutura-do-projeto)
- [O que eu melhoraria com mais tempo](#o-que-eu-melhoraria-com-mais-tempo)

## Problema

Diferente dos outros projetos React deste desenvolvedor, que praticam CRUD e consumo de API REST, este é puramente apresentacional: uma única página com rolagem que precisa parecer e funcionar como um site de campanha de verdade, se adaptar entre breakpoints de celular/tablet/desktop, e se sustentar visualmente sem nenhum dado dinâmico por trás. Essa é uma habilidade diferente — e igualmente necessária — de praticar: compor uma biblioteca de UI (MUI) com CSS customizado em vez de usar só uma ou só outra, estruturar layout com media queries CSS puras em vez de um framework de responsividade em nível de componente, e fazer uma página parecer acabada, não só funcional.

## Decisões de arquitetura

### 1. Navegação por âncora em página única, em vez de um roteador

Não existe `react-router-dom` neste projeto. As quatro seções (`Biografia`, `Proposta`, `Agenda`, contato no `Footer`) são todas renderizadas juntas em `App.js`, e a navegação do header são links de âncora simples:

```jsx
<ul className={styles.menuLista}>
    <li><a href="#biografia">Biografia</a></li>
    <li><a href="#proposta">Proposta</a></li>
    <li><a href="#agenda">Agenda</a></li>
    <li><a href="#contato">Contato</a></li>
</ul>
```

Cada seção tem um `id` correspondente (`id="biografia"`, `id="agenda"`, etc.), então a rolagem nativa por âncora do navegador faz todo o trabalho de navegação. Uma landing page de campanha é uma narrativa linear, feita pra ser lida de cima a baixo, não um conjunto de views independentes — um roteador adicionaria uma dependência e uma camada de indireção pra algo que o navegador já faz de graça.

### 2. Componentes MUI estilizados via `sx`, em camadas com CSS Modules, unificados por variáveis CSS

O layout estrutural, específico de cada componente (posicionamento, a timeline, o overlay do menu mobile) é escrito à mão num arquivo `.module.css` ao lado de cada componente. Elementos interativos/tipográficos (`Card`, `Button`, `IconButton`, `Typography`) vêm do MUI, estilizados inline através da prop `sx`, em vez do theme provider do MUI:

```jsx
<Button
    sx={{
        borderRadius: 7,
        fontWeight: 'bold',
        backgroundColor: 'var(--primary-color)',
        color: 'var(--background)',
    }}
    variant="contained"
>
    Fale Conosco
</Button>
```

O detalhe que amarra os dois sistemas de estilo: os valores em `sx` referenciam as mesmas variáveis CSS customizadas (`var(--primary-color)`, `var(--background)`) definidas uma única vez em `global.css`, em vez de duplicar códigos hexadecimais tanto nos arquivos CSS Modules quanto nas props `sx` do MUI. Mudar uma cor em um lugar só, e tanto o CSS escrito à mão quanto todo componente MUI refletem a mudança — incluindo um override de `prefers-color-scheme: dark` que inverte `--primary-color` e `--background` pra quem tem dark mode ativado no nível do sistema operacional, sem nenhuma lógica de dark mode em nível de componente.

### 3. Duas imagens pra dois breakpoints, com uma lição real de performance aprendida

A seção `Biografia` mostra um recorte de retrato diferente dependendo do tamanho de tela — um recorte mais alto e estreito pro layout de tablet (onde a foto fica ao lado da timeline) versus um recorte mais largo pro mobile (onde ela fica acima da timeline, largura total). Em vez de depender de `object-fit` pra forçar uma única imagem em duas proporções bem diferentes, duas imagens de origem separadas são usadas, alternadas via media queries CSS (`display: none` / `display: block` por breakpoint).

Este projeto também passou por uma correção real que vale documentar: as duas imagens eram, inicialmente, fotos de banco de imagem sem nenhuma otimização, direto da câmera (7030×4403 e 6799×5135, mais de 11MB cada). Como o CSS mostra ou esconde cada `<img>` em vez de removê-la do DOM, **as duas** imagens estavam sendo baixadas em todo carregamento de página, independente de qual estava de fato visível — mais de 20MB transferidos só por dois retratos que nunca renderizam com mais de 700px de largura. As duas imagens foram redimensionadas pra 1400px (cobrindo confortavelmente telas retina no tamanho real de exibição) e recomprimidas, cortando o tamanho combinado de ~23MB pra ~115KB. As duas imagens ainda são baixadas em todo carregamento — um elemento `<picture>` com `srcset` por breakpoint seria a correção arquiteturalmente correta — mas nos tamanhos atuais isso não é um problema na prática, enquanto nos tamanhos originais era um problema real e mensurável.

### 4. Menu mobile como um overlay controlado por estado

O menu hambúrguer não é só CSS — ele é sustentado por um único `useState`, com um overlay de tela cheia que fecha ao clicar, em camada abaixo do menu deslizante:

```jsx
const [menuAberto, setMenuAberto] = useState(false);
```
```jsx
{menuAberto && (
    <div className={styles.overlay} onClick={() => setMenuAberto(false)}></div>
)}
```

O overlay usa `backdrop-filter: blur(...)` em vez de uma cor semitransparente lisa, então o conteúdo da página atrás do menu aberto fica visivelmente desfocado, não só escurecido — um detalhe pequeno, mas que exige que o overlay seja um elemento real do DOM com seu próprio empilhamento de z-index, não só um truque de CSS `:focus`/`:target`.

### 5. Conteúdo como dado, mapeado pra JSX

As seis propostas de plataforma, seis eventos de agenda e quatro links sociais são todos definidos como arrays de objetos simples no topo dos respectivos componentes, depois renderizados com `.map(...)`:

```jsx
const propostas = [
    { id: 1, titulo: "Educação de Qualidade", descricao: "...", icone: <SchoolIcon /> },
    // ...
];
```

Isso mantém o próprio JSX livre de seis blocos `<Card>` quase idênticos, copiados e colados com texto diferente — adicionar uma sétima proposta ou evento significa adicionar um objeto ao array, não duplicar marcação.

## Rodando localmente

> As instruções assumem **macOS** com terminal.

Este é um projeto totalmente estático, só front-end — não existe API, variável de ambiente, nem banco de dado nenhum pra configurar.

### Pré-requisitos

- **Node.js** (v18 ou superior recomendado) e npm instalados.

### 1. Clone o repositório

```bash
git clone https://github.com/gustavomoliveira/spa-candidato-prefeitura.git
cd spa-candidato-prefeitura
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Rode o app

```bash
npm start
```

Isso abre `http://localhost:3000` automaticamente.

### 4. Teste o layout responsivo

Abra o DevTools do navegador e ative o modo de dispositivo (ou só redimensione a janela) pra ver o layout mudar entre três breakpoints: mobile (padrão), tablet (768px–1199px) e desktop (1200px+) — a imagem e a direção do layout da seção `Biografia` mudam visivelmente em cada um. Teste o menu hambúrguer numa tela estreita pra ver o overlay desfocado.

### Abrindo no IntelliJ

Abra a pasta do projeto no IntelliJ (com o plugin de JavaScript/React habilitado, ou via WebStorm) — nenhuma variável de ambiente ou configuração de execução é necessária além do `npm start` padrão.

## Estrutura do projeto

```
spa-candidato-prefeitura/
├── package.json
├── public/
│   └── images/
│       ├── marco-madureira-retrato-mobile.jpg
│       └── marco-madureira-retrato-tablet.jpg
└── src/
    ├── App.js                          # renderiza as quatro seções em ordem
    ├── styles/
    │   └── global.css                  # variáveis CSS customizadas, override de dark mode
    └── components/
        ├── Header/
        │   ├── Header.jsx              # navegação, menu hambúrguer, overlay mobile
        │   └── Header.module.css
        ├── Biografia/
        │   ├── Biografia.jsx           # timeline + imagens de retrato responsivas
        │   └── Biografia.module.css
        ├── Proposta/
        │   ├── Proposta.jsx            # Cards do MUI mapeados a partir de um array de dados
        │   └── Proposta.module.css
        ├── Agenda/
        │   ├── Agenda.jsx              # cards de evento com formatação de data
        │   └── Agenda.module.css
        └── Footer/
            ├── Footer.jsx              # links sociais + informações de contato
            └── Footer.module.css
```

## O que eu melhoraria com mais tempo

- **Servir imagens responsivas de forma correta, em vez de enviar as duas.** A correção de compressão resolveu o problema imediato de performance, mas a abordagem de base — as duas imagens sempre baixadas, uma escondida via CSS — ainda não é o padrão correto. Um elemento `<picture>` com `srcset`/`sizes` (ou no mínimo `loading="lazy"`) faria o navegador baixar só a imagem que ele de fato vai exibir.
- **Nenhuma cobertura de teste.** Nada aqui é coberto por React Testing Library — o estado de abrir/fechar do menu mobile e o comportamento de fechar ao clicar no overlay seriam as primeiras coisas a valer teste, já que são a única lógica interativa real numa página por outro lado estática.
- **A seção de contato é só links, não um formulário.** O `Footer` hoje oferece links `mailto:` e `tel:`; um formulário de contato de verdade, com validação (consistente com a abordagem de `react-hook-form` usada nos outros projetos deste desenvolvedor), seria um próximo passo natural.
- **Nenhum destaque de seção ativa na navegação.** Clicar num link de navegação rola até a seção certa, mas nada indica qual seção está visível no momento durante a rolagem — um comportamento de scroll-spy completaria a experiência de navegação.
