// Menu no celular e linha sob o topo depois de rolar a página.
(function () {
  var topo = document.querySelector(".topo");
  var botao = document.querySelector(".menu__botao");
  var menu = document.getElementById("menu");

  if (topo) {
    var marcar = function () { topo.classList.toggle("rolou", window.scrollY > 8); };
    marcar();
    window.addEventListener("scroll", marcar, { passive: true });
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
