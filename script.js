// ============================================================
// 7A0 - SCRIPT.JS COMPLETO
// ============================================================
// ORDEM DO JOGO:
//
// 1. Sortear clube
// 2. Escolher jogador
// 3. Clicar na posição correta
//
// REGRAS:
//
// - Jogador só pode jogar na posição cadastrada.
// - Dois ZAG podem ser jogadores diferentes.
// - Dois MC podem ser jogadores diferentes.
// - Cada vaga do campo possui um ID próprio.
// - Quando não houver mais vaga para uma posição,
//   os jogadores daquela posição ficam bloqueados.
// - Depois que um jogador é colocado, o clube fica usado.
// ============================================================


// ============================================================
// CLUBES DA SÉRIE A 2026
// ============================================================

const CLUBS = [
  "Athletico-PR",
  "Atlético-MG",
  "Bahia",
  "Botafogo",
  "Chapecoense",
  "Corinthians",
  "Coritiba",
  "Cruzeiro",
  "Flamengo",
  "Fluminense",
  "Grêmio",
  "Internacional",
  "Mirassol",
  "Palmeiras",
  "Red Bull Bragantino",
  "Remo",
  "Santos",
  "São Paulo",
  "Vasco",
  "Vitória"
];


// ============================================================
// 8 FORMAÇÕES
// ============================================================

const FORMATIONS = {

  "4-3-3": [
    ["PE", "CA", "PD"],
    ["MEI", "MC", "MC"],
    ["LE", "ZAG", "ZAG", "LD"],
    ["GOL"]
  ],

  "4-4-2": [
    ["PE", "CA", "PD"],
    ["MEI", "MC", "VOL", "MEI"],
    ["LE", "ZAG", "ZAG", "LD"],
    ["GOL"]
  ],

  "4-2-3-1": [
    ["CA"],
    ["PE", "MEI", "PD"],
    ["VOL", "VOL"],
    ["LE", "ZAG", "ZAG", "LD"],
    ["GOL"]
  ],

  "4-3-1-2": [
    ["CA", "CA"],
    ["MEI"],
    ["MC", "VOL", "MC"],
    ["LE", "ZAG", "ZAG", "LD"],
    ["GOL"]
  ],

  "3-5-2": [
    ["CA", "CA"],
    ["PE", "MEI", "MC", "MEI", "PD"],
    ["ZAG", "ZAG", "ZAG"],
    ["GOL"]
  ],

  "3-4-3": [
    ["PE", "CA", "PD"],
    ["MEI", "MC", "MC", "MEI"],
    ["ZAG", "ZAG", "ZAG"],
    ["GOL"]
  ],

  "5-3-2": [
    ["CA", "CA"],
    ["MC", "VOL", "MC"],
    ["LE", "ZAG", "ZAG", "ZAG", "LD"],
    ["GOL"]
  ],

  "5-4-1": [
    ["CA"],
    ["PE", "MEI", "MC", "PD"],
    ["LE", "ZAG", "ZAG", "ZAG", "LD"],
    ["GOL"]
  ]

};


// ============================================================
// NOMES DAS POSIÇÕES
// ============================================================

const POS = {

  GOL: "Goleiro",
  LE: "Lateral esquerdo",
  LD: "Lateral direito",
  ZAG: "Zagueiro",
  VOL: "Volante",
  MC: "Meia central",
  MEI: "Meia ofensivo",
  PE: "Ponta esquerda",
  PD: "Ponta direita",
  CA: "Centroavante"

};


// ============================================================
// ELENCOS
// ============================================================
// [Nome, posição, OVR]
// ============================================================

