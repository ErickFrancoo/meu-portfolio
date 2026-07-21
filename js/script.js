const btnSaibaMais = document.getElementById("btnSaibaMais");
const secaoSobre = document.getElementById("sobre");

btnSaibaMais.addEventListener("click", function () {
  secaoSobre.scrollIntoView({ behavior: "smooth" });
});
