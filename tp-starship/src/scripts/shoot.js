
import Mobile from './mobile';
import MoveState from './moveState';
import tir from '../assets/images/tir.png'

export default class Shoot extends Mobile {

    constructor(mobile, direction) {
        super(0, 0, tir, 8, 0);
        this.moving = direction || MoveState.RIGHT;
        this.moving == MoveState.RIGHT ? this.x = mobile.x + 40 : this.x = mobile.x - 40;
        this.y = mobile.y + 10;
        this.parent = mobile;
    }

    collisionWith(mobile) {
        if (Math.abs(this.x - mobile.x) < 30 && Math.abs(this.y - mobile.y) < 30 && !this.dead && !mobile.dead) {
            return true;
        }
        return false;
    }
    

    isInCollision(saucers) {
        if (saucers.some(saucer => this.collisionWith(saucer)) ) {
            const saucer = saucers.filter(s => this.collisionWith(s));
            return saucer[0];
        }
    }
}