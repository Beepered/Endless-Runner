class Obstacle extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, velocity, type){
        let sprite_name
        let rand_int = Phaser.Math.Between(0, 2)
        if(type == 0){  //ground objects
            //change sprite
            switch (rand_int){
                case 0:
                    sprite_name = "ground object 1"
                    break
                case 1:
                    sprite_name = "ground object 2"
                    break
                case 2:
                    sprite_name = "ground object 3"
                    break
            }
            super(scene, gameWidth + 30, gameHeight -  120, sprite_name)
        }
        else{   //air objects
            switch (rand_int){
                case 0:
                    sprite_name = "air object 1"
                    break
                case 1:
                    sprite_name = "air object 2"
                    break
                case 2:
                    sprite_name = "air object 3"
                    break
            }
            super(scene, gameWidth + 30, gameHeight - (Math.floor(Math.random() * 230) + 180), sprite_name)
        }
        this.parentScene = scene
        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)
        this.setVelocityX(-velocity)
        this.body.setAllowGravity(false)
        this.vel = -velocity
        this.setImmovable(true)
        if(type == 0){  //ground objects
            switch (rand_int){
                case 0:
                    this.body.setSize(35, 80)
                    break
                case 1:
                    this.y = gameHeight - 130
                    this.body.setSize(80, 70)
                    break
                case 2:
                    this.y = gameHeight - 130
                    this.body.setSize(50, 70)
                    break
            }
        }
        else{   //air objects
            switch (rand_int){
                case 0:
                    this.body.setSize(50, 50)
                    break
                case 1:
                    this.body.setSize(70, 40)
                    break
                case 2:
                    this.body.setSize(80, 80)
                    break
            }
        }
    }
    update(){
        if(this.body.velocity.x != this.vel){ //make it not weirdly stop when the player hits it while not moving
            this.body.velocity.x = this.vel
        }
        if(this.x < -this.width){
            this.destroy() 
        }
    }
}