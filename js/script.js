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
  { arquivo: "IMG_20251012_141643.jpg", data: "2025-10-12", legenda: "Você é meu lugar preferido" },
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
const esperar = (ms) => new Promise((ok) => setTimeout(ok, ms));

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

// Elementos ganham a classe "visivel" quando aparecem na tela
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

// Reinicia uma animação de CSS e tira a classe quando ela termina
function animar(el, classe) {
  el.classList.remove(classe);
  void el.offsetWidth;
  el.classList.add(classe);
  el.addEventListener("animationend", function fim(e) {
    if (e.target !== el) return;
    el.classList.remove(classe);
    el.removeEventListener("animationend", fim);
  });
}

// Quebra o texto em letras para elas aparecerem uma a uma
function dividirLetras(el) {
  let i = 0;
  const percorrer = (no) => {
    [...no.childNodes].forEach((filho) => {
      if (filho.nodeType === Node.ELEMENT_NODE) return percorrer(filho);
      if (filho.nodeType !== Node.TEXT_NODE) return;
      const fragmento = document.createDocumentFragment();
      filho.textContent.split(/(\s+)/).forEach((parte) => {
        if (!parte) return;
        if (/^\s+$/.test(parte)) return fragmento.append(" ");
        const palavra = document.createElement("span");
        palavra.className = "palavra";
        for (const caractere of parte) {
          const letra = document.createElement("span");
          letra.className = "letra";
          letra.style.setProperty("--i", i++);
          letra.textContent = caractere;
          palavra.append(letra);
        }
        fragmento.append(palavra);
      });
      filho.replaceWith(fragmento);
    });
  };
  percorrer(el);
}

document.querySelectorAll(".dividir").forEach(dividirLetras);
document.querySelectorAll("[data-inicial]").forEach((el) => (el.textContent = CONFIG.nome.charAt(0).toUpperCase()));

/* =========================================================
   Pétalas e brilhos no fundo + efeitos (brilhos e confete)
   ========================================================= */