const RAW = {

  "Athletico-PR": [
    ["Santos","GOL",84],
    ["Mycael","GOL",78],
    ["Esquivel","LE",82],
    ["Fernando","LD",80],
    ["Gamarra","ZAG",82],
    ["Aguirre","ZAG",81],
    ["Mastriani","CA",80],
    ["Luiz Fernando","PE",82],
    ["João Cruz","MEI",84],
    ["Matheus Pereira","MC",82],
    ["Portilla","VOL",81],
    ["Jadson","MC",80],
    ["Isaac","CA",79],
    ["Rômulo","PE",78],
    ["Cuello","PD",81],
    ["Gonzalo Mastriani","CA",80],
    ["Luiz Gustavo","VOL",79],
    ["Leo Derik","PD",78],
    ["Gastón Benavídez","LD",82],
    ["Lucas Belezi","ZAG",76]
  ],


  "Atlético-MG": [
    ["Everson","GOL",86],
    ["Matheus Mendes","GOL",78],
    ["Renan Lodi","LE",84],
    ["Natanael","LD",82],
    ["Lyanco","ZAG",83],
    ["Júnior Alonso","ZAG",85],
    ["Caua","ZAG",75],
    ["Alan Franco","MC",84],
    ["Reinier","MEI",85],
    ["Dudu","PE",84],
    ["Hulk","CA",90],
    ["Bernard","PE",81],
    ["Gustavo Scarpa","MEI",86],
    ["Igor Gomes","MC",80],
    ["Victor Hugo","MC",79],
    ["Cuello","PD",82],
    ["Rony","CA",84],
    ["Vitor Hugo","ZAG",78],
    ["Alexsander","VOL",80],
    ["Angelo Preciado","LD",81]
  ],


  "Bahia": [
    ["Guido Herrera","GOL",84],
    ["Marcos Felipe","GOL",80],
    ["Iago","LE",82],
    ["Gilberto","LD",81],
    ["Kanu","ZAG",82],
    ["Ramos Mingo","ZAG",84],
    ["David Duarte","ZAG",80],
    ["Jean Lucas","MC",84],
    ["Caio Alexandre","VOL",83],
    ["Éverton Ribeiro","MEI",87],
    ["Cauly","MEI",85],
    ["Rodrigo Nestor","MC",84],
    ["Ademir","PD",81],
    ["Erick Pulga","PE",84],
    ["Luciano Juba","PE",83],
    ["Willian José","CA",84],
    ["Everaldo","CA",79],
    ["Acevedo","VOL",80],
    ["Kike Olivera","PD",82],
    ["Sanabria","MEI",80]
  ],


  "Botafogo": [
    ["Batista","GOL",80],
    ["Raul","GOL",77],
    ["Marçal","LE",82],
    ["Vitinho","LD",82],
    ["Alexander Barboza","ZAG",84],
    ["Ythallo","ZAG",76],
    ["Kaio Pantaleão","ZAG",78],
    ["Allan","MC",84],
    ["Edenilson","MC",81],
    ["Danilo Santos","VOL",80],
    ["Paulinho","PE",84],
    ["Artur","PD",84],
    ["Arthur Cabral","CA",84],
    ["Junior","PE",79],
    ["Newton","VOL",79],
    ["Miguel Caldas","MEI",77],
    ["Gabriel Pereira","PE",80],
    ["Cristhian Loor","LD",78],
    ["Cleber","ZAG",77],
    ["Leo Linck","GOL",78]
  ],


  "Chapecoense": [
    ["Rafael Santos","GOL",78],
    ["Mailson","GOL",77],
    ["Leo Vieira","LE",78],
    ["Marcinho","LD",78],
    ["Bruno Leonardo","ZAG",81],
    ["Edu Doma","ZAG",78],
    ["Victor Caetano","ZAG",77],
    ["Jean Carlos","MC",80],
    ["Camilo","MEI",80],
    ["Higor","VOL",77],
    ["Bolasie","PE",82],
    ["Italo","CA",78],
    ["Garcez","CA",76],
    ["Walter Clar","MC",78],
    ["Rubens","VOL",76],
    ["Everton","PD",77],
    ["João Vitor","ZAG",75],
    ["Rafael Carvalheira","MEI",76],
    ["Pedro Henrique","PE",76],
    ["Marcelo Santos","LD",77]
  ],


  "Corinthians": [
    ["Hugo Souza","GOL",84],
    ["Matheus Donelli","GOL",76],
    ["Matheuzinho","LD",82],
    ["Matheus Bidu","LE",80],
    ["André Ramalho","ZAG",83],
    ["Gustavo Henrique","ZAG",82],
    ["Gabriel","ZAG",79],
    ["Charles","VOL",80],
    ["Alex Santana","VOL",81],
    ["Breno Bidon","MC",82],
    ["Rodrigo Garro","MEI",88],
    ["André Carrillo","PD",84],
    ["Vitinho","PE",82],
    ["Memphis Depay","CA",89],
    ["Yuri Alberto","CA",86],
    ["Pedro Raul","CA",80],
    ["Raniele","VOL",81],
    ["Dieguinho","PE",77],
    ["Kayke","PD",76],
    ["Guilherme","MC",77]
  ],


  // ==========================================================
  // CORITIBA
  // ==========================================================

  "Coritiba": [
    ["Pedro Morisco","GOL",84],
    ["Pedro Rangel","GOL",80],
    ["Keiller","GOL",78],

    ["Felipe","LE",82],
    ["Felipe Jonatan","LE",82],

    ["Tinga","LD",82],
    ["JP Chermont","LD",80],

    ["Maicon","ZAG",82],
    ["Rodrigo Moledo","ZAG",84],
    ["Bruno Melo","ZAG",78],
    ["Tiago Coser","ZAG",79],

    ["Jacy","VOL",83],
    ["Vini Paulista","VOL",85],
    ["Thiago Santos","VOL",82],

    ["Sebastian Gomez","MC",86],

    ["Josue","MEI",99],

    ["Lucas Ronier","MEI",84],

    ["Lavega","PD",85],

    ["Breno","PE",87],

    ["Pedro Rocha","PE",84],

    ["Robson","CA",82],
    ["Renato","CA",80]
  ],


  "Cruzeiro": [
    ["Cássio","GOL",87],
    ["Otávio","GOL",78],
    ["William","LD",83],
    ["Kaiki Bruno","LE",82],
    ["Fabrício Bruno","ZAG",84],
    ["João Marcelo","ZAG",82],
    ["Villalba","ZAG",81],
    ["Lucas Silva","VOL",82],
    ["Lucas Romero","VOL",84],
    ["Matheus Pereira","MEI",88],
    ["Gerson","MC",87],
    ["Christian","MC",80],
    ["Matheus Henrique","MC",83],
    ["Marquinhos","PD",82],
    ["Wanderson","PE",81],
    ["Sinisterra","PE",84],
    ["Keny Arroyo","PD",82],
    ["Kaio Jorge","CA",86],
    ["Gabriel","GOL",77],
    ["Rayan Lelis","ZAG",75]
  ],


  "Flamengo": [
    ["Agustín Rossi","GOL",88],
    ["Dyogo","GOL",76],
    ["Ayrton Lucas","LE",84],
    ["Varela","LD",82],
    ["Léo Pereira","ZAG",86],
    ["Léo Ortiz","ZAG",85],
    ["Danilo","ZAG",86],
    ["Wesley","LD",83],
    ["Erick Pulgar","VOL",85],
    ["Saúl","MC",85],
    ["De Arrascaeta","MEI",92],
    ["Lucas Paquetá","MEI",89],
    ["Jorginho","MC",87],
    ["Bruno Henrique","PE",86],
    ["Everton","PE",84],
    ["Luiz Araújo","PD",84],
    ["Samuel Lino","PE",86],
    ["Pedro","CA",91],
    ["Wallace Yan","CA",79],
    ["Everton Cebolinha","PE",82]
  ],


  "Fluminense": [
    ["Fábio","GOL",86],
    ["Vitor Eudes","GOL",77],
    ["Guilherme Arana","LE",86],
    ["Samuel Xavier","LD",81],
    ["Thiago Silva","ZAG",87],
    ["Freytes","ZAG",83],
    ["Ignacio","ZAG",82],
    ["Guga","LD",80],
    ["Hércules","MC",84],
    ["Nonato","VOL",80],
    ["Martinelli","MC",83],
    ["Ganso","MEI",86],
    ["Luciano Acosta","MEI",87],
    ["Soteldo","PE",85],
    ["Canobbio","PD",83],
    ["Savarino","PD",85],
    ["Kevin Serna","PE",84],
    ["John Kennedy","CA",81],
    ["Germán Cano","CA",87],
    ["Rodrigo Castillo","CA",79]
  ],


  "Grêmio": [
    ["Marchesín","GOL",82],
    ["Caio","GOL",76],
    ["Arthur","LD",80],
    ["Enamorado","PD",82],
    ["Wagner","ZAG",82],
    ["Vitor Ramon","ZAG",80],
    ["Kannemann","ZAG",84],
    ["Balbuena","ZAG",83],
    ["Villasanti","MC",86],
    ["Nardoni","VOL",82],
    ["Cuéllar","VOL",82],
    ["Cristaldo","MEI",86],
    ["Gabriel Mec","MEI",79],
    ["Leo Pérez","MC",78],
    ["Aravena","PE",81],
    ["Francis Amuzu","PD",82],
    ["José Enamorado","PD",83],
    ["Braithwaite","CA",84],
    ["André Henrique","CA",79],
    ["Riquelme","PE",76]
  ],


  "Internacional": [
    ["Anthoni Souza","GOL",78],
    ["Rochet","GOL",84],
    ["Bernabei","LE",82],
    ["Alan Benítez","LD",81],
    ["Gabriel Mercado","ZAG",82],
    ["Félix Torres","ZAG",83],
    ["Luiz Felipe","ZAG",80],
    ["Borré","CA",85],
    ["Alerrandro","CA",81],
    ["Rodrigo Villagra","VOL",83],
    ["Alisson","MC",80],
    ["Gabriel","MC",80],
    ["Braian Aguirre","LD",81],
    ["Kauã","PE",77],
    ["João Gabriel Kempes","CA",75],
    ["Alan Patrick","MEI",88],
    ["Wesley","PE",83],
    ["Bruno Tabata","PD",81],
    ["Enner Valencia","CA",85],
    ["Thiago Maia","VOL",83]
  ],


  "Mirassol": [
    ["Walter","GOL",83],
    ["Mota","GOL",76],
    ["Reinaldo","LE",82],
    ["Daniel Borges","LD",78],
    ["João Victor","ZAG",80],
    ["Jemmes","ZAG",79],
    ["Alex Silva","ZAG",78],
    ["Rani Oliveira","MC",80],
    ["Neto Moura","VOL",80],
    ["Danielzinho","MC",79],
    ["Yago Felipe","MC",80],
    ["Negueba","PD",80],
    ["Alesson","PE",81],
    ["Chico","PE",78],
    ["Dellatorre","CA",82],
    ["Clayson","PE",81],
    ["Lucas Ramon","LD",77],
    ["José Aldo","MEI",80],
    ["Isaque","MEI",77],
    ["Léo Gamalho","CA",78]
  ],


  "Palmeiras": [
    ["Weverton","GOL",89],
    ["Marcelo Lomba","GOL",80],
    ["Piquerez","LE",86],
    ["Khellven","LD",81],
    ["Gustavo Gómez","ZAG",89],
    ["Murilo","ZAG",86],
    ["Bruno Fuchs","ZAG",81],
    ["Marlon Freitas","VOL",84],
    ["Andreas Pereira","MEI",88],
    ["Maurício","MEI",84],
    ["Evangelista","MC",82],
    ["Richard Ríos","VOL",84],
    ["Jhon Arias","PD",88],
    ["Ramón Sosa","PE",84],
    ["Riquelme","PE",78],
    ["Vitor Roque","CA",88],
    ["Flaco López","CA",84],
    ["Paulinho","PE",86],
    ["Gustavo Scarpa","MEI",86],
    ["Martínez","MC",80]
  ],


  "Red Bull Bragantino": [
    ["Cleiton","GOL",82],
    ["Tiago Volpi","GOL",80],
    ["Juninho Capixaba","LE",80],
    ["Andrés Hurtado","LD",80],
    ["Alix Vinicius","ZAG",82],
    ["Pedro Henrique","ZAG",81],
    ["Gustavo Marques","ZAG",79],
    ["Matheus Fernandes","MC",80],
    ["Sasha","MEI",83],
    ["Nacho Sosa","MC",79],
    ["Lucas Barbosa","PD",81],
    ["Henry Mosquera","PE",81],
    ["Vinicinho","PE",82],
    ["Vinícius","CA",78],
    ["Isidro Pitta","CA",83],
    ["Eric Ramires","VOL",80],
    ["Fernando","MC",78],
    ["Rodriguinho","MEI",78],
    ["Herrera","PD",78],
    ["Luan Cândido","LE",78]
  ],


  "Remo": [
    ["Marcelo Rangel","GOL",79],
    ["João Ricardo","GOL",76],
    ["Sander","LE",79],
    ["Lucas Mendes","LD",78],
    ["Rafael Castro","ZAG",79],
    ["Reynaldo","ZAG",80],
    ["Alan Empereur","ZAG",82],
    ["Adrian","VOL",78],
    ["Giovanni","MC",80],
    ["Pedro Castro","VOL",79],
    ["Elvis","MEI",82],
    ["Matheus Frizzo","MEI",79],
    ["Kelvin","PE",80],
    ["Ytalo","CA",78],
    ["Diego Tavares","PD",77],
    ["Ribamar","CA",76],
    ["Nicolas","LE",77],
    ["Marcelinho","PD",79],
    ["Luiz Fernando","PE",80],
    ["Anderson Uchoa","VOL",78]
  ],


  "Santos": [
    ["Gabriel Brazão","GOL",84],
    ["João Paulo","GOL",81],
    ["Escobar","LE",82],
    ["JP Chermont","LD",81],
    ["Luan Peres","ZAG",84],
    ["Adonis Frías","ZAG",83],
    ["Lucas Veríssimo","ZAG",84],
    ["João Basso","ZAG",79],
    ["Willian Arão","VOL",84],
    ["João Schmidt","MC",83],
    ["Thaciano","MEI",83],
    ["Gabriel Menino","MC",83],
    ["Neymar Jr","MEI",94],
    ["Barreal","PE",83],
    ["Rollheiser","PD",84],
    ["Rony","PE",84],
    ["Gabriel Barbosa","CA",88],
    ["Lautaro Díaz","CA",83],
    ["Miguelito","MEI",81],
    ["Robinho Jr","PE",78]
  ],


  "São Paulo": [
    ["Rafael","GOL",85],
    ["Young","GOL",76],
    ["Buta","LE",81],
    ["Maik","LD",78],
    ["Rafael Tolói","ZAG",83],
    ["Arboleda","ZAG",85],
    ["Alan Franco","ZAG",83],
    ["Luan Silva","VOL",79],
    ["Bobadilla","VOL",82],
    ["Luiz Gustavo","VOL",82],
    ["Lucas Moura","PD",88],
    ["Oscar","MEI",87],
    ["Marcos Antônio","MC",81],
    ["Alisson","MC",83],
    ["Teté","PE",82],
    ["Hugo","PE",80],
    ["Calleri","CA",86],
    ["André Silva","CA",82],
    ["Ryan Francisco","CA",79],
    ["Pedro Ferreira","MC",76]
  ],


  "Vasco": [
    ["Léo Jardim","GOL",85],
    ["Daniel Fuzato","GOL",78],
    ["Lucas Piton","LE",82],
    ["Paulo Henrique","LD",80],
    ["Mauricio Lemos","ZAG",82],
    ["Lucas Freitas","ZAG",78],
    ["João Victor","ZAG",82],
    ["Cuiabano","LE",79],
    ["Jair","VOL",82],
    ["Hugo Moura","VOL",81],
    ["Philippe Coutinho","MEI",85],
    ["Adson","PE",82],
    ["Nuno Moreira","PE",82],
    ["Rayan","CA",82],
    ["David","PE",81],
    ["Andrés Gómez","PD",80],
    ["Puma Rodríguez","LD",79],
    ["Cauã Paixão","CA",76],
    ["Tchê Tchê","MC",82],
    ["Paulinho","MC",80]
  ],


  "Vitória": [
    ["Lucas Arcanjo","GOL",82],
    ["Gabriel Vasconcelos","GOL",76],
    ["Jamerson","LE",78],
    ["Raúl Cáceres","LD",80],
    ["Lucas Halter","ZAG",81],
    ["Edu","ZAG",79],
    ["Wagner Leonardo","ZAG",82],
    ["Ricardo Ryller","VOL",80],
    ["Willian Oliveira","VOL",81],
    ["Matheuzinho","MC",82],
    ["Osvaldo","PE",80],
    ["Aitor","PD",82],
    ["Erick Castillo","PE",80],
    ["Janderson","CA",78],
    ["Renato Kayzer","CA",82],
    ["Gustavo Silva","PD",80],
    ["Lawan","MEI",76],
    ["Claudinho","MC",78],
    ["Zé Hugo","PE",79],
    ["Breno Lopes","PE",82]
  ]

};


