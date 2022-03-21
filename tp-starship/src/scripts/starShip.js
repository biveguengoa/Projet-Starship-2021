import Moving from './moveState.js';
import Mobile from './mobile.js';

import vaisseau_ballon_image from '../assets/images/vaisseau-ballon-petit.png';
const stp = 8;

export default class StarShip extends Mobile {

  constructor(x, y) {
    super(x, y, vaisseau_ballon_image, 0, 8);
    this.moving = Moving.NONE;
  }
  
  
  get up() { 
    return this.moving === Moving.UP;
  }

  get down() {  
    return this.moving === Moving.DOWN;
  }
   
  moveUp(){
    this.moving = Moving.UP;
  }
   
   
  moveDown(){
    this.moving = Moving.DOWN;
  }

  stopMoving() {
    this.moving = Moving.NONE;
  }

  
  move(canvas) {
    if (this.moving != Moving.NONE) {
      if (this.y + stp > stp+8 && this.moving === Moving.UP)
        super.move(canvas);
    else if (this.y + stp < canvas.height-stp-30 && this.moving === Moving.DOWN)
      super.move(canvas);
    }
  }

    
}