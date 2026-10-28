/* =========================================================
   PERSONALIZE AQUI ♥
   Troque os textos abaixo para deixar o site com a cara de vocês.
   ========================================================= */
const CONFIG = {
  // Como ela aparece no título "Feliz aniversário, ____"
  nome: "Camilla",

  // Dia do aniversário dela (formato "MM-DD")
  aniversario: "11-26",

  // Data em que vocês começaram a namorar (formato "AAAA-MM-DD").
  // Se preencher, aparece um contador "Juntos há X dias, horas...". Ex.: "2024-02-14"
  inicioNamoro: "",

  // Quantidade de velinhas no bolo
  velas: 5,

  // Frases que vão sendo "digitadas" no topo do site
  frases: [
    "hoje o mundo comemora a sua existência",
    "você é a melhor parte dos meus dias",
    "minha noiva, minha melhor amiga, meu lar",
    "obrigado por me escolher todos os dias ♥",
  ],

  // Bilhetinhos do pote de motivos
  motivos: [
    "O jeito que você sorri quando está feliz de verdade.",
    "Porque você me faz querer ser uma pessoa melhor todos os dias.",
    "Seu abraço, que conserta qualquer dia ruim.",
    "Porque com você até o silêncio é confortável.",
    "O seu cuidado comigo, até nos detalhes que ninguém percebe.",
    "Porque você acredita em mim até quando eu duvido.",
    "Sua risada — a minha música favorita (depois dessa que está tocando).",
    "Porque você disse SIM. ♥",
    "O jeito que você me olha.",
    "Porque todo plano de futuro que eu faço tem você nele.",
    "A sua força, que me inspira.",
    "Porque você transforma momentos simples em lembranças inesquecíveis.",
    "Sua paciência comigo (eu sei que não é pouca).",
    "Porque você é a minha melhor amiga.",
    "O tamanho do seu coração.",
    "Porque ao seu lado eu me sinto em casa.",
    "Sua beleza — por dentro e por fora.",
    "Porque eu escolheria você de novo, em todas as vidas.",
  ],

  // A carta final (cada item é um parágrafo)
  carta: [
    "Meu amor,",
    "Hoje é o seu dia, e eu quis criar um cantinho só nosso para comemorar a pessoa incrível que você é.",
    "Cada foto aqui guarda um pedacinho da nossa história. Olhando pra elas eu percebo o quanto sou sortudo por ter você ao meu lado — você deixa meus dias mais leves, mais bonitos e muito mais felizes.",
    "Obrigado por cada sorriso, cada abraço, cada conversa até tarde e por ter aceitado dividir a vida comigo. Mal posso esperar pelo nosso casamento e por todos os capítulos que ainda vamos escrever juntos.",
    "Que esse novo ano seja tão lindo quanto você. Feliz aniversário! Eu te amo incondicionalmente.",
  ],
  assinatura: "Pra sempre seu noivo ♥",
};

// Fotos da linha do tempo (versões leves ficam em img/web).
// "legenda" é o texto escrito à mão embaixo da foto — pode trocar à vontade.
const FOTOS = [
  { arquivo: "IMG_20250706_153051.jpg", data: "2025-07-06", legenda: "Um dos meus dias favoritos", horizontal: true },
  { arquivo: "IMG_20251012_141643.jpg", data: "2025-10-12", legenda: "Seu sorriso é meu lugar preferido" },
  { arquivo: "IMG_20251108_111914.jpg", data: "2025-11-08", legenda: "Linda de qualquer jeito" },
  { arquivo: "IMG_20260404_163222.jpg", data: "2026-04-04", legenda: "Essa sua alegria me conquista todo dia" },
  { arquivo: "PXL_20260426_123656023.jpg", data: "2026-04-26", legenda: "Minha pessoa favorita no mundo" },
  { arquivo: "PXL_20260503_090759636.jpg", data: "2026-05-03", legenda: "Memórias que eu guardo no coração", horizontal: true },
  { arquivo: "PXL_20260516_194114799.jpg", data: "2026-05-16", legenda: "Com você, tudo fica mais bonito" },
  { arquivo: "PXL_20260613_170936909.jpg", data: "2026-06-13", legenda: "Mais um dia perfeito ao seu lado" },
  { arquivo: "PXL_20260613_182628709.jpg", data: "2026-06-13", legenda: "Não canso de olhar pra você" },
  { arquivo: "PXL_20260705_155814637.jpg", data: "2026-07-05", legenda: "Meu lar é onde você está" },
  { arquivo: "WhatsApp_Image_2026-09-28_at_10_20_34.jpg", data: "2026-09-28", legenda: "Até as caretas são lindas" },
  { arquivo: "WhatsApp_Image_2026-10-13_at_17_23_14.jpg", data: "2026-10-13", legenda: "Minha noiva ♥" },
  { arquivo: "WhatsApp_Image_2026-10-19_at_14_11_39.jpg", data: "2026-10-19", legenda: "E o melhor ainda está por vir" },
];

