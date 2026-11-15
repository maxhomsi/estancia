/*
  Chat de dúvidas da Paladar da Estância.
  Respostas pré-programadas (sem IA): o conteúdo fica em js/chat-respostas.js.
*/
(function () {
  "use strict";

  var D = window.PALADAR_CHAT;
  if (!D || !D.perguntas) return;

  var reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var naHome = /(^|\/)(index\.html)?$/.test(location.pathname);

  /* ---------- Busca por texto ---------- */

  function normalizar(texto) {
    return String(texto)
      .toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9\s-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  // Cada palavra-chave vale mais quanto mais palavras e letras tiver,
  // assim "depois de aberto" ganha de "aberto" quando as duas aparecem.
  function pontuar(texto, palavras) {
    var alvo = " " + texto + " ";
    var total = 0;
    for (var i = 0; i < palavras.length; i++) {
      var p = palavras[i];
      if (p && alvo.indexOf(" " + p + " ") !== -1) total += p.split(" ").length * 10 + p.length;
    }
    return total;
  }

  var perguntas = D.perguntas.map(function (q) {
    var chaves = (q.palavras || []).concat([q.pergunta]).map(normalizar);
    return { dados: q, chaves: chaves };
  });
  var porId = {};
  D.perguntas.forEach(function (q) { porId[q.id] = q; });

  function buscar(texto) {
    var t = normalizar(texto);
    if (!t) return null;
    var melhor = null, nota = 0;
    perguntas.forEach(function (q) {
      var n = pontuar(t, q.chaves);
      if (n > nota) { nota = n; melhor = q.dados; }
    });
    if (melhor) return { tipo: "pergunta", dados: melhor };
    for (var i = 0; i < (D.conversa || []).length; i++) {
      var c = D.conversa[i];
      if (pontuar(t, c.palavras.map(normalizar)) > 0) return { tipo: "conversa", dados: c };
    }
    return null;
  }

  /* ---------- Montagem da interface ---------- */

  var icone = {
    balao: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.2 3.6c-.5.4-1.3.1-1.3-.6V16A2.5 2.5 0 0 1 4 13.5z" fill="currentColor"/></svg>',
    fechar: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    enviar: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12l15-7-5 15-3-6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>'
  };

  var botao = document.createElement("button");
  botao.type = "button";
  botao.className = "pchat-botao";
  botao.setAttribute("aria-expanded", "false");
  botao.setAttribute("aria-controls", "pchat-painel");
  botao.innerHTML = icone.balao + "<span>Tire suas dúvidas</span>";

  var painel = document.createElement("section");
  painel.className = "pchat-painel";
  painel.id = "pchat-painel";
  painel.setAttribute("role", "dialog");
  painel.setAttribute("aria-label", "Chat de dúvidas da Paladar da Estância");
  painel.hidden = true;
  painel.innerHTML =
    '<header class="pchat-topo">' +
      '<img class="pchat-avatar" src="assets/apple-touch-icon.png" alt="" width="40" height="40">' +
      '<div class="pchat-titulo"><strong></strong><span>Respostas automáticas</span></div>' +
      '<button type="button" class="pchat-fechar" aria-label="Fechar chat">' + icone.fechar + '</button>' +
    '</header>' +
    '<div class="pchat-mensagens" aria-live="polite"></div>' +
    '<form class="pchat-form" autocomplete="off">' +
      '<label class="pchat-oculto" for="pchat-campo">Escreva sua dúvida</label>' +
      '<input id="pchat-campo" type="text" maxlength="200" placeholder="Escreva sua dúvida">' +
      '<button type="submit" aria-label="Enviar pergunta">' + icone.enviar + '</button>' +
    '</form>';
  painel.querySelector(".pchat-titulo strong").textContent = D.nome || "Atendimento";

  document.body.appendChild(painel);
  document.body.appendChild(botao);

  var lista = painel.querySelector(".pchat-mensagens");
  var form = painel.querySelector(".pchat-form");
  var campo = painel.querySelector("#pchat-campo");
  var fechar = painel.querySelector(".pchat-fechar");
  var iniciado = false;
  var ocupado = false;

  /* ---------- Mensagens ---------- */

  function rolar() {
    lista.scrollTo({ top: lista.scrollHeight, behavior: reduzir ? "auto" : "smooth" });
  }

  function ajustarLinks(html) {
    return naHome ? html.replace(/href="index\.html#/g, 'href="#') : html;
  }

  function mensagemBot(html) {
    var m = document.createElement("div");
    m.className = "pchat-msg pchat-msg--bot";
    m.innerHTML = ajustarLinks(html);
    lista.appendChild(m);
    rolar();
  }

  function mensagemVisitante(texto) {
    var m = document.createElement("div");
    m.className = "pchat-msg pchat-msg--visitante";
    m.textContent = texto;
    lista.appendChild(m);
    rolar();
  }

  function removerOpcoes() {
    lista.querySelectorAll(".pchat-opcoes").forEach(function (o) { o.remove(); });
  }

  function opcoes(itens) {
    removerOpcoes();
    var caixa = document.createElement("div");
    caixa.className = "pchat-opcoes";
    itens.forEach(function (item) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "pchat-opcao" + (item.secundaria ? " pchat-opcao--secundaria" : "");
      b.textContent = item.texto;
      b.addEventListener("click", item.acao);
      caixa.appendChild(b);
    });
    lista.appendChild(caixa);
    rolar();
    // Quem navega pelo teclado não perde o lugar quando os botões antigos somem.
    var ativo = document.activeElement;
    if (!painel.hidden && ativo !== campo && (ativo === document.body || painel.contains(ativo))) {
      caixa.querySelector("button").focus({ preventScroll: true });
    }
  }

  function digitando(depois) {
    ocupado = true;
    var m = document.createElement("div");
    m.className = "pchat-msg pchat-msg--bot pchat-digitando";
    m.setAttribute("aria-label", "Digitando");
    m.innerHTML = "<span></span><span></span><span></span>";
    lista.appendChild(m);
    rolar();
    setTimeout(function () {
      m.remove();
      ocupado = false;
      depois();
    }, reduzir ? 150 : 550);
  }

  function blocoContato() {
    var c = D.contato || {};
    var links = [];
    if (c.whatsapp) {
      var msg = encodeURIComponent("Olá! Vim pelo site da Paladar da Estância e tenho uma dúvida.");
      links.push('<a class="pchat-contato" href="https://wa.me/' + c.whatsapp.replace(/\D/g, "") + "?text=" + msg + '" target="_blank" rel="noopener">Falar no WhatsApp</a>');
    }
    if (c.email) links.push('<a class="pchat-contato" href="mailto:' + c.email + '">Enviar e-mail</a>');
    if (c.instagram) links.push('<a class="pchat-contato" href="https://instagram.com/' + c.instagram.replace(/^@/, "") + '" target="_blank" rel="noopener">Instagram</a>');
    return links.length ? '<span class="pchat-contatos">' + links.join("") + "</span>" : "";
  }

  /* ---------- Fluxo ---------- */

  function mostrarAssuntos(textoBot) {
    if (textoBot) mensagemBot(textoBot);
    opcoes(D.assuntos.map(function (a) {
      return { texto: a.titulo, acao: function () { escolherAssunto(a); } };
    }));
  }

  function escolherAssunto(a) {
    if (ocupado) return;
    removerOpcoes();
    mensagemVisitante(a.titulo);
    digitando(function () {
      mensagemBot("Sobre <strong>" + a.titulo.toLowerCase() + "</strong>, posso responder:");
      var itens = D.perguntas.filter(function (q) { return q.assunto === a.id; }).map(function (q) {
        return { texto: q.pergunta, acao: function () { responder(q, true); } };
      });
      itens.push({ texto: "Outros assuntos", secundaria: true, acao: voltar });
      opcoes(itens);
    });
  }

  function responder(q, mostrarPergunta) {
    if (ocupado) return;
    removerOpcoes();
    if (mostrarPergunta) mensagemVisitante(q.pergunta);
    digitando(function () {
      mensagemBot(q.resposta + (q.contato ? blocoContato() : ""));
      var itens = (q.relacionadas || []).filter(function (id) { return porId[id]; }).map(function (id) {
        var r = porId[id];
        return { texto: r.pergunta, acao: function () { responder(r, true); } };
      });
      itens.push({ texto: "Outros assuntos", secundaria: true, acao: voltar });
      opcoes(itens);
    });
  }

  function voltar() {
    if (ocupado) return;
    removerOpcoes();
    mensagemVisitante("Outros assuntos");
    digitando(function () { mostrarAssuntos("Claro. Escolha um assunto:"); });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var texto = campo.value.trim();
    if (!texto || ocupado) return;
    campo.value = "";
    removerOpcoes();
    mensagemVisitante(texto);
    var achado = buscar(texto);
    if (achado && achado.tipo === "pergunta") return responder(achado.dados, false);
    digitando(function () {
      if (achado && achado.tipo === "conversa") mostrarAssuntos(achado.dados.resposta);
      else mostrarAssuntos(D.semResposta);
    });
  });

  /* ---------- Abrir e fechar ---------- */

  function abrir() {
    painel.hidden = false;
    botao.setAttribute("aria-expanded", "true");
    document.documentElement.classList.add("pchat-aberto");
    if (!iniciado) {
      iniciado = true;
      mostrarAssuntos(D.saudacao);
    }
    if (window.matchMedia("(pointer: fine)").matches) campo.focus();
    else fechar.focus();
  }

  function fecharPainel(devolverFoco) {
    painel.hidden = true;
    botao.setAttribute("aria-expanded", "false");
    document.documentElement.classList.remove("pchat-aberto");
    if (devolverFoco) botao.focus();
  }

  botao.addEventListener("click", function () {
    if (painel.hidden) abrir(); else fecharPainel(false);
  });
  fechar.addEventListener("click", function () { fecharPainel(true); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !painel.hidden) fecharPainel(true);
  });

  // No celular o painel cobre a página: ao seguir um link de dentro da resposta, fecha.
  lista.addEventListener("click", function (e) {
    var a = e.target.closest("a");
    if (a && a.getAttribute("href").charAt(0) === "#" && window.matchMedia("(max-width: 36rem)").matches) fecharPainel(false);
  });

  // Ganchos para testes e para abrir o chat a partir de outro botão do site.
  window.PaladarChat = { abrir: abrir, fechar: function () { fecharPainel(false); }, buscar: buscar };
})();
