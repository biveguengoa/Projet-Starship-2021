
// importation de la classe Game.js
import Game from './game.js';


// mise en place de l'action des clics sur les boutons + les gestionnaires du clavier pour contrôler le starship
const init = () => {
    const game = new Game(document.getElementById("stars"));
    game.startAndStop();
    window.addEventListener('keydown', game.keyDownActionHandler.bind(game));
    window.addEventListener('keyup', game.keyUpActionHandler.bind(game) );
    document.getElementById("nouvelleSoucoupe").addEventListener("click", e => {
        game.addSaucer();
        document.activeElement.blur();
        e.preventDefault();
    });
    document.getElementById("flotteSoucoupes").addEventListener("click", e => {
        game.addInfinite();
        document.activeElement.blur();
        e.preventDefault();
    });

}

window.addEventListener("load",init);

//
console.log('le bundle a été généré');
