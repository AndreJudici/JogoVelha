var vez = 'X';
var fimJogo = false;
const tabuleiro = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

const vitorias = [
  //Linhas
  [ [0,0], [0,1], [0,2] ],
  [ [1,0], [1,1], [1,2] ],
  [ [2,0], [2,1], [2,2] ],
  
  //colunas
  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],
  
  //cruzadas
  [[0, 0], [1, 1], [2, 2]],
  [[0, 2], [1, 1], [2, 0]],
];

const botao = document.querySelector('button[name=reiniciar-tabuleiro]');

const botaoPlacar = document.querySelector('button[name=reiniciar-placar]');

const status = document.querySelector('.status');

const quadrados = document.querySelectorAll('.tabuleiro-quadrado');

const placarx = document.querySelector('span[class=placar-x]');

const placaro = document.querySelector('span[class=placar-o]');

const aplausos = document.querySelector('audio');

limparTabuleiro();
setTextoVez();

quadrados.forEach((quadrado) => {
  quadrado.addEventListener('click', () => {
    
    if (fimJogo) {
      return;
    }
    
    if (quadrado.innerHTML != '') {
      return;
    }
    
    quadrado.innerHTML = vez;
    const linha = quadrado.dataset.linha;
    const coluna = quadrado.dataset.coluna;
    setTabuleiro(linha, coluna, vez);
    analisarVitoria();
    
    if (fimJogo) {
      return;
    }
    
    atualizarVez();
    setTextoVez();
    
  })
})

function analisarVitoria()
{
  const indiceVitoria = getIndiceVitoria();
  if (indiceVitoria > -1)
  {
    aplausos.play();
    atualizarPlacar();
    pintarVitoria(indiceVitoria);
    exibirVencedor();
    jogarConfete();
    fimJogo = true;
    return;
  }
}

function jogarConfete()
{
  let params = {
		particleCount: 500, // Quantidade de confetes
		spread: 90, // O quanto eles se espalham
		startVelocity: 70, // Velocidade inicial
		origin: { x: 0, y: 0.5 }, // Posição inicial na tela
		angle: 45 // Ângulo em que os confetes serão lançados
	};

	// Joga confetes da esquerda pra direita
	confetti(params);

	// Joga confetes da direita para a esquerda
	params.origin.x = 1;
	params.angle = 135;
	confetti(params);

}

function atualizarPlacar()
{
  if (vez == 'X') {
    placarx.textContent = parseInt(placarx.textContent) + 1;
  } else {
    placaro.textContent = parseInt(placaro.textContent) + 1;
  }
}

function exibirVencedor()
{
  let vencedor;
  if (vez == 'X') {
    vencedor = 'Jogador X';
  } else {
    vencedor = 'Jogador O';
  }
  
  setStatus('Vencedor: ' + vencedor);
}

function pintarVitoria(indice)
{
  for (var i = 0; i < 3; i++) {
    const linha = vitorias[indice][i][0];
    const coluna = vitorias[indice][i][1];
    
    const q = document.querySelector('[data-linha="' + linha + '"][data-coluna="' + coluna + '"]');
    
    const cor = getCor();
    q.classList.add(cor);
  }
}

function getCor()
{
  if (vez == 'X')
    return 'azul';
    
  return 'verde';
}

function getIndiceVitoria()
{
  for (var i = 0; i < vitorias.length; i++) {
    let vitoria =
      tabuleiro[ vitorias[i][0][0] ]
               [ vitorias[i][0][1]] == vez &&
      tabuleiro[vitorias[i][1][0]]
               [vitorias[i][1][1]] == vez &&
      tabuleiro[vitorias[i][2][0]]
               [vitorias[i][2][1]] == vez;
               
      if (vitoria) {
        return i;
      }
  }
  
  return -1;
}

function setTabuleiro(linha, coluna, texto)
{
  tabuleiro[linha][coluna] = texto;
}

function atualizarVez()
{
  if (vez == 'X') {
    vez = 'O';
  } else {
    vez = 'X';
  }
}

botao.addEventListener('click', () => {
  limparTabuleiro();
});

function limparTabuleiro()
{
  quadrados.forEach((quadrado) => {
      quadrado.innerHTML = '';
      
      const linha = quadrado.dataset.linha;
      const coluna = quadrado.dataset.coluna;
      setTabuleiro(linha, coluna, '');
      
      const cor = getCor();
      quadrado.classList.remove(cor);
      
      setTextoVez();
  });
  
  fimJogo = false;
}

botaoPlacar.addEventListener('click', () => {
  placarx.textContent = '0';
  placaro.textContent = '0';
})

function setTextoVez()
{
  setStatus('Vez: ' + vez);
}

function setStatus(texto)
{
  status.innerHTML = texto;
}
