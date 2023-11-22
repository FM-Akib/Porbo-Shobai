let menu=document.querySelector('#menu-icn');
let navbar=document.querySelector('.navbar');
console.log(1);

menu.onclick = () =>{
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('open');
}