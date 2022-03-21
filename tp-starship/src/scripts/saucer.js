
import Mobile from './mobile';
import flyingSaucer_petit from '../assets/images/flyingSaucer-petit.png';
import MoveState from './moveState';

export default class Saucer extends Mobile {
  constructor(x, y) {
    super(x, y, flyingSaucer_petit, 3, 3);
    this.moving = MoveState.LEFT;
  }
}