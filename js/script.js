const btnSaibaMais = document.getElementById("btnSaibaMais");
const secaoSobre = document.getElementById("sobre");

btnSaibaMais.addEventListener("click", function () {
  secaoSobre.scrollIntoView({ behavior: "smooth" });
});

const campoCep = document.getElementById("cep");
const cepStatus = document.getElementById("cepStatus");
const campoRua = document.getElementById("rua");
const campoCidade = document.getElementById("cidade");

campoCep.addEventListener("blur", async function () {
  const numeros = campoCep.value.replace(/\D/g, "");

  // campo vazio nao precisa de aviso
  if (numeros.length === 0) {
    cepStatus.className = "";
    cepStatus.textContent = "";
    return;
  }

  if (numeros.length !== 8) {
    cepStatus.className = "erro";
    cepStatus.textContent = "O CEP deve ter 8 dígitos.";
    return;
  }

  cepStatus.className = "carregando";
  cepStatus.textContent = "Buscando endereço...";

  try {
    const resposta = await fetch("https://viacep.com.br/ws/" + numeros + "/json/");
    const dados = await resposta.json();

    // a ViaCEP responde { erro: true } quando o CEP nao existe
    if (dados.erro) {
      campoRua.value = "";
      campoCidade.value = "";
      cepStatus.className = "erro";
      cepStatus.textContent = "CEP não encontrado.";
      return;
    }

    campoRua.value = dados.logradouro;
    campoCidade.value = dados.localidade + "/" + dados.uf;
    cepStatus.className = "sucesso";
    cepStatus.textContent = "Endereço encontrado.";
  } catch (erro) {
    cepStatus.className = "erro";
    cepStatus.textContent = "Não foi possível buscar o CEP. Tente novamente.";
  }
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

  // limpa o status do CEP junto com os campos
  cepStatus.className = "";
  cepStatus.textContent = "";
});
