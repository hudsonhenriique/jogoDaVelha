const celulaElementos = document.querySelectorAll("[dados-celula]");
const board = document.querySelector("[dados-board]");
const textoVitoriaElement = document.querySelector("[dados-texto-vitoria]");
const textoVitoria = document.querySelector("[dados-mensagem-vitoria]");
const btnReiniciar = document.querySelector("[dados-btn-reiniciar]");

let vezDoCirculo = false;

const combinacoesVitoria = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const verificarVitoria = (jogadorAtual) => {
  return combinacoesVitoria.some((combinacao) => {
    // O every verifica se todas o jogador atual fez alguma das combinações de vitória passando por sua index
    return combinacao.every((index) => {
      // Esta função verifica se o jogadorAtual está nas mesma celula das combinações
      return celulaElementos[index].classList.contains(jogadorAtual);
    });
  });
};

const verificarEmpate = () => {
  return [...celulaElementos].every((celula) => {
    return (
      celula.classList.contains("x") || celula.classList.contains("circulo")
    );
  });
};

const comecaJogo = () => {
  vezDoCirculo = false;

  for (const celula of celulaElementos) {
    celula.classList.remove("circulo");
    celula.classList.remove("x");
    celula.removeEventListener("click", handleClick);
    celula.addEventListener("click", handleClick, { once: true });
  }

  setBoardHouverClass();
  textoVitoria.classList.remove("mostrar-texto-vitoria");
};

const fimdeJogo = (empate) => {
  if (empate) {
    textoVitoriaElement.innerText = "Empate!";
  } else {
    textoVitoriaElement.innerText = vezDoCirculo
      ? "Círculo Venceu"
      : "X Venceu";
  }

  textoVitoria.classList.add("mostrar-texto-vitoria");
};

const placeMark = (celula, adcClass) => {
  celula.classList.add(adcClass);
};

const setBoardHouverClass = () => {
  board.classList.remove("circulo");
  board.classList.remove("x");

  if (vezDoCirculo) {
    board.classList.add("circulo");
  } else {
    board.classList.add("x");
  }
};

const mudarTurno = () => {
  vezDoCirculo = !vezDoCirculo;
  setBoardHouverClass();
};

const handleClick = (e) => {
  //Colocar a marca X ou Circulo
  const celula = e.target;
  const adcClass = vezDoCirculo ? "circulo" : "x";

  placeMark(celula, adcClass);
  //Verificar vitória

  const eVitoria = verificarVitoria(adcClass);

  //Verificar empate
  const eEmpate = verificarEmpate();

  if (eVitoria) {
    fimdeJogo(false);
  } else if (eEmpate) {
    fimdeJogo(true);
  } else {
    //Mudar Simbolo
    mudarTurno();
  }
};

comecaJogo();
btnReiniciar.addEventListener("click", comecaJogo);
