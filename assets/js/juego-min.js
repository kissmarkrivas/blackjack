const miModulo=(()=>{"use strict";let e=[],f=["C","D","H","S"],g=["A","J","Q","K"],h=[],a=document.querySelector("#btnPedir"),b=document.querySelector("#btnDetener"),c=document.querySelector("#btnNuevo"),i=document.querySelectorAll(".divCartas"),j=document.querySelectorAll("small"),d=(d=2)=>{e=k(),h=[];for(let c=0;c<d;c++)h.push(0);j.forEach(a=>a.innerText=0),i.forEach(a=>a.innerHTML=""),b.disabled=!1,a.disabled=!1},k=()=>{e=[];for(let a=2;a<=10;a++)for(let b of f)e.push(a+b);for(let c of f)for(let d of g)e.push(d+c);return _.shuffle(e)},l=()=>{if(0===e.length)throw"no hay cartas en el deck";return e.pop()},m=b=>{let a=b.substring(0,b.length-1);return isNaN(a)?"A"===a?11:10:1*a},n=(b,a)=>(h[a]=h[a]+m(b),j[a].innerText=h[a],h[a]),o=(b,c)=>{let a=document.createElement("img");a.src=`assets/cartas/${b}.png`,a.classList.add("carta"),i[c].append(a)},p=a=>{let b=0;do{let c=l();if(b=n(c,h.length-1),o(c,h.length-1),a>21)break}while(b<a&&a<=21)q()},q=()=>{let[a,b]=h;setTimeout(()=>{b===a?alert("Nadie gana :("):a>21?alert("COMPUTADORA gana"):b>21?alert("Jugador gana"):alert("COMPUTADORA gana")},100)};return a.addEventListener("click",function(){let d=l(),c=n(d,0);o(d,0),c>21?(console.warn("Lo siento mucho, perdiste"),b.disabled=!0,a.disabled=!0,p(c)):21===c&&(console.warn("21, genial!"),b.disabled=!0,a.disabled=!0,p(c))}),b.addEventListener("click",function(){b.disabled=!0,a.disabled=!0,p(h[0])}),c.addEventListener("click",function(){d()}),{nuevoJuego:d}})()