// ============================================================
// ESTADO
// ============================================================

let state = {

  team: {},

  usedClubs: [],

  currentClub: null,

  pendingPlayer: null,

  formation: "4-3-3",

  league: null,

  peer: null,

  connection: null,

  remoteTeam: null

};


// ============================================================
// ATALHO
// ============================================================

const $ = id =>
  document.getElementById(id);


// ============================================================
// TROCAR TELA
// ============================================================

function showScreen(id) {

  document
    .querySelectorAll(".screen")
    .forEach(screen => {

      screen.classList.add("hidden");

    });

  const screen =
    $(id);

  if(screen) {

    screen.classList.remove(
      "hidden"
    );

  }

}


// ============================================================
// MODO SOLO
// ============================================================

function startSolo() {

  resetBuilder();

  showScreen("build");

}


// ============================================================
// MODO AMIGOS
// ============================================================

function openFriends() {

  showScreen("friends");

}


// ============================================================
// FORMAÇÕES
// ============================================================

if($("formation")) {

  $("formation").innerHTML =
    Object.keys(FORMATIONS)
      .map(
        formation =>
          `<option value="${formation}">
            ${formation}
          </option>`
      )
      .join("");


  $("formation").onchange =
  function() {

    state.formation =
      this.value;

    state.team = {};

    state.pendingPlayer =
      null;

    renderField();

    updateStats();

  };

}