// Quais fotos aparecem no topo (posição na lista acima, começando do 0)
const FOTOS_INICIO = [6, 8, 9];
const FOTO_DISCO = 9;

/* ========================================================= */

const $ = (sel) => document.querySelector(sel);
const caminho = (foto) => `img/web/${foto.arquivo}`;
const movimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function formatarData(iso) {
  const [a, m, d] = iso.split("-").map(Number);
  return new Date(a, m - 1, d).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
}

function embaralhar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function criarPolaroide(foto) {
  const fig = document.createElement("figure");
  fig.className = "polaroide" + (foto.horizontal ? " horizontal" : "");
  fig.innerHTML = `<img src="${caminho(foto)}" alt="${foto.legenda}" loading="lazy"><figcaption>${foto.legenda}</figcaption>`;
  return fig;
}

/* =========================================================
   Corações no fundo + efeitos (explosões e confete)
   ========================================================= */
const efeitos = (() => {
  const fundo = $("#fundo");
  const topo = $("#efeitos");
  const ctxFundo = fundo.getContext("2d");
  const ctxTopo = topo.getContext("2d");
  const cores = ["#eba3ad", "#e0607a", "#dcb877", "#f7ecdc"];
  let largura = 0, altura = 0;
  let flutuantes = [];
  let particulas = [];

  function redimensionar() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    largura = window.innerWidth;
    altura = window.innerHeight;
    for (const [canvas, ctx] of [[fundo, ctxFundo], [topo, ctxTopo]]) {
      canvas.width = largura * dpr;
      canvas.height = altura * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    const quantidade = movimentoReduzido ? 0 : Math.round(Math.min(30, largura / 40));
    flutuantes = Array.from({ length: quantidade }, () => novoFlutuante(true));
  }

  function novoFlutuante(qualquerAltura) {
    return {
      x: Math.random() * largura,
      y: qualquerAltura ? Math.random() * altura : altura + 20,
      tamanho: 6 + Math.random() * 14,
      velocidade: 0.2 + Math.random() * 0.5,
      fase: Math.random() * Math.PI * 2,
      alpha: 0.08 + Math.random() * 0.2,
      cor: cores[Math.floor(Math.random() * 3)],
    };
  }

  function coracao(ctx, x, y, t, rot = 0) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.beginPath();
    ctx.moveTo(0, t * 0.3);
    ctx.bezierCurveTo(0, 0, -t * 0.5, 0, -t * 0.5, t * 0.3);
    ctx.bezierCurveTo(-t * 0.5, t * 0.6, 0, t * 0.75, 0, t);
    ctx.bezierCurveTo(0, t * 0.75, t * 0.5, t * 0.6, t * 0.5, t * 0.3);
    ctx.bezierCurveTo(t * 0.5, 0, 0, 0, 0, t * 0.3);
    ctx.fill();
    ctx.restore();
  }

  function explodir(x, y, quantidade = 12) {
    for (let i = 0; i < quantidade; i++) {
      const angulo = Math.random() * Math.PI * 2;
      const forca = 1.5 + Math.random() * 3.5;
      particulas.push({
        tipo: "coracao",
        x, y,
        vx: Math.cos(angulo) * forca,
        vy: Math.sin(angulo) * forca - 1.5,
        tamanho: 8 + Math.random() * 12,
        vida: 1,
        decaimento: 0.012 + Math.random() * 0.012,
        cor: cores[Math.floor(Math.random() * cores.length)],
        rot: (Math.random() - 0.5) * 0.6,
        vrot: (Math.random() - 0.5) * 0.05,
      });
    }
  }

  function confete(quantidade = 180) {
    const paleta = [...cores, "#ffffff", "#c24563"];
    for (let i = 0; i < quantidade; i++) {
      const lado = i % 2 === 0 ? 0 : largura;
      particulas.push({
        tipo: Math.random() < 0.25 ? "coracao" : "papel",
        x: lado,
        y: altura * (0.5 + Math.random() * 0.3),
        vx: (lado === 0 ? 1 : -1) * (4 + Math.random() * 9),
        vy: -(8 + Math.random() * 10),
        tamanho: 6 + Math.random() * 8,
        vida: 1,
        decaimento: 0.004 + Math.random() * 0.004,
        cor: paleta[Math.floor(Math.random() * paleta.length)],
        rot: Math.random() * Math.PI,
        vrot: (Math.random() - 0.5) * 0.3,
        gravidade: true,
      });
    }
  }

  function quadro(tempo) {
    ctxFundo.clearRect(0, 0, largura, altura);
    for (const f of flutuantes) {
      f.y -= f.velocidade;
      const x = f.x + Math.sin(tempo / 1500 + f.fase) * 20;
      if (f.y < -30) Object.assign(f, novoFlutuante(false));
      ctxFundo.globalAlpha = f.alpha;
      ctxFundo.fillStyle = f.cor;
      coracao(ctxFundo, x, f.y, f.tamanho, Math.sin(tempo / 2000 + f.fase) * 0.3);
    }

    ctxTopo.clearRect(0, 0, largura, altura);
    particulas = particulas.filter((p) => p.vida > 0 && p.y < altura + 50);
    for (const p of particulas) {
      if (p.gravidade) {
        p.vy += 0.25;
        p.vx *= 0.985;
      } else {
        p.vy += 0.03;
        p.vx *= 0.97;
        p.vy *= 0.97;
      }
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vrot;
      p.vida -= p.decaimento;
      ctxTopo.globalAlpha = Math.max(0, Math.min(1, p.vida * 1.5));
      ctxTopo.fillStyle = p.cor;
      if (p.tipo === "coracao") {
        coracao(ctxTopo, p.x, p.y, p.tamanho, p.rot);
      } else {
        ctxTopo.save();
        ctxTopo.translate(p.x, p.y);
        ctxTopo.rotate(p.rot);
        ctxTopo.fillRect(-p.tamanho / 2, -p.tamanho / 4, p.tamanho, p.tamanho / 2);
        ctxTopo.restore();
      }
    }
    ctxTopo.globalAlpha = 1;
    requestAnimationFrame(quadro);
  }

  window.addEventListener("resize", redimensionar);
  redimensionar();
  requestAnimationFrame(quadro);

  return { explodir, confete };
})();

