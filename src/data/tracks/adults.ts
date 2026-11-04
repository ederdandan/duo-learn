import { bank, fill, hear, listen, mc, pairs, say, unit, write } from '../builders';

// Trilha de adultos: situações práticas do dia a dia, viagem e trabalho.
// 5 etapas × 4 lições × 6 exercícios = 120 perguntas.

export const adults = [
  unit('a', 1, 'O básico', 'Apresentar-se, profissões, números e datas', [
    ['Apresentações', 'Dizer quem você é', '🤝', [
      mc('Como se diz "Prazer em conhecer"?', 'Nice to meet you', ['Nice to meet you', '🤝'], ['See you later', '👋'], ['Excuse me', '🙋']),
      fill('My', 'name', 'is Carlos.', ['work', 'city']),
      bank('Eu sou do Brasil', 'I am from Brazil', ['in', 'is']),
      say('Where are you from', 'De onde você é?'),
      listen('I live in São Paulo'),
      pairs(["Name", "Nome"], ["City", "Cidade"], ["Country", "País"], ["Friend", "Amigo"]),
    ]],
    ['Profissões', 'O que você faz', '💼', [
      mc('Qual é o "médico"?', 'Doctor', ['Doctor', '🧑‍⚕️'], ['Teacher', '🧑‍🏫'], ['Cook', '🧑‍🍳']),
      hear('Engineer', ['Engineer', '👷'], ['Lawyer', '⚖️'], ['Nurse', '💉']),
      fill('What do you do? I am a', 'teacher', '.', ['happy', 'kitchen']),
      bank('Eu trabalho em um banco', 'I work at a bank', ['works', 'the']),
      say('I am a software developer', 'Eu sou desenvolvedor de software'),
      pairs(["Doctor", "Médico"], ["Teacher", "Professor"], ["Lawyer", "Advogado"], ["Nurse", "Enfermeiro"]),
    ]],
    ['Números e horas', 'Que horas são?', '🕒', [
      mc('Como se diz "Que horas são?"', 'What time is it', ['What time is it', '🕒'], ['How old are you', '🎂'], ['How much is it', '💲']),
      fill('It is three', "o'clock", '.', ['hours', 'times']),
      hear('Noon', ['Noon', '🕛'], ['Midnight', '🌙'], ['Morning', '🌅']),
      listen('The meeting is at ten thirty'),
      say('I wake up at seven', 'Eu acordo às sete'),
      pairs(["Noon", "Meio-dia"], ["Midnight", "Meia-noite"], ["Hour", "Hora"], ["Minute", "Minuto"]),
    ]],
    ['Dias e meses', 'Agenda e datas', '📅', [
      mc('Qual é "segunda-feira"?', 'Monday', ['Monday', '📅'], ['Sunday', '☀️'], ['Friday', '🎉']),
      fill('Today is', 'Friday', ', the weekend is coming!', ['Monday', 'January']),
      bank('Meu aniversário é em maio', 'My birthday is in May', ['on', 'at']),
      hear('Weekend', ['Weekend', '🏖️'], ['Weekday', '🏢'], ['Holiday', '🎄']),
      listen('See you next week'),
      pairs(["Monday", "Segunda-feira"], ["Friday", "Sexta-feira"], ["Weekend", "Fim de semana"], ["Month", "Mês"]),
    ]],
  ]),

  unit('a', 2, 'Comer fora', 'Restaurante, café, mercado e pagamento', [
    ['No restaurante', 'Fazer o pedido', '🍽️', [
      mc('Como se pede "o cardápio"?', 'The menu please', ['The menu please', '📋'], ['The bill please', '🧾'], ['A table please', '🪑']),
      fill('I would like the', 'chicken', ', please.', ['airport', 'Monday']),
      bank('Uma mesa para dois, por favor', 'A table for two please', ['three', 'the']),
      say('Can I see the menu', 'Posso ver o cardápio?'),
      listen('Are you ready to order'),
      pairs(["Menu", "Cardápio"], ["Waiter", "Garçom"], ["Fork", "Garfo"], ["Knife", "Faca"]),
    ]],
    ['Na cafeteria', 'Café e lanche', '☕', [
      mc('Qual é o "café com leite"?', 'Coffee with milk', ['Coffee with milk', '☕'], ['Black tea', '🍵'], ['Orange juice', '🧃']),
      fill('Can I have a', 'large', 'coffee?', ['tall', 'long']),
      bank('Para viagem, por favor', 'To go please', ['here', 'for']),
      say('No sugar please', 'Sem açúcar, por favor'),
      listen('For here or to go'),
      pairs(["Coffee", "Café"], ["Tea", "Chá"], ["Sugar", "Açúcar"], ["Cup", "Xícara"]),
    ]],
    ['Supermercado', 'Fazer compras', '🛒', [
      mc('Qual é o "carrinho de compras"?', 'Shopping cart', ['Shopping cart', '🛒'], ['Receipt', '🧾'], ['Cashier', '🧑‍💼']),
      fill('Where can I find the', 'eggs', '?', ['happy', 'slowly']),
      hear('Vegetables', ['Vegetables', '🥦'], ['Meat', '🥩'], ['Bread', '🥖']),
      bank('Eu preciso de um quilo de arroz', 'I need a kilo of rice', ['the', 'some']),
      listen('Do you need a bag'),
      pairs(["Eggs", "Ovos"], ["Rice", "Arroz"], ["Vegetables", "Legumes"], ["Meat", "Carne"]),
    ]],
    ['Pagamento', 'Conta, cartão e gorjeta', '💳', [
      mc('Como se pede "a conta"?', 'The check please', ['The check please', '🧾'], ['The menu please', '📋'], ['Water please', '💧']),
      fill('Can I pay by', 'card', '?', ['bus', 'phone call']),
      hear('Tip', ['Tip', '💵'], ['Change', '🪙'], ['Price', '🏷️']),
      say('Keep the change', 'Pode ficar com o troco'),
      listen('That will be twenty dollars'),
      pairs(["Tip", "Gorjeta"], ["Change", "Troco"], ["Price", "Preço"], ["Receipt", "Recibo"]),
    ]],
  ]),

  unit('a', 3, 'Viagem', 'Aeroporto, hotel, direções e transporte', [
    ['Aeroporto', 'Check-in e embarque', '✈️', [
      mc('Qual é o "cartão de embarque"?', 'Boarding pass', ['Boarding pass', '🎫'], ['Passport', '🛂'], ['Suitcase', '🧳']),
      hear('Suitcase', ['Suitcase', '🧳'], ['Backpack', '🎒'], ['Ticket', '🎟️']),
      fill('Where is', 'gate', 'twelve?', ['door', 'room']),
      write('Meu voo está atrasado', 'My flight is delayed', ["My flight is late"]),
      listen('Please show your passport'),
      pairs(["Suitcase", "Mala"], ["Gate", "Portão"], ["Flight", "Voo"], ["Passport", "Passaporte"]),
    ]],
    ['Hotel', 'Reserva e quarto', '🏨', [
      mc('Como se diz "Eu tenho uma reserva"?', 'I have a reservation', ['I have a reservation', '📖'], ['I need a taxi', '🚕'], ['I am lost', '🗺️']),
      fill('What time is', 'check-out', '?', ['breakfasts', 'airport']),
      write('O ar-condicionado não funciona', 'The air conditioning does not work', ["The AC doesn't work", "The air conditioner doesn't work", "The air conditioning isn't working"]),
      say('Is breakfast included', 'O café da manhã está incluído?'),
      listen('Your room is on the fifth floor'),
      pairs(["Room", "Quarto"], ["Key", "Chave"], ["Floor", "Andar"], ["Breakfast", "Café da manhã"]),
    ]],
    ['Direções', 'Perguntar o caminho', '🧭', [
      mc('Como se diz "vire à esquerda"?', 'Turn left', ['Turn left', '⬅️'], ['Turn right', '➡️'], ['Go straight', '⬆️']),
      hear('Go straight', ['Go straight', '⬆️'], ['Go back', '⬇️'], ['Turn left', '⬅️']),
      fill('The museum is', 'next', 'to the park.', ['near of', 'front']),
      say('Excuse me where is the subway', 'Com licença, onde fica o metrô?'),
      listen('It is two blocks from here'),
      pairs(["Left", "Esquerda"], ["Right", "Direita"], ["Corner", "Esquina"], ["Street", "Rua"]),
    ]],
    ['Transporte', 'Táxi, ônibus e trem', '🚆', [
      mc('Qual é o "metrô"?', 'Subway', ['Subway', '🚇'], ['Bus', '🚌'], ['Ferry', '⛴️']),
      fill('How much is a', 'ticket', 'to downtown?', ['tickets', 'travel']),
      write('Qual ônibus vai para a praia', 'Which bus goes to the beach', ["What bus goes to the beach"]),
      say('Please take me to this address', 'Por favor, me leve a este endereço'),
      listen('The train leaves at noon'),
      pairs(["Subway", "Metrô"], ["Bus", "Ônibus"], ["Train", "Trem"], ["Ticket", "Passagem"]),
    ]],
  ]),

  unit('a', 4, 'Trabalho', 'Escritório, reuniões, telefone e entrevista', [
    ['Escritório', 'Rotina de trabalho', '🏢', [
      mc('Qual é a "reunião"?', 'Meeting', ['Meeting', '👥'], ['Deadline', '⏰'], ['Report', '📊']),
      hear('Deadline', ['Deadline', '⏰'], ['Salary', '💰'], ['Meeting', '👥']),
      fill('I will send you the', 'report', 'today.', ['coffee', 'lunch break']),
      write('Eu trabalho de casa às sextas', 'I work from home on Fridays', ["I work from home on Friday"]),
      listen('The printer is not working'),
      pairs(["Meeting", "Reunião"], ["Deadline", "Prazo"], ["Report", "Relatório"], ["Salary", "Salário"]),
    ]],
    ['Reuniões', 'Participar e opinar', '🗣️', [
      mc('Como se diz "Eu concordo"?', 'I agree', ['I agree', '👍'], ['I disagree', '👎'], ['I forgot', '🤷']),
      fill('Could you', 'repeat', 'that, please?', ['repeating', 'repeated']),
      write('Vamos marcar outra reunião', "Let's schedule another meeting", ["Let's book another meeting", "Let's set up another meeting"]),
      say('I have a question', 'Eu tenho uma pergunta'),
      listen("Let's get started"),
      pairs(["Agree", "Concordar"], ["Question", "Pergunta"], ["Schedule", "Agendar"], ["Idea", "Ideia"]),
    ]],
    ['Telefone e e-mail', 'Comunicação', '📞', [
      mc('Como se diz "Quem está falando?"', 'Who is calling', ['Who is calling', '📞'], ['Who are you', '❓'], ['Call me back', '🔁']),
      fill('I am', 'looking', 'forward to hearing from you.', ['look', 'looks']),
      write('Posso deixar um recado', 'Can I leave a message', ["May I leave a message"]),
      say('Please find the file attached', 'Segue o arquivo em anexo'),
      listen('I will call you back later'),
      pairs(["Message", "Recado"], ["Call", "Ligar"], ["Attachment", "Anexo"], ["Reply", "Responder"]),
    ]],
    ['Entrevista', 'Conseguir o emprego', '🎯', [
      mc('Qual é o "currículo"?', 'Resume', ['Resume', '📄'], ['Contract', '📜'], ['Interview', '🎤']),
      fill('I have five years of', 'experience', 'in sales.', ['experiences', 'expert']),
      write('Eu trabalho bem em equipe', 'I work well in a team', ["I work well in teams", "I work well on a team"]),
      say('My greatest strength is communication', 'Meu maior ponto forte é a comunicação'),
      listen('Tell me about yourself'),
      pairs(["Resume", "Currículo"], ["Experience", "Experiência"], ["Team", "Equipe"], ["Skill", "Habilidade"]),
    ]],
  ]),

  unit('a', 5, 'Vida social', 'Planos, compras, saúde e bate-papo', [
    ['Fazer planos', 'Convites e combinados', '📆', [
      mc('Como se diz "Você está livre hoje à noite?"', 'Are you free tonight', ['Are you free tonight', '🌙'], ['Are you tired today', '🥱'], ['Are you at home', '🏠']),
      fill('Do you want to', 'grab', 'a drink later?', ['grabbing', 'grabs']),
      write('Vamos ao cinema no sábado', "Let's go to the movies on Saturday", ["Let's go to the cinema on Saturday", "Let's go to the movies Saturday"]),
      say('Sounds great', 'Parece ótimo'),
      listen('Maybe next time'),
      pairs(["Tonight", "Hoje à noite"], ["Movies", "Cinema"], ["Drink", "Bebida"], ["Plan", "Plano"]),
    ]],
    ['Compras de roupa', 'Tamanho e provador', '🛍️', [
      mc('Qual é o "provador"?', 'Fitting room', ['Fitting room', '🚪'], ['Cash register', '🧾'], ['Shop window', '🪟']),
      fill('Do you have this in a', 'smaller', 'size?', ['small', 'smallest']),
      write('Isso está em promoção', 'This is on sale', ["It is on sale"]),
      say('Can I try this on', 'Posso experimentar isto?'),
      listen('It fits perfectly'),
      pairs(["Size", "Tamanho"], ["Sale", "Promoção"], ["Fitting room", "Provador"], ["Pants", "Calça"]),
    ]],
    ['Saúde', 'No médico e na farmácia', '🩺', [
      mc('Como se diz "dor de cabeça"?', 'Headache', ['Headache', '🤕'], ['Stomachache', '🤢'], ['Toothache', '🦷']),
      fill('I need to make an', 'appointment', 'with the doctor.', ['appoint', 'apartment']),
      write('Eu sou alérgico a penicilina', 'I am allergic to penicillin', ["I'm allergic to penicillin"]),
      say('I do not feel well', 'Eu não estou me sentindo bem'),
      listen('Take this medicine twice a day'),
      pairs(["Headache", "Dor de cabeça"], ["Appointment", "Consulta"], ["Medicine", "Remédio"], ["Fever", "Febre"]),
    ]],
    ['Bate-papo', 'Clima e conversa fiada', '☕', [
      mc('Como se diz "Que dia lindo!"?', 'What a beautiful day', ['What a beautiful day', '🌞'], ['What a long week', '📅'], ['What a cold night', '🥶']),
      fill('How was your', 'weekend', '?', ['tomorrow', 'next']),
      write('Faz tempo que não te vejo', 'Long time no see', ["I haven't seen you in a long time", "It's been a long time"]),
      say('How have you been', 'Como você tem passado?'),
      listen('It is supposed to rain tomorrow'),
      pairs(["Weather", "Clima"], ["Rain", "Chuva"], ["Cold", "Frio"], ["Hot", "Calor"]),
    ]],
  ]),
];