// ============================================================
// RESET
// ============================================================

function resetBuilder() {

  state.team = {};

  state.usedClubs = [];

  state.currentClub = null;

  state.pendingPlayer = null;

  state.formation = "4-3-3";

  if($("formation")) {

    $("formation").value =
      "4-3-3";

  }

  if($("drawButton")) {

    $("drawButton").disabled =
      false;

  }

  if($("clubBox")) {

    $("clubBox").textContent =
      "Nenhum clube sorteado";

  }

  if($("instruction")) {

    $("instruction").textContent =
      "Primeiro sorteie um clube.";

  }

  if($("players")) {

    $("players").innerHTML =
      "Sorteie um clube.";

  }

  if($("placementInfo")) {

    $("placementInfo").textContent =
      "Depois de escolher um jogador, toque na posição correta.";

  }

  renderField();

  updateStats();

}


// ============================================================
// QUANTAS VAGAS EXISTEM PARA UMA POSIÇÃO
// ============================================================

function countPositionSlots(position) {

  const rows =
    FORMATIONS[
      state.formation
    ];

  let total = 0;


  rows.forEach(row => {

    row.forEach(pos => {

      if(pos === position) {

        total++;

      }

    });

  });


  return total;

}


// ============================================================
// QUANTOS JOGADORES DESSA POSIÇÃO JÁ ESTÃO NO TIME
// ============================================================