// Corações a cada toque na tela
document.addEventListener("pointerdown", (e) => {
  if (!$("#visualizador").hidden) return;
  efeitos.explodir(e.clientX, e.clientY, 8);
});

/* =========================================================
   Música
   ========================================================= */
const musica = $("#musica");
const player = $("#player");
const volume = $("#volume");
let volumeAlvo = Number(volume.value);
let animacaoVolume = null;

function ajustarVolume(destino, duracao = 1500) {
  cancelAnimationFrame(animacaoVolume);
  const inicio = musica.volume;
  const comeco = performance.now();
  const passo = (agora) => {
    const t = Math.min(1, (agora - comeco) / duracao);
    musica.volume = inicio + (destino - inicio) * t;
    if (t < 1) animacaoVolume = requestAnimationFrame(passo);
  };
  animacaoVolume = requestAnimationFrame(passo);
}

function tocar() {
  return musica.play().then(() => ajustarVolume(volumeAlvo)).catch(() => {});
}

$("#btnPlay").addEventListener("click", () => {
  if (musica.paused) tocar();
  else musica.pause();
});

musica.addEventListener("play", () => {
  player.classList.add("tocando");
  $("#btnPlay").setAttribute("aria-label", "Pausar música");
});
musica.addEventListener("pause", () => {
  player.classList.remove("tocando");
  $("#btnPlay").setAttribute("aria-label", "Tocar música");
});
musica.addEventListener("timeupdate", () => {
  if (musica.duration) $("#barraMusica").style.width = `${(musica.currentTime / musica.duration) * 100}%`;
});

