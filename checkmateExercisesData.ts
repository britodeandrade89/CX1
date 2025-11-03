import type { CheckmateExercise } from './types';

// FIX: Changed all piece symbols to lowercase (e.g., wK -> wk) to match the PieceSymbol type.
export const checkmateExercisesData: CheckmateExercise[] = [
    // --- FÁCIL ---
    {
        id: 1, difficulty: 'Fácil', position: { 'e1': 'wk', 'h5': 'wr', 'g8': 'bk', 'g7': 'bp' }, turn: 'w',
        solution: { move: 'Th8#', comment: 'A torre na coluna h dá xeque-mate, controlando a oitava fileira enquanto o peão preto em g7 bloqueia a fuga do seu próprio rei.' },
        description: 'As brancas dão xeque-mate em um lance.'
    },
    {
        id: 2, difficulty: 'Fácil', position: { 'h1': 'wk', 'h6': 'wq', 'g8': 'bk', 'f7': 'bp', 'h7': 'bp' }, turn: 'w',
        solution: { move: 'Dg7#', comment: 'A Dama dá o "Beijo da Morte", um mate apoiado pelo Rei que controla as casas de fuga.' },
        description: 'Qual o melhor movimento para as brancas finalizarem a partida?'
    },
    {
        id: 3, difficulty: 'Fácil', position: { 'g1': 'wk', 'g2': 'wp', 'h1': 'wr', 'g8': 'bk' }, turn: 'w',
        solution: { move: 'Th8#', comment: 'Este é o clássico "Mate do Corredor". O Rei preto está preso atrás de seus próprios peões e a Torre ataca na fileira de trás.' },
        description: 'As brancas dão xeque-mate em um lance.'
    },
    {
        id: 4, difficulty: 'Fácil', position: { 'h1': 'wk', 'h4': 'wq', 'f1': 'wr', 'g8': 'bk', 'g7': 'bp' }, turn: 'w',
        solution: { move: 'Dh8#', comment: 'A Dama dá mate na oitava fileira, protegida pela Torre em f1.' },
        description: 'As brancas podem dar xeque-mate em um lance?'
    },
    {
        id: 5, difficulty: 'Fácil', position: { 'e1': 'wk', 'd1': 'wr', 'd7': 'wr', 'e8': 'bk', 'c8': 'bb' }, turn: 'w',
        solution: { move: 'Td8#', comment: 'O "Mate da Escadinha". Uma torre dá o xeque e a outra controla a fileira de fuga.' },
        description: 'As brancas têm um xeque-mate forçado.'
    },
    {
        id: 6, difficulty: 'Fácil', position: { 'g1': 'wk', 'f5': 'wq', 'e4': 'wr', 'g8': 'bk', 'f7': 'bp', 'g6': 'bp' }, turn: 'w',
        solution: { move: 'Dxg6#', comment: 'A Dama captura o peão em g6, dando mate com o apoio da Torre em e4.' },
        description: 'Qual o melhor ataque das brancas?'
    },
    {
        id: 7, difficulty: 'Fácil', position: { 'e1': 'wk', 'h1': 'wr', 'c4': 'wb', 'e8': 'bk', 'd4': 'bn' }, turn: 'w',
        solution: { move: 'Bxd4+', comment: 'Brancas devem primeiro lidar com a ameaça. Capturar o cavalo é a melhor defesa.' },
        description: 'Como as brancas podem evitar o xeque-mate?'
    },
    {
        id: 8, difficulty: 'Fácil', position: { 'g1': 'wk', 'h1': 'wr', 'f1': 'wb', 'g8': 'bk', 'h4': 'bq' }, turn: 'w',
        solution: { move: 'Th2', comment: 'Mover a torre para h2 bloqueia o xeque da Dama e prepara um contra-ataque.' },
        description: 'Como as brancas podem se defender?'
    },
    {
        id: 9, difficulty: 'Fácil', position: { 'h1': 'wk', 'h5': 'wq', 'g2': 'wp', 'f2': 'wp', 'g8': 'bk', 'h8': 'br' }, turn: 'w',
        solution: { move: 'Dxh8#', comment: 'A Dama captura a Torre, dando mate com o apoio do Rei.' },
        description: 'Como as brancas podem vencer rapidamente?'
    },
    {
        id: 10, difficulty: 'Fácil', position: { 'h1': 'wk', 'f1': 'wr', 'g2': 'wp', 'g8': 'bk', 'h3': 'bq' }, turn: 'b',
        solution: { move: 'Dg2#', comment: 'Sim, a Dama preta pode capturar o peão em g2, dando xeque-mate, pois o Rei branco não tem casas de fuga.' },
        description: 'As pretas podem dar xeque-mate em um lance?'
    },

    // --- MÉDIO ---
    {
        id: 11, difficulty: 'Médio', position: { 'e4': 'wk', 'h4': 'wq', 'e8': 'bk', 'c8': 'bb' }, turn: 'w',
        solution: { move: '1. De7+', comment: '1. De7+ força o Rei a se mover (Kd8 ou Kf8). Em ambos os casos, 2. Dd7# ou 2. Df7# resulta em mate.' },
        description: 'Como as brancas podem forçar um xeque-mate em duas jogadas?'
    },
    {
        id: 12, difficulty: 'Médio', position: { 'f1': 'wk', 'e5': 'wq', 'd1': 'wr', 'e8': 'bk', 'f8': 'bb' }, turn: 'w',
        solution: { move: '1. De6+', comment: '1. De6+ força Kf8 (ou Ke7). Se 1...Kf8, 2. Df7#. Se 1...Ke7, 2. Dd7#.' },
        description: 'Como as brancas podem forçar um xeque-mate?'
    },
    {
        id: 13, difficulty: 'Médio', position: { 'e1': 'wk', 'd3': 'wq', 'e5': 'wr', 'e8': 'bk', 'g7': 'bb' }, turn: 'w',
        solution: { move: 'Te8#', comment: 'A Torre dá xeque-mate. O Bispo em g7 não pode capturar porque está cravado pela Dama em d3.' },
        description: 'Qual o melhor ataque das brancas?'
    },
    {
        id: 14, difficulty: 'Médio', position: { 'g1': 'wk', 'f3': 'wq', 'e5': 'wn', 'g8': 'bk', 'f8': 'br', 'f7': 'bp', 'g6': 'bp' }, turn: 'w',
        solution: { move: '1. Dxg6+', comment: 'O sacrifício da Dama em g6 força a captura (hxg6), o que permite 2. Cf7#, um belo mate de cavalo.' },
        description: 'Como as brancas podem criar um ataque decisivo?'
    },
    {
        id: 15, difficulty: 'Médio', position: { 'e4': 'wk', 'c6': 'wq', 'd7': 'wr', 'e8': 'bk', 'f8': 'br' }, turn: 'w',
        solution: { move: '1. Td8+', comment: '1. Td8+ Txd8 2. Dxc8#. A torre se sacrifica para desviar a torre preta e permitir o mate da Dama.' },
        description: 'Existe um xeque-mate forçado para as brancas?'
    },
    {
        id: 16, difficulty: 'Médio', position: { 'e1': 'wk', 'b1': 'wr', 'h3': 'wq', 'g8': 'bk', 'g7': 'bp', 'h7': 'bp', 'f6': 'wn' }, turn: 'w',
        solution: { move: 'Th1#', comment: 'Mate de Anastasia. O Cavalo controla as casas de fuga g8 e e7, e a Torre dá o mate na coluna h.' },
        description: 'As brancas dão mate em 1.'
    },
    {
        id: 17, difficulty: 'Médio', position: { 'e1': 'wk', 'c1': 'wb', 'f1': 'wb', 'h1': 'wr', 'e8': 'bk', 'd4': 'bn' }, turn: 'w',
        solution: { move: 'Bd2', comment: 'O cavalo em d4 ameaça mate em e2. Mover o bispo para d2 defende a casa e2 e mantém a posição segura.' },
        description: 'Como as brancas podem se defender do xeque?'
    },
    {
        id: 18, difficulty: 'Médio', position: { 'e4': 'wk', 'd6': 'wr', 'f5': 'wb', 'e8': 'bk', 'c5': 'bn' }, turn: 'w',
        solution: { move: '1. Td8+', comment: '1. Td8+ Cxd8 2. Bf8#. Um belo mate em que o bispo entrega o golpe final após o sacrifício da torre.' },
        description: 'As brancas podem finalizar a partida?'
    },
    {
        id: 19, difficulty: 'Médio', position: { 'g1': 'wk', 'f3': 'wn', 'e1': 'wr', 'g8': 'bk', 'h4': 'bq' }, turn: 'b',
        solution: { move: 'Dg3+', comment: 'Uma defesa forte. 1...Dg3+ força a troca de damas (após Re2 Dxe1) ou permite um xeque perpétuo, salvando o jogo para as pretas.' },
        description: 'As pretas ameaçam xeque-mate. Como as brancas podem se defender?'
    },
    {
        id: 20, difficulty: 'Médio', position: { 'g1': 'wk', 'f3': 'wn', 'h1': 'wr', 'g8': 'bk', 'h5': 'bq' }, turn: 'w',
        solution: { move: 'Th2', comment: 'Um lance defensivo crucial. A torre em h2 bloqueia o ataque da dama e protege o rei, evitando o mate iminente em g2.' },
        description: 'As brancas têm um lance defensivo forte?'
    },

    // --- DIFÍCIL ---
    {
        id: 21, difficulty: 'Difícil', position: { 'h1': 'wk', 'g1': 'wr', 'e7': 'wn', 'g8': 'bk', 'f8': 'bq' }, turn: 'w',
        solution: { move: 'Cf7#', comment: 'Mate Sufocado. O cavalo dá o xeque, e o Rei preto está completamente cercado por suas próprias peças, sem poder se mover.' },
        description: 'Brancas jogam e dão mate em 1.'
    },
    {
        id: 22, difficulty: 'Difícil', position: { 'a1': 'wk', 'c2': 'wb', 'd2': 'wb', 'h8': 'bk', 'g7': 'bp', 'a2': 'bp' }, turn: 'w',
        solution: { move: 'Ba3#', comment: 'Mate de Boden. Os dois bispos trabalham em diagonais cruzadas para dar um mate surpresa.' },
        description: 'Brancas jogam e dão mate em 1.'
    },
    {
        id: 23, difficulty: 'Difícil', position: { 'e1': 'wk', 'd5': 'wq', 'c6': 'wr', 'e8': 'bk', 'g7': 'bb' }, turn: 'w',
        solution: { move: '1. Dxb7+', comment: '1. Dxb7+ Re7 (forçado). 2. Dc7+ Re8. 3. Td6! e o mate é inevitável.' },
        description: 'Existe um xeque-mate rápido para as brancas?'
    },
    {
        id: 24, difficulty: 'Difícil', position: { 'e1': 'wk', 'h1': 'wr', 'f3': 'wn', 'e8': 'bk', 'g5': 'bq' }, turn: 'b',
        solution: { move: 'Dxf3#', comment: 'Sim. A Dama preta captura o cavalo. O Rei branco não pode recapturar porque a Dama está defendida pelo Rei em e8 (ataque de raio-x).' },
        description: 'As pretas podem dar xeque-mate em um lance?'
    },
    {
        id: 25, difficulty: 'Difícil', position: { 'e1': 'wk', 'f2': 'wr', 'e5': 'wr', 'f8': 'bk', 'e6': 'bp', 'd6': 'bp', 'g6': 'bp' }, turn: 'w',
        solution: { move: 'Tf6#', comment: 'Mate de Légal. A Torre se move para f6, e mesmo que o peão de e6 capture, a outra torre em e5 dará o mate.' },
        description: 'Brancas jogam e dão mate em 1.'
    },
    {
        id: 26, difficulty: 'Difícil', position: { 'g1': 'wk', 'e2': 'wq', 'd4': 'wr', 'h7': 'bk', 'f7': 'bp', 'g7': 'bp', 'g6': 'br' }, turn: 'w',
        solution: { move: '1. Th4+', comment: '1. Th4+ gxh4. 2. Dg4#. O sacrifício da torre remove o defensor da casa g6 e abre caminho para o mate da Dama.' },
        description: 'Como as brancas podem forçar o mate?'
    },
    {
        id: 27, difficulty: 'Difícil', position: { 'a6': 'wk', 'b7': 'wr', 'd5': 'wp', 'a8': 'bk', 'b5': 'bb' }, turn: 'w',
        solution: { move: '1. d6', comment: '1. d6! Se ...Bxd7, 2. Rb6 e o mate é inevitável. Se ...cxd6, 2. Tc7#.' },
        description: 'Brancas jogam e dão mate em 2.'
    },
    {
        id: 28, difficulty: 'Difícil', position: { 'g3': 'wk', 'e1': 'wr', 'f3': 'wb', 'h8': 'bk', 'e2': 'bq' }, turn: 'w',
        solution: { move: '1. Bf2!', comment: 'Um lance quieto. Prepara-se para bloquear o xeque da Dama preta e ameaça Re1-e8#.' },
        description: 'Brancas jogam e dão mate em 2.'
    },
    {
        id: 29, difficulty: 'Difícil', position: { 'h4': 'wk', 'g5': 'wr', 'h2': 'wp', 'f8': 'bk', 'g7': 'bp', 'h7': 'bp' }, turn: 'w',
        solution: { move: '1. Th5!', comment: '1. Th5! gxh5, 2. Kg5. O peão preto está preso e o rei branco o colocará em zugzwang, forçando o mate.' },
        description: 'Brancas jogam e dão mate em 3.'
    },
    {
        id: 30, difficulty: 'Difícil', position: { 'c1': 'wk', 'g2': 'wq', 'h4': 'wb', 'a8': 'bk', 'a7': 'bp', 'b7': 'bp', 'c7': 'br' }, turn: 'w',
        solution: { move: 'Qc6#', comment: 'A Dama ataca o Rei, que não pode fugir para b8 por causa do Bispo. Capturar a Dama com o peão b7 não é possível pois o peão está cravado pelo Bispo.' },
        description: 'As brancas jogam e dão mate em 1.'
    }
];