function countPositionPlayers(position) {

  return Object.values(
    state.team
  )
  .filter(
    player =>
      player.pos === position
  )
  .length;

}


// ============================================================
// RENDERIZAR CAMPO
// ============================================================

function renderField() {

  if(!$("field"))
    return;


  const rows =
    FORMATIONS[
      state.formation
    ];


  const positionCounter = {};


  $("field").innerHTML =
    rows
      .map(row => {

        return `
          <div class="fieldRow">

            ${
              row
                .map(position => {

                  if(
                    !positionCounter[position]
                  ) {

                    positionCounter[position] =
                      0;

                  }


                  positionCounter[position]++;


                  const number =
                    positionCounter[position];


                  const slotId =
                    `${position}-${number}`;


                  const player =
                    state.team[slotId];


                  let className =
                    "slot";


                  if(player) {

                    className +=
                      " filled";

                  }


                  if(
                    state.pendingPlayer &&
                    state.pendingPlayer.pos === position &&
                    !player
                  ) {

                    className +=
                      " valid";

                  }


                  if(
                    state.pendingPlayer &&
                    state.pendingPlayer.pos !== position
                  ) {

                    className +=
                      " invalid";

                  }


                  return `
                    <div
                      class="${className}"
                      onclick="placePlayer('${slotId}')">

                      ${
                        player
                        ?
                        `
                          <b>
                            ${player.name}
                          </b>

                          <small>
                            ⭐ ${player.ovr}
                          </small>
                        `
                        :
                        `
                          <b>
                            ${position}
                          </b>

                          <small>
                            ${POS[position]}
                          </small>
                        `
                      }

                    </div>
                  `;

                })
                .join("")
            }

          </div>
        `;

      })
      .join("");

}


// ============================================================
// SORTEAR CLUBE
// ============================================================

function drawClub() {

  if(state.pendingPlayer) {

    alert(
      "Primeiro coloque o jogador na posição correta."
    );

    return;

  }


  const available =
    CLUBS.filter(
      club =>
        !state.usedClubs.includes(
          club
        )
    );


  if(!available.length) {

    alert(
      "Todos os clubes já foram utilizados."
    );

    return;

  }


  const randomIndex =
    Math.floor(
      Math.random() *
      available.length
    );


  state.currentClub =
    available[randomIndex];


  state.pendingPlayer =
    null;


  $("clubBox").textContent =
    `🎲 ${state.currentClub}`;


  $("instruction").textContent =
    "Escolha UM jogador deste clube.";


  renderPlayers();

}


// ============================================================
// RENDERIZAR JOGADORES
// ============================================================

function renderPlayers() {

  if(!state.currentClub) {

    $("players").innerHTML =
      "Sorteie um clube.";

    return;

  }


  const players =
    RAW[state.currentClub];


  if(!players) {

    $("players").innerHTML =
      "Nenhum jogador encontrado.";

    return;

  }


  $("players").innerHTML =
    players
      .map(
        (player,index) => {

          const position =
            player[1];


          const totalSlots =
            countPositionSlots(
              position
            );


          const occupiedSlots =
            countPositionPlayers(
              position
            );


          const hasSpace =
            occupiedSlots <
            totalSlots;


          return `
            <div
              class="player
              ${!hasSpace ? "blocked" : ""}">

              <button
                ${!hasSpace ? "disabled" : ""}
                onclick="choosePlayer(${index})">

                ${
                  hasSpace
                  ? "Escolher"
                  : "🔒 Bloqueado"
                }

              </button>


              <b>
                ${player[0]}
              </b>


              <br>


              <small>
                ${POS[position]}
                • ⭐ ${player[2]}
              </small>


              ${
                !hasSpace
                ?
                `
                  <br>
                  <small>
                    🔒 Sem vaga
                  </small>
                `
                :
                ""
              }

            </div>
          `;

        }
      )
      .join("");

}