volume.addEventListener("input", () => {
  volumeAlvo = Number(volume.value);
  cancelAnimationFrame(animacaoVolume);
  musica.volume = volumeAlvo;
});

$("#discoFoto").src = caminho(FOTOS[FOTO_DISCO]);

/* =========================================================
   Abertura
   ========================================================= */
$("#btnAbrir").addEventListener("click", () => {
  musica.volume = 0;
  tocar();

  $("#envelopeAbertura").classList.add("aberto");
  $("#btnAbrir").disabled = true;

  setTimeout(() => {
    $("#abertura").classList.add("sumir");
    document.body.classList.remove("trancado");
    player.classList.add("visivel");
    efeitos.explodir(window.innerWidth / 2, window.innerHeight / 2, 40);
    iniciarDigitacao();
  }, 1500);
});

/* =========================================================
   Início: fotos, nome, frases digitadas e contador
   ========================================================= */
document.querySelectorAll("[data-nome]").forEach((el) => (el.textContent = CONFIG.nome));
document.title = `Feliz aniversário, ${CONFIG.nome} ♥`;

{
  const [mes, dia] = CONFIG.aniversario.split("-").map(Number);
  const hoje = new Date();
  const dataTexto = new Date(2000, mes - 1, dia).toLocaleDateString("pt-BR", { day: "numeric", month: "long" });
  const ehHoje = hoje.getMonth() + 1 === mes && hoje.getDate() === dia;
  $("#sobretituloInicio").textContent = ehHoje ? `Hoje, ${dataTexto}, é o seu dia` : `${dataTexto} · o seu dia`;
}

FOTOS_INICIO.forEach((i) => $("#fotosInicio").appendChild(criarPolaroide(FOTOS[i])));

function iniciarDigitacao() {
  const alvo = $("#digitando");
  let frase = 0, letra = 0, apagando = false;

  const passo = () => {
    const texto = CONFIG.frases[frase];
    letra += apagando ? -1 : 1;
    alvo.textContent = texto.slice(0, letra);

    let espera = apagando ? 30 : 65;
    if (!apagando && letra === texto.length) {
      apagando = true;
      espera = 2200;
    } else if (apagando && letra === 0) {
      apagando = false;
      frase = (frase + 1) % CONFIG.frases.length;
      espera = 400;
    }
    setTimeout(passo, espera);
  };
  passo();
}

if (CONFIG.inicioNamoro) {
  const inicio = new Date(CONFIG.inicioNamoro + "T00:00:00");
  const campos = {};
  document.querySelectorAll("[data-c]").forEach((el) => (campos[el.dataset.c] = el));
  $("#contador").hidden = false;

  const atualizar = () => {
    let s = Math.max(0, Math.floor((Date.now() - inicio) / 1000));
    campos.dias.textContent = Math.floor(s / 86400).toLocaleString("pt-BR");
    s %= 86400;
    campos.horas.textContent = Math.floor(s / 3600);
    campos.minutos.textContent = Math.floor((s % 3600) / 60);
    campos.segundos.textContent = s % 60;
  };
  atualizar();
  setInterval(atualizar, 1000);
}

/* =========================================================
   Linha do tempo + visualizador de fotos
   ========================================================= */
FOTOS.forEach((foto, i) => {
  const item = document.createElement("li");
  item.className = "momento revelar";

  const data = document.createElement("time");
  data.dateTime = foto.data;
  data.textContent = formatarData(foto.data);

  const polaroide = criarPolaroide(foto);
  polaroide.tabIndex = 0;
  polaroide.setAttribute("role", "button");
  polaroide.setAttribute("aria-label", `Ampliar foto: ${foto.legenda}`);
  polaroide.addEventListener("click", () => abrirFoto(i));
  polaroide.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      abrirFoto(i);
    }
  });

  item.append(data, polaroide);
  $("#linhaTempo").appendChild(item);
});

