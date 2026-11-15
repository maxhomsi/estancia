// Menu no celular: abre e fecha a lista de links.
(function () {
  var botao = document.querySelector(".menu__botao");
  var menu = document.getElementById("menu");
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