// ============================================================
// ESCOLHER JOGADOR
// ============================================================

function choosePlayer(index) {

  if(!state.currentClub) {

    alert(
      "Primeiro sorteie um clube."
    );

    return;

  }


  if(state.pendingPlayer) {

    alert(
      "Você já escolheu um jogador."
    );

    return;

  }


  const player =
    RAW[
      state.currentClub
    ][index];


  const position =
    player[1];


  const totalSlots =
    countPositionSlots(
      position
    );


  const occupiedSlots =
    countPositionPlayers(
      position
    );


  if(
    occupiedSlots >=
    totalSlots
  ) {

    alert(
      `Não existe mais vaga para ${POS[position]}.`
    );

    return;

  }


  state.pendingPlayer = {

    name: player[0],

    pos: player[1],

    ovr: player[2],

    club: state.currentClub

  };


  $("instruction").textContent =
    `${player[0]} escolhido. Agora clique na posição correta.`;


  $("placementInfo").textContent =
    `📍 ${player[0]} só pode jogar como ${POS[player[1]]}.`;


  renderField();

}


// ============================================================
// COLOCAR JOGADOR
// ============================================================

function placePlayer(slotId) {

  if(!state.pendingPlayer) {

    alert(
      "Primeiro sorteie um clube e escolha um jogador."
    );

    return;

  }


  const player =
    state.pendingPlayer;


  // Pega a posição do ID.
  // Exemplo: ZAG-2 -> ZAG
  const position =
    slotId.split("-")[0];


  // ==========================================================
  // VERIFICAÇÃO DA POSIÇÃO
  // ==========================================================

  if(
    player.pos !== position
  ) {

    alert(
      `${player.name} é ${POS[player.pos]} e só pode ser colocado em ${POS[player.pos]}.`
    );

    return;

  }


  // ==========================================================
  // VERIFICA SE A VAGA JÁ ESTÁ OCUPADA
  // ==========================================================

  if(
    state.team[slotId]
  ) {

    alert(
      "Essa vaga já está ocupada."
    );

    return;

  }


  // ==========================================================
  // COLOCA O JOGADOR NA VAGA EXATA
  // ==========================================================

  state.team[slotId] = {

    name: player.name,

    pos: player.pos,

    ovr: player.ovr,

    club: player.club

  };


  // ==========================================================
  // BLOQUEIA O CLUBE
  // ==========================================================

  if(
    !state.usedClubs.includes(
      state.currentClub
    )
  ) {

    state.usedClubs.push(
      state.currentClub
    );

  }


  // ==========================================================
  // LIMPA O JOGADOR PENDENTE
  // ==========================================================

  state.pendingPlayer =
    null;


  $("clubBox").textContent =
    `🔒 ${state.currentClub} utilizado`;


  $("instruction").textContent =
    "Jogador colocado! Sorteie outro clube.";


  $("placementInfo").textContent =
    "Escolha outro clube para continuar.";


  $("players").innerHTML =
    "Sorteie outro clube.";


  renderField();

  updateStats();

  sendTeam();

}


// ============================================================
// ESTATÍSTICAS
// ============================================================

function updateStats() {

  if(!$("playerCount"))
    return;


  const players =
    Object.values(
      state.team
    );


  $("playerCount").textContent =
    `${players.length}/11`;


  if(!players.length) {

    $("teamOvr").textContent =
      "0";

    $("readyButton").disabled =
      true;

    return;

  }


  const total =
    players.reduce(
      (sum,player) =>
        sum + player.ovr,
      0
    );


  $("teamOvr").textContent =
    Math.round(
      total /
      players.length
    );


  $("readyButton").disabled =
    players.length !== 11;

}


// ============================================================
// CONFIRMAR TIME
// ============================================================

function confirmTeam() {

  if(
    Object.keys(
      state.team
    ).length !== 11
  ) {

    alert(
      "Complete os 11 jogadores."
    );

    return;

  }


  if(state.connection) {

    sendTeam();

    showScreen(
      "match"
    );

    checkFriend();

  }

  else {

    startLeague();

  }

}


// ============================================================
// INICIAR CAMPEONATO
// ============================================================

function startLeague() {

  const opponents =
    CLUBS.filter(
      club =>
        !state.usedClubs.includes(
          club
        )
    );


  const table = {};


  opponents.forEach(
    club => {

      table[club] = {

        p:0,
        j:0,
        v:0,
        e:0,
        d:0,
        gp:0,
        gc:0

      };

    }
  );


  table["Meu Time"] = {

    p:0,
    j:0,
    v:0,
    e:0,
    d:0,
    gp:0,
    gc:0

  };


  state.league = {

    round:0,

    opponents:opponents,

    table:table,

    scorers:
      Object.fromEntries(
        Object.values(
          state.team
        )
        .map(
          player =>
            [
              player.name,
              0
            ]
        )
      )

  };


  showScreen(
    "league"
  );


  $("round").textContent =
    "0/38";


  renderTable();

  renderScorers();

}


// ============================================================
// FORÇA DO MEU TIME
// ============================================================

function teamPower() {

  const players =
    Object.values(
      state.team
    );


  if(!players.length)
    return 0;


  return (
    players.reduce(
      (sum,player) =>
        sum + player.ovr,
      0
    )
    /
    players.length
  );

}


// ============================================================
// FORÇA DO ADVERSÁRIO
// ============================================================

