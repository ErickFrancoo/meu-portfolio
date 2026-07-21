const btnSaibaMais = document.getElementById("btnSaibaMais");
const secaoSobre = document.getElementById("sobre");

btnSaibaMais.addEventListener("click", function () {
  secaoSobre.scrollIntoView({ behavior: "smooth" });
});

const formContato = document.getElementById("formContato");
const formFeedback = document.getElementById("formFeedback");

formContato.addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  if (!nome || !email || !mensagem) {
    formFeedback.className = "erro";
    formFeedback.textContent = "Preencha nome, e-mail e mensagem antes de enviar.";
    return;
  }

  formFeedback.className = "sucesso";
  formFeedback.textContent = "Obrigado, " + nome + "! Sua mensagem foi enviada.";
  formContato.reset();
});