const visualizador = $("#visualizador");
let fotoAtual = 0;
let focoAnterior = null;

function mostrarFoto(i) {
  fotoAtual = (i + FOTOS.length) % FOTOS.length;
  const foto = FOTOS[fotoAtual];
  const img = $("#vzImagem");
  img.classList.remove("trocando");
  void img.offsetWidth; // reinicia a animação
  img.classList.add("trocando");
  img.src = caminho(foto);
  img.alt = foto.legenda;
  $("#vzLegenda").textContent = foto.legenda;
  $("#vzData").textContent = formatarData(foto.data);
}

function abrirFoto(i) {
  focoAnterior = document.activeElement;
  mostrarFoto(i);
  visualizador.hidden = false;
  document.body.style.overflow = "hidden";
  $("#vzFechar").focus();
}

function fecharFoto() {
  visualizador.hidden = true;
  document.body.style.overflow = "";
  focoAnterior?.focus();
}

$("#vzFechar").addEventListener("click", fecharFoto);
$("#vzAnterior").addEventListener("click", () => mostrarFoto(fotoAtual - 1));
$("#vzProxima").addEventListener("click", () => mostrarFoto(fotoAtual + 1));
visualizador.addEventListener("click", (e) => {
  if (e.target === visualizador) fecharFoto();
});
document.addEventListener("keydown", (e) => {
  if (visualizador.hidden) return;
  if (e.key === "Escape") fecharFoto();
  if (e.key === "ArrowLeft") mostrarFoto(fotoAtual - 1);
  if (e.key === "ArrowRight") mostrarFoto(fotoAtual + 1);
});

// Arrastar para o lado no celular
let toqueX = null;
visualizador.addEventListener("touchstart", (e) => (toqueX = e.touches[0].clientX), { passive: true });
visualizador.addEventListener("touchend", (e) => {
  if (toqueX === null) return;
  const dx = e.changedTouches[0].clientX - toqueX;
  if (Math.abs(dx) > 50) mostrarFoto(fotoAtual + (dx < 0 ? 1 : -1));
  toqueX = null;
});

/* =========================================================
   Jogo da memória
   ========================================================= */
const PARES = 6;
const tabuleiro = $("#tabuleiro");
let viradas = [];
let travado = false;
let jogadas = 0;
let paresAchados = 0;

function novoJogo() {
  viradas = [];
  travado = false;
  jogadas = 0;
  paresAchados = 0;
  $("#jogadas").textContent = 0;
  $("#pares").textContent = 0;
  $("#totalPares").textContent = PARES;
  $("#vitoria").hidden = true;

  const escolhidas = embaralhar(FOTOS).slice(0, PARES);
  const cartas = embaralhar([...escolhidas, ...escolhidas]);

  tabuleiro.innerHTML = "";
  cartas.forEach((foto) => {
    const carta = document.createElement("button");
    carta.className = "carta-jogo";
    carta.dataset.foto = foto.arquivo;
    carta.setAttribute("aria-label", "Carta virada para baixo");
    carta.innerHTML = `
      <span class="carta-jogo__interno">
        <span class="carta-jogo__face carta-jogo__face--costas">♥</span>
        <span class="carta-jogo__face carta-jogo__face--foto"><img src="${caminho(foto)}" alt=""></span>
      </span>`;
    carta.addEventListener("click", () => virarCarta(carta));
    tabuleiro.appendChild(carta);
  });
}

