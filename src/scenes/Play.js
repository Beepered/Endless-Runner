class Play extends Phaser.Scene {
  constructor() {
    super("playScene");
  }

  preload() {
    this.load.spritesheet("player", "assets/spritesheet.png", {
      frameWidth: 50,
    });
    this.load.image("ground", "assets/ground.png");
    this.load.image("ground object 1", "assets/ground object 1.png");
    this.load.image("ground object 2", "assets/ground object 2.png");
    this.load.image("ground object 3", "assets/ground object 3.png");
    this.load.image("ground object 4", "assets/ground object 4.png");
    this.load.image("ground object 5", "assets/ground object 5.png");
    this.load.image("air object 1", "assets/air object 1.png");
    this.load.image("air object 2", "assets/air object 2.png");
    this.load.image("air object 3", "assets/air object 3.png");
    this.load.image("air object 4", "assets/air object 4.png");
    this.load.image("air object 5", "assets/air object 5.png");
    this.load.image("clouds", "assets/clouds.png");
    this.load.image("background", "assets/background.png");

    this.load.audio("music", "assets/music.mp3");
    this.load.audio("death", "assets/death.wav");
    this.load.audio("jump", "assets/jump.wav");
    this.load.audio("double jump", "assets/double jump.wav");
    this.load.audio("level up", "assets/level up.wav");
  }

  create() {
    this.music = this.sound.add("music", {
      volume: 0.3,
      loop: true,
    });
    this.music.play();

    this.clouds = this.add.tileSprite(640, 150, 1280, 330, "clouds");
    this.background = this.add
      .tileSprite(640, 310, 1200, 110, "background")
      .setScale(2);

    // player
    player = this.physics.add
      .sprite(120, gameHeight - 150, "player", 0)
      .setScale(2);
    player.setCollideWorldBounds(true);
    player.body.setSize(10, 42, false);
    player.body.setOffset(20, 7);
    player.movement_speed = 160;
    player.backSpeed = 1.6;
    player.jump_height = -1350;

    player.maxGravity = 4.7;
    player.lowGravity = 2.2;
    player.gravity = player.maxGravity;

    player.total_jumps = 2;
    player.jumps_left = player.total_jumps;
    player.isJumping = false;
    player.alive = true;

    player.anims.create({
      key: "run",
      frameRate: 3,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("player", {
        start: 0,
        end: 1,
      }),
    });
    player.anims.create({
      key: "jump rise",
      frameRate: 0,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("player", {
        start: 2,
        end: 2,
      }),
    });
    player.anims.create({
      key: "jump fall",
      frameRate: 0,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("player", {
        start: 3,
        end: 3,
      }),
    });
    player.anims.create({
      key: "double jump",
      frameRate: 6,
      repeat: 0,
      frames: this.anims.generateFrameNumbers("player", {
        start: 4,
        end: 5,
      }),
    });

    //ground
    let ground = this.physics.add.sprite(
      gameWidth / 2,
      gameHeight - 40,
      "ground"
    );
    ground.setImmovable(true);
    this.physics.add.collider(player, ground);

    let timeConfig = {
      fontFamily: "Montserrat",
      fontSize: "32px",
      backgroundColor: "#000000",
      color: "#FFFFFF",
      align: "center",
      padding: {
        top: 5,
        bottom: 5,
      },
    };
    this.total_time = 0;
    this.time_text = this.add
      .text(gameWidth / 2, gameHeight - 40, "0", timeConfig)
      .setOrigin(0.5);
    this.difficultyTimer = this.time.addEvent({
      //make it harder every 11 seconds
      delay: 11000,
      callback: this.levelUp,
      callbackScope: this,
      repeat: 10, //not too hard or it will be impossible
    });

    this.obstacleMoveSpeed = 240;
    this.minimum_spawn_time = 1.1;
    this.variation_spawn_time = 1.6;
    this.spawn_time =
      Math.random() * this.variation_spawn_time + this.minimum_spawn_time;

    //obstacles
    this.ObstacleGroup = this.add.group({
      runChildUpdate: true,
    });
    this.physics.add.collider(player, this.ObstacleGroup, () => {
      this.collisionDetection();
    });

    keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  }

  addObstacle() {
    let which_object = Math.floor(Math.random() * 2);
    let obstacle = new Obstacle(this, this.obstacleMoveSpeed, which_object);
    this.ObstacleGroup.add(obstacle);
    this.spawn_time =
      Math.random() * this.variation_spawn_time + this.minimum_spawn_time;
  }

  levelUp() {
    this.sound.play("level up");
    this.obstacleMoveSpeed += 30;
    this.minimum_spawn_time -= 0.04;
    this.variation_spawn_time -= 0.04;
  }

  update(time, delta) {
    this.clouds.tilePositionX += this.obstacleMoveSpeed * 0.0005;
    this.background.tilePositionX += this.obstacleMoveSpeed * 0.0006;

    this.spawn_time -= delta * 0.001;
    if (this.spawn_time <= 0) {
      this.addObstacle();
    }
    if (player.alive) {
      this.total_time += delta * 0.001;
      this.time_text.text = Math.floor(this.total_time);
    }
    this.playerMovement(delta);
  }

  playerMovement(delta) {
    if (player.alive) {
      if (player.body.blocked.down && player.isJumping) {
        // landing
        player.jumps_left = player.total_jumps;
        player.gravity = player.maxGravity;
        player.isJumping = false;
      }

      if (keyLEFT.isDown) {
        player.body.velocity.x -= player.movement_speed;
      } else if (keyRIGHT.isDown) {
        if (player.body.velocity.x < 0) {
          player.body.velocity.x = 0;
        }
        player.body.velocity.x += player.movement_speed;
      }
      if (Phaser.Input.Keyboard.JustDown(keyUP) && player.jumps_left > 0) {
        this.time.delayedCall(30, () => {
          player.isJumping = true;
        });
        if (player.jumps_left == 1) {
          //smaller double jump
          player.play("double jump");
          this.sound.play("double jump", {
            volume: 0.4,
          });
          player.body.velocity.y = player.jump_height / 1.8;
          player.gravity = player.lowGravity;
        } else {
          this.sound.play("jump", {
            volume: 0.4,
          });
          player.body.velocity.y = player.jump_height;
        }
        player.jumps_left--;
      }
      if (player.body.velocity.y < 0 && player.jumps_left == 1) {
        player.play("jump rise");
      } else if (player.body.velocity.y > 0 && player.jumps_left == 1) {
        player.play("jump fall");
      } else if (player.body.velocity.y == 0) {
        player.play("run", true);
      }

      player.body.velocity.x -= player.backSpeed * delta;
      player.body.velocity.y += player.gravity * delta;

      // max x velocity
      if (player.body.velocity.x > 280) {
        player.body.velocity.x = 280;
      } else if (!keyLEFT.isDown && player.body.velocity.x < -300) {
        // natural backspeed
        player.body.velocity.x = -300;
      } else if (keyLEFT.isDown && player.body.velocity.x < -350) {
        player.body.velocity.x = -350;
      }

      // max y velocity
      if (player.body.velocity.y > 450) {
        player.body.velocity.y = 450;
      } else if (player.body.velocity.y < player.jump_height) {
        player.body.velocity.y = player.jump_height;
      }
    }
  }

  collisionDetection() {
    player.alive = false;
    player.destroy();
    this.sound.play("death");
    this.music.stop();
    this.time.delayedCall(1500, () => {
      this.scene.start("gameOverScene");
    });
  }
}
