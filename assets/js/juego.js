/*
-2C = two of clubs (Treboles)
-2D = two of Diamonds (Diamante)
  -2H = two of Hearts (Corazones)
  -2S = two of Spades (Espadas)
  */
//create new deck
let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];
let puntosJugador = 0,
puntosComputadora = 0;
// Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener= document.querySelector('#btnDetener');
const btnNuevo= document.querySelector('#btnNuevo');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const puntosHTML = document.querySelectorAll('small');


const crearDeck = () => {
  for ( let i = 2 ; i <= 10; i++ ) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }
  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }
  // console.log( deck );
  deck = _.shuffle( deck )
  // console.log( deck );
  return deck;
}

crearDeck();

//function take a cart

const pedirCarta = ()=>{
  if (deck.length === 0){
    throw 'no hay cartas en el deck';
  }
  const carta = deck.pop();
  
  // console.log(carta);
  
  // console.log(deck);
  return carta;
}
// console.log(pedirCarta())
// ;

const valorCarta = ( carta ) =>{
  
  const valor = carta.substring(0, carta.length - 1);

  return ( isNaN( valor ) ) ?
          ( ( valor === 'A' ) ? 11 : 10) 
          : (valor * 1);

  // if( isNaN( valor )){
  //   //no es un numero
  //   console.log('no es un número');
  //   puntos = ( valor === 'A' ) ? 11 : 10; 
  // }else{
  //   console.log('Es un número')
  //   puntos = valor * 1;
  // }
}
//turno de la computadora

const turnoComputadora = ( puntosMinimos ) => {
  do {
  const carta = pedirCarta();
  puntosComputadora = puntosComputadora + valorCarta( carta );
  puntosHTML[1].innerText = puntosComputadora;

  //<img class="carta" src="assets/cartas/2C.png">
  const imgCarta = document.createElement('img');
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add('carta');
  divCartasComputadora.append( imgCarta );
  if(puntosMinimos > 21){
    break;
    }
  } while (( puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

  setTimeout(() => {
    
    if (puntosComputadora === puntosMinimos ){
      alert('Nadie gana :(');
    }else if (puntosMinimos > 21){
      alert('COMPUTADORA gana');
    }else if (puntosComputadora > 21){
      alert('Jugador gana');
    }else {
      alert('COMPUTADORA gana');
    }
  }, 10);
}

//eventos
btnPedir.addEventListener('click',function(){
  const carta = pedirCarta();
  puntosJugador = puntosJugador + valorCarta( carta );
  puntosHTML[0].innerText = puntosJugador;

  //<img class="carta" src="assets/cartas/2C.png">
  const imgCarta = document.createElement('img');
  imgCarta.src = `assets/cartas/${carta}.png`;
  divCartasJugador.append( imgCarta );
  imgCarta.classList.add('carta');

  if ( puntosJugador > 21){
    console.warn('Lo siento mucho, perdiste')
    btnDetener.disabled = true;
    btnPedir.disabled = true;
    turnoComputadora( puntosJugador );
  
  }else if (puntosJugador === 21){
    console.warn('21, genial!');
    btnDetener.disabled = true;
    btnPedir.disabled = true;
    turnoComputadora( puntosJugador );
  }
});

btnDetener.addEventListener('click',function(){
  btnDetener.disabled = true;
  btnPedir.disabled = true;
  turnoComputadora( puntosJugador );
})

btnNuevo.addEventListener('click',function(){
  deck=[];
  deck = crearDeck();
  
  puntosJugador = 0;
  puntosComputadora = 0;

  puntosHTML[0].innerText = 0;
  puntosHTML[1].innerText = 0;

  divCartasComputadora.innerHTML = '';
  divCartasJugador.innerHTML = '';


  btnDetener.disabled = false;
  btnPedir.disabled = false;
 
})