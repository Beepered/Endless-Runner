class Player extends Phaser.Physics.Arcade.Sprite{
    preload(){
        this.load.spritesheet("player", "assets/spritesheet.png", {
            frameWidth: 50
        })
    }
    
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.physics.add.existing(this);
        this.scene.add.existing(this)
        this.setCollideWorldBounds(true)
        this.body.setSize(20, 40)
        this.movement_speed = 330;
        this.jump_height = -700
        this.gravity = 20
        this.isJumping = false; this.alive = true

        this.anims.create({
            key: "run",
            frameRate: 3,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("player", {
                start: 0,
                end: 1
            })
        })
        this.anims.create({
            key: "jump rise",
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("player", {
                start: 2,
                end: 2
            })
        })
        this.anims.create({
            key: "jump fall",
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("player", {
                start: 3,
                end: 3
            })
        })
    }

    update(){
        if(this.alive){
            if(this.body.touching.down){
                this.isJumping = false
            }

            let playerVector = new Phaser.Math.Vector2(this.body.velocity.x, this.body.velocity.y)
            if(keyLEFT.isDown){
                this.body.velocity.x = -this.movement_speed
                this.flipX = true;
            }
            else if(keyRIGHT.isDown){
                this.body.velocity.x = this.movement_speed
                this.flipX = false;
            }
            else{
                this.body.velocity.x = 0
            }
            if(Phaser.Input.Keyboard.JustDown(keyUP) && !this.isJumping){
                //this.sound.play("jump")
                this.isJumping = true;
                this.body.velocity.y = this.jump_height
            }
            //will not have a jumping animation
            if(this.body.velocity.y < 0 && this.isJumping){
                this.play("jump rise")
            }
            else if(this.body.velocity.y > 0 && this.isJumping){
                this.play("jump fall")
            }
            else if(this.body.velocity.y == 0 && !this.isJumping){
                this.play("run", true)
            }
            this.body.velocity.y += this.gravity
        }
    }
}