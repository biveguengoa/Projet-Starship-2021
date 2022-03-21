const DELTA_X = 0;
const DELTA_Y = 0;
import MoveState from './moveState';

export default class Mobile {

    static MOBILE_WIDTH = 28;
    constructor(x, y, img, deltaX = DELTA_X, deltaY = DELTA_Y) {
        this.x = x;
        this.y = y;
        this.img = new Image();
        this.img.src = img;
        this.deltaX = deltaX;
        this.deltaY = deltaY;
        this.dead = false;
    }


    /*
    * Permet de dessiner un mobile avec le contexte de rendu fourni en
    * paramètre
    * @param {ctx} contexte dans lequel on dessine le mobile
    */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y);
    }

    /*
    * Permet de déplacer un mobile dans un canvas donné
    * @param {canvas} canvas dans lequel il faut déplacer le mobile
    */
    move(canvas) {
        if(this.moving == MoveState.RIGHT) {
            this.x += this.deltaX;
        } else if(this.moving == MoveState.LEFT) {
            this.x -= this.deltaX;
        } else if(this.moving == MoveState.DOWN) {
            this.y += this.deltaY;
        } else if(this.moving == MoveState.UP) {
            this.y -= this.deltaY;
        }
    }

    kill() {
        this.dead = true;
    }
}