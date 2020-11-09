// variável que recebe o elemento do HTML
const cardBoard = document.getElementById('tabuleiro')


//array com as imagens para criar as cartas no HTML
const images = ['bobArcoIris.jpg', 'bobPatrickLula.jpg', 'gary.jpg', 'lulaMolusco.jpg', 'patrick.jpg', 'plancton.jpg', 'sandyBochechas.jpg',  'sirigueijo.jpg']

// variável para criar as cartas no html pelo js
let cartaHTML = ''


// para cada elementro dentro do array images, img recebe um elemento, o cartaHTML recebe o que será criado no html
images.forEach(img => {
  cartaHTML += ` <div class="carta-memoria flip" data-card="${img}">
                    <img class="verso" src="img/verso.jpg">  
                    <img class="frente" src="img/${img}">
                </div>`
})

// incrementa no html a variável citada acima. 2 vezes pois precisa ser formado o par
cardBoard.innerHTML = cartaHTML + cartaHTML



//--------------FIM DA CRIAÇÃO DOS ELEMENTOS HTML----------------

// variavel para pegar todos os elementos que tem a classe carta-memoria
let cards = document.querySelectorAll(".carta-memoria")


let carta1, carta2 //variável para guardar as cartas clicadas
let bloqJogo = false //variável que irá bloquear o tabuleiro para não clicar em mais de 2 cartas
let controle=0 //variável para fazer o controle para quando todas as cartas estiverem viradas



// função para remover a classe 'flip' que inicia ja inclusa na div para as cartas começarem viradas para cima
function removerClasse(){
  for(i=1; i<17; i++){
    // remove pelo índice do elemento em realção ao html
    document.getElementsByTagName("div")[i].className=''
    document.getElementsByTagName("div")[i].className='carta-memoria'
  }
}



function flipCard(){
  // verifica se bloqJogo está true, caso esteja, irá bloquear o tabuleiro
  if (bloqJogo===true){
    return false
  }

  // ao clicar na carta, é adicionada essa classe no div carta-memoria
  this.classList.add("flip")  
  

  // ! usado para saber "carta1 está indefinida?"
  if(!carta1){
    carta1 = this
    return false //para sair de dentro do if
  }
  carta2 = this 

  combinar()
}


// função para verificar se as cartas combinam

function combinar(){
  // verifica se o dataset da carta1 é igual ao dataset da carta2, caso seja, retorna true, caso sejam diferentes, retorna false
  let isMatch = carta1.dataset.card === carta2.dataset.card

  //se as cartas nao combinarem, entra no desligaCartas, se sim, reseta tirando o click das cartas e limpando as variaveis
  !isMatch? desligaCartas(): resetaCartas(isMatch)

  // condicional para poder soltar o alert quando o jogo finalziar e reseta a página
  if(controle===8){
    clearInterval(chamadaCron)

    setTimeout(()=> {
      if(confirm(`Parabéns! Jogo concluído em ${horas}:${minutos}:${segundos}`)){
        window.location.reload();  
      }
      
    },700)
    
  }

}

// função para quando as cartas forem diferentes, remover a classe flip das duas após 1.5s e para bloquear outras cartas
function desligaCartas(){
  // enquanto estiver verificando se as cartas combinam, vai bloquear para não ser possível clicar em mais de 2
  bloqJogo = true;

  setTimeout(() => {
    carta1.classList.remove('flip')
    carta2.classList.remove('flip')
    resetaCartas()
  }, 1500)
  
}

// função para cada carta receber um número randômico
function shuffle(){
  
  // após 3 segundos, vira o verso removendo a classe 'flip'
  setTimeout(function(){ 
    removerClasse()
    },3000)
  
  cards.forEach( card => {
    let rand = Math.floor(Math.random() * 32)
    card.style.order = rand
  }) 
  // começa a contagem do cronometro
  chamadaCron = setInterval(cronom, 1000)
}

// função para limpar as variáveis
function resetaCartas(isMatch = false){
  // quando for true, irá remover o evento click que recebe o flipcard
  if(isMatch){
    carta1.removeEventListener('click', flipCard)
    carta2.removeEventListener('click', flipCard)
    controle = controle+1
  }

  carta1 = null
  carta2 = null
  bloqJogo = false
}

//para cada carta clicada, ela receberá um evento click do mouse com a função flipCard
cards.forEach(card => card.addEventListener('click', flipCard))

// ---------------------------------CRONOMETRO-----------------------

  let horas = `00`,
      minutos = `00`,
      segundos = `00`,
      displayCron = document.querySelector(`#cronometro`),
      chamadaCron

  function cronom() {

    segundos ++

    if (segundos < 10) segundos = `0` + segundos

    if (segundos > 59) {
      segundos = `00`
      minutos ++

      if (minutos < 10) minutos = `0` + minutos
    }

    if (minutos > 59) {
      minutos = `00`
      horas ++
      
      if (horas < 10) horas = `0` + horas
    }

    displayCron.textContent = `${horas}:${minutos}:${segundos}`

  }


