import { bank, fill, hear, listen, mc, pairs, say, unit, write } from '../builders';

// Trilha 60+: frases úteis para saúde, rotina, passeios e conversar com a família.
// Ritmo calmo, frases curtas e vocabulário do cotidiano.
// 5 etapas × 4 lições × 6 exercícios = 120 perguntas.

export const seniors = [
  unit('s', 1, 'Primeiros passos', 'Cumprimentos, família, números e dias', [
    ['Cumprimentos', 'Bom dia e boa noite', '🌅', [
      mc('Como se diz "Bom dia"?', 'Good morning', ['Good morning', '🌅'], ['Good night', '🌙'], ['Good luck', '🍀']),
      hear('Good night', ['Good night', '🌙'], ['Good afternoon', '🌇'], ['Good morning', '🌅']),
      fill('How are', 'you', 'today?', ['me', 'they']),
      say('Thank you very much', 'Muito obrigado'),
      listen('Have a nice day'),
      pairs(["Good morning", "Bom dia"], ["Good night", "Boa noite"], ["Thank you", "Obrigado"], ["Please", "Por favor"]),
    ]],
    ['Família', 'Filhos e netos', '👵', [
      mc('Quem é o "neto"?', 'Grandson', ['Grandson', '👦'], ['Son', '👨'], ['Husband', '🧔']),
      hear('Daughter', ['Daughter', '👩'], ['Granddaughter', '👧'], ['Wife', '👰']),
      fill('I have three', 'grandchildren', '.', ['grandparents', 'kitchens']),
      bank('Esta é minha esposa', 'This is my wife', ['husband', 'is']),
      say('I love my grandchildren', 'Eu amo meus netos'),
      pairs(["Grandson", "Neto"], ["Daughter", "Filha"], ["Wife", "Esposa"], ["Husband", "Marido"]),
    ]],
    ['Números', 'Idade, preços e telefones', '🔢', [
      mc('Qual é o número "cem"?', 'One hundred', ['One hundred', '💯'], ['Ten', '🔟'], ['One thousand', '🔢']),
      hear('Sixty', ['Sixty', '6️⃣'], ['Sixteen', '1️⃣'], ['Seventy', '7️⃣']),
      fill('I am seventy', 'years', 'old.', ['days', 'yours']),
      say('My phone number is', 'Meu número de telefone é'),
      listen('It costs fifty dollars'),
      pairs(["Sixty", "Sessenta"], ["Seventy", "Setenta"], ["Hundred", "Cem"], ["Fifty", "Cinquenta"]),
    ]],
    ['Dias da semana', 'Organizar a semana', '🗓️', [
      mc('Qual é "domingo"?', 'Sunday', ['Sunday', '☀️'], ['Saturday', '🛒'], ['Tuesday', '📅']),
      hear('Yesterday', ['Yesterday', '⏪'], ['Tomorrow', '⏩'], ['Today', '📍']),
      fill('See you on', 'Tuesday', '!', ['tomorrow night', 'January']),
      bank('Hoje é quarta-feira', 'Today is Wednesday', ['Thursday', 'are']),
      listen('What day is today'),
      pairs(["Sunday", "Domingo"], ["Tuesday", "Terça-feira"], ["Yesterday", "Ontem"], ["Tomorrow", "Amanhã"]),
    ]],
  ]),

  unit('s', 2, 'Saúde', 'Médico, farmácia, corpo e emergência', [
    ['No médico', 'Consulta e sintomas', '🩺', [
      mc('Qual é o "médico"?', 'Doctor', ['Doctor', '🧑‍⚕️'], ['Dentist', '🦷'], ['Nurse', '💉']),
      fill('I have an', 'appointment', 'at ten.', ['apple', 'opinion']),
      bank('Eu tenho pressão alta', 'I have high blood pressure', ['low', 'am']),
      say('I need to see a doctor', 'Eu preciso ver um médico'),
      listen('How long have you felt this way'),
      pairs(["Doctor", "Médico"], ["Dentist", "Dentista"], ["Blood pressure", "Pressão"], ["Appointment", "Consulta"]),
    ]],
    ['Farmácia', 'Remédios e receitas', '💊', [
      mc('Qual é o "remédio"?', 'Medicine', ['Medicine', '💊'], ['Glasses', '👓'], ['Bandage', '🩹']),
      hear('Prescription', ['Prescription', '📝'], ['Receipt', '🧾'], ['Recipe', '📖']),
      fill('Take one pill', 'every', 'eight hours.', ['all', 'any']),
      say('Do you have something for a cold', 'Você tem algo para resfriado?'),
      listen('Take it after meals'),
      pairs(["Medicine", "Remédio"], ["Pill", "Comprimido"], ["Prescription", "Receita"], ["Cold", "Resfriado"]),
    ]],
    ['Meu corpo', 'Onde dói?', '🦵', [
      mc('Qual é o "joelho"?', 'Knee', ['Knee', '🦵'], ['Back', '🔙'], ['Shoulder', '💪']),
      hear('Tooth', ['Tooth', '🦷'], ['Ear', '👂'], ['Eye', '👁️']),
      fill('My', 'back', 'hurts.', ['backs', 'book']),
      bank('Eu não consigo dormir bem', "I can't sleep well", ['good', 'do']),
      listen('Where does it hurt'),
      pairs(["Knee", "Joelho"], ["Back", "Costas"], ["Tooth", "Dente"], ["Shoulder", "Ombro"]),
    ]],
    ['Emergência', 'Pedir ajuda', '🚑', [
      mc('Como se diz "Socorro!"?', 'Help', ['Help', '🆘'], ['Hello', '👋'], ['Hurry', '🏃']),
      hear('Ambulance', ['Ambulance', '🚑'], ['Police', '🚓'], ['Taxi', '🚕']),
      fill('Please call an', 'ambulance', '!', ['umbrella', 'apple']),
      say('I need help please', 'Eu preciso de ajuda, por favor'),
      listen('Stay calm help is coming'),
      pairs(["Help", "Socorro"], ["Ambulance", "Ambulância"], ["Police", "Polícia"], ["Fire", "Fogo"]),
    ]],
  ]),

  unit('s', 3, 'Casa e rotina', 'Casa, cozinha, jardim e o dia a dia', [
    ['Minha casa', 'Cômodos da casa', '🏠', [
      mc('Qual é a "cozinha"?', 'Kitchen', ['Kitchen', '🍳'], ['Bedroom', '🛏️'], ['Bathroom', '🛁']),
      hear('Living room', ['Living room', '🛋️'], ['Garage', '🚗'], ['Kitchen', '🍳']),
      fill('The bathroom is', 'upstairs', '.', ['upside', 'uphill']),
      bank('Bem-vindo à minha casa', 'Welcome to my home', ['house', 'in']),
      listen('Please come in'),
      pairs(["Kitchen", "Cozinha"], ["Bedroom", "Quarto"], ["Bathroom", "Banheiro"], ["Living room", "Sala"]),
    ]],
    ['Cozinha', 'Receitas e temperos', '🍲', [
      mc('Qual é o "sal"?', 'Salt', ['Salt', '🧂'], ['Sugar', '🍬'], ['Pepper', '🌶️']),
      hear('Pot', ['Pot', '🍲'], ['Spoon', '🥄'], ['Plate', '🍽️']),
      fill('Mix the flour with two', 'eggs', '.', ['legs', 'bags']),
      say('This soup is delicious', 'Esta sopa está deliciosa'),
      listen('The cake is in the oven'),
      pairs(["Salt", "Sal"], ["Sugar", "Açúcar"], ["Pot", "Panela"], ["Spoon", "Colher"]),
    ]],
    ['Jardim', 'Plantas e flores', '🌻', [
      mc('Qual é a "flor"?', 'Flower', ['Flower', '🌸'], ['Tree', '🌳'], ['Leaf', '🍃']),
      hear('Tree', ['Tree', '🌳'], ['Grass', '🌱'], ['Flower', '🌸']),
      fill('I', 'water', 'the plants every morning.', ['eat', 'read']),
      bank('As rosas são lindas', 'The roses are beautiful', ['is', 'flower']),
      say('I love my garden', 'Eu amo meu jardim'),
      pairs(["Flower", "Flor"], ["Tree", "Árvore"], ["Grass", "Grama"], ["Leaf", "Folha"]),
    ]],
    ['Rotina', 'Do café ao jantar', '☕', [
      mc('Qual é o "café da manhã"?', 'Breakfast', ['Breakfast', '🥐'], ['Lunch', '🍛'], ['Dinner', '🍝']),
      fill('I take a', 'walk', 'after lunch.', ['work', 'wall']),
      bank('Eu vou dormir às dez', 'I go to bed at ten', ['in', 'sleep']),
      say('I read the newspaper every day', 'Eu leio o jornal todos os dias'),
      listen('Dinner is ready'),
      pairs(["Breakfast", "Café da manhã"], ["Lunch", "Almoço"], ["Dinner", "Jantar"], ["Walk", "Caminhada"]),
    ]],
  ]),

  unit('s', 4, 'Passeios', 'Viagem, restaurante, compras e clima', [
    ['Viagem', 'Passaporte e malas', '🧳', [
      mc('Qual é o "passaporte"?', 'Passport', ['Passport', '🛂'], ['Wallet', '👛'], ['Map', '🗺️']),
      fill('Where is the', 'exit', ', please?', ['exist', 'egg']),
      bank('Eu preciso de uma cadeira de rodas', 'I need a wheelchair', ['chair', 'the']),
      say('Can you help me with my bag', 'Pode me ajudar com a minha mala?'),
      listen('Your flight is on time'),
      pairs(["Passport", "Passaporte"], ["Exit", "Saída"], ["Bag", "Mala"], ["Wheelchair", "Cadeira de rodas"]),
    ]],
    ['Restaurante', 'Pedir com calma', '🍝', [
      mc('Qual é a "água sem gás"?', 'Still water', ['Still water', '💧'], ['Sparkling water', '🫧'], ['Hot water', '♨️']),
      fill('Can you speak more', 'slowly', ', please?', ['slow', 'sleep']),
      bank('Sem sal, por favor', 'No salt please', ['sugar', 'with']),
      say('I would like the fish', 'Eu gostaria do peixe'),
      listen('Would you like dessert'),
      pairs(["Water", "Água"], ["Fish", "Peixe"], ["Dessert", "Sobremesa"], ["Bill", "Conta"]),
    ]],
    ['Compras', 'Na loja e na feira', '🛍️', [
      mc('Como se diz "Quanto custa?"', 'How much is this', ['How much is this', '💲'], ['What time is it', '🕒'], ['Where is it', '📍']),
      hear('Change', ['Change', '🪙'], ['Price', '🏷️'], ['Bag', '🛍️']),
      fill('Do you have a', 'bigger', 'size?', ['big', 'biggest']),
      say('I am just looking thank you', 'Só estou olhando, obrigado'),
      listen('We are closed on Sundays'),
      pairs(["Change", "Troco"], ["Price", "Preço"], ["Size", "Tamanho"], ["Open", "Aberto"]),
    ]],
    ['O tempo', 'Calor, frio e chuva', '⛅', [
      mc('Como se diz "Está frio"?', 'It is cold', ['It is cold', '🥶'], ['It is hot', '🥵'], ['It is windy', '💨']),
      hear('Umbrella', ['Umbrella', '☂️'], ['Coat', '🧥'], ['Scarf', '🧣']),
      fill('Take a', 'coat', ', it is cold outside.', ['cat', 'cake']),
      bank('Vai chover amanhã', 'It will rain tomorrow', ['rains', 'today']),
      listen('What a lovely sunny day'),
      pairs(["Cold", "Frio"], ["Hot", "Quente"], ["Umbrella", "Guarda-chuva"], ["Coat", "Casaco"]),
    ]],
  ]),

  unit('s', 5, 'Conversar', 'Netos, lembranças, sentimentos e festas', [
    ['Chamada de vídeo', 'Falar com a família', '📱', [
      mc('Como se diz "Não consigo te ouvir"?', "I can't hear you", ["I can't hear you", '🔇'], ["I can't see you", '🙈'], ['I miss you', '🥺']),
      fill('Can you', 'see', 'me now?', ['sea', 'say']),
      write('Eu sinto sua falta', 'I miss you'),
      say('Turn on your camera', 'Ligue a sua câmera'),
      listen('Your voice is breaking up'),
      pairs(["Camera", "Câmera"], ["Voice", "Voz"], ["Screen", "Tela"], ["Hear", "Ouvir"]),
    ]],
    ['Lembranças', 'Contar histórias', '📷', [
      mc('Qual é "a foto"?', 'Photo', ['Photo', '📷'], ['Letter', '✉️'], ['Song', '🎵']),
      fill('When I was', 'young', ', I lived on a farm.', ['old man', 'yellow']),
      write('Eu me casei em 1975', 'I got married in 1975', ["I married in 1975"]),
      say('Those were good times', 'Aqueles foram bons tempos'),
      listen('Let me tell you a story'),
      pairs(["Photo", "Foto"], ["Young", "Jovem"], ["Married", "Casado"], ["Story", "História"]),
    ]],
    ['Sentimentos', 'Como você está?', '💛', [
      mc('Como se diz "Estou orgulhoso de você"?', 'I am proud of you', ['I am proud of you', '🥹'], ['I am angry with you', '😠'], ['I am tired of you', '🥱']),
      hear('Tired', ['Tired', '😴'], ['Hungry', '🍽️'], ['Happy', '😊']),
      fill('I feel much', 'better', 'today.', ['good', 'best']),
      write('Estou muito feliz em te ver', 'I am so happy to see you', ["I am very happy to see you", "I'm so happy to see you"]),
      say('You make me happy', 'Você me faz feliz'),
      pairs(["Proud", "Orgulhoso"], ["Tired", "Cansado"], ["Better", "Melhor"], ["Happy", "Feliz"]),
    ]],
    ['Datas festivas', 'Aniversário, Natal e Páscoa', '🎄', [
      mc('Como se diz "Feliz Natal"?', 'Merry Christmas', ['Merry Christmas', '🎄'], ['Happy Easter', '🐣'], ['Happy New Year', '🎆']),
      mc('Como se diz "Feliz Ano Novo"?', 'Happy New Year', ['Happy New Year', '🎆'], ['Happy birthday', '🎂'], ['Merry Christmas', '🎄']),
      fill('Happy', 'anniversary', ', my love!', ['animal', 'answer']),
      say('Congratulations', 'Parabéns'),
      listen('The whole family is coming for dinner'),
      pairs(["Christmas", "Natal"], ["Easter", "Páscoa"], ["New Year", "Ano Novo"], ["Birthday", "Aniversário"]),
    ]],
  ]),
];