const efeitos = (() => {
  const fundo = $("#fundo");
  const topo = $("#efeitos");
  const ctxFundo = fundo.getContext("2d");
  const ctxTopo = topo.getContext("2d");
  const coresPetala = ["#d9c8fa", "#bfa6f2", "#f5a8cd", "#fde0ee", "#c9b3f7"];
  const coresBrilho = ["#7547cf", "#9d7ce6", "#e7609f", "#f5a8cd", "#bfa6f2"];
  let largura = 0, altura = 0;
  let petalas = [];
  let estrelas = [];
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
    const quantidade = movimentoReduzido ? 0 : Math.round(Math.min(22, largura / 55));
    petalas = Array.from({ length: quantidade }, () => novaPetala(true));
    estrelas = Array.from({ length: movimentoReduzido ? 0 : 16 }, () => ({
      x: Math.random() * largura,
      y: Math.random() * altura,
      tamanho: 3 + Math.random() * 5,
      fase: Math.random() * Math.PI * 2,
      cor: coresBrilho[Math.floor(Math.random() * 3)],
    }));
  }

  function novaPetala(qualquerAltura) {
    return {
      x: Math.random() * largura,
      y: qualquerAltura ? Math.random() * altura : -20,
      tamanho: 7 + Math.random() * 9,
      velocidade: 0.35 + Math.random() * 0.6,
      fase: Math.random() * Math.PI * 2,
      giro: (Math.random() - 0.5) * 0.02,
      rot: Math.random() * Math.PI,
      alpha: 0.35 + Math.random() * 0.4,
      cor: coresPetala[Math.floor(Math.random() * coresPetala.length)],
    };
  }

  function estrela(ctx, x, y, r, rot = 0) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.beginPath();
    ctx.moveTo(0, -r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.quadraticCurveTo(0, 0, 0, r);
    ctx.quadraticCurveTo(0, 0, -r, 0);
    ctx.quadraticCurveTo(0, 0, 0, -r);
    ctx.fill();
    ctx.restore();
  }

  // Pequena explosão de brilhos (usada em conquistas, não em todo toque)
  function brilhos(x, y, quantidade = 12) {
    for (let i = 0; i < quantidade; i++) {
      const angulo = Math.random() * Math.PI * 2;
      const forca = 1.2 + Math.random() * 3;
      particulas.push({
        tipo: Math.random() < 0.7 ? "estrela" : "ponto",
        x, y,
        vx: Math.cos(angulo) * forca,
        vy: Math.sin(angulo) * forca - 1,
        tamanho: 4 + Math.random() * 7,
        vida: 1,
        decaimento: 0.015 + Math.random() * 0.015,
        cor: coresBrilho[Math.floor(Math.random() * coresBrilho.length)],
        rot: Math.random() * Math.PI,
        vrot: (Math.random() - 0.5) * 0.15,
      });
    }
  }

  function confete(quantidade = 180) {
    const paleta = [...coresBrilho, "#d9c8fa", "#fde0ee"];
    for (let i = 0; i < quantidade; i++) {
      const lado = i % 2 === 0 ? 0 : largura;
      const sorteio = Math.random();
      particulas.push({
        tipo: sorteio < 0.2 ? "estrela" : sorteio < 0.35 ? "ponto" : "papel",
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
    for (const p of petalas) {
      p.y += p.velocidade;
      p.rot += p.giro;
      const x = p.x + Math.sin(tempo / 1800 + p.fase) * 30;
      if (p.y > altura + 30) Object.assign(p, novaPetala(false));
      ctxFundo.save();
      ctxFundo.globalAlpha = p.alpha;
      ctxFundo.fillStyle = p.cor;
      ctxFundo.translate(x, p.y);
      ctxFundo.rotate(p.rot);
      ctxFundo.scale(Math.cos(tempo / 900 + p.fase), 1); // pétala "girando" no ar
      ctxFundo.beginPath();
      ctxFundo.ellipse(0, 0, p.tamanho, p.tamanho * 0.55, 0, 0, Math.PI * 2);
      ctxFundo.fill();
      ctxFundo.restore();
    }
    for (const e of estrelas) {
      ctxFundo.globalAlpha = 0.15 + 0.45 * (0.5 + 0.5 * Math.sin(tempo / 700 + e.fase));
      ctxFundo.fillStyle = e.cor;
      estrela(ctxFundo, e.x, e.y, e.tamanho, tempo / 3000 + e.fase);
    }
    ctxFundo.globalAlpha = 1;

    ctxTopo.clearRect(0, 0, largura, altura);
    particulas = particulas.filter((p) => p.vida > 0 && p.y < altura + 50);
    for (const p of particulas) {
      if (p.gravidade) {
        p.vy += 0.25;
        p.vx *= 0.985;
      } else {
        p.vy += 0.04;
        p.vx *= 0.96;
        p.vy *= 0.96;
      }
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vrot;
      p.vida -= p.decaimento;
      ctxTopo.globalAlpha = Math.max(0, Math.min(1, p.vida * 1.5));
      ctxTopo.fillStyle = p.cor;
      if (p.tipo === "estrela") {
        estrela(ctxTopo, p.x, p.y, p.tamanho, p.rot);
      } else if (p.tipo === "ponto") {
        ctxTopo.beginPath();
        ctxTopo.arc(p.x, p.y, p.tamanho / 3, 0, Math.PI * 2);
        ctxTopo.fill();
      } else {
        ctxTopo.save();
        ctxTopo.translate(p.x, p.y);
        ctxTopo.rotate(p.rot);
        ctxTopo.scale(Math.cos(p.rot * 2), 1);
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

  return { brilhos, confete };
})();

function brilhosEm(el, quantidade) {
  const r = el.getBoundingClientRect();
  efeitos.brilhos(r.left + r.width / 2, r.top + r.height / 2, quantidade);
}

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
for (let i = 0; i < 26; i++) {
  const ponto = document.createElement("i");
  ponto.style.left = `${Math.random() * 100}%`;
  ponto.style.top = `${Math.random() * 100}%`;
  ponto.style.animationDelay = `${-Math.random() * 3}s`;
  ponto.style.scale = (0.4 + Math.random()).toFixed(2);
  $("#estrelas").appendChild(ponto);
}
requestAnimationFrame(() => requestAnimationFrame(() => $(".abertura__texto").classList.add("visivel")));

$("#btnAbrir").addEventListener("click", () => {
  musica.volume = 0;
  tocar();

  $("#envelopeAbertura").classList.add("aberto");
  $("#btnAbrir").disabled = true;

  setTimeout(() => {
    $("#abertura").classList.add("sumir");
    document.body.classList.remove("trancado");
    $("#inicio").classList.add("mostrar");
    player.classList.add("visivel");
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

// As fotos do topo e a luz acompanham o mouse
{
  const inicio = $("#inicio");
  const fotos = $("#fotosInicio");
  inicio.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    const r = inicio.getBoundingClientRect();
    fotos.style.setProperty("--mx", (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
    fotos.style.setProperty("--my", (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
    inicio.style.setProperty("--cx", `${e.clientX - r.left}px`);
    inicio.style.setProperty("--cy", `${e.clientY - r.top}px`);
  });
  inicio.addEventListener("pointerleave", () => {
    fotos.style.setProperty("--mx", 0);
    fotos.style.setProperty("--my", 0);
  });
}

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
  setTimeout(passo, 1200);
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
   Varal de fotos + visualizador
   ========================================================= */
const containerVarais = $("#varais");
let fotosPorVaralAtual = 0;

function fotosPorVaral() {
  const largura = containerVarais.clientWidth || window.innerWidth;
  return largura >= 900 ? 4 : largura >= 560 ? 3 : 2;
}

function criarFotoNoVaral(i, posicao, total, curva, alturaCorda) {
  const foto = FOTOS[i];
  // altura da corda neste ponto (a corda é uma curva que cede no meio)
  const f = (posicao + 0.5) / total;
  const y = alturaCorda + 4 * curva * f * (1 - f);

  const item = document.createElement("li");
  item.className = "varal__item" + (foto.horizontal ? " horizontal" : "");
  item.style.setProperty("--queda", `${y + 8}px`);
  item.style.setProperty("--i", posicao);

  const balanco = document.createElement("div");
  balanco.className = "varal__balanco";
  balanco.style.setProperty("--base", `${(posicao % 2 ? 1 : -1) * (1 + Math.random() * 2)}deg`);
  balanco.style.setProperty("--dur", `${3.5 + Math.random() * 2}s`);
  balanco.style.setProperty("--atraso", `${-Math.random() * 4}s`);

  const prendedor = document.createElement("span");
  prendedor.className = "prendedor";

  const polaroide = criarPolaroide(foto);
  const data = document.createElement("time");
  data.dateTime = foto.data;
  data.textContent = formatarData(foto.data);
  polaroide.querySelector("figcaption").append(data);
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

  balanco.append(prendedor, polaroide);
  item.append(balanco);
  return item;
}

function montarVarais() {
  const porVaral = fotosPorVaral();
  if (porVaral === fotosPorVaralAtual) return;
  fotosPorVaralAtual = porVaral;
  containerVarais.innerHTML = "";

  // distribui as fotos de forma equilibrada entre os varais
  const linhas = Math.ceil(FOTOS.length / porVaral);
  const base = Math.floor(FOTOS.length / linhas);
  const sobra = FOTOS.length % linhas;
  const curva = porVaral === 2 ? 30 : 52;
  const alturaCorda = 10;
  const caminhoCorda = `M0,${alturaCorda} Q500,${alturaCorda + 2 * curva} 1000,${alturaCorda}`;
  let indice = 0;

  for (let l = 0; l < linhas; l++) {
    const quantidade = base + (l < sobra ? 1 : 0);
    const varal = document.createElement("div");
    varal.className = "varal revelar";
    varal.innerHTML = `
      <svg class="varal__corda" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="${caminhoCorda}" vector-effect="non-scaling-stroke"/>
        <path d="${caminhoCorda}" vector-effect="non-scaling-stroke"/>
      </svg>
      <span class="varal__prego varal__prego--esq"></span>
      <span class="varal__prego varal__prego--dir"></span>`;

    const lista = document.createElement("ul");
    lista.className = "varal__fotos";
    for (let k = 0; k < quantidade; k++) {
      lista.appendChild(criarFotoNoVaral(indice++, k, quantidade, curva, alturaCorda));
    }
    varal.appendChild(lista);
    containerVarais.appendChild(varal);
    observador.observe(varal);
  }
}

montarVarais();
let esperaVarais = null;
window.addEventListener("resize", () => {
  clearTimeout(esperaVarais);
  esperaVarais = setTimeout(montarVarais, 200);
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
   Rolagem: barra de progresso no topo
   ========================================================= */
let rolagemPendente = false;

function atualizarRolagem() {
  rolagemPendente = false;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  $("#progresso").style.setProperty("--p", total > 0 ? (window.scrollY / total).toFixed(4) : 0);
}

window.addEventListener("scroll", () => {
  if (rolagemPendente) return;
  rolagemPendente = true;
  requestAnimationFrame(atualizarRolagem);
}, { passive: true });
atualizarRolagem();

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
  cartas.forEach((foto, i) => {
    const carta = document.createElement("button");
    carta.className = "carta-jogo";
    carta.style.setProperty("--i", i);
    carta.dataset.foto = foto.arquivo;
    carta.setAttribute("aria-label", "Carta virada para baixo");
    carta.innerHTML = `
      <span class="carta-jogo__interno">
        <span class="carta-jogo__face carta-jogo__face--costas">${CONFIG.nome.charAt(0).toUpperCase()}</span>
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
    viradas = [];
    paresAchados++;
    $("#pares").textContent = paresAchados;

    setTimeout(() => {
      a.classList.replace("virada", "achada");
      b.classList.replace("virada", "achada");
      brilhosEm(a, 8);
      brilhosEm(b, 8);
    }, 450);

    if (paresAchados === PARES) {
      setTimeout(() => {
        const vitoria = $("#vitoria");
        vitoria.textContent = `Você achou todos os pares em ${jogadas} jogadas… assim como eu achei em você o meu par perfeito ♥`;
        vitoria.hidden = false;
        efeitos.confete(120);
      }, 900);
    }
  } else {
    travado = true;
    setTimeout(() => {
      a.classList.add("errou");
      b.classList.add("errou");
    }, 550);
    setTimeout(() => {
      a.classList.remove("virada", "errou");
      b.classList.remove("virada", "errou");
      a.setAttribute("aria-label", "Carta virada para baixo");
      b.setAttribute("aria-label", "Carta virada para baixo");
      viradas = [];
      travado = false;
    }, 1150);
  }
}

$("#btnReiniciar").addEventListener("click", novoJogo);
novoJogo();

/* =========================================================
   Pote de motivos
   ========================================================= */
const pote = $("#pote");
const poteVidro = $("#poteVidro");
const bilhete = $("#bilhete");
const totalMotivos = CONFIG.motivos.length;
const descobertos = []; // índices dos motivos, na ordem em que ela encontrou
let motivosRestantes = embaralhar(CONFIG.motivos.map((_, i) => i));
let lidosNaRodada = 0;
let poteOcupado = false;

// Papeizinhos dentro do pote: [esquerda, baixo, rotação]
const POSICOES_PAPEIS = [
  [14, 10, -20], [66, 6, 12], [116, 12, -8],
  [26, 40, 28], [80, 36, -24], [122, 50, 16],
  [40, 70, -6], [96, 76, 22], [60, 104, -14],
];
const CORES_PAPEIS = ["#fde0ee", "#ffffff", "#ebe1fd", "#f5a8cd", "#d9c8fa"];

const papeis = POSICOES_PAPEIS.map(([esquerda, baixo, rot], i) => {
  const papel = document.createElement("span");
  papel.className = "papelzinho";
  papel.style.left = `${esquerda}px`;
  papel.style.bottom = `${baixo}px`;
  papel.style.setProperty("--rot", `${rot}deg`);
  papel.style.setProperty("--cor", CORES_PAPEIS[i % CORES_PAPEIS.length]);
  papel.style.setProperty("--atraso", `${-Math.random() * 3}s`);
  papel.style.setProperty("--atraso2", `${(POSICOES_PAPEIS.length - i) * 70}ms`);
  poteVidro.appendChild(papel);
  return papel;
});

// Bolinhas da coleção de motivos descobertos
$("#totalMotivos").textContent = totalMotivos;
// Os corações acendem na ordem em que ela encontra os motivos;
// embaixo de cada um aparece o número do motivo que ela achou (o mesmo do bilhete)
const itensColecao = CONFIG.motivos.map((_, posicao) => {
  const item = document.createElement("button");
  item.className = "colecao__item";
  item.textContent = "♥";
  item.disabled = true;
  item.setAttribute("aria-label", "Motivo ainda não descoberto");
  item.addEventListener("click", () => mostrarMotivo(descobertos[posicao]));
  $("#colecao").appendChild(item);
  return item;
});

function atualizarPapeis() {
  const visiveis = motivosRestantes.length === 0 ? 0 : Math.ceil((motivosRestantes.length / totalMotivos) * papeis.length);
  papeis.forEach((papel, i) => papel.classList.toggle("saiu", i >= visiveis));
}

function reencherPote() {
  motivosRestantes = embaralhar(CONFIG.motivos.map((_, i) => i));
  lidosNaRodada = 0;
  papeis.forEach((papel) => {
    papel.classList.remove("saiu");
    animar(papel, "voltando");
  });
}

function escreverNoBilhete(texto, numero, rodape) {
  const p = $("#motivoTexto");
  p.textContent = "";
  texto.split(" ").forEach((palavra, i) => {
    const span = document.createElement("span");
    span.className = "pm";
    span.style.setProperty("--i", i);
    span.textContent = palavra;
    p.append(span, " ");
  });
  $("#motivoNumero").textContent = numero;
  $("#motivoContador").textContent = rodape;
  animar(bilhete, "novo");
}

// Mostra o motivo com o número dele e destaca o coração correspondente
function mostrarMotivo(i) {
  const posicao = descobertos.indexOf(i);
  escreverNoBilhete(CONFIG.motivos[i], `nº ${i + 1}`, `${descobertos.length} de ${totalMotivos} descobertos`);
  itensColecao.forEach((item, k) => item.classList.toggle("atual", k === posicao));
}

function marcarDescoberto(i) {
  if (descobertos.includes(i)) return;
  descobertos.push(i);
  const item = itensColecao[descobertos.length - 1];
  item.dataset.numero = i + 1;
  item.classList.add("achado");
  item.disabled = false;
  item.setAttribute("aria-label", `Reler o motivo nº ${i + 1}`);
  $("#descobertos").textContent = descobertos.length;
  $("#barraColecao").style.width = `${(descobertos.length / totalMotivos) * 100}%`;
}

// Um papelzinho sai voando do pote até o bilhete
function voarPapel() {
  if (movimentoReduzido) return Promise.resolve();
  const a = poteVidro.getBoundingClientRect();
  const b = bilhete.getBoundingClientRect();
  const x0 = a.left + a.width / 2;
  const y0 = a.top + 20;
  const dx = b.left + b.width / 2 - x0;
  const dy = b.top + b.height / 2 - y0;

  const papel = document.createElement("div");
  papel.className = "papel-voando";
  papel.style.left = `${x0}px`;
  papel.style.top = `${y0}px`;
  document.body.appendChild(papel);

  const voo = papel.animate(
    [
      { transform: "translate(0, 0) rotate(0deg) scale(0.6)", opacity: 0 },
      { transform: `translate(${dx * 0.25}px, -150px) rotate(170deg) scale(1)`, opacity: 1, offset: 0.35 },
      { transform: `translate(${dx * 0.7}px, ${dy * 0.4 - 110}px) rotate(300deg) scale(1.4)`, opacity: 1, offset: 0.7 },
      { transform: `translate(${dx}px, ${dy}px) rotate(360deg) scale(3)`, opacity: 0 },
    ],
    { duration: 950, easing: "cubic-bezier(.45, 0, .25, 1)" }
  );
  return voo.finished.then(() => papel.remove());
}

pote.addEventListener("click", async () => {
  if (poteOcupado) return;
  poteOcupado = true;

  if (motivosRestantes.length === 0 && lidosNaRodada > 0) {
    // Acabou a rodada: mensagem especial e o pote se enche de novo
    animar(pote, "sacudir");
    escreverNoBilhete("E ainda existem infinitos outros que não cabem em pote nenhum ♥", "∞", "toque de novo para recomeçar");
    itensColecao.forEach((item) => item.classList.remove("atual"));
    efeitos.confete(80);
    await esperar(400);
    reencherPote();
    poteOcupado = false;
    return;
  }

  const indice = motivosRestantes.pop();
  lidosNaRodada++;

  pote.classList.add("abrindo");
  animar(pote, "sacudir");
  await esperar(300);
  atualizarPapeis();
  await voarPapel();

  marcarDescoberto(indice);
  mostrarMotivo(indice);
  efeitos.brilhos(bilhete.getBoundingClientRect().right - 30, bilhete.getBoundingClientRect().top + 20, 10);
  pote.classList.remove("abrindo");
  poteOcupado = false;
});

/* =========================================================
   Bolo 3D — montado peça por peça, de trás para frente
   ========================================================= */
const bolo3d = $("#bolo3d");
const px = (n) => `${n.toFixed(1)}px`;
let geometriaVelas = null;

function peca(classe, x, y, largura, altura, extra = {}) {
  const el = document.createElement("div");
  el.className = classe;
  Object.assign(el.style, { left: px(x), top: px(y), width: px(largura), height: px(altura) }, extra);
  bolo3d.appendChild(el);
  return el;
}

function montarBolo() {
  const centro = 180;
  const inclinacao = 0.3; // quanto "de cima" vemos o bolo
  const yPrato = 350;

  // halo de luz atrás do bolo
  const halo = document.createElement("div");
  halo.className = "b3-halo";
  bolo3d.appendChild(halo);

  // suporte: pé, haste e prato
  const rPrato = (330 * inclinacao) / 2;
  const espessura = 14;
  peca("b3-pe", centro - 80, yPrato + rPrato + espessura + 40, 160, 46);
  peca("b3-haste", centro - 40, yPrato + rPrato + espessura - 4, 80, 66);
  peca("b3-prato-lado", centro - 165, yPrato, 330, rPrato + espessura, {
    borderRadius: `0 0 50% 50% / 0 0 ${rPrato}px ${rPrato}px`,
  });
  peca("b3-prato-topo", centro - 165, yPrato - rPrato, 330, rPrato * 2);
  peca("b3-sombra", centro - 150, yPrato - 42, 300, 96);

  const andares = [
    { largura: 270, altura: 86 },
    { largura: 210, altura: 74 },
    { largura: 154, altura: 62 },
  ];
  let base = yPrato - 4;
  andares.forEach((a, n) => {
    a.n = n + 1;
    a.r = (a.largura * inclinacao) / 2; // raio vertical das elipses
    a.base = base; // centro da elipse de baixo
    a.topo = base - a.altura; // centro da elipse de cima
    base = a.topo;
  });

  // pontos ao redor de uma elipse (frente = metade de baixo)
  function anel(a, raio, quantidade, parte, criar) {
    for (let j = 0; j < quantidade; j++) {
      const angulo = (Math.PI * 2 * j) / quantidade + 0.15;
      const seno = Math.sin(angulo);
      if ((parte === "frente") !== (seno >= 0)) continue;
      const x = centro + Math.cos(angulo) * (a.largura / 2) * raio;
      const y = a.topo + seno * a.r * raio;
      criar(x, y, 0.85 + 0.15 * ((seno + 1) / 2));
    }
  }
  const roseta = (cor, tamanho) => (x, y, escala) => {
    const t = tamanho * escala;
    peca(`b3-roseta ${cor}`, x - t / 2, y - t * 0.7, t, t);
  };
  const perola = (cor, tamanho) => (x, y, escala) => {
    const t = tamanho * escala;
    peca(`b3-perola ${cor}`, x - t / 2, y - t * 0.6, t, t);
  };
  const aneisDeCima = {
    1: (parte) => anel(andares[0], 0.9, 18, parte, roseta("", 17)),
    2: (parte) => anel(andares[1], 0.87, 26, parte, perola("rosa", 9)),
    3: (parte) => anel(andares[2], 0.84, 14, parte, roseta("rosa", 17)),
  };

  andares.forEach((a) => {
    const esquerda = centro - a.largura / 2;

    // lateral do andar (cilindro)
    peca(`b3-lado andar-${a.n}`, esquerda, a.topo, a.largura, a.altura + a.r, {
      borderRadius: `0 0 50% 50% / 0 0 ${a.r}px ${a.r}px`,
    });

    // calda escorrendo pela frente
    const deslocamento = 9;
    const pingos = Math.round(a.largura / 15);
    for (let j = 0; j < pingos; j++) {
      const u = -0.94 + (1.88 * j) / (pingos - 1) + (Math.random() - 0.5) * 0.04;
      const borda = Math.sqrt(1 - u * u);
      const x = centro + (u * a.largura) / 2;
      const y = a.topo + deslocamento + a.r * borda;
      const comprimento = (8 + Math.random() * (a.altura * 0.32)) * (0.4 + 0.6 * borda);
      const espessuraPingo = 10 + Math.random() * 6;
      peca(`b3-pingo andar-${a.n}`, x - espessuraPingo / 2, y - 6, espessuraPingo, comprimento + 6);
    }

    // enfeites de cada andar
    if (a.n === 1) {
      for (let j = 0; j < 7; j++) {
        const angulo = (Math.PI * (j + 0.5)) / 7;
        const x = centro + Math.cos(angulo) * (a.largura / 2);
        const y = a.topo + a.altura * 0.58 + Math.sin(angulo) * a.r;
        const coracao = peca("b3-coracao", x - 8, y - 8, 16, 16, { transform: `scaleX(${Math.sin(angulo).toFixed(2)})` });
        coracao.textContent = "♥";
      }
    }
    if (a.n === 2) {
      const alturaFita = 15;
      const yFita = a.topo + a.altura * 0.52;
      peca("b3-fita", esquerda, yFita - a.r, a.largura, alturaFita + a.r * 2, {
        borderRadius: `0 0 50% 50% / 0 0 ${a.r}px ${a.r}px`,
        maskImage: `radial-gradient(ellipse ${a.largura / 2}px ${a.r}px at 50% ${a.r}px, transparent 99%, #000 100%)`,
        webkitMaskImage: `radial-gradient(ellipse ${a.largura / 2}px ${a.r}px at 50% ${a.r}px, transparent 99%, #000 100%)`,
      });
      const laco = peca("b3-laco", centro, yFita + a.r + alturaFita / 2, 0, 0);
      laco.innerHTML = "<i></i><i></i><i></i><i></i><i></i>";
    }
    if (a.n === 3) {
      [0.22, 0.86].forEach((altura) => {
        for (let j = 0; j < 9; j++) {
          const angulo = (Math.PI * (j + 0.5)) / 9;
          const x = centro + Math.cos(angulo) * (a.largura / 2) * 0.96;
          const y = a.topo + a.altura * altura + Math.sin(angulo) * a.r;
          const t = 5 * Math.sin(angulo) + 1;
          peca("b3-perola", x - t / 2, y - t / 2, t, t);
        }
      });
      const nome = peca("b3-nome", centro, a.topo + a.altura * 0.55 + a.r, 0, 0, { width: "auto", height: "auto" });
      nome.textContent = CONFIG.nome;
    }

    // pérolas na base do andar
    const perolas = Math.round(a.largura / 11);
    for (let j = 0; j < perolas; j++) {
      const angulo = (Math.PI * j) / (perolas - 1);
      const t = 10 * (0.8 + 0.2 * Math.sin(angulo));
      const x = centro + Math.cos(angulo) * (a.largura / 2);
      const y = a.base + Math.sin(angulo) * a.r;
      peca(`b3-perola${a.n === 2 ? " rosa" : ""}`, x - t / 2, y - t * 0.75, t, t);
    }

    // a parte da frente do anel do andar de baixo fica na frente deste andar
    if (a.n > 1) aneisDeCima[a.n - 1]("frente");

    // cobertura de cima
    peca(`b3-calda andar-${a.n}`, esquerda, a.topo - a.r + deslocamento, a.largura, a.r * 2);
    peca(`b3-topo andar-${a.n}`, esquerda, a.topo - a.r, a.largura, a.r * 2);
    aneisDeCima[a.n]("tras");
  });

  // granulado colorido no topo
  const topo = andares[2];
  const cores = ["#7547cf", "#e7609f", "#bfa6f2", "#f5a8cd", "#9d7ce6", "#ffd36e"];
  for (let j = 0; j < 30; j++) {
    const angulo = Math.random() * Math.PI * 2;
    const distancia = Math.sqrt(Math.random()) * 0.66;
    const x = centro + Math.cos(angulo) * (topo.largura / 2) * distancia;
    const y = topo.topo + Math.sin(angulo) * topo.r * distancia;
    peca("b3-granulado", x - 3.5, y - 1.5, 7, 3, {
      background: cores[j % cores.length],
      transform: `rotate(${Math.random() * 180}deg) scaleY(${0.8 + Math.random() * 0.4})`,
    });
  }

  // lugar das velas (por cima do topo, atrás das rosetas da frente)
  const velas = document.createElement("div");
  velas.className = "b3-velas";
  velas.id = "velas";
  bolo3d.appendChild(velas);
  geometriaVelas = { x: centro, y: topo.topo, rx: (topo.largura / 2) * 0.5, ry: topo.r * 0.5 };

  aneisDeCima[3]("frente");
}

montarBolo();

// O bolo acompanha o mouse levemente, como se girasse
{
  const cena = $(".bolo-cena");
  cena.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    const r = bolo3d.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    bolo3d.classList.add("inclinando");
    bolo3d.style.setProperty("--ty", `${(nx * 16).toFixed(2)}deg`);
    bolo3d.style.setProperty("--tx", `${(-ny * 8).toFixed(2)}deg`);
  });
  cena.addEventListener("pointerleave", () => {
    bolo3d.style.setProperty("--ty", "0deg");
    bolo3d.style.setProperty("--tx", "0deg");
  });
}

/* =========================================================
   Bolo e velinhas
   ========================================================= */
const containerVelas = $("#velas");
const mensagemBolo = $("#mensagemBolo");
let comemorou = false;

function criarVelas() {
  containerVelas.innerHTML = "";
  const { x, y, rx, ry } = geometriaVelas;

  // velas em círculo no topo; as de trás são desenhadas primeiro
  const posicoes = Array.from({ length: CONFIG.velas }, (_, i) => {
    const angulo = -Math.PI / 2 + (Math.PI * 2 * i) / CONFIG.velas;
    return { x: x + Math.cos(angulo) * rx, y: y + Math.sin(angulo) * ry, profundidade: (Math.sin(angulo) + 1) / 2 };
  }).sort((a, b) => a.y - b.y);

  posicoes.forEach((pos, i) => {
    const altura = 44 + pos.profundidade * 10;
    const vela = document.createElement("button");
    vela.className = "vela";
    vela.setAttribute("aria-label", `Assoprar a vela ${i + 1}`);
    vela.innerHTML = `<span class="vela__chama"></span><span class="vela__fumaca"></span>`;
    vela.style.left = `${pos.x - 6}px`;
    vela.style.top = `${pos.y - altura + 3}px`;
    vela.style.height = `${altura}px`;
    vela.addEventListener("click", () => apagarVela(vela));
    containerVelas.appendChild(vela);
  });
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

function soltarBaloes(quantidade = 14) {
  if (movimentoReduzido) return;
  const cores = ["#bfa6f2", "#f5a8cd", "#9d7ce6", "#e7609f", "#d9c8fa", "#7547cf"];
  for (let i = 0; i < quantidade; i++) {
    const balao = document.createElement("div");
    balao.className = "balao";
    const duracao = 6 + Math.random() * 4;
    const atraso = i * 0.25;
    balao.style.left = `${2 + Math.random() * 90}vw`;
    balao.style.setProperty("--tam", `${44 + Math.random() * 28}px`);
    balao.style.setProperty("--dur", `${duracao}s`);
    balao.style.setProperty("--cor", cores[i % cores.length]);
    balao.style.animationDelay = `${atraso}s, ${-Math.random() * 2}s`;
    document.body.appendChild(balao);
    setTimeout(() => balao.remove(), (duracao + atraso) * 1000 + 200);
  }
}

function comemorar() {
  pararMicrofone();
  mensagemBolo.textContent = "Pedido feito! Que todos os seus sonhos se realizem 🎉";
  $("#btnAcender").hidden = false;
  efeitos.confete(220);
  setTimeout(() => efeitos.confete(120), 700);
  soltarBaloes();
  animar(bolo3d, "comemorando");

  if (!comemorou) {
    comemorou = true;
    liberarCarta();
    setTimeout(() => $("#carta").scrollIntoView({ behavior: "smooth" }), 3600);
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
  envelope.classList.add("abrindo");
  brilhosEm(envelope, 18);
  await esperar(750);
  envelope.classList.add("aberta");
  papel.classList.add("aberta");

  const texto = $("#textoCarta");
  for (const paragrafo of CONFIG.carta) {
    const p = document.createElement("p");
    p.className = "escrevendo";
    texto.appendChild(p);
    for (let i = 1; i <= paragrafo.length; i++) {
      p.textContent = paragrafo.slice(0, i);
      if (!pularDigitacao) await esperar(paragrafo[i - 1] === "," || paragrafo[i - 1] === "." ? 180 : 32);
    }
    p.classList.remove("escrevendo");
    if (!pularDigitacao) await esperar(450);
  }

  const assinatura = $("#assinatura");
  assinatura.textContent = CONFIG.assinatura;
  assinatura.classList.add("visivel");
  const ra = assinatura.getBoundingClientRect();
  efeitos.brilhos(ra.right - 60, ra.top + 10, 16);
});

// Tocar na carta enquanto ela é escrita mostra tudo de uma vez
$("#papel").addEventListener("click", () => (pularDigitacao = true));

document.querySelectorAll(".revelar, .jogo__tabuleiro").forEach((el) => observador.observe(el));
