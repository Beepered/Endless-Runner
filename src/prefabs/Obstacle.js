class Obstacle extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, velocity, type) {
    let sprite_name;
    let rand_int = Phaser.Math.Between(0, 4);
    if (type == 0) {
      //ground objects
      switch (rand_int) {
        case 0:
          sprite_name = "ground object 1";
          break;
        case 1:
          sprite_name = "ground object 2";
          break;
        case 2:
          sprite_name = "ground object 3";
          break;
        case 3:
          sprite_name = "ground object 4";
          break;
        default:
          sprite_name = "ground object 5";
          break;
      }
      super(scene, gameWidth + 45, gameHeight - 130, sprite_name);
    } else {
      //air objects
      switch (rand_int) {
        case 0:
          sprite_name = "air object 1";
          break;
        case 1:
          sprite_name = "air object 2";
          break;
        case 2:
          sprite_name = "air object 3";
          break;
        case 3:
          sprite_name = "air object 4";
          break;
        default:
          sprite_name = "air object 5";
          break;
      }
      super(
        scene,
        gameWidth + 45,
        gameHeight - (Math.floor(Math.random() * 230) + 175),
        sprite_name
      );
    }

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setVelocityX(-velocity);
    this.body.setAllowGravity(false);
    this.vel = -velocity;
    this.setImmovable(true);
    if (type == 0) {
      //ground objects
      switch (rand_int) {
        case 0:
          this.y = gameHeight - 120;
          this.body.setSize(35, 80);
          break;
        case 1:
          this.body.setSize(80, 80, false);
          this.body.setOffset(0, 20);
          break;
        case 2:
          this.body.setSize(55, 75, false);
          this.body.setOffset(15, 25);
          break;
        case 3:
          this.body.setSize(60, 60, false);
          this.body.setOffset(15, 40);
          break;
        default:
          this.body.setSize(60, 55, false);
          this.body.setOffset(12, 45);
          break;
      }
    } else {
      //air objects
      switch (rand_int) {
        case 0:
          this.body.setSize(50, 50);
          break;
        case 1:
          this.body.setSize(65, 40);
          break;
        case 2:
          this.body.setSize(65, 80);
          break;
        case 3:
          this.body.setSize(50, 70);
          break;
        default:
          this.body.setSize(60, 70);
          break;
      }
    }
  }
  update() {
    if (this.body.velocity.x != this.vel) {
      //make it not weirdly stop when the player hits it while not moving
      this.body.velocity.x = this.vel;
    }
    if (this.x < -this.width) {
      this.destroy();
    }
  }
}
