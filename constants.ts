import type { ClassDataMap, ClassificationDataMap } from './types.ts';

export const initialClassData: ClassDataMap = {
    "611": {
        name: "Turma 611",
        dates: [
            "19/mar", "20/mar", "24/mar", "31/mar", "05/mai", "12/mai", "19/mai", "02/jun", "18/ago", "25/ago"
        ],
        students: [
            { id: 1, name: "Alice Caldeira de Lima", attendance: { "19/mar": "F", "20/mar": "F", "24/mar": "F", "31/mar": "P", "05/mai": "F", "12/mai": "P", "19/mai": "F", "02/jun": "F", "18/ago": "P", "25/ago": "P" } },
            { id: 2, name: "Bernardo Costa", attendance: { "19/mar": "F", "20/mar": "F", "24/mar": "P", "31/mar": "F", "05/mai": "F", "12/mai": "F", "19/mai": "F", "02/jun": "F", "18/ago": "F", "25/ago": "F" } },
            { id: 3, name: "Danilo Felipe", attendance: { "19/mar": "P", "20/mar": "P", "24/mar": "P", "31/mar": "F", "05/mai": "F", "12/mai": "P", "19/mai": "F", "02/jun": "P", "18/ago": "P", "25/ago": "P" } },
            { id: 4, name: "Davi Lucca Martins Pereira", attendance: { "19/mar": "P", "20/mar": "P", "24/mar": "P", "31/mar": "P", "05/mai": "P", "12/mai": "F", "19/mai": "F", "02/jun": "P", "18/ago": "P", "25/ago": "F" } },
            { id: 5, name: "Davi Senne", attendance: { "19/mar": "F", "20/mar": "P", "24/mar": "F", "31/mar": "P", "05/mai": "F", "12/mai": "P", "19/mai": "F", "02/jun": "P", "18/ago": "F", "25/ago": "F" } },
            { id: 6, name: "Enzo Samuel", attendance: { "19/mar": "F", "20/mar": "F", "24/mar": "F", "31/mar": "F", "05/mai": "F", "12/mai": "P", "19/mai": "P", "02/jun": "F", "18/ago": "F", "25/ago": "F" } },
            { id: 7, name: "Isabella Teixeira das Chagas", attendance: { "19/mar": "F", "20/mar": "F", "24/mar": "F", "31/mar": "P", "05/mai": "F", "12/mai": "P", "19/mai": "F", "02/jun": "P", "18/ago": "P", "25/ago": "P" } },
            { id: 8, name: "Isadora Torres de Andrade", attendance: { "19/mar": "F", "20/mar": "F", "24/mar": "F", "31/mar": "P", "05/mai": "F", "12/mai": "P", "19/mai": "P", "02/jun": "P", "18/ago": "P", "25/ago": "F" } },
            { id: 9, name: "Maria Eduarda dos Santos", attendance: { "19/mar": "F", "20/mar": "P", "24/mar": "P", "31/mar": "F", "05/mai": "P", "12/mai": "P", "19/mai": "F", "02/jun": "P", "18/ago": "F", "25/ago": "F" } },
            { id: 10, name: "Miguel Roberto", attendance: { "19/mar": "F", "20/mar": "F", "24/mar": "P", "31/mar": "F", "05/mai": "F", "12/mai": "F", "19/mai": "F", "02/jun": "F", "18/ago": "F", "25/ago": "F" } },
            { id: 11, name: "Nicolly Marques", attendance: { "19/mar": "F", "20/mar": "F", "24/mar": "F", "31/mar": "F", "05/mai": "F", "12/mai": "P", "19/mai": "F", "02/jun": "F", "18/ago": "F", "25/ago": "F" } },
            { id: 12, name: "Nicolly Vitoria", attendance: { "19/mar": "F", "20/mar": "F", "24/mar": "F", "31/mar": "F", "05/mai": "F", "12/mai": "P", "19/mai": "F", "02/jun": "F", "18/ago": "P", "25/ago": "F" } },
            { id: 13, name: "Otávio Pires", attendance: { "19/mar": "F", "20/mar": "F", "24/mar": "P", "31/mar": "F", "05/mai": "F", "12/mai": "P", "19/mai": "F", "02/jun": "F", "18/ago": "P", "25/ago": "P" } },
            { id: 14, name: "Pietro Coutinho", attendance: { "19/mar": "F", "20/mar": "F", "24/mar": "P", "31/mar": "F", "05/mai": "F", "12/mai": "P", "19/mai": "F", "02/jun": "F", "18/ago": "F", "25/ago": "F" } },
            { id: 15, name: "Ryan Bacelar", attendance: { "19/mar": "P", "20/mar": "P", "24/mar": "F", "31/mar": "F", "05/mai": "F", "12/mai": "P", "19/mai": "F", "02/jun": "P", "18/ago": "P", "25/ago": "F" } },
            { id: 16, name: "Theo Machado", attendance: { "19/mar": "P", "20/mar": "P", "24/mar": "F", "31/mar": "F", "05/mai": "F", "12/mai": "P", "19/mai": "F", "02/jun": "P", "18/ago": "P", "25/ago": "F" } },
            { id: 17, name: "Victor Pereira", attendance: { "19/mar": "F", "20/mar": "F", "24/mar": "F", "31/mar": "F", "05/mai": "F", "12/mai": "P", "19/mai": "P", "02/jun": "F", "18/ago": "P", "25/ago": "P" } },
            { id: 18, name: "Wagner Ferreira", attendance: { "19/mar": "P", "20/mar": "F", "24/mar": "F", "31/mar": "F", "05/mai": "F", "12/mai": "F", "19/mai": "F", "02/jun": "F", "18/ago": "F", "25/ago": "F" } },
            { id: 19, name: "Yasmin da Silva Melo", attendance: { "19/mar": "F", "20/mar": "F", "24/mar": "P", "31/mar": "F", "05/mai": "P", "12/mai": "F", "19/mai": "P", "02/jun": "P", "18/ago": "F", "25/ago": "F" } },
            { id: 20, name: "Yasmin Faquetin", attendance: { "19/mar": "P", "20/mar": "F", "24/mar": "F", "31/mar": "F", "05/mai": "P", "12/mai": "F", "19/mai": "P", "02/jun": "F", "18/ago": "F", "25/ago": "F" } },
            { id: 21, name: "Yuri Nascimento", attendance: { "19/mar": "F", "20/mar": "F", "24/mar": "F", "31/mar": "F", "05/mai": "F", "12/mai": "F", "19/mai": "F", "02/jun": "F", "18/ago": "F", "25/ago": "P" } },
            { id: 22, name: "Maria Eduarda Costa", attendance: { "21/mar": "F", "28/mar": "F", "04/abr": "P", "11/abr": "F", "09/mai": "F", "16/mai": "F", "23/mai": "F", "30/mai": "F", "06/jun": "F", "22/ago": "F", "05/set": "F" } }
        ]
    },
    "612": {
        name: "Turma 612",
        dates: [
            "20/mar", "27/mar", "31/mar", "03/abr", "14/abr", "21/abr", "28/abr", "05/mai", "12/mai", "19/mai", "29/mai", "12/jun", "01/set"
        ],
        students: [
            { id: 1, name: "Agatha de Lima", attendance: { "20/mar": "F", "27/mar": "F", "31/mar": "F", "03/abr": "P", "14/abr": "F", "21/abr": "F", "28/abr": "P", "05/mai": "P", "12/mai": "F", "19/mai": "P", "29/mai": "F", "12/jun": "P", "01/set": "F" } },
            { id: 2, name: "Alex Bruneis", attendance: { "20/mar": "F", "27/mar": "F", "31/mar": "F", "03/abr": "F", "14/abr": "P", "21/abr": "F", "28/abr": "F", "05/mai": "F", "12/mai": "F", "19/mai": "P", "29/mai": "F", "12/jun": "F", "01/set": "P" } },
            { id: 3, name: "Alice Miranda", attendance: { "20/mar": "F", "27/mar": "F", "31/mar": "F", "03/abr": "P", "14/abr": "P", "21/abr": "F", "28/abr": "P", "05/mai": "P", "12/mai": "F", "19/mai": "P", "29/mai": "F", "12/jun": "P", "01/set": "P" } },
            { id: 4, name: "Ana Beatriz", attendance: { "20/mar": "P", "27/mar": "F", "31/mar": "P", "03/abr": "P", "14/abr": "P", "21/abr": "F", "28/abr": "P", "05/mai": "P", "12/mai": "F", "19/mai": "P", "29/mai": "F", "12/jun": "P", "01/set": "F" } },
            { id: 5, name: "Artur Tobinaga", attendance: { "20/mar": "F", "27/mar": "P", "31/mar": "F", "03/abr": "F", "14/abr": "F", "21/abr": "F", "28/abr": "F", "05/mai": "P", "12/mai": "F", "19/mai": "P", "29/mai": "F", "12/jun": "F", "01/set": "P" } },
            { id: 6, name: "Carlos Alexandre", attendance: { "20/mar": "F", "27/mar": "F", "31/mar": "F", "03/abr": "P", "14/abr": "F", "21/abr": "F", "28/abr": "F", "05/mai": "F", "12/mai": "F", "19/mai": "F", "29/mai": "F", "12/jun": "F", "01/set": "F" } },
            { id: 7, name: "Daniele Pereira de Oliveira", attendance: { "20/mar": "P", "27/mar": "F", "31/mar": "P", "03/abr": "P", "14/abr": "P", "21/abr": "F", "28/abr": "P", "05/mai": "F", "12/mai": "F", "19/mai": "P", "29/mai": "F", "12/jun": "P", "01/set": "F" } },
            { id: 8, name: "Guilherme da Silva Alves", attendance: { "20/mar": "F", "27/mar": "F", "31/mar": "F", "03/abr": "F", "14/abr": "F", "21/abr": "F", "28/abr": "F", "05/mai": "F", "12/mai": "F", "19/mai": "P", "29/mai": "F", "12/jun": "F", "01/set": "F" } },
            { id: 9, name: "Hadassa Gomes Travasso", attendance: { "20/mar": "F", "27/mar": "F", "31/mar": "P", "03/abr": "P", "14/abr": "P", "21/abr": "F", "28/abr": "P", "05/mai": "P", "12/mai": "F", "19/mai": "P", "29/mai": "F", "12/jun": "P", "01/set": "F" } },
            { id: 10, name: "Heitor Chelles", attendance: { "20/mar": "F", "27/mar": "F", "31/mar": "F", "03/abr": "F", "14/abr": "F", "21/abr": "F", "28/abr": "F", "05/mai": "P", "12/mai": "F", "19/mai": "F", "29/mai": "F", "12/jun": "F", "01/set": "F" } },
            { id: 11, name: "Henrique Cerqueira", attendance: { "20/mar": "F", "27/mar": "F", "31/mar": "F", "03/abr": "F", "14/abr": "F", "21/abr": "F", "28/abr": "F", "05/mai": "F", "12/mai": "F", "19/mai": "F", "29/mai": "F", "12/jun": "F", "01/set": "P" } },
            { id: 12, name: "Hugo Tobinaga", attendance: { "20/mar": "F", "27/mar": "P", "31/mar": "F", "03/abr": "F", "14/abr": "F", "21/abr": "F", "28/abr": "F", "05/mai": "P", "12/mai": "F", "19/mai": "P", "29/mai": "F", "12/jun": "P", "01/set": "P" } },
            { id: 13, name: "Jamylle Marcelo de Moraes", attendance: { "20/mar": "F", "27/mar": "F", "31/mar": "P", "03/abr": "F", "14/abr": "P", "21/abr": "F", "28/abr": "P", "05/mai": "F", "12/mai": "P", "19/mai": "P", "29/mai": "P", "12/jun": "P", "01/set": "F" } },
            { id: 14, name: "Jorge William de Souza Lima.", attendance: { "20/mar": "F", "27/mar": "F", "31/mar": "F", "03/abr": "F", "14/abr": "F", "21/abr": "F", "28/abr": "F", "05/mai": "P", "12/mai": "F", "19/mai": "P", "29/mai": "F", "12/jun": "P", "01/set": "F" } },
            { id: 15, name: "Lorena Militão", attendance: { "20/mar": "P", "27/mar": "F", "31/mar": "P", "03/abr": "P", "14/abr": "P", "21/abr": "F", "28/abr": "F", "05/mai": "P", "12/mai": "F", "19/mai": "F", "29/mai": "F", "12/jun": "P", "01/set": "F" } },
            { id: 16, name: "Lunna Jéssica", attendance: { "20/mar": "F", "27/mar": "F", "31/mar": "F", "03/abr": "P", "14/abr": "F", "21/abr": "F", "28/abr": "F", "05/mai": "P", "12/mai": "F", "19/mai": "P", "29/mai": "P", "12/jun": "P", "01/set": "F" } },
            { id: 17, name: "Maria Eduarda dos Santos Maciel", attendance: { "20/mar": "F", "27/mar": "F", "31/mar": "P", "03/abr": "P", "14/abr": "P", "21/abr": "F", "28/abr": "F", "05/mai": "P", "12/mai": "F", "19/mai": "P", "29/mai": "F", "12/jun": "P", "01/set": "F" } },
            { id: 18, name: "Maria Luiza da Costa", attendance: { "20/mar": "F", "27/mar": "F", "31/mar": "F", "03/abr": "F", "14/abr": "F", "21/abr": "F", "28/abr": "F", "05/mai": "F", "12/mai": "F", "19/mai": "F", "29/mai": "F", "12/jun": "P", "01/set": "F" } },
            { id: 19, name: "Miguel Araújo", attendance: { "20/mar": "F", "27/mar": "F", "31/mar": "P", "03/abr": "P", "14/abr": "F", "21/abr": "F", "28/abr": "F", "05/mai": "P", "12/mai": "F", "19/mai": "F", "29/mai": "F", "12/jun": "P", "01/set": "F" } },
            { id: 20, name: "Myrella Fontura", attendance: { "20/mar": "F", "27/mar": "P", "31/mar": "F", "03/abr": "P", "14/abr": "F", "21/abr": "F", "28/abr": "F", "05/mai": "P", "12/mai": "F", "19/mai": "F", "29/mai": "P", "12/jun": "P", "01/set": "P" } },
            { id: 21, name: "Raphaela Schroedler", attendance: { "20/mar": "F", "27/mar": "P", "31/mar": "F", "03/abr": "F", "14/abr": "P", "21/abr": "F", "28/abr": "P", "05/mai": "P", "12/mai": "F", "19/mai": "P", "29/mai": "F", "12/jun": "P", "01/set": "F" } },
            { id: 22, name: "Talita Reis", attendance: { "20/mar": "F", "27/mar": "F", "31/mar": "P", "03/abr": "P", "14/abr": "P", "21/abr": "F", "28/abr": "F", "05/mai": "P", "12/mai": "F", "19/mai": "P", "29/mai": "F", "12/jun": "P", "01/set": "F" } },
            { id: 23, name: "Thaylor Barros", attendance: { "20/mar": "P", "27/mar": "P", "31/mar": "F", "03/abr": "F", "14/abr": "F", "21/abr": "F", "28/abr": "P", "05/mai": "P", "12/mai": "F", "19/mai": "P", "29/mai": "F", "12/jun": "F", "01/set": "F" } },
            { id: 24, name: "Vitória Salvaya", attendance: { "20/mar": "F", "27/mar": "F", "31/mar": "F", "03/abr": "F", "14/abr": "F", "21/abr": "F", "28/abr": "P", "05/mai": "F", "12/mai": "F", "19/mai": "P", "29/mai": "F", "12/jun": "P", "01/set": "F" } }
        ]
    },
    "613": {
        name: "Turma 613",
        dates: [
            "19/mar", "28/mar", "09/mai", "16/mai", "23/mai", "13/jun", "04/jul", "22/ago", "29/ago"
        ],
        students: [
            { id: 1, name: "Agatha Silva", attendance: { "19/mar": "F", "28/mar": "F", "09/mai": "P", "16/mai": "P", "23/mai": "F", "13/jun": "P", "04/jul": "P", "22/ago": "F", "29/ago": "F" } },
            { id: 2, name: "Alice do Nascimento", attendance: { "19/mar": "F", "28/mar": "F", "09/mai": "F", "16/mai": "P", "23/mai": "F", "13/jun": "F", "04/jul": "F", "22/ago": "F", "29/ago": "F" } },
            { id: 3, name: "Aysha Vitoria", attendance: { "19/mar": "F", "28/mar": "F", "09/mai": "F", "16/mai": "F", "23/mai": "F", "13/jun": "F", "04/jul": "F", "22/ago": "P", "29/ago": "F" } },
            { id: 4, name: "Davi Lucca Santos Mendonça", attendance: { "19/mar": "P", "28/mar": "F", "09/mai": "F", "16/mai": "F", "23/mai": "F", "13/jun": "F", "04/jul": "F", "22/ago": "F", "29/ago": "F" } },
            { id: 5, name: "Edgar de Carvalho Rodrigues", attendance: { "19/mar": "P", "28/mar": "F", "09/mai": "F", "16/mai": "P", "23/mai": "F", "13/jun": "F", "04/jul": "F", "22/ago": "P", "29/ago": "P" } },
            { id: 6, name: "Eduarda Moreira", attendance: { "19/mar": "P", "28/mar": "P", "09/mai": "P", "16/mai": "F", "23/mai": "F", "13/jun": "P", "04/jul": "P", "22/ago": "F", "29/ago": "F" } },
            { id: 7, name: "Emanuelly Menezes de Oliveira", attendance: { "19/mar": "P", "28/mar": "F", "09/mai": "F", "16/mai": "F", "23/mai": "F", "13/jun": "F", "04/jul": "F", "22/ago": "F", "29/ago": "F" } },
            { id: 8, name: "Ian Carlos da Silva Nascimento", attendance: { "19/mar": "P", "28/mar": "P", "09/mai": "F", "16/mai": "P", "23/mai": "P", "13/jun": "F", "04/jul": "F", "22/ago": "F", "29/ago": "P" } },
            { id: 9, name: "Jefferson Nery", attendance: { "19/mar": "P", "28/mar": "P", "09/mai": "F", "16/mai": "P", "23/mai": "P", "13/jun": "F", "04/jul": "F", "22/ago": "F", "29/ago": "P" } },
            { id: 10, name: "Jefferson Santos", attendance: { "19/mar": "P", "28/mar": "P", "09/mai": "P", "16/mai": "F", "23/mai": "F", "13/jun": "P", "04/jul": "P", "22/ago": "P", "29/ago": "F" } },
            { id: 11, name: "Joyce de Souza", attendance: { "19/mar": "F", "28/mar": "F", "09/mai": "F", "16/mai": "P", "23/mai": "F", "13/jun": "F", "04/jul": "F", "22/ago": "F", "29/ago": "F" } },
            { id: 12, name: "Julia Labre Mathias", attendance: { "19/mar": "P", "28/mar": "P", "09/mai": "P", "16/mai": "P", "23/mai": "F", "13/jun": "P", "04/jul": "F", "22/ago": "P", "29/ago": "P" } },
            { id: 13, name: "Ketelen Julia", attendance: { "19/mar": "F", "28/mar": "F", "09/mai": "P", "16/mai": "P", "23/mai": "F", "13/jun": "P", "04/jul": "F", "22/ago": "F", "29/ago": "F" } },
            { id: 14, name: "Larissa Sales", attendance: { "19/mar": "F", "28/mar": "F", "09/mai": "F", "16/mai": "F", "23/mai": "F", "13/jun": "F", "04/jul": "F", "22/ago": "F", "29/ago": "P" } },
            { id: 15, name: "Lucas Neres", attendance: { "19/mar": "F", "28/mar": "F", "09/mai": "F", "16/mai": "P", "23/mai": "F", "13/jun": "P", "04/jul": "F", "22/ago": "P", "29/ago": "P" } },
            { id: 16, name: "Luíza Araújo", attendance: { "19/mar": "P", "28/mar": "P", "09/mai": "P", "16/mai": "P", "23/mai": "F", "13/jun": "P", "04/jul": "P", "22/ago": "F", "29/ago": "F" } },
            { id: 17, name: "Manuela de Souza", attendance: { "19/mar": "F", "28/mar": "F", "09/mai": "P", "16/mai": "P", "23/mai": "F", "13/jun": "F", "04/jul": "F", "22/ago": "F", "29/ago": "F" } },
            { id: 18, name: "Murillo Toste de Souza", attendance: { "19/mar": "P", "28/mar": "P", "09/mai": "P", "16/mai": "F", "23/mai": "F", "13/jun": "F", "04/jul": "F", "22/ago": "F", "29/ago": "F" } },
            { id: 19, name: "Pietra Fernandes", attendance: { "19/mar": "F", "28/mar": "F", "09/mai": "F", "16/mai": "P", "23/mai": "F", "13/jun": "F", "04/jul": "F", "22/ago": "F", "29/ago": "F" } },
            { id: 20, name: "Rafaelle Pessanha", attendance: { "19/mar": "P", "28/mar": "P", "09/mai": "F", "16/mai": "P", "23/mai": "F", "13/jun": "F", "04/jul": "F", "22/ago": "F", "29/ago": "F" } },
            { id: 21, name: "Yago dos Anjos", attendance: { "19/mar": "F", "28/mar": "F", "09/mai": "F", "16/mai": "F", "23/mai": "F", "13/jun": "F", "04/jul": "F", "22/ago": "P", "29/ago": "F" } }
        ]
    },
    "621": {
        name: "Turma 621",
        dates: [
            "20/mar", "21/mar", "26/mar", "27/mar", "28/mar", "03/abr", "11/abr", "14/abr", "12/mai"
        ],
        students: [
            { id: 1, name: "Ana Julia Rangel", attendance: { "20/mar": "F", "21/mar": "F", "26/mar": "P", "27/mar": "F", "28/mar": "F", "03/abr": "F", "11/abr": "F", "14/abr": "P", "12/mai": "F" } },
            { id: 2, name: "Arthur de Paula Carvalho", attendance: { "20/mar": "P", "21/mar": "P", "26/mar": "P", "27/mar": "F", "28/mar": "F", "03/abr": "F", "11/abr": "F", "14/abr": "P", "12/mai": "P" } },
            { id: 3, name: "Davi Lucas Ribeiro", attendance: { "20/mar": "F", "21/mar": "F", "26/mar": "P", "27/mar": "F", "28/mar": "F", "03/abr": "F", "11/abr": "F", "14/abr": "F", "12/mai": "F" } },
            { id: 4, name: "Émerson Menezes", attendance: { "20/mar": "P", "21/mar": "F", "26/mar": "P", "27/mar": "P", "28/mar": "F", "03/abr": "F", "11/abr": "F", "14/abr": "F", "12/mai": "F" } },
            { id: 5, name: "Esther da Silva Lopes", attendance: { "20/mar": "F", "21/mar": "F", "26/mar": "P", "27/mar": "F", "28/mar": "P", "03/abr": "P", "11/abr": "P", "14/abr": "P", "12/mai": "F" } },
            { id: 6, name: "João Pedro Fidélis da Silva", attendance: { "20/mar": "F", "21/mar": "P", "26/mar": "P", "27/mar": "F", "28/mar": "F", "03/abr": "F", "11/abr": "F", "14/abr": "F", "12/mai": "F" } },
            { id: 7, name: "Kalyla Vitória da Silva de Souza", attendance: { "20/mar": "F", "21/mar": "F", "26/mar": "P", "27/mar": "F", "28/mar": "F", "03/abr": "F", "11/abr": "F", "14/abr": "F", "12/mai": "P" } },
            { id: 8, name: "Kethllen Manuella", attendance: { "20/mar": "F", "21/mar": "F", "26/mar": "F", "27/mar": "F", "28/mar": "F", "03/abr": "F", "11/abr": "F", "14/abr": "P", "12/mai": "P" } },
            { id: 9, name: "Lincoln Lopes", attendance: { "20/mar": "P", "21/mar": "F", "26/mar": "P", "27/mar": "P", "28/mar": "F", "03/abr": "P", "11/abr": "F", "14/abr": "F", "12/mai": "P" } },
            { id: 10, name: "Luiz Fellipe Silva Miranda", attendance: { "20/mar": "P", "21/mar": "F", "26/mar": "F", "27/mar": "F", "28/mar": "P", "03/abr": "F", "11/abr": "F", "14/abr": "P", "12/mai": "P" } },
            { id: 11, name: "Matheus Figueiredo de Oliveira", attendance: { "20/mar": "F", "21/mar": "F", "26/mar": "F", "27/mar": "P", "28/mar": "F", "03/abr": "P", "11/abr": "F", "14/abr": "F", "12/mai": "F" } },
            { id: 12, name: "Miguel Neves", attendance: { "20/mar": "F", "21/mar": "F", "26/mar": "P", "27/mar": "F", "28/mar": "F", "03/abr": "F", "11/abr": "F", "14/abr": "F", "12/mai": "F" } },
            { id: 13, name: "Pedro Henrique da Conceição", attendance: { "20/mar": "P", "21/mar": "P", "26/mar": "F", "27/mar": "P", "28/mar": "F", "03/abr": "F", "11/abr": "F", "14/abr": "F", "12/mai": "P" } },
            { id: 14, name: "Pedro Miguel", attendance: { "20/mar": "F", "21/mar": "F", "26/mar": "F", "27/mar": "F", "28/mar": "F", "03/abr": "F", "11/abr": "F", "14/abr": "F", "12/mai": "P" } },
            { id: 15, name: "Pedro Nicolas da Silva", attendance: { "20/mar": "P", "21/mar": "P", "26/mar": "F", "27/mar": "F", "28/mar": "F", "03/abr": "F", "11/abr": "F", "14/abr": "F", "12/mai": "F" } },
            { id: 16, name: "Wanderson da Silva Gonçalves", attendance: { "20/mar": "F", "21/mar": "F", "26/mar": "F", "27/mar": "F", "28/mar": "F", "03/abr": "F", "11/abr": "F", "14/abr": "P", "12/mai": "F" } },
            { id: 17, name: "Yan Fonseca", attendance: { "20/mar": "F", "21/mar": "P", "26/mar": "F", "27/mar": "F", "28/mar": "F", "03/abr": "F", "11/abr": "F", "14/abr": "F", "12/mai": "F" } }
        ]
    },
    "622": {
        name: "Turma 622",
        dates: [
            "20/mar", "21/mar", "27/mar", "31/mar", "03/abr", "14/abr", "24/abr", "15/mai", "22/mai", "29/mai", "05/jun", "12/jun", "07/ago", "18/ago", "21/ago", "25/ago", "28/ago", "04/set", "11/set"
        ],
        students: [
            { id: 1, name: "Alice Victoria", attendance: { "20/mar": "F", "21/mar": "F", "27/mar": "F", "31/mar": "F", "03/abr": "F", "14/abr": "F", "24/abr": "F", "15/mai": "F", "22/mai": "F", "29/mai": "F", "05/jun": "P", "12/jun": "F", "07/ago": "P", "18/ago": "F", "21/ago": "F", "25/ago": "F", "28/ago": "P", "04/set": "P", "11/set": "P" } },
            { id: 2, name: "Ana Julia Goulart", attendance: { "20/mar": "F", "21/mar": "F", "27/mar": "P", "31/mar": "F", "03/abr": "F", "14/abr": "F", "24/abr": "P", "15/mai": "F", "22/mai": "F", "29/mai": "F", "05/jun": "F", "12/jun": "F", "07/ago": "F", "18/ago": "P", "21/ago": "P", "25/ago": "P", "28/ago": "P", "04/set": "P", "11/set": "P" } },
            { id: 3, name: "Anne Vieira", attendance: { "20/mar": "P", "21/mar": "F", "27/mar": "P", "31/mar": "F", "03/abr": "F", "14/abr": "F", "24/abr": "P", "15/mai": "F", "22/mai": "F", "29/mai": "F", "05/jun": "F", "12/jun": "F", "07/ago": "F", "18/ago": "P", "21/ago": "F", "25/ago": "F", "28/ago": "P", "04/set": "F", "11/set": "F" } },
            { id: 4, name: "Bruno Junqueira", attendance: { "20/mar": "P", "21/mar": "F", "27/mar": "F", "31/mar": "P", "03/abr": "P", "14/abr": "F", "24/abr": "F", "15/mai": "P", "22/mai": "P", "29/mai": "P", "05/jun": "P", "12/jun": "P", "07/ago": "F", "18/ago": "P", "21/ago": "P", "25/ago": "P", "28/ago": "P", "04/set": "F", "11/set": "F" } },
            { id: 5, name: "Davi Marques", attendance: { "20/mar": "F", "21/mar": "F", "27/mar": "F", "31/mar": "F", "03/abr": "F", "14/abr": "F", "24/abr": "F", "15/mai": "F", "22/mai": "F", "29/mai": "F", "05/jun": "F", "12/jun": "F", "07/ago": "F", "18/ago": "P", "21/ago": "F", "25/ago": "F", "28/ago": "F", "04/set": "F", "11/set": "F" } },
            { id: 6, name: "Dominic de Albuquerque", attendance: { "20/mar": "F", "21/mar": "F", "27/mar": "F", "31/mar": "F", "03/abr": "F", "14/abr": "F", "24/abr": "F", "15/mai": "F", "22/mai": "F", "29/mai": "F", "05/jun": "F", "12/jun": "F", "07/ago": "F", "18/ago": "F", "21/ago": "F", "25/ago": "F", "28/ago": "F", "04/set": "F", "11/set": "P" } },
            { id: 7, name: "Emanuelly Paixão", attendance: { "20/mar": "F", "21/mar": "F", "27/mar": "F", "31/mar": "F", "03/abr": "P", "14/abr": "F", "24/abr": "P", "15/mai": "F", "22/mai": "F", "29/mai": "F", "05/jun": "F", "12/jun": "F", "07/ago": "F", "18/ago": "F", "21/ago": "F", "25/ago": "F", "28/ago": "F", "04/set": "F", "11/set": "F" } },
            { id: 8, name: "Érick Patrick da Silva Trindade", attendance: { "20/mar": "F", "21/mar": "P", "27/mar": "P", "31/mar": "F", "03/abr": "P", "14/abr": "F", "24/abr": "F", "15/mai": "F", "22/mai": "F", "29/mai": "F", "05/jun": "F", "12/jun": "F", "07/ago": "F", "18/ago": "F", "21/ago": "F", "25/ago": "F", "28/ago": "F", "04/set": "F", "11/set": "F" } },
            { id: 9, name: "Felipe Araújo", attendance: { "20/mar": "P", "21/mar": "F", "27/mar": "F", "31/mar": "F", "03/abr": "F", "14/abr": "F", "24/abr": "P", "15/mai": "P", "22/mai": "F", "29/mai": "F", "05/jun": "F", "12/jun": "F", "07/ago": "F", "18/ago": "F", "21/ago": "F", "25/ago": "F", "28/ago": "F", "04/set": "F", "11/set": "F" } },
            { id: 10, name: "Gabriel do Nascimento", attendance: { "20/mar": "P", "21/mar": "F", "27/mar": "F", "31/mar": "P", "03/abr": "P", "14/abr": "P", "24/abr": "F", "15/mai": "P", "22/mai": "P", "29/mai": "P", "05/jun": "F", "12/jun": "P", "07/ago": "F", "18/ago": "P", "21/ago": "P", "25/ago": "P", "28/ago": "F", "04/set": "P", "11/set": "P" } },
            { id: 11, name: "Giovanna Netto", attendance: { "20/mar": "F", "21/mar": "F", "27/mar": "F", "31/mar": "F", "03/abr": "P", "14/abr": "F", "24/abr": "F", "15/mai": "F", "22/mai": "F", "29/mai": "F", "05/jun": "F", "12/jun": "F", "07/ago": "F", "18/ago": "P", "21/ago": "F", "25/ago": "F", "28/ago": "F", "04/set": "F", "11/set": "F" } },
            { id: 12, name: "Guilherme Santos", attendance: { "20/mar": "P", "21/mar": "F", "27/mar": "P", "31/mar": "P", "03/abr": "P", "14/abr": "F", "24/abr": "P", "15/mai": "P", "22/mai": "F", "29/mai": "F", "05/jun": "P", "12/jun": "P", "07/ago": "P", "18/ago": "F", "21/ago": "P", "25/ago": "F", "28/ago": "F", "04/set": "F", "11/set": "F" } },
            { id: 13, name: "Hagata Guimarães", attendance: { "20/mar": "F", "21/mar": "F", "27/mar": "F", "31/mar": "F", "03/abr": "P", "14/abr": "F", "24/abr": "F", "15/mai": "F", "22/mai": "F", "29/mai": "F", "05/jun": "F", "12/jun": "F", "07/ago": "F", "18/ago": "F", "21/ago": "F", "25/ago": "F", "28/ago": "F", "04/set": "F", "11/set": "F" } },
            { id: 14, name: "Heitor Araújo", attendance: { "20/mar": "F", "21/mar": "F", "27/mar": "P", "31/mar": "F", "03/abr": "F", "14/abr": "F", "24/abr": "F", "15/mai": "F", "22/mai": "F", "29/mai": "F", "05/jun": "F", "12/jun": "F", "07/ago": "F", "18/ago": "F", "21/ago": "F", "25/ago": "F", "28/ago": "F", "04/set": "F", "11/set": "F" } },
            { id: 15, name: "Isaias Alexsander", attendance: { "20/mar": "F", "21/mar": "F", "27/mar": "F", "31/mar": "F", "03/abr": "F", "14/abr": "F", "24/abr": "F", "15/mai": "F", "22/mai": "F", "29/mai": "F", "05/jun": "F", "12/jun": "F", "07/ago": "F", "18/ago": "F", "21/ago": "F", "25/ago": "F", "28/ago": "F", "04/set": "F", "11/set": "F" } },
            { id: 16, name: "Laura Soares", attendance: { "20/mar": "F", "21/mar": "F", "27/mar": "F", "31/mar": "F", "03/abr": "F", "14/abr": "F", "24/abr": "F", "15/mai": "F", "22/mai": "F", "29/mai": "F", "05/jun": "F", "12/jun": "F", "07/ago": "F", "18/ago": "P", "21/ago": "F", "25/ago": "F", "28/ago": "F", "04/set": "F", "11/set": "F" } },
            { id: 17, name: "Lívia Cabral", attendance: { "20/mar": "F", "21/mar": "F", "27/mar": "F", "31/mar": "F", "03/abr": "F", "14/abr": "F", "24/abr": "F", "15/mai": "F", "22/mai": "F", "29/mai": "F", "05/jun": "F", "12/jun": "F", "07/ago": "F", "18/ago": "P", "21/ago": "P", "25/ago": "P", "28/ago": "F", "04/set": "F", "11/set": "F" } },
            { id: 18, name: "Luis Eduardo Correa Farias", attendance: { "20/mar": "F", "21/mar": "F", "27/mar": "F", "31/mar": "F", "03/abr": "F", "14/abr": "P", "24/abr": "P", "15/mai": "F", "22/mai": "F", "29/mai": "F", "05/jun": "F", "12/jun": "F", "07/ago": "F", "18/ago": "P", "21/ago": "F", "25/ago": "F", "28/ago": "F", "04/set": "F", "11/set": "F" } },
            { id: 19, name: "Luisa Soares", attendance: { "20/mar": "P", "21/mar": "F", "27/mar": "F", "31/mar": "F", "03/abr": "F", "14/abr": "F", "24/abr": "P", "15/mai": "F", "22/mai": "F", "29/mai": "F", "05/jun": "F", "12/jun": "F", "07/ago": "F", "18/ago": "P", "21/ago": "F", "25/ago": "F", "28/ago": "F", "04/set": "F", "11/set": "F" } },
            { id: 20, name: "Matheus Figueiredo", attendance: { "20/mar": "F", "21/mar": "F", "27/mar": "F", "31/mar": "F", "03/abr": "F", "14/abr": "F", "24/abr": "P", "15/mai": "P", "22/mai": "F", "29/mai": "F", "05/jun": "F", "12/jun": "F", "07/ago": "F", "18/ago": "P", "21/ago": "F", "25/ago": "F", "28/ago": "F", "04/set": "F", "11/set": "F" } },
            { id: 21, name: "Melina da Costa", attendance: { "20/mar": "F", "21/mar": "F", "27/mar": "F", "31/mar": "F", "03/abr": "F", "14/abr": "F", "24/abr": "F", "15/mai": "F", "22/mai": "F", "29/mai": "F", "05/jun": "F", "12/jun": "F", "07/ago": "F", "18/ago": "P", "21/ago": "F", "25/ago": "F", "28/ago": "F", "04/set": "F", "11/set": "F" } },
            { id: 22, name: "Miguel Porcino da Silva", attendance: { "20/mar": "P", "21/mar": "P", "27/mar": "F", "31/mar": "F", "03/abr": "F", "14/abr": "F", "24/abr": "F", "15/mai": "F", "22/mai": "F", "29/mai": "F", "05/jun": "F", "12/jun": "P", "07/ago": "P", "18/ago": "F", "21/ago": "F", "25/ago": "F", "28/ago": "F", "04/set": "F", "11/set": "P" } },
            { id: 23, name: "Tiago Ferreira", attendance: { "20/mar": "F", "21/mar": "F", "27/mar": "F", "31/mar": "F", "03/abr": "F", "14/abr": "F", "24/abr": "F", "15/mai": "F", "22/mai": "F", "29/mai": "F", "05/jun": "F", "12/jun": "F", "07/ago": "F", "18/ago": "F", "21/ago": "P", "25/ago": "F", "28/ago": "F", "04/set": "F", "11/set": "F" } }
        ]
    },
    "623": {
        name: "Turma 623",
        dates: [
            "21/mar", "28/mar", "04/abr", "11/abr", "09/mai", "16/mai", "23/mai", "30/mai", "06/jun", "22/ago", "05/set"
        ],
        students: [
            { id: 1, name: "Ana Heloiza Marcolina Porto", attendance: { "21/mar": "P", "28/mar": "F", "04/abr": "F", "11/abr": "F", "09/mai": "F", "16/mai": "F", "23/mai": "F", "30/mai": "F", "06/jun": "F", "22/ago": "F", "05/set": "P" } },
            { id: 2, name: "Cauã Lanor", attendance: { "21/mar": "F", "28/mar": "F", "04/abr": "P", "11/abr": "F", "09/mai": "F", "16/mai": "F", "23/mai": "F", "30/mai": "F", "06/jun": "F", "22/ago": "F", "05/set": "F" } },
            { id: 3, name: "Emilly da Silva", attendance: { "21/mar": "F", "28/mar": "P", "04/abr": "P", "11/abr": "P", "09/mai": "P", "16/mai": "P", "23/mai": "P", "30/mai": "P", "06/jun": "F", "22/ago": "F", "05/set": "F" } },
            { id: 4, name: "Gabriella Sofia", attendance: { "21/mar": "F", "28/mar": "P", "04/abr": "P", "11/abr": "P", "09/mai": "P", "16/mai": "P", "23/mai": "P", "30/mai": "F", "06/jun": "F", "22/ago": "F", "05/set": "F" } },
            { id: 5, name: "Henrique Siqueira", attendance: { "21/mar": "P", "28/mar": "P", "04/abr": "P", "11/abr": "F", "09/mai": "F", "16/mai": "F", "23/mai": "F", "30/mai": "F", "06/jun": "F", "22/ago": "F", "05/set": "F" } },
            { id: 6, name: "Lucas Melo", attendance: { "21/mar": "F", "28/mar": "P", "04/abr": "F", "11/abr": "F", "09/mai": "P", "16/mai": "F", "23/mai": "P", "30/mai": "F", "06/jun": "F", "22/ago": "F", "05/set": "F" } },
            { id: 8, name: "Maria Roberta", attendance: { "21/mar": "F", "28/mar": "F", "04/abr": "P", "11/abr": "F", "09/mai": "P", "16/mai": "P", "23/mai": "F", "30/mai": "F", "06/jun": "P", "22/ago": "P", "05/set": "F" } },
            { id: 9, name: "Mateus Messias Venâncio Lima", attendance: { "21/mar": "P", "28/mar": "F", "04/abr": "P", "11/abr": "F", "09/mai": "P", "16/mai": "P", "23/mai": "P", "30/mai": "F", "06/jun": "F", "22/ago": "F", "05/set": "F" } },
            { id: 10, name: "Matheus Miguel", attendance: { "21/mar": "F", "28/mar": "F", "04/abr": "P", "11/abr": "F", "09/mai": "P", "16/mai": "F", "23/mai": "F", "30/mai": "F", "06/jun": "F", "22/ago": "F", "05/set": "F" } },
            { id: 11, name: "Miguel Ferreira dos Santos", attendance: { "21/mar": "P", "28/mar": "F", "04/abr": "F", "11/abr": "F", "09/mai": "F", "16/mai": "F", "23/mai": "F", "30/mai": "F", "06/jun": "F", "22/ago": "F", "05/set": "P" } },
            { id: 12, name: "Mirella Felix", attendance: { "21/mar": "F", "28/mar": "F", "04/abr": "P", "11/abr": "F", "09/mai": "F", "16/mai": "P", "23/mai": "P", "30/mai": "F", "06/jun": "F", "22/ago": "P", "05/set": "F" } },
            { id: 13, name: "Moisés Rodrigues", attendance: { "21/mar": "F", "28/mar": "F", "04/abr": "F", "11/abr": "P", "09/mai": "F", "16/mai": "F", "23/mai": "F", "30/mai": "F", "06/jun": "F", "22/ago": "F", "05/set": "F" } },
            { id: 14, name: "Mykaella Oliveira", attendance: { "21/mar": "P", "28/mar": "F", "04/abr": "F", "11/abr": "P", "09/mai": "F", "16/mai": "P", "23/mai": "P", "30/mai": "P", "06/jun": "P", "22/ago": "F", "05/set": "F" } },
            { id: 15, name: "Nicolas Aparício", attendance: { "21/mar": "F", "28/mar": "F", "04/abr": "F", "11/abr": "P", "09/mai": "F", "16/mai": "F", "23/mai": "F", "30/mai": "F", "06/jun": "F", "22/ago": "F", "05/set": "F" } },
            { id: 16, name: "Pyetro Miguel Prates", attendance: { "21/mar": "F", "28/mar": "F", "04/abr": "F", "11/abr": "F", "09/mai": "P", "16/mai": "F", "23/mai": "F", "30/mai": "F", "06/jun": "F", "22/ago": "P", "05/set": "F" } },
            { id: 17, name: "Thaune Rodrigues", attendance: { "21/mar": "F", "28/mar": "F", "04/abr": "F", "11/abr": "F", "09/mai": "P", "16/mai": "F", "23/mai": "P", "30/mai": "F", "06/jun": "F", "22/ago": "P", "05/set": "F" } },
            { id: 18, name: "Yago dos Anjos Silva", attendance: { "21/mar": "P", "28/mar": "F", "04/abr": "F", "11/abr": "F", "09/mai": "F", "16/mai": "F", "23/mai": "F", "30/mai": "F", "06/jun": "F", "22/ago": "P", "05/set": "F" } }
        ]
    }
};