function virarCarta(carta) {
  if (travado || carta.classList.contains("virada") || carta.classList.contains("achada")) return;

  carta.classList.add("virada");
  carta.setAttribute("aria-label", "Carta virada para cima");
  viradas.push(carta);
  if (viradas.length < 2) return;

  jogadas++;
  $("#jogadas").textContent = jogadas;
  const [a, b] = viradas;

  if (a.dataset.foto === b.dataset.foto) {
    a.classList.replace("virada", "achada");
    b.classList.replace("virada", "achada");
    viradas = [];
    paresAchados++;
    $("#pares").textContent = paresAchados;

    const r = b.getBoundingClientRect();
    efeitos.explodir(r.left + r.width / 2, r.top + r.height / 2, 14);

    if (paresAchados === PARES) {
      setTimeout(() => {
        const vitoria = $("#vitoria");
        vitoria.textContent = `Você achou todos os pares em ${jogadas} jogadas… assim como eu achei em você o meu par perfeito ♥`;
        vitoria.hidden = false;
        efeitos.confete(120);
      }, 500);
    }
  } else {
    travado = true;
    setTimeout(() => {
      a.classList.add("errou");
      b.classList.add("errou");
    }, 500);
    setTimeout(() => {
      a.classList.remove("virada", "errou");
      b.classList.remove("virada", "errou");
      a.setAttribute("aria-label", "Carta virada para baixo");
      b.setAttribute("aria-label", "Carta virada para baixo");
      viradas = [];
      travado = false;
    }, 1100);
  }
}

$("#btnReiniciar").addEventListener("click", novoJogo);
novoJogo();

/* =========================================================
   Pote de motivos
   ========================================================= */
let motivosRestantes = [];
let motivosLidos = 0;

$("#pote").addEventListener("click", () => {
  const pote = $("#pote");
  const bilhete = $("#bilhete");

  if (motivosRestantes.length === 0) {
    if (motivosLidos > 0) {
      $("#motivoTexto").textContent = "E ainda existem infinitos outros que não cabem em pote nenhum ♥";
      $("#motivoContador").textContent = "toque de novo para recomeçar";
      motivosLidos = 0;
      animar(bilhete, "novo");
      return;
    }
    motivosRestantes = embaralhar(CONFIG.motivos);
  }

  motivosLidos++;
  $("#motivoTexto").textContent = motivosRestantes.pop();
  $("#motivoContador").textContent = `motivo ${motivosLidos} de ${CONFIG.motivos.length}`;

  animar(pote, "sacudir");
  animar(bilhete, "novo");
  const r = bilhete.getBoundingClientRect();
  efeitos.explodir(r.left + r.width / 2, r.top + 20, 6);
});

function animar(el, classe) {
  el.classList.remove(classe);
  void el.offsetWidth;
  el.classList.add(classe);
}

/* =========================================================
   Bolo e velinhas
   ========================================================= */
const containerVelas = $("#velas");
const mensagemBolo = $("#mensagemBolo");
let comemorou = false;

function criarVelas() {
  containerVelas.innerHTML = "";
  for (let i = 0; i < CONFIG.velas; i++) {
    const vela = document.createElement("button");
    vela.className = "vela";
    vela.setAttribute("aria-label", `Assoprar a vela ${i + 1}`);
    vela.innerHTML = `<span class="vela__chama"></span><span class="vela__fumaca"></span>`;
    vela.style.height = `${58 + (i % 2) * 10}px`;
    vela.addEventListener("click", () => apagarVela(vela));
    containerVelas.appendChild(vela);
  }
}

function apagarVela(vela) {
  if (vela.classList.contains("apagada")) return;
  vela.classList.add("apagada");
  vela.disabled = true;

  const acesas = containerVelas.querySelectorAll(".vela:not(.apagada)").length;
  if (acesas > 0) {
    mensagemBolo.textContent = acesas === 1 ? "Falta só uma…" : `Faltam ${acesas}…`;
  } else {
    comemorar();
  }
}

function comemorar() {
  pararMicrofone();
  mensagemBolo.textContent = "Pedido feito! Que todos os seus sonhos se realizem 🎉";
  $("#btnAcender").hidden = false;
  efeitos.confete(220);
  setTimeout(() => efeitos.confete(120), 700);

  if (!comemorou) {
    comemorou = true;
    liberarCarta();
    setTimeout(() => $("#carta").scrollIntoView({ behavior: "smooth" }), 3200);
  }
}

$("#btnAcender").addEventListener("click", () => {
  criarVelas();
  mensagemBolo.textContent = "";
  $("#btnAcender").hidden = true;
});

criarVelas();

