const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;
const NONE = 4;


export default class MoveState {
    static get UP(){ return UP; }
    static get DOWN(){ return DOWN; }
    static get LEFT() {return LEFT; }
    static get RIGHT() {return RIGHT; }
    static get NONE(){ return NONE; }
}