function opponentPower(
  club
) {

  const players =
    RAW[club];


  if(!players)
    return 78;


  return (
    players.reduce(
      (sum,player) =>
        sum + player[2],
      0
    )
    /
    players.length
  );

}


// ============================================================
// GOLS ALEATÓRIOS
// ============================================================

function randomGoals() {

  const random =
    Math.random();


  if(random < 0.25)
    return 0;


  if(random < 0.55)
    return 1;


  if(random < 0.78)
    return 2;


  if(random < 0.92)
    return 3;


  if(random < 0.98)
    return 4;


  return 5;

}


// ============================================================
// JOGAR RODADA
// ============================================================

function playRound() {

  if(
    state.league.round >= 38
  ) {

    alert(
      "O campeonato já terminou."
    );

    return;

  }


  const opponent =
    state.league.opponents[
      state.league.round %
      state.league.opponents.length
    ];


  const myPower =
    teamPower();


  const oppPower =
    opponentPower(
      opponent
    );


  // ==========================================================
  // EQUILÍBRIO
  // ==========================================================

  let balance =
    (
      myPower -
      oppPower
    ) / 15;


  balance +=
    (
      Math.random() -
      0.5
    ) * 1.4;


  let myGoals =
    randomGoals();


  let opponentGoals =
    randomGoals();


  if(
    balance > 0.5 &&
    Math.random() < 0.70
  ) {

    myGoals =
      Math.max(
        myGoals,
        opponentGoals + 1
      );

  }


  if(
    balance < -0.5 &&
    Math.random() < 0.70
  ) {

    opponentGoals =
      Math.max(
        opponentGoals,
        myGoals + 1
      );

  }


  if(
    Math.abs(balance) < 0.2 &&
    Math.random() < 0.30
  ) {

    opponentGoals =
      myGoals;

  }


  updateLeague(
    "Meu Time",
    opponent,
    myGoals,
    opponentGoals
  );


  const events = [];


  // ==========================================================
  // GOLS DO MEU TIME
  // ==========================================================

  for(
    let i = 0;
    i < myGoals;
    i++
  ) {

    const players =
      Object.values(
        state.team
      );


    const scorer =
      players[
        Math.floor(
          Math.random() *
          players.length
        )
      ];


    state.league.scorers[
      scorer.name
    ]++;


    events.push(
      `⚽ ${scorer.name}`
    );

  }


  // ==========================================================
  // GOLS DO ADVERSÁRIO
  // ==========================================================

  for(
    let i = 0;
    i < opponentGoals;
    i++
  ) {

    const players =
      RAW[opponent];


    const scorer =
      players[
        Math.floor(
          Math.random() *
          players.length
        )
      ];


    events.push(
      `🔴 ${scorer[0]}`
    );

  }


  state.league.round++;


  $("round").textContent =
    `${state.league.round}/38`;


  $("lastResult").innerHTML =
    `
      <div class="score">

        Meu Time
        ${myGoals}
        ×
        ${opponentGoals}
        ${opponent}

      </div>

      ${
        events
          .map(
            event =>
              `<div class="goal">
                ${event}
              </div>`
          )
          .join("")
      }
    `;


  renderTable();

  renderScorers();

}


// ============================================================
// ATUALIZAR CLASSIFICAÇÃO
// ============================================================

function updateLeague(
  home,
  away,
  homeGoals,
  awayGoals
) {

  const A =
    state.league.table[home];


  const B =
    state.league.table[away];


  A.j++;
  B.j++;


  A.gp +=
    homeGoals;

  A.gc +=
    awayGoals;


  B.gp +=
    awayGoals;

  B.gc +=
    homeGoals;


  // Vitória = 3
  if(
    homeGoals >
    awayGoals
  ) {

    A.v++;

    A.p += 3;

    B.d++;

  }


  // Derrota
  else if(
    homeGoals <
    awayGoals
  ) {

    B.v++;

    B.p += 3;

    A.d++;

  }


  // Empate = 1
  else {

    A.e++;

    B.e++;

    A.p++;

    B.p++;

  }

}


// ============================================================
// TABELA
// ============================================================

function renderTable() {

  const rows =
    Object.entries(
      state.league.table
    )
    .sort(
      (a,b) => {

        const points =
          b[1].p -
          a[1].p;


        if(points !== 0)
          return points;


        const sgA =
          a[1].gp -
          a[1].gc;


        const sgB =
          b[1].gp -
          b[1].gc;


        return sgB -
          sgA;

      }
    );


  $("table").innerHTML =
    `
      <table>

        <tr>
          <th>#</th>
          <th>Time</th>
          <th>PTS</th>
          <th>J</th>
          <th>V</th>
          <th>E</th>
          <th>D</th>
          <th>SG</th>
        </tr>

        ${
          rows
            .map(
              (row,index) => {

                const name =
                  row[0];

                const stats =
                  row[1];


                return `
                  <tr
                    class="${
                      name === "Meu Time"
                      ? "mine"
                      : ""
                    }">

                    <td>
                      ${index + 1}
                    </td>

                    <td>
                      ${name}
                    </td>

                    <td>
                      <b>
                        ${stats.p}
                      </b>
                    </td>

                    <td>
                      ${stats.j}
                    </td>

                    <td>
                      ${stats.v}
                    </td>

                    <td>
                      ${stats.e}
                    </td>

                    <td>
                      ${stats.d}
                    </td>

                    <td>
                      ${stats.gp - stats.gc}
                    </td>

                  </tr>
                `;

              }
            )
            .join("")
        }

      </table>
    `;

}


// ============================================================
// ARTILHARIA
// ============================================================