// Assoprar de verdade pelo microfone
let microfone = null;

async function ligarMicrofone() {
  const botao = $("#btnMicrofone");
  if (microfone) {
    pararMicrofone();
    return;
  }
  if (!navigator.mediaDevices?.getUserMedia) {
    mensagemBolo.textContent = "Seu navegador não liberou o microfone — toque nas velinhas 😉";
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: false, autoGainControl: false },
    });
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const analisador = ctx.createAnalyser();
    analisador.fftSize = 1024;
    ctx.createMediaStreamSource(stream).connect(analisador);
    const dados = new Uint8Array(analisador.fftSize);

    microfone = { stream, ctx, frame: null };
    botao.classList.add("ouvindo");
    botao.textContent = "🎤 Ouvindo… assopra!";
    ajustarVolume(Math.min(volumeAlvo, 0.2), 600); // abaixa a música pra não "assoprar" sozinha

    let seguidos = 0;
    let ultimaApagada = 0;
    const ouvir = () => {
      analisador.getByteTimeDomainData(dados);
      let soma = 0;
      for (const v of dados) soma += ((v - 128) / 128) ** 2;
      const intensidade = Math.sqrt(soma / dados.length);

      seguidos = intensidade > 0.15 ? seguidos + 1 : 0;
      const agora = performance.now();
      if (seguidos > 4 && agora - ultimaApagada > 180) {
        const acesas = [...containerVelas.querySelectorAll(".vela:not(.apagada)")];
        if (acesas.length) apagarVela(acesas[Math.floor(Math.random() * acesas.length)]);
        ultimaApagada = agora;
      }
      if (microfone) microfone.frame = requestAnimationFrame(ouvir);
    };
    ouvir();
  } catch {
    mensagemBolo.textContent = "Não consegui acessar o microfone — toque nas velinhas 😉";
  }
}

function pararMicrofone() {
  if (!microfone) return;
  cancelAnimationFrame(microfone.frame);
  microfone.stream.getTracks().forEach((t) => t.stop());
  microfone.ctx.close();
  microfone = null;
  const botao = $("#btnMicrofone");
  botao.classList.remove("ouvindo");
  botao.textContent = "🎤 Assoprar pelo microfone";
  if (!musica.paused) ajustarVolume(volumeAlvo, 1200);
}

$("#btnMicrofone").addEventListener("click", ligarMicrofone);

/* =========================================================
   Carta
   ========================================================= */
let cartaAberta = false;
let pularDigitacao = false;

function liberarCarta() {
  $("#carta").classList.remove("bloqueada");
  $("#btnCarta").disabled = false;
}

$("#btnCarta").addEventListener("click", async () => {
  if (cartaAberta) return;
  cartaAberta = true;

  const envelope = $("#btnCarta");
  const papel = $("#papel");
  const r = envelope.getBoundingClientRect();
  efeitos.explodir(r.left + r.width / 2, r.top + r.height / 2, 30);
  envelope.classList.add("aberta");
  papel.classList.add("aberta");

  const texto = $("#textoCarta");
  for (const paragrafo of CONFIG.carta) {
    const p = document.createElement("p");
    texto.appendChild(p);
    for (let i = 1; i <= paragrafo.length; i++) {
      p.textContent = paragrafo.slice(0, i);
      if (!pularDigitacao) await esperar(paragrafo[i - 1] === "," || paragrafo[i - 1] === "." ? 180 : 32);
    }
    if (!pularDigitacao) await esperar(450);
  }

  const assinatura = $("#assinatura");
  assinatura.textContent = CONFIG.assinatura;
  assinatura.classList.add("visivel");
  const ra = assinatura.getBoundingClientRect();
  efeitos.explodir(ra.right - 60, ra.top + 10, 24);
});

// Tocar na carta enquanto ela é escrita mostra tudo de uma vez
$("#papel").addEventListener("click", () => (pularDigitacao = true));

const esperar = (ms) => new Promise((ok) => setTimeout(ok, ms));

/* =========================================================
   Animação ao rolar a página
   ========================================================= */
const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visivel");
        observador.unobserve(entrada.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".revelar").forEach((el) => observador.observe(el));
