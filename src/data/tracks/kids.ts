import { bank, fill, listen, mc, say, unit } from '../builders';

// Trilha infantil: muitas imagens, palavras curtas e frases simples.
// 5 etapas × 4 lições × 5 exercícios = 100 perguntas.

export const kids = [
  unit('k', 1, 'Meu mundo', 'Oi, cores e números', [
    ['Oi!', 'Cumprimentos', '👋', [
      mc('Como se diz "Oi"?', 'Hi', ['Hi', '👋'], ['Bye', '🚪'], ['Yes', '👍']),
      mc('Como se diz "Tchau"?', 'Bye', ['Bye', '🚪'], ['Hi', '👋'], ['No', '🙅']),
      fill('Good', 'morning', '!', ['dog', 'red']),
      say('Hello friend', 'Olá, amigo'),
      listen('Hi'),
    ]],
    ['Cores', 'As cores do arco-íris', '🌈', [
      mc('Qual é o "vermelho"?', 'Red', ['Red', '🔴'], ['Blue', '🔵'], ['Green', '🟢']),
      mc('Qual é o "azul"?', 'Blue', ['Blue', '🔵'], ['Yellow', '🟡'], ['Red', '🔴']),
      mc('Qual é o "verde"?', 'Green', ['Green', '🟢'], ['Purple', '🟣'], ['Orange', '🟠']),
      fill('The sun is', 'yellow', '.', ['blue', 'green']),
      say('Pink', 'Rosa'),
    ]],
    ['Números', 'Contar de 1 a 10', '🔢', [
      mc('Qual é o número "um"?', 'One', ['One', '1️⃣'], ['Two', '2️⃣'], ['Three', '3️⃣']),
      mc('Qual é o número "cinco"?', 'Five', ['Five', '5️⃣'], ['Four', '4️⃣'], ['Six', '6️⃣']),
      mc('Qual é o número "dez"?', 'Ten', ['Ten', '🔟'], ['Eight', '8️⃣'], ['Nine', '9️⃣']),
      fill('I have', 'two', 'hands.', ['ten', 'red']),
      listen('Seven'),
    ]],
    ['Formas', 'Círculo, quadrado e estrela', '⭐', [
      mc('Qual é a "estrela"?', 'Star', ['Star', '⭐'], ['Heart', '❤️'], ['Circle', '⚪']),
      mc('Qual é o "coração"?', 'Heart', ['Heart', '❤️'], ['Square', '🟥'], ['Star', '⭐']),
      mc('Qual é o "círculo"?', 'Circle', ['Circle', '⚪'], ['Triangle', '🔺'], ['Heart', '❤️']),
      fill('A ball is a', 'circle', '.', ['square', 'star']),
      say('Big star', 'Estrela grande'),
    ]],
  ]),

  unit('k', 2, 'Bichos', 'Animais de casa, da fazenda, da selva e do mar', [
    ['Bichos de casa', 'Cachorro, gato e peixinho', '🐶', [
      mc('Qual é o "cachorro"?', 'Dog', ['Dog', '🐶'], ['Cat', '🐱'], ['Fish', '🐟']),
      mc('Qual é o "gato"?', 'Cat', ['Cat', '🐱'], ['Dog', '🐶'], ['Bird', '🐦']),
      mc('Qual é o "passarinho"?', 'Bird', ['Bird', '🐦'], ['Fish', '🐟'], ['Rabbit', '🐰']),
      bank('Eu tenho um gato', 'I have a cat', ['dog', 'is']),
      say('My dog', 'Meu cachorro'),
    ]],
    ['Fazenda', 'Vaca, porco e galinha', '🐮', [
      mc('Qual é a "vaca"?', 'Cow', ['Cow', '🐮'], ['Pig', '🐷'], ['Horse', '🐴']),
      mc('Qual é o "porco"?', 'Pig', ['Pig', '🐷'], ['Duck', '🦆'], ['Cow', '🐮']),
      mc('Qual é o "cavalo"?', 'Horse', ['Horse', '🐴'], ['Sheep', '🐑'], ['Chicken', '🐔']),
      fill('The', 'duck', 'says quack.', ['cow', 'pig']),
      listen('The cow says moo'),
    ]],
    ['Selva', 'Leão, macaco e elefante', '🦁', [
      mc('Qual é o "leão"?', 'Lion', ['Lion', '🦁'], ['Tiger', '🐯'], ['Monkey', '🐵']),
      mc('Qual é o "macaco"?', 'Monkey', ['Monkey', '🐵'], ['Elephant', '🐘'], ['Snake', '🐍']),
      mc('Qual é o "elefante"?', 'Elephant', ['Elephant', '🐘'], ['Giraffe', '🦒'], ['Lion', '🦁']),
      fill('The', 'giraffe', 'is tall.', ['snake', 'mouse']),
      say('The lion is big', 'O leão é grande'),
    ]],
    ['No mar', 'Peixe, baleia e tartaruga', '🐳', [
      mc('Qual é o "peixe"?', 'Fish', ['Fish', '🐟'], ['Whale', '🐳'], ['Crab', '🦀']),
      mc('Qual é a "baleia"?', 'Whale', ['Whale', '🐳'], ['Octopus', '🐙'], ['Turtle', '🐢']),
      mc('Qual é a "tartaruga"?', 'Turtle', ['Turtle', '🐢'], ['Crab', '🦀'], ['Fish', '🐟']),
      bank('O polvo é roxo', 'The octopus is purple', ['red', 'are']),
      listen('A small fish'),
    ]],
  ]),

  unit('k', 3, 'Minha casa', 'Família, brinquedos, corpo e roupas', [
    ['Família', 'Mamãe, papai e vovó', '👨‍👩‍👧', [
      mc('Quem é a "mamãe"?', 'Mom', ['Mom', '👩'], ['Dad', '👨'], ['Baby', '👶']),
      mc('Quem é o "papai"?', 'Dad', ['Dad', '👨'], ['Grandma', '👵'], ['Mom', '👩']),
      mc('Quem é a "vovó"?', 'Grandma', ['Grandma', '👵'], ['Grandpa', '👴'], ['Sister', '👧']),
      fill('I love my', 'mom', '.', ['ball', 'blue']),
      say('This is my brother', 'Este é meu irmão'),
    ]],
    ['Brinquedos', 'Bola, boneca e carrinho', '🧸', [
      mc('Qual é a "bola"?', 'Ball', ['Ball', '⚽'], ['Doll', '🪆'], ['Car', '🚗']),
      mc('Qual é o "ursinho"?', 'Teddy bear', ['Teddy bear', '🧸'], ['Kite', '🪁'], ['Ball', '⚽']),
      mc('Qual é a "pipa"?', 'Kite', ['Kite', '🪁'], ['Robot', '🤖'], ['Car', '🚗']),
      bank('Eu gosto do meu robô', 'I like my robot', ['car', 'you']),
      listen('A red car'),
    ]],
    ['Meu corpo', 'Cabeça, mãos e pés', '🖐️', [
      mc('Qual é a "mão"?', 'Hand', ['Hand', '✋'], ['Foot', '🦶'], ['Eye', '👁️']),
      mc('Qual é o "olho"?', 'Eye', ['Eye', '👁️'], ['Ear', '👂'], ['Nose', '👃']),
      mc('Qual é o "nariz"?', 'Nose', ['Nose', '👃'], ['Mouth', '👄'], ['Hand', '✋']),
      fill('I hear with my', 'ears', '.', ['feet', 'nose']),
      say('Touch your head', 'Toque na sua cabeça'),
    ]],
    ['Roupas', 'Camiseta, sapato e chapéu', '👕', [
      mc('Qual é a "camiseta"?', 'Shirt', ['Shirt', '👕'], ['Shoes', '👟'], ['Hat', '🎩']),
      mc('Qual é o "sapato"?', 'Shoes', ['Shoes', '👟'], ['Socks', '🧦'], ['Shirt', '👕']),
      mc('Qual é o "chapéu"?', 'Hat', ['Hat', '🎩'], ['Dress', '👗'], ['Socks', '🧦']),
      fill('My', 'socks', 'are white.', ['cat', 'apple']),
      listen('I like my hat'),
    ]],
  ]),

  unit('k', 4, 'Comidinhas', 'Frutas, lanches e festa', [
    ['Frutas', 'Maçã, banana e uva', '🍎', [
      mc('Qual é a "maçã"?', 'Apple', ['Apple', '🍎'], ['Banana', '🍌'], ['Grapes', '🍇']),
      mc('Qual é a "uva"?', 'Grapes', ['Grapes', '🍇'], ['Orange', '🍊'], ['Apple', '🍎']),
      mc('Qual é o "morango"?', 'Strawberry', ['Strawberry', '🍓'], ['Watermelon', '🍉'], ['Banana', '🍌']),
      fill('The banana is', 'yellow', 'and sweet.', ['blue', 'sad']),
      say('I like bananas', 'Eu gosto de bananas'),
    ]],
    ['Lanche', 'Pão, queijo e leite', '🥪', [
      mc('Qual é o "pão"?', 'Bread', ['Bread', '🍞'], ['Cheese', '🧀'], ['Egg', '🥚']),
      mc('Qual é o "queijo"?', 'Cheese', ['Cheese', '🧀'], ['Milk', '🥛'], ['Bread', '🍞']),
      mc('Qual é o "leite"?', 'Milk', ['Milk', '🥛'], ['Juice', '🧃'], ['Water', '💧']),
      bank('Eu estou com fome', 'I am hungry', ['happy', 'is']),
      listen('Milk please'),
    ]],
    ['Doces', 'Bolo, sorvete e chocolate', '🍰', [
      mc('Qual é o "bolo"?', 'Cake', ['Cake', '🍰'], ['Ice cream', '🍦'], ['Cookie', '🍪']),
      mc('Qual é o "sorvete"?', 'Ice cream', ['Ice cream', '🍦'], ['Candy', '🍬'], ['Cake', '🍰']),
      mc('Qual é o "biscoito"?', 'Cookie', ['Cookie', '🍪'], ['Chocolate', '🍫'], ['Candy', '🍬']),
      fill('Ice cream is', 'cold', '.', ['hot', 'loud']),
      say('Yummy cake', 'Bolo gostoso'),
    ]],
    ['Festa', 'Aniversário e presentes', '🎂', [
      mc('Qual é o "presente"?', 'Gift', ['Gift', '🎁'], ['Balloon', '🎈'], ['Candle', '🕯️']),
      mc('Qual é o "balão"?', 'Balloon', ['Balloon', '🎈'], ['Gift', '🎁'], ['Hat', '🥳']),
      fill('Happy', 'birthday', '!', ['banana', 'blue']),
      bank('Eu tenho seis anos', 'I am six years old', ['have', 'five']),
      listen('Happy birthday to you'),
    ]],
  ]),

  unit('k', 5, 'Vamos brincar', 'Escola, ações, sentimentos e tempo', [
    ['Escola', 'Lápis, livro e professora', '🎒', [
      mc('Qual é o "lápis"?', 'Pencil', ['Pencil', '✏️'], ['Book', '📕'], ['Bag', '🎒']),
      mc('Qual é o "livro"?', 'Book', ['Book', '📕'], ['Scissors', '✂️'], ['Pencil', '✏️']),
      mc('Qual é a "mochila"?', 'Backpack', ['Backpack', '🎒'], ['Crayon', '🖍️'], ['Book', '📕']),
      fill('I read a', 'book', '.', ['cat', 'milk']),
      say('Good morning teacher', 'Bom dia, professora'),
    ]],
    ['Ações', 'Correr, pular e dançar', '🏃', [
      mc('Qual é "correr"?', 'Run', ['Run', '🏃'], ['Swim', '🏊'], ['Sleep', '😴']),
      mc('Qual é "nadar"?', 'Swim', ['Swim', '🏊'], ['Dance', '💃'], ['Run', '🏃']),
      mc('Qual é "dormir"?', 'Sleep', ['Sleep', '😴'], ['Eat', '🍽️'], ['Jump', '🦘']),
      bank('Eu posso pular', 'I can jump', ['run', 'am']),
      listen("Let's dance"),
    ]],
    ['Sentimentos', 'Feliz, triste e bravo', '😊', [
      mc('Qual é "feliz"?', 'Happy', ['Happy', '😊'], ['Sad', '😢'], ['Angry', '😠']),
      mc('Qual é "triste"?', 'Sad', ['Sad', '😢'], ['Tired', '🥱'], ['Happy', '😊']),
      mc('Qual é "com sono / cansado"?', 'Tired', ['Tired', '🥱'], ['Scared', '😨'], ['Angry', '😠']),
      fill('I am', 'happy', 'today!', ['apple', 'table']),
      say('I am very happy', 'Eu estou muito feliz'),
    ]],
    ['Tempo', 'Sol, chuva e neve', '🌦️', [
      mc('Qual é o "sol"?', 'Sun', ['Sun', '☀️'], ['Rain', '🌧️'], ['Snow', '❄️']),
      mc('Qual é a "chuva"?', 'Rain', ['Rain', '🌧️'], ['Wind', '💨'], ['Sun', '☀️']),
      mc('Qual é a "neve"?', 'Snow', ['Snow', '❄️'], ['Cloud', '☁️'], ['Rain', '🌧️']),
      bank('Está ensolarado', 'It is sunny', ['rainy', 'are']),
      listen('It is cold'),
    ]],
  ]),
];