function renderScorers() {

  const rows =
    Object.entries(
      state.league.scorers
    )
    .sort(
      (a,b) =>
        b[1] -
        a[1]
    );


  $("scorers").innerHTML =
    rows
      .map(
        (row,index) => {

          return `
            <div class="art">

              <span>
                ${index + 1}.
                ${row[0]}
              </span>

              <b>
                ${row[1]} ⚽
              </b>

            </div>
          `;

        }
      )
      .join("");

}


// ============================================================
// SIMULAR TODO O CAMPEONATO
// ============================================================

function simulateAll() {

  while(
    state.league.round < 38
  ) {

    playRound();

  }

}


// ============================================================
// MODO AMIGOS - CRIAR SALA
// ============================================================

function createRoom() {

  if(!window.Peer) {

    alert(
      "PeerJS não carregou. Verifique sua internet."
    );

    return;

  }


  const roomId =
    "7A0-" +
    Math.random()
      .toString(36)
      .substring(2,7)
      .toUpperCase();


  state.peer =
    new Peer(
      roomId
    );


  state.peer.on(
    "open",
    () => {

      $("roomStatus").textContent =
        `🟢 Sala criada: ${roomId}. Envie o código para seu amigo.`;

    }
  );


  state.peer.on(
    "connection",
    connection => {

      setupConnection(
        connection
      );

    }
  );

}


// ============================================================
// MODO AMIGOS - ENTRAR
// ============================================================

function joinRoom() {

  const code =
    $("roomCode")
      .value
      .trim()
      .toUpperCase();


  if(!code) {

    alert(
      "Digite o código da sala."
    );

    return;

  }


  if(!window.Peer) {

    alert(
      "PeerJS não carregou."
    );

    return;

  }


  state.peer =
    new Peer();


  state.peer.on(
    "open",
    () => {

      const connection =
        state.peer.connect(
          code,
          {
            reliable:true
          }
        );


      setupConnection(
        connection
      );

    }
  );

}


// ============================================================
// CONFIGURAR CONEXÃO
// ============================================================

function setupConnection(
  connection
) {

  state.connection =
    connection;


  connection.on(
    "open",
    () => {

      $("roomStatus").textContent =
        "🟢 Conectado ao amigo!";


      startSolo();


      sendTeam();

    }
  );


  connection.on(
    "data",
    message => {


      if(
        message.type ===
        "TEAM"
      ) {

        state.remoteTeam =
          message;


        checkFriend();

      }


      if(
        message.type ===
        "RESULT"
      ) {

        $("friendResult")
          .innerHTML =
          message.html;

      }

    }
  );


  connection.on(
    "close",
    () => {

      if($("friendStatus")) {

        $("friendStatus")
          .textContent =
          "🔴 O amigo desconectou.";

      }

    }
  );

}


// ============================================================
// ENVIAR TIME
// ============================================================

function sendTeam() {

  if(
    state.connection &&
    state.connection.open
  ) {

    state.connection.send({

      type:"TEAM",

      team:
        state.team,

      ovr:
        Math.round(
          teamPower()
        )

    });

  }

}


// ============================================================
// VERIFICAR AMIGO
// ============================================================

function checkFriend() {

  if(
    !state.remoteTeam
  ) {

    return;

  }


  $("myOvr").textContent =
    Math.round(
      teamPower()
    );


  $("friendOvr").textContent =
    state.remoteTeam.ovr;


  const myReady =
    Object.keys(
      state.team
    ).length === 11;


  const friendReady =
    Object.keys(
      state.remoteTeam.team
    ).length === 11;


  if(
    myReady &&
    friendReady
  ) {

    $("friendStatus").textContent =
      "✅ Os dois times estão prontos!";


    $("friendPlay").disabled =
      false;

  }

  else {

    $("friendStatus").textContent =
      "Aguardando os dois jogadores completarem os times.";


    $("friendPlay").disabled =
      true;

  }

}


// ============================================================
// PARTIDA ENTRE AMIGOS
// ============================================================

function playFriendMatch() {

  if(
    !state.remoteTeam
  ) {

    return;

  }


  const myPower =
    teamPower();


  const friendPower =
    state.remoteTeam.ovr;


  let myGoals =
    randomGoals();


  let friendGoals =
    randomGoals();


  let balance =
    (
      myPower -
      friendPower
    ) / 15;


  balance +=
    (
      Math.random() -
      0.5
    ) * 1.3;


  if(
    balance > 0.5 &&
    Math.random() < 0.7
  ) {

    myGoals =
      Math.max(
        myGoals,
        friendGoals + 1
      );

  }


  if(
    balance < -0.5 &&
    Math.random() < 0.7
  ) {

    friendGoals =
      Math.max(
        friendGoals,
        myGoals + 1
      );

  }


  if(
    Math.abs(balance) < 0.2 &&
    Math.random() < 0.3
  ) {

    friendGoals =
      myGoals;

  }


  const result =
    `
      <div class="score">

        Meu Time
        ${myGoals}
        ×
        ${friendGoals}
        Amigo

      </div>

      <p>

        ${
          myGoals > friendGoals
          ? "🟢 Você venceu!"

          : myGoals < friendGoals
          ? "🔴 Seu amigo venceu!"

          : "🟡 Empate!"
        }

      </p>
    `;


  $("friendResult")
    .innerHTML =
    result;


  if(
    state.connection &&
    state.connection.open
  ) {

    state.connection.send({

      type:"RESULT",

      html:result

    });

  }

}


// ============================================================
// INICIAR
// ============================================================

renderField();

updateStats();
