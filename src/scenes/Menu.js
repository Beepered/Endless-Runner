class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene")
    }

    preload(){
        this.load.audio("wind", "assets/wind.mp3")
    }

    create(){
        this.music = this.sound.add("wind", {
            volume: 0.35,
            loop: true
        });
        this.music.play();
        let titleConfig = {
            fontFamily: "Montserrat",
            fontSize: "60px",
            color: "#FF0000",
            align: "center",
            padding: {
                top: 5,
                bottom: 5
            },
        }
        let textConfig = {
            fontFamily: "Montserrat",
            fontSize: "22px",
            color: "#FFFFFF",
            align: "center",
            padding: {
                top: 5,
                bottom: 5
            },
        }
        this.add.text(gameWidth / 2, gameHeight / 2.5, "Groom Raider", titleConfig).setOrigin(0.5)
        this.add.text(gameWidth / 2, gameHeight / 2, "press UP to PLAY", textConfig).setOrigin(0.5)
        this.add.text(gameWidth / 2, gameHeight / 1.8, "press DOWN for CREDITS", textConfig).setOrigin(0.5)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyUP)){
            this.game.sound.stopAll();
            this.scene.start("playScene")
        }
        if(Phaser.Input.Keyboard.JustDown(keyDOWN)){
            this.scene.start("creditScene")
        }
    }

}