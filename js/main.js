// Menu do celular e link da seção visível.
(function () {
  var botao = document.querySelector(".menu__botao");
  var menu = document.getElementById("menu");

  // Sublinha no menu a seção que está na tela.
  var links = Array.prototype.slice.call(document.querySelectorAll('.menu__lado a[href^="#"]'));
  var alvos = links.map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); });
  if ("IntersectionObserver" in window && alvos.some(Boolean)) {
    var visiveis = {};
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) { visiveis[e.target.id] = e.isIntersecting; });
      var atual = null;
      alvos.forEach(function (s) { if (s && visiveis[s.id] && !atual) atual = s.id; });
      links.forEach(function (a) { a.classList.toggle("ativo", a.getAttribute("href") === "#" + atual); });
    }, { rootMargin: "-35% 0px -55% 0px" });
    alvos.forEach(function (s) { if (s) obs.observe(s); });

    // O rodapé (Contato) fica no fim da página e nunca chega ao meio da tela:
    // conta como seção visível quando metade dele aparece.
    var rodape = document.getElementById("contato");
    if (rodape) {
      new IntersectionObserver(function (e) {
        var fim = e[0].isIntersecting;
        links.forEach(function (a) {
          if (a.getAttribute("href") === "#contato") a.classList.toggle("ativo", fim);
          else if (fim) a.classList.remove("ativo");
        });
      }, { threshold: .5 }).observe(rodape);
    }
  }

  if (!botao || !menu) return;

  function fechar() {
    menu.classList.remove("aberto");
    botao.setAttribute("aria-expanded", "false");
  }

  botao.addEventListener("click", function () {
    var aberto = menu.classList.toggle("aberto");
    botao.setAttribute("aria-expanded", aberto ? "true" : "false");
  });

  menu.addEventListener("click", function (evento) {
    if (evento.target.closest("a")) fechar();
  });

  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") fechar();
  });
})();

