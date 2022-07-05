/*
-2C = two of clubs (Treboles)
-2D = two of Diamonds (Diamante)
  -2H = two of Hearts (Corazones)
  -2S = two of Spades (Espadas)
  */

 const miModulo = (()=>{
  "use strict";
    
    //create new deck
  let deck              = [];
  const tipos           = ['C','D','H','S'];
  const especiales      = ['A','J','Q','K'];
  let puntosJugadores   = [];

  // Referencias del HTML
  const btnPedir    = document.querySelector('#btnPedir'),
        btnDetener  = document.querySelector('#btnDetener'),
        btnNuevo    = document.querySelector('#btnNuevo');

  const divCartasJugadores     = document.querySelectorAll('.divCartas'),
        puntosHTML            = document.querySelectorAll('small');
  
  // initialize deck
  const inicializarJuego = ( numJugadores = 2) =>{
    deck = crearDeck();
    puntosJugadores = [];
    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);
    }
    puntosHTML.forEach( elem => elem.innerText = 0);
    divCartasJugadores.forEach( elem => elem.innerHTML = '');

    btnDetener.disabled = false;
    btnPedir.disabled = false;
  }

  const crearDeck = () => {
    deck = [];
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
    return (_.shuffle( deck ));
  }

  

  //function take a cart

  const pedirCarta = ()=>{
    if (deck.length === 0){
      throw 'no hay cartas en el deck';
    }
    return deck.pop();
  }

  // tomar valor la carta
  const valorCarta = ( carta ) =>{
    const valor = carta.substring(0, carta.length - 1);
    return ( isNaN( valor ) ) ?
           ( ( valor === 'A' ) ? 11 : 10) 
           : (valor * 1);

  }
  
  const acumularPuntos = ( carta, turno ) =>{
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
    puntosHTML[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  }

  const crearCarta = (carta, turno) => {
      const imgCarta = document.createElement('img');
      imgCarta.src = `assets/cartas/${carta}.png`;
      imgCarta.classList.add('carta');
      divCartasJugadores[turno].append( imgCarta );
  }
  //turno de la computadora
  const turnoComputadora = ( puntosMinimos ) => {
    let puntosComputadora = 0;
    do {
      const carta = pedirCarta();
      puntosComputadora = acumularPuntos( carta,puntosJugadores.length - 1 ); 
      crearCarta( carta,puntosJugadores.length - 1 );
      //<img class="carta" src="assets/cartas/2C.png">
      // const imgCarta = document.createElement('img');
      // imgCarta.src = `assets/cartas/${carta}.png`;
      // imgCarta.classList.add('carta');
      // divCartasComputadora.append( imgCarta );
      if(puntosMinimos > 21){
        break;
      }
    } while (( puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    determinarGanador();
  }

  const determinarGanador = ()=>{
    const [puntosMinimos,puntosComputadora]= puntosJugadores;
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
    }, 100);
  }
  //eventos
  btnPedir.addEventListener('click',function(){
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos( carta , 0);
    crearCarta( carta, 0 )

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
    turnoComputadora( puntosJugadores[0] );
  })

  btnNuevo.addEventListener('click',function(){
    
    inicializarJuego();
    
  })

  return{
    nuevoJuego: inicializarJuego
  }

 })();
 //use https://www.toptal.com/developers/javascript-minifier