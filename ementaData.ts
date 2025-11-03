import type { EmentaData } from './types.ts';

export const ementaData: EmentaData = {
    header: {
        government: "GOVERNO DO ESTADO DO RIO DE JANEIRO",
        city: "PREFEITURA MUNICIPAL DE MARICÁ",
        department: "SECRETARIA DE MUNICIPAL DE EDUCAÇÃO",
        school: "ESCOLA MUNICIPAL JOANA BENEDICTA RANGEL",
        axis: "EIXO III – ATIVIDADES ESPORTIVAS E MOTORAS",
        professor: "ANDRÉ BRITO",
        project: "PROJETO DE INICIAÇÃO AO XADREZ",
    },
    courseInfo: {
        name: "Curso de Xadrez – Nível Iniciante e Intermediário",
        targetAudience: "Iniciantes e jogadores com conhecimento básico que desejam aprimorar suas habilidades.",
        prerequisite: "Matriculado regularmente na Escola Joana Benedicta Rangel.",
        objective: "Capacitar os alunos a compreenderem os fundamentos do xadrez, desde os movimentos básicos até estratégias mais avançadas, permitindo que desenvolvam habilidades de raciocínio lógico, planejamento e tomada de decisão.",
    },
    modules: [
        {
            title: "Módulo 1: Fundamentos do Xadrez",
            topics: [
                { id: "1", title: "Movimentos e Capturas – Conhecendo as peças e como elas se movem (Peão, Torre e Cavalo)", observation: "Ensinar através do método global os movimentos do Peão, da Torre e do Cavalo, e atividades práticas (mini-partidas)." },
                { id: "1.1", title: "Movimentos e Capturas – Conhecendo as peças e como elas se movem (Bispo, Rei e Rainha)", observation: "Ensinar através do método global os movimentos do Bispo, Rei e Rainha, e atividades práticas (mini-partidas). Passar a montar o tabuleiro completo." },
                { id: "2", title: "Lances Especiais – Roque pequeno e Grande", observation: "Ensinar o Roque Pequeno e o Roque Maior. Lembrar das regras de que o Rei não pode estar em Xeque, não pode passar na linha de ataque de alguma peça adversária ao fazer o roque, e nem ele e a Torre podem ter sido movidos anteriormente." },
                { id: "2.1", title: "Lances Especiais – En Passant", observation: "Ensinar o En Passant: Se um peão avança duas casas a partir da sua posição inicial e passa por uma casa controlada por um peão adversário, este peão adversário tem a opção de capturá-lo como se o primeiro peão tivesse avançado apenas uma casa." },
                { id: "2.2", title: "Lances Especiais – Promoção", observation: "Ensinar que quando um peão chegar ao outro lado do tabuleiro (oitava fileira), ele deve ser promovido a outra peça (Dama, Torre, Bispo ou Cavalo) da mesma cor." },
                { id: "3", title: "Xeque e Xeque-Mate – Como identificar e finalizar uma partida", observation: "Ensinar que Xeque é uma jogada em que o Rei está em risco de ataque. Xeque-Mate é um Xeque do qual o Rei não pode escapar." },
                { id: "3.1", title: "Xeque e Xeque-Mate – Exercícios de ataque (finalização) e defesa (saída de xeque)", observation: "Dedicar duas aulas para exercícios práticos de Xeque e Xeque-Mate com montagem de posições estratégicas no tabuleiro." },
                { id: "4", title: "Rei Afogado – Compreensão de situações de empate", observation: "Ensinar que Rei Afogado é uma situação de empate que ocorre quando o jogador a mover não está em xeque mas não tem nenhum lance legal a fazer." },
                { id: "4.1", title: "Rei Afogado ou Xeque-Mate – Identificando as diferenças", observation: "Praticar exercícios contínuos para que os alunos possam identificar com clareza se uma posição é Xeque-Mate ou Rei Afogado." },
                { id: "5", title: "Notação Algébrica 1 – Introdução à anotação de partidas", observation: "A notação algébrica serve para registrar e comunicar lances de forma padronizada, permitindo que jogadores, treinadores e analistas estudem partidas, escrevam sequências de jogadas e revisem jogos históricos." },
                { id: "5.1", title: "Notação Algébrica 2 – Exercícios práticos e leitura de partidas", observation: "Cada casa do tabuleiro tem uma coordenada (a-h e 1-8). As peças são representadas por letras (R, D, T, B, C). Peões não têm letra. Praticar a leitura e escrita de lances simples, capturas (x), xeque (+) e xeque-mate (#)." },
                { id: "6", title: "Empates e Regras Práticas – Diferentes formas de empate no xadrez", observation: "Além do Rei Afogado, ensinar outros tipos de empate, como acordo mútuo, repetição tripla de posição e a regra dos 50 lances." },
                { id: "6.1", title: "Regra dos 50 lances", observation: "Se em 50 lances consecutivos não houver captura nem movimento de peão, um jogador pode reivindicar o empate. A contagem reinicia a cada captura ou movimento de peão." },
                { id: "6.2", title: "Repetição e Xeque Perpétuo", observation: "Se a mesma posição ocorrer três vezes na partida, um jogador pode reivindicar o empate. O xeque perpétuo é uma forma comum de forçar essa repetição." },
                { id: "7", title: "Ataque e Defesa – Princípios básicos da estratégia", observation: "Com o tabuleiro aberto e número igual de peças, os alunos devem visualizar possibilidades de ataques e defesas, entendendo a coordenação entre as peças." }
            ]
        },
        {
            title: "Módulo 2: Finais e Estratégias Básicas",
            topics: [
                { id: "1", title: "Mates Elementares – Escadinha e outros mates simples", observation: "Ensinar o mate da escadinha utilizando 1 torre e 1 dama, ou 2 torres, sempre levando o rei adversário para a borda do tabuleiro. Este é um xeque-mate básico e fundamental." },
                { id: "2", title: "Como Iniciar uma Partida – Conceitos básicos de abertura", observation: "Ensinar que a fase inicial da partida se chama abertura. Os objetivos principais são controlar o centro, desenvolver as peças e proteger o rei (geralmente com o roque)." },
                { id: "3", title: "Mate de Dama – Finalizações eficientes", observation: "Ensinar a técnica do mate com Rei e Dama contra Rei, mantendo a distância para não afogar o rei adversário e usando o próprio rei como peça de apoio." },
                { id: "4", title: "Esquemas de Mate - Parte 1 (Dama) – Padrões comuns", observation: "Estudar padrões de mate comuns envolvendo a Dama, como o 'Beijo da Morte', e como evitar que as peças centrais fiquem presas ou sem desenvolvimento." },
                { id: "5", title: "Mate de Torre – Técnica de finalização", observation: "Ensinar o mate com Rei e Torre contra Rei, e padrões como o 'mate do corredor' e o 'mate de escadinha' com torres." },
                { id: "6", title: "Esquemas de Mate - Parte 2 – Práticas avançadas", observation: "Analisar vários esquemas de mate táticos extraídos de partidas famosas, focando no reconhecimento de padrões." },
                { id: "7", title: "Mate com Par de Bispos – Técnicas específicas", observation: "Abordar a técnica para forçar o xeque-mate usando dois bispos, focando no padrão de levar o rei adversário para um dos cantos do tabuleiro." },
                { id: "8", title: "Esquemas de Mate - Parte 3 – Estudo aprofundado", observation: "Analisar posições complexas de xeque-mate e padrões táticos que surgem em partidas reais, incentivando o cálculo e a visualização." }
            ]
        },
        {
            title: "Módulo 3: Estratégias e Táticas",
            topics: [
                { id: "1", title: "Como Conseguir Vantagem Material – Estratégias para capturar peças com segurança", observation: "Ensinar o valor relativo das peças e a importância de calcular trocas favoráveis. Introduzir o conceito de 'peça solta' e como explorá-la." },
                { id: "2", title: "Ataque Duplo e Cravada – Importância da tática no jogo", observation: "Explicar e praticar os conceitos de ataque duplo (garfo) e cravada (absoluta e relativa) com exercícios práticos para identificação de padrões." },
                { id: "3", title: "A Cravada – Estudo detalhado e aplicações práticas", observation: "Aprofundar o estudo da cravada, mostrando como usá-la para ganhar material, restringir o adversário e criar temas de ataque." }
            ]
        }
    ],
    methodology: {
        title: "Metodologia",
        items: [
            { title: "Aulas Expositivas", description: "Demonstração prática dos conceitos com explicações claras e objetivas." },
            { title: "Exercícios Práticos", description: "Uso de tabuleiro físico e digital para a resolução de problemas e aplicação dos temas." },
            { title: "Análise de Partidas", description: "Estudo de partidas históricas para ilustrar estratégias e táticas." },
            { title: "Partidas Entre Alunos", description: "Prática constante com feedback individualizado para desenvolvimento." }
        ]
    },
    evaluation: {
        title: "Avaliação",
        items: [
            { title: "Participação Ativa", description: "Envolvimento e interesse demonstrado nas aulas e atividades propostas." },
            { title: "Registro de Partidas", description: "Uso correto e consistente da notação algébrica para registrar os próprios jogos." },
            { title: "Aplicação de Conceitos", description: "Capacidade de aplicar os conceitos de abertura, meio-jogo e final em suas partidas." },
            { title: "Partidas Simuladas", description: "Desempenho em desafios práticos e mini-torneios em sala de aula." }
        ]
    },
    didacticResources: {
        title: "Recursos Didáticos",
        items: [
            { title: "Tabuleiros e Peças", description: "Materiais físicos para a prática e visualização do jogo." },
            { title: "Softwares e Aplicativos", description: "Recursos digitais (Lichess, Chess.com) para aprendizado, análise e jogo." },
            { title: "Materiais Impresso e Digital", description: "Distribuição de materiais com teoria e exercícios para estudo." },
            { title: "Vídeos e Partidas Comentadas", description: "Análises de jogos de grandes mestres para inspiração e aprendizado." }
        ]
    },
    finalConsiderations: {
        title: "Considerações Finais",
        text: "Este curso visa não apenas ensinar as regras do xadrez, mas também desenvolver o pensamento estratégico dos alunos, tornando-os capazes de analisar partidas, criar planos e evoluir no jogo de forma consistente, promovendo o raciocínio lógico e a tomada de decisões."
    }
};
