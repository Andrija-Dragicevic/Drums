let crashRide = document.querySelector('#crash-ride');
let hiHatTop = document.querySelector('#hihat-top');

const animationCrashOrRide = () => {
    crashRide.style.transform = 'rotate(0deg) scale(1.5)';
}

const animationHiHatClosed = () => {
    hiHatTop.style.top = '171px';
}

window.addEventListener('keydown', (event) => {
    let code = event.keyCode;    //event je tipka na tast. a keyCode je broj pod kojim se nalazi
    
    let keyElement = document.querySelector(`div[data-key="${code}"]`);       //PROVJERA IMA LI SLOVA
    if (!keyElement) {
        return;      //ako ne postoji nista da se ne desi
    }

    let audio = document.querySelector(`audio[data-key="${code}"]`)
    audio.currentTime = 0;   //vracemo zvuk na nulu, da se svaki put na klik dugme cuje zvuk
    audio.play();
    
    switch(code){
        case 69:
        case 82:
            animationCrashOrRide();
            break;
        case 75:
        case 73:
            animationHiHatClosed();
            break;
    }
    keyElement.classList.add('playing');

});

const removeCrashRideTransition = (e) => {
    if(e.propertyName !== 'transform') return;
    e.target.style.transform = 'rotate(-7.2deg) scale(1.5)';
}

const removeHiHatTopTransition = (e) => {
    if(e.propertyName !== 'top') return;    //ako nije top onda se prekida
    e.target.style.top = '166px';            //vracemo ga u poziciju top
}

const removeKeyTransition = (e) => {
    if(e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
}

let drumKeys = document.querySelectorAll('.key');

drumKeys.forEach((key) => {
    key.addEventListener("transitionend", removeKeyTransition);
})

//crashRide je gore definisana varijabla
crashRide.addEventListener("transitionend", removeCrashRideTransition);  //listener - kada se tranzicija zavrsi onda pozivamo funkciju iznad
hiHatTop.addEventListener("transitionend", removeHiHatTopTransition);