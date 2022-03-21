import StarShip from "./starShip";
import Saucer from "./saucer";
import Shoot from './shoot';
import MoveState from './moveState';

export default class Game {


  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.starship = new StarShip(40, this.canvas.height/2);
    this.saucers = new Array();
    this.shoots = new Array();
    this.score = 0;
    this.raf = null;
    this.infiniteSaucers = false;
    this.randomSaucerShootEnable = false;
    this.lastTime = performance.now();
    this.totalTime = 0;
    this.infiniteInterval = 750; // Temps d'apparition des soucoupes en ms
    this.randomSaucerShoot = 150; // chances qu'a une soucoupe de tirer
    this.score = 0;
  }

  /**
   * Permet d'ajouter une soucoupe au jeu
   */
  addSaucer() {
    this.saucers.push(new Saucer(this.canvas.width, Math.random()*this.canvas.height));
  }

  addInfinite() {
    this.infiniteSaucers = !this.infiniteSaucers;
  }

  /**
   * Permet d'ajouter un tir pour un vaisseau donné
   */
  addShoot(mobile, direction) {
    if(!mobile.dead) this.shoots.push(new Shoot(mobile, direction));
  }

  moveAndDraw(){
    this.totalTime += (performance.now() - this.lastTime);

    if(this.infiniteSaucers && this.totalTime >= this.infiniteInterval) {
      this.addSaucer();
      this.totalTime = 0;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if(!this.starship.dead) {
      this.starship.move(this.canvas);
      this.starship.draw(this.ctx);
    }

    this.saucers.forEach(saucer => {
      if(!saucer.dead) {
        if(saucer.x <= 0) {
            this.score -= 1000;
            saucer.kill();
        } else if(saucer.y + saucer.deltaY > this.canvas.height) {
            saucer.kill();
        } else {
            saucer.move(this.canvas);
            saucer.draw(this.ctx);
            if(this.randomIntFromInterval(0, this.randomSaucerShoot) == this.randomSaucerShoot && this.randomSaucerShootEnable) this.addShoot(saucer, MoveState.LEFT);
        }
      }
    });
    this.shoots.forEach(shoot => {
      if((shoot.x > this.canvas.width || shoot.x < 0) && !shoot.dead) {
          shoot.kill();
      }

      this.saucers.forEach(saucer => {
        if(shoot.collisionWith(saucer) && shoot.parent == this.starship && saucer.moving != MoveState.DOWN) {
            shoot.kill();
            saucer.moving = MoveState.DOWN;
            this.score += 200;
        }
      });

      if(shoot.collisionWith(this.starship)) {
        this.starship.kill();
      }

      if(!shoot.dead) {
        shoot.move(this.canvas);
        shoot.draw(this.ctx);
      }
    });
    document.querySelector("#score").innerHTML = this.score;
    this.lastTime = performance.now();
    this.raf = window.requestAnimationFrame(this.moveAndDraw.bind(this));
  }

  keyDownActionHandler(event){
    switch (event.key) {
          case "ArrowUp":
          case "Up":
            this.starship.moveUp();
            break;
          case " ":
            this.addShoot(this.starship);
            break;
          case "ArrowDown":
          case "Down":
            this.starship.moveDown();
            break;
          default: return;
      }
      event.preventDefault();
  }

  keyUpActionHandler(event){
    switch (event.key) {
          case "ArrowUp":
            case "Up":
          case "ArrowDown":
          case "Down" :
              this.starship.stopMoving();
              break;
          default: return;
      }
      event.preventDefault();
  }


  startAndStop() {
    if(!this.raf){
      this.raf = window.requestAnimationFrame(this.moveAndDraw.bind(this));
    }
    else{
      window.cancelAnimationFrame(this.raf);
      this.raf = null;
    }
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}



