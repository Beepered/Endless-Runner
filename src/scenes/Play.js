class Play extends Phaser.Scene{
    constructor(){
        super("playScene")
    }

    preload(){
        this.load.spritesheet("player", "assets/spritesheet.png", {
            frameWidth: 50
        })
        this.load.image("ground", "assets/ground.png")
        this.load.image("clouds", "assets/clouds.png")

        this.load.audio("music", "assets/music.mp3")
        this.load.audio("death", "assets/death.wav")
        this.load.audio("jump", "assets/jump.wav")
        this.load.audio("level up", "assets/level up.wav")
    }

    create(){
        this.music = this.sound.add("music", {
            volume: 0.3,
            loop: true
        });
        this.music.play();

        this.clouds = this.add.tileSprite(640, 150, 1280, 330, "clouds")
        player = new Player(this, gameWidth / 2, gameHeight - 150, "player", 0).setScale(2)

        //ground
        let ground = this.physics.add.sprite(gameWidth / 2, gameHeight - 40, "ground")
        ground.setImmovable(true)
        this.physics.add.collider(player, ground)

        this.difficultyTimer = this.time.addEvent({ //make it harder every 10 seconds
            delay: 10000,
            callback: this.levelUp,
            callbackScope: this,
            repeat: 10 //not too hard or it will be impossible
        });

        this.minimum_spawn_time = 60
        this.variation_spawn_time = 70
        this.spawn_time = Math.random() * this.variation_spawn_time + this.minimum_spawn_time

        //obstacles
        this.EnemyGroup = this.add.group({
            runChildUpdate: true
        })
        this.physics.add.collider(this, this.EnemyGroup, ()=>{
            this.collisionDetection()
        })

        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.cameras.main.setBounds(0, 0, 1280, 300)
        this.cameras.main.startFollow(player)
    }

    addEnemy(){ //change to spawn enemies
        let which_object = Math.floor(Math.random() * 2)
        let enemy = new Obstacle(this, this.obstacleMoveSpeed, which_object)
        this.EnemyGroup.add(obstacle)
        this.spawn_time = Math.random() * this.variation_spawn_time + this.minimum_spawn_time
    }

    levelUp(){ //make game more difficult, spawn quicker
        this.minimum_spawn_time -= 10;
        this.variation_spawn_time -= 10;
    }

    update(){
        player.update();
        /*
        this.spawn_time--
        if(this.spawn_time <= 0){
            this.addEnemy()
        }
        */
    }
    collisionDetection(){
        this.alive = false
        this.destroy()
        this.sound.play("death")

        this.time.delayedCall(1500, () => {
            this.music.stop();
            this.scene.start("gameOverScene");
        });
    }

}