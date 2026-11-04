import { bank, fill, hear, listen, mc, pairs, say, unit } from '../builders';

// Trilha infantil: muitas imagens, palavras curtas e frases simples.
// 5 etapas × 4 lições × 6 exercícios = 120 perguntas.

export const kids = [
  unit('k', 1, 'Meu mundo', 'Oi, cores e números', [
    ['Oi!', 'Cumprimentos', '👋', [
      mc('Como se diz "Oi"?', 'Hi', ['Hi', '👋'], ['Bye', '🚪'], ['Yes', '👍']),
      hear('Bye', ['Bye', '🚪'], ['Hi', '👋'], ['No', '🙅']),
      fill('Good', 'morning', '!', ['dog', 'red']),
      say('Hello friend', 'Olá, amigo'),
      listen('Hi'),
      pairs(["Hi", "Oi"], ["Bye", "Tchau"], ["Yes", "Sim"], ["No", "Não"]),
    ]],
    ['Cores', 'As cores do arco-íris', '🌈', [
      mc('Qual é o "vermelho"?', 'Red', ['Red', '🔴'], ['Blue', '🔵'], ['Green', '🟢']),
      hear('Blue', ['Blue', '🔵'], ['Yellow', '🟡'], ['Red', '🔴']),
      mc('Qual é o "verde"?', 'Green', ['Green', '🟢'], ['Purple', '🟣'], ['Orange', '🟠']),
      fill('The sun is', 'yellow', '.', ['blue', 'green']),
      say('Pink', 'Rosa'),
      pairs(["Red", "Vermelho"], ["Blue", "Azul"], ["Green", "Verde"], ["Yellow", "Amarelo"]),
    ]],
    ['Números', 'Contar de 1 a 10', '🔢', [
      mc('Qual é o número "um"?', 'One', ['One', '1️⃣'], ['Two', '2️⃣'], ['Three', '3️⃣']),
      hear('Five', ['Five', '5️⃣'], ['Four', '4️⃣'], ['Six', '6️⃣']),
      mc('Qual é o número "dez"?', 'Ten', ['Ten', '🔟'], ['Eight', '8️⃣'], ['Nine', '9️⃣']),
      fill('I have', 'two', 'hands.', ['ten', 'red']),
      listen('Seven'),
      pairs(["One", "Um"], ["Two", "Dois"], ["Three", "Três"], ["Ten", "Dez"]),
    ]],
    ['Formas', 'Círculo, quadrado e estrela', '⭐', [
      mc('Qual é a "estrela"?', 'Star', ['Star', '⭐'], ['Heart', '❤️'], ['Circle', '⚪']),
      hear('Heart', ['Heart', '❤️'], ['Square', '🟥'], ['Star', '⭐']),
      mc('Qual é o "círculo"?', 'Circle', ['Circle', '⚪'], ['Triangle', '🔺'], ['Heart', '❤️']),
      fill('A ball is a', 'circle', '.', ['square', 'star']),
      say('Big star', 'Estrela grande'),
      pairs(["Star", "Estrela"], ["Heart", "Coração"], ["Circle", "Círculo"], ["Square", "Quadrado"]),
    ]],
  ]),

  unit('k', 2, 'Bichos', 'Animais de casa, da fazenda, da selva e do mar', [
    ['Bichos de casa', 'Cachorro, gato e peixinho', '🐶', [
      mc('Qual é o "cachorro"?', 'Dog', ['Dog', '🐶'], ['Cat', '🐱'], ['Fish', '🐟']),
      hear('Cat', ['Cat', '🐱'], ['Dog', '🐶'], ['Bird', '🐦']),
      mc('Qual é o "passarinho"?', 'Bird', ['Bird', '🐦'], ['Fish', '🐟'], ['Rabbit', '🐰']),
      bank('Eu tenho um gato', 'I have a cat', ['dog', 'is']),
      say('My dog', 'Meu cachorro'),
      pairs(["Dog", "Cachorro"], ["Cat", "Gato"], ["Bird", "Passarinho"], ["Fish", "Peixe"]),
    ]],
    ['Fazenda', 'Vaca, porco e galinha', '🐮', [
      mc('Qual é a "vaca"?', 'Cow', ['Cow', '🐮'], ['Pig', '🐷'], ['Horse', '🐴']),
      hear('Pig', ['Pig', '🐷'], ['Duck', '🦆'], ['Cow', '🐮']),
      mc('Qual é o "cavalo"?', 'Horse', ['Horse', '🐴'], ['Sheep', '🐑'], ['Chicken', '🐔']),
      fill('The', 'duck', 'says quack.', ['cow', 'pig']),
      listen('The cow says moo'),
      pairs(["Cow", "Vaca"], ["Pig", "Porco"], ["Horse", "Cavalo"], ["Duck", "Pato"]),
    ]],
    ['Selva', 'Leão, macaco e elefante', '🦁', [
      mc('Qual é o "leão"?', 'Lion', ['Lion', '🦁'], ['Tiger', '🐯'], ['Monkey', '🐵']),
      hear('Monkey', ['Monkey', '🐵'], ['Elephant', '🐘'], ['Snake', '🐍']),
      mc('Qual é o "elefante"?', 'Elephant', ['Elephant', '🐘'], ['Giraffe', '🦒'], ['Lion', '🦁']),
      fill('The', 'giraffe', 'is tall.', ['snake', 'mouse']),
      say('The lion is big', 'O leão é grande'),
      pairs(["Lion", "Leão"], ["Monkey", "Macaco"], ["Elephant", "Elefante"], ["Snake", "Cobra"]),
    ]],
    ['No mar', 'Peixe, baleia e tartaruga', '🐳', [
      mc('Qual é o "peixe"?', 'Fish', ['Fish', '🐟'], ['Whale', '🐳'], ['Crab', '🦀']),
      hear('Whale', ['Whale', '🐳'], ['Octopus', '🐙'], ['Turtle', '🐢']),
      mc('Qual é a "tartaruga"?', 'Turtle', ['Turtle', '🐢'], ['Crab', '🦀'], ['Fish', '🐟']),
      bank('O polvo é roxo', 'The octopus is purple', ['red', 'are']),
      listen('A small fish'),
      pairs(["Whale", "Baleia"], ["Turtle", "Tartaruga"], ["Crab", "Caranguejo"], ["Octopus", "Polvo"]),
    ]],
  ]),

  unit('k', 3, 'Minha casa', 'Família, brinquedos, corpo e roupas', [
    ['Família', 'Mamãe, papai e vovó', '👨‍👩‍👧', [
      mc('Quem é a "mamãe"?', 'Mom', ['Mom', '👩'], ['Dad', '👨'], ['Baby', '👶']),
      hear('Dad', ['Dad', '👨'], ['Grandma', '👵'], ['Mom', '👩']),
      mc('Quem é a "vovó"?', 'Grandma', ['Grandma', '👵'], ['Grandpa', '👴'], ['Sister', '👧']),
      fill('I love my', 'mom', '.', ['ball', 'blue']),
      say('This is my brother', 'Este é meu irmão'),
      pairs(["Mom", "Mamãe"], ["Dad", "Papai"], ["Grandma", "Vovó"], ["Brother", "Irmão"]),
    ]],
    ['Brinquedos', 'Bola, boneca e carrinho', '🧸', [
      mc('Qual é a "bola"?', 'Ball', ['Ball', '⚽'], ['Doll', '🪆'], ['Car', '🚗']),
      hear('Teddy bear', ['Teddy bear', '🧸'], ['Kite', '🪁'], ['Ball', '⚽']),
      mc('Qual é a "pipa"?', 'Kite', ['Kite', '🪁'], ['Robot', '🤖'], ['Car', '🚗']),
      bank('Eu gosto do meu robô', 'I like my robot', ['car', 'you']),
      listen('A red car'),
      pairs(["Ball", "Bola"], ["Kite", "Pipa"], ["Robot", "Robô"], ["Doll", "Boneca"]),
    ]],
    ['Meu corpo', 'Cabeça, mãos e pés', '🖐️', [
      mc('Qual é a "mão"?', 'Hand', ['Hand', '✋'], ['Foot', '🦶'], ['Eye', '👁️']),
      hear('Eye', ['Eye', '👁️'], ['Ear', '👂'], ['Nose', '👃']),
      mc('Qual é o "nariz"?', 'Nose', ['Nose', '👃'], ['Mouth', '👄'], ['Hand', '✋']),
      fill('I hear with my', 'ears', '.', ['feet', 'nose']),
      say('Touch your head', 'Toque na sua cabeça'),
      pairs(["Hand", "Mão"], ["Eye", "Olho"], ["Nose", "Nariz"], ["Ear", "Orelha"]),
    ]],
    ['Roupas', 'Camiseta, sapato e chapéu', '👕', [
      mc('Qual é a "camiseta"?', 'Shirt', ['Shirt', '👕'], ['Shoes', '👟'], ['Hat', '🎩']),
      hear('Shoes', ['Shoes', '👟'], ['Socks', '🧦'], ['Shirt', '👕']),
      mc('Qual é o "chapéu"?', 'Hat', ['Hat', '🎩'], ['Dress', '👗'], ['Socks', '🧦']),
      fill('My', 'socks', 'are white.', ['cat', 'apple']),
      listen('I like my hat'),
      pairs(["Shirt", "Camiseta"], ["Shoes", "Sapatos"], ["Hat", "Chapéu"], ["Socks", "Meias"]),
    ]],
  ]),

  unit('k', 4, 'Comidinhas', 'Frutas, lanches e festa', [
    ['Frutas', 'Maçã, banana e uva', '🍎', [
      mc('Qual é a "maçã"?', 'Apple', ['Apple', '🍎'], ['Banana', '🍌'], ['Grapes', '🍇']),
      hear('Grapes', ['Grapes', '🍇'], ['Orange', '🍊'], ['Apple', '🍎']),
      mc('Qual é o "morango"?', 'Strawberry', ['Strawberry', '🍓'], ['Watermelon', '🍉'], ['Banana', '🍌']),
      fill('The banana is', 'yellow', 'and sweet.', ['blue', 'sad']),
      say('I like bananas', 'Eu gosto de bananas'),
      pairs(["Apple", "Maçã"], ["Grapes", "Uvas"], ["Strawberry", "Morango"], ["Orange", "Laranja"]),
    ]],
    ['Lanche', 'Pão, queijo e leite', '🥪', [
      mc('Qual é o "pão"?', 'Bread', ['Bread', '🍞'], ['Cheese', '🧀'], ['Egg', '🥚']),
      hear('Cheese', ['Cheese', '🧀'], ['Milk', '🥛'], ['Bread', '🍞']),
      mc('Qual é o "leite"?', 'Milk', ['Milk', '🥛'], ['Juice', '🧃'], ['Water', '💧']),
      bank('Eu estou com fome', 'I am hungry', ['happy', 'is']),
      listen('Milk please'),
      pairs(["Bread", "Pão"], ["Cheese", "Queijo"], ["Milk", "Leite"], ["Egg", "Ovo"]),
    ]],
    ['Doces', 'Bolo, sorvete e chocolate', '🍰', [
      mc('Qual é o "bolo"?', 'Cake', ['Cake', '🍰'], ['Ice cream', '🍦'], ['Cookie', '🍪']),
      hear('Ice cream', ['Ice cream', '🍦'], ['Candy', '🍬'], ['Cake', '🍰']),
      mc('Qual é o "biscoito"?', 'Cookie', ['Cookie', '🍪'], ['Chocolate', '🍫'], ['Candy', '🍬']),
      fill('Ice cream is', 'cold', '.', ['hot', 'loud']),
      say('Yummy cake', 'Bolo gostoso'),
      pairs(["Cake", "Bolo"], ["Ice cream", "Sorvete"], ["Cookie", "Biscoito"], ["Candy", "Bala"]),
    ]],
    ['Festa', 'Aniversário e presentes', '🎂', [
      mc('Qual é o "presente"?', 'Gift', ['Gift', '🎁'], ['Balloon', '🎈'], ['Candle', '🕯️']),
      hear('Balloon', ['Balloon', '🎈'], ['Gift', '🎁'], ['Hat', '🥳']),
      fill('Happy', 'birthday', '!', ['banana', 'blue']),
      bank('Eu tenho seis anos', 'I am six years old', ['have', 'five']),
      listen('Happy birthday to you'),
      pairs(["Gift", "Presente"], ["Balloon", "Balão"], ["Party", "Festa"], ["Candle", "Vela"]),
    ]],
  ]),

  unit('k', 5, 'Vamos brincar', 'Escola, ações, sentimentos e tempo', [
    ['Escola', 'Lápis, livro e professora', '🎒', [
      mc('Qual é o "lápis"?', 'Pencil', ['Pencil', '✏️'], ['Book', '📕'], ['Bag', '🎒']),
      hear('Book', ['Book', '📕'], ['Scissors', '✂️'], ['Pencil', '✏️']),
      mc('Qual é a "mochila"?', 'Backpack', ['Backpack', '🎒'], ['Crayon', '🖍️'], ['Book', '📕']),
      fill('I read a', 'book', '.', ['cat', 'milk']),
      say('Good morning teacher', 'Bom dia, professora'),
      pairs(["Pencil", "Lápis"], ["Book", "Livro"], ["Backpack", "Mochila"], ["Teacher", "Professora"]),
    ]],
    ['Ações', 'Correr, pular e dançar', '🏃', [
      mc('Qual é "correr"?', 'Run', ['Run', '🏃'], ['Swim', '🏊'], ['Sleep', '😴']),
      hear('Swim', ['Swim', '🏊'], ['Dance', '💃'], ['Run', '🏃']),
      mc('Qual é "dormir"?', 'Sleep', ['Sleep', '😴'], ['Eat', '🍽️'], ['Jump', '🦘']),
      bank('Eu posso pular', 'I can jump', ['run', 'am']),
      listen("Let's dance"),
      pairs(["Run", "Correr"], ["Swim", "Nadar"], ["Sleep", "Dormir"], ["Jump", "Pular"]),
    ]],
    ['Sentimentos', 'Feliz, triste e bravo', '😊', [
      mc('Qual é "feliz"?', 'Happy', ['Happy', '😊'], ['Sad', '😢'], ['Angry', '😠']),
      hear('Sad', ['Sad', '😢'], ['Tired', '🥱'], ['Happy', '😊']),
      mc('Qual é "com sono / cansado"?', 'Tired', ['Tired', '🥱'], ['Scared', '😨'], ['Angry', '😠']),
      fill('I am', 'happy', 'today!', ['apple', 'table']),
      say('I am very happy', 'Eu estou muito feliz'),
      pairs(["Happy", "Feliz"], ["Sad", "Triste"], ["Angry", "Bravo"], ["Tired", "Cansado"]),
    ]],
    ['Tempo', 'Sol, chuva e neve', '🌦️', [
      mc('Qual é o "sol"?', 'Sun', ['Sun', '☀️'], ['Rain', '🌧️'], ['Snow', '❄️']),
      hear('Rain', ['Rain', '🌧️'], ['Wind', '💨'], ['Sun', '☀️']),
      mc('Qual é a "neve"?', 'Snow', ['Snow', '❄️'], ['Cloud', '☁️'], ['Rain', '🌧️']),
      bank('Está ensolarado', 'It is sunny', ['rainy', 'are']),
      listen('It is cold'),
      pairs(["Sun", "Sol"], ["Rain", "Chuva"], ["Snow", "Neve"], ["Cloud", "Nuvem"]),
    ]],
  ]),
];