export const initialClassificationData: ClassificationDataMap = {
    "611": { name: "Classificação 611", students: [ { position: "1º", name: "Isabella Teixeira das Chagas", points: "5", wins: 4, losses: 0, draws: 2 }, { position: "2º", name: "Davi Lucca Martins Pereira", points: "4,5", wins: 4, losses: 0, draws: 1 }, { position: "3º", name: "Davi Senne", points: "4", wins: 4, losses: 0, draws: 0 }, { position: "4º", name: "Bernardo Costa", points: "2,5", wins: 2, losses: 1, draws: 1 }, { position: "5º", name: "Otávio Pires", points: "2,5", wins: 2, losses: 2, draws: 1 }, { position: "6º", name: "Maria Eduarda dos Santos", points: "1,5", wins: 1, losses: 0, draws: 1 }, { position: "7º", name: "Nicolly Marques", points: "1", wins: 0, losses: 0, draws: 2 }, { position: "8º", name: "Alice Caldeira de Lima", points: "1", wins: 0, losses: 0, draws: 2 }, { position: "9º", name: "Maria Eduarda Costa", points: "1", wins: 0, losses: 0, draws: 2 }, { position: "10º", name: "Victor Pereira", points: "0,5", wins: 0, losses: 0, draws: 1 }, { position: "11º", name: "Nicolly Vitoria", points: "0,5", wins: 0, losses: 1, draws: 1 }, { position: "12º", name: "Yasmin Faquetin", points: "0", wins: 0, losses: 0, draws: 0 }, { position: "13º", name: "Yasmin da Silva Melo", points: "0", wins: 0, losses: 0, draws: 0 }, { position: "14º", name: "Wagner Ferreira", points: "0", wins: 0, losses: 0, draws: 0 }, { position: "15º", name: "Theo Machado", points: "0", wins: 0, losses: 0, draws: 0 }, { position: "16º", name: "Ryan Bacelar", points: "0", wins: 0, losses: 0, draws: 0 }, { position: "17º", name: "Pietro Coutinho", points: "0", wins: 0, losses: 0, draws: 0 }, { position: "18º", name: "Miguel Roberto", points: "0", wins: 0, losses: 0, draws: 0 }, { position: "19º", name: "Isadora Torres de Andrade", points: "0", wins: 0, losses: 0, draws: 0 }, { position: "20º", name: "Enzo Samuel", points: "0", wins: 0, losses: 0, draws: 0 }, { position: "21º", name: "Danilo Felipe", points: "0", wins: 0, losses: 0, draws: 0 } ] },
    "612": { name: "Classificação 612", students: [ { position: "1º", name: "Hugo Tobinaga", points: "6", wins: 6, losses: 1, draws: 0 }, { position: "2º", name: "Raphaela Schroedler", points: "4", wins: 4, losses: 0, draws: 0 }, { position: "3º", name: "Artur Tobinaga", points: "3,5", wins: 2, losses: 1, draws: 3 }, { position: "4º", name: "Myrella Fontura", points: "3", wins: 2, losses: 0, draws: 2 }, { position: "5º", name: "Jamylle Marcelo de Moraes", points: "3", wins: 2, losses: 2, draws: 2 }, { position: "6º", name: "Alice Miranda", points: "2,5", wins: 2, losses: 0, draws: 1 }, { position: "7º", name: "Agatha de Lima", points: "2", wins: 1, losses: 2, draws: 2 }, { position: "8º", name: "Ana Beatriz", points: "1,5", wins: 1, losses: 0, draws: 1 }, { position: "9º", name: "Miguel Araújo", points: "1", wins: 1, losses: 0, draws: 0 }, { position: "10º", name: "Alex Bruneis", points: "1", wins: 0, losses: 0, draws: 2 }, { position: "11º", name: "Maria Eduarda dos Santos Maciel", points: "0,5", wins: 0, losses: 0, draws: 1 }, { position: "12º", name: "Daniele Pereira de Oliveira", points: "0,5", wins: 0, losses: 0, draws: 1 }, { position: "13º", name: "Henrique Cerqueira", points: "0,5", wins: 0, losses: 1, draws: 1 }, { position: "14º", name: "Vitória Salvaya", points: "0", wins: 0, losses: 0, draws: 0 }, { position: "15º", name: "Thaylor Barros", points: "0", wins: 0, losses: 0, draws: 0 }, { position: "16º", name: "Luna Jéssica", points: "0", wins: 0, losses: 0, draws: 0 }, { position: "17º", name: "Jorge William de Souza Lima.", points: "0", wins: 0, losses: 0, draws: 0 }, { position: "18º", name: "Heitor Chelles", points: "0", wins: 0, losses: 0, draws: 0 }, { position: "19º", name: "Guilherme da Silva Alves", points: "0", wins: 0, losses: 0, draws: 0 }, { position: "20º", name: "Carlos Alexandre", points: "0", wins: 0, losses: 0, draws: 0 }, { position: "21º", name: "Maria Luiza da Costa", points: "0", wins: 0, losses: 1, draws: 0 }, { position: "22º", name: "Lorena Militão", points: "0", wins: 0, losses: 1, draws: 0 }, { position: "23º", name: "Hadassa Gomes Travasso", points: "0", wins: 0, losses: 2, draws: 0 }, { position: "24º", name: "Talita Reis", points: "0", wins: 0, losses: 3, draws: 0 } ] },
    "613": { name: "Classificação 613", students: [ { position: "1º", name: "ANDRE BRITO", points: "60,5", wins: 59, losses: 9, draws: 3 }, { position: "2º", name: "Julia Labre Mathias", points: "22", wins: 21, losses: 1, draws: 2 }, { position: "3º", name: "Lucas Neres", points: "17", wins: 16, losses: 4, draws: 2 }, { position: "4º", name: "Jefferson Santos", points: "14", wins: 12, losses: 3, draws: 4 }, { position: "5º", name: "Murillo Toste de Souza", points: "12", wins: 10, losses: 1, draws: 4 }, { position: "6º", name: "Ian Carlos da Silva Nascimento", points: "3,5", wins: 3, losses: 1, draws: 1 }, { position: "7º", name: "Jefferson Nery", points: "3", wins: 3, losses: 4, draws: 0 }, { position: "8º", name: "Davi Lucca Santos Mendonça", points: "2,5", wins: 2, losses: 2, draws: 1 }, { position: "9º", name: "Edgar de Carvalho Rodrigues", points: "2", wins: 1, losses: 3, draws: 2 }, { position: "10º", name: "Luíza Araújo", points: "1,5", wins: 1, losses: 0, draws: 1 }, { position: "11º", name: "Ketelen Julia", points: "1,5", wins: 1, losses: 0, draws: 1 }, { position: "12º", name: "Larissa Sales", points: "1,5", wins: 1, losses: 0, draws: 1 }, { position: "13º", name: "Manuela de Souza", points: "1,5", wins: 1, losses: 1, draws: 1 }, { position: "14º", name: "Yago dos Anjos", points: "1", wins: 0, losses: 4, draws: 2 }, { position: "15º", name: "Agatha Silva", points: "0,5", wins: 0, losses: 3, draws: 1 }, { position: "16º", name: "Aysha Vitoria", points: "0,5", wins: 0, losses: 7, draws: 1 }, { position: "17º", name: "Rafaelle Pessanha", points: "0", wins: 0, losses: 0, draws: 0 }, { position: "18º", name: "Pietra Fernandes", points: "0", wins: 0, losses: 0, draws: 0 }, { position: "19º", name: "Joyce de Souza", points: "0", wins: 0, losses: 0, draws: 0 }, { position: "20º", name: "Emanuelly Menezes de Oliveira", points: "0", wins: 0, losses: 0, draws: 0 }, { position: "21º", name: "Eduarda Moreira", points: "0", wins: 0, losses: 0, draws: 0 }, { position: "22º", name: "Alice do Nascimento", points: "0", wins: 0, losses: 0, draws: 0 } ] },
    "621": {
        name: "Classificação 621",
        students: [
            { position: "1º", name: "Esther da Silva Lopes", points: "2", wins: 2, losses: 0, draws: 0 },
            { position: "2º", name: "Miguel Neves", points: "2", wins: 2, losses: 1, draws: 0 },
            { position: "3º", name: "Luiz Fellipe Silva Miranda", points: "2", wins: 2, losses: 2, draws: 0 },
            { position: "4º", name: "Yan Fonseca", points: "0", wins: 0, losses: 0, draws: 0 },
            { position: "5º", name: "Wanderson da Silva Gonçalves", points: "0", wins: 0, losses: 0, draws: 0 },
            { position: "6º", name: "Pedro Nicolas da Silva", points: "0", wins: 0, losses: 0, draws: 0 },
            { position: "7º", name: "Pedro Miguel", points: "0", wins: 0, losses: 0, draws: 0 },
            { position: "8º", name: "Pedro Henrique da Conceição", points: "0", wins: 0, losses: 0, draws: 0 },
            { position: "9º", name: "Matheus Figueiredo de Oliveira", points: "0", wins: 0, losses: 0, draws: 0 },
            { position: "10º", name: "Lincoln Lopes", points: "0", wins: 0, losses: 0, draws: 0 },
            { position: "11º", name: "Kethllen Manuella", points: "0", wins: 0, losses: 0, draws: 0 },
            { position: "12º", name: "Kalyla Vitória da Silva de Souza", points: "0", wins: 0, losses: 0, draws: 0 },
            { position: "13º", name: "João Pedro Fidélis da Silva", points: "0", wins: 0, losses: 0, draws: 0 },
            { position: "14º", name: "Davi Lucas Ribeiro", points: "0", wins: 0, losses: 0, draws: 0 },
            { position: "15º", name: "Arthur de Paula Carvalho", points: "0", wins: 0, losses: 0, draws: 0 },
            { position: "16º", name: "Ana Julia Rangel", points: "0", wins: 0, losses: 0, draws: 0 },
            { position: "17º", name: "Émerson Menezes", points: "0", wins: 0, losses: 3, draws: 0 }
        ]
    },
    "622": {
        name: "Classificação 622",
        students: [
            { position: "1º", name: "Gabriel do Nascimento", points: "15", wins: 7, losses: 6, draws: 16 },
            { position: "2º", name: "Bruno Junqueira", points: "12,5", wins: 11, losses: 1, draws: 3 },
            { position: "3º", name: "Ana Julia Goulart", points: "11", wins: 8, losses: 3, draws: 6 },
            { position: "4º", name: "Guilherme Santos", points: "6,5", wins: 3, losses: 4, draws: 7 },
            { position: "5º", name: "Miguel Porcino da Silva", points: "6", wins: 4, losses: 2, draws: 4 },
            { position: "6º", name: "Tiago Ferreira", points: "4,5", wins: 4, losses: 0, draws: 1 },
            { position: "7º", name: "Alice Vitória", points: "4", wins: 3, losses: 5, draws: 2 },
            { position: "8º", name: "Lívia Cabral", points: "2", wins: 0, losses: 4, draws: 4 },
            { position: "9º", name: "Melina da Costa", points: "1,5", wins: 1, losses: 1, draws: 1 },
            { position: "10º", name: "Felipe Araújo", points: "1", wins: 1, losses: 1, draws: 0 },
            { position: "11º", name: "Matheus Figueiredo", points: "1", wins: 1, losses: 0, draws: 0 },
            { position: "12º", name: "Dominic de Albuquerque", points: "1", wins: 0, losses: 4, draws: 2 },
            { position: "13º", name: "Anne Vieira", points: "0,5", wins: 0, losses: 1, draws: 1 },
            { position: "14º", name: "Luis Eduardo Correa Farias", points: "0,5", wins: 0, losses: 1, draws: 1 },
            { position: "15º", name: "Davi Marques", points: "0", wins: 0, losses: 0, draws: 0 },
            { position: "16º", name: "Emanuelly Paixão", points: "0", wins: 0, losses: 0, draws: 0 },
            { position: "17º", name: "Érick Patrick da Silva Trindade", points: "0", wins: 0, losses: 0, draws: 0 },
            { position: "18º", name: "Giovanni Netto", points: "0", wins: 0, losses: 0, draws: 0 },
            { position: "19º", name: "Hagata Guimarães", points: "0", wins: 0, losses: 0, draws: 0 },
            { position: "20º", name: "Heitor Araújo", points: "0", wins: 0, losses: 0, draws: 0 },
            { position: "21º", name: "Isaias Alexsander", points: "0", wins: 0, losses: 0, draws: 0 },
            { position: "22º", name: "Laura Soares", points: "0", wins: 0, losses: 0, draws: 0 },
            { position: "23º", name: "Luisa Soares", points: "0", wins: 0, losses: 2, draws: 0 }
        ]
    },
    "623": {
        name: "Classificação 623",
        students: [
            { position: "1º", name: "Nicolas Aparício", points: "9,5", wins: 7, losses: 3, draws: 5 },
            { position: "2º", name: "Matheus Miguel", points: "7,5", wins: 6, losses: 1, draws: 3 },
            { position: "3º", name: "Moisés Rodrigues", points: "4,5", wins: 2, losses: 4, draws: 5 },
            { position: "4º", name: "Miguel Ferreira dos Santos", points: "2,5", wins: 2, losses: 7, draws: 1 },
            { position: "5º", name: "Pyetro Miguel Prates", points: "2,5", wins: 1, losses: 0, draws: 3 },
            { position: "6º", name: "Emilly da Silva", points: "1,5", wins: 0, losses: 2, draws: 3 },
            { position: "7º", name: "Gabriella Sofia", points: "1", wins: 0, losses: 0, draws: 2 },
            { position: "8º", name: "Mykaella Oliveira", points: "1", wins: 0, losses: 1, draws: 2 },
            { position: "9º", name: "Yago dos Anjos Silva", points: "0", wins: 0, losses: 0, draws: 0 },
            { position: "10º", name: "Thaune Rodrigues", points: "0", wins: 0, losses: 0, draws: 0 },
            { position: "11º", name: "Mirella Felix", points: "0", wins: 0, losses: 0, draws: 0 },
            { position: "12º", name: "Mateus Messias Venâncio Lima", points: "0", wins: 0, losses: 0, draws: 0 },
            { position: "13º", name: "Maria Roberta", points: "0", wins: 0, losses: 0, draws: 0 },
            { position: "14º", name: "Lucas Melo", points: "0", wins: 0, losses: 0, draws: 0 },
            { position: "15º", name: "Henrique Siqueira", points: "0", wins: 0, losses: 0, draws: 0 },
            { position: "16º", name: "Cauã Lanor", points: "0", wins: 0, losses: 0, draws: 0 },
            { position: "17º", name: "Ana Heloiza Marcolina Porto", points: "0", wins: 0, losses: 0, draws: 0 }
        ]
    }
};