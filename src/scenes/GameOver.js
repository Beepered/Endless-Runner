class GameOver extends Phaser.Scene{
    constructor(){
        super("gameOverScene")
    }

    create(){
        let textConfig = {
            fontFamily: "Montserrat",
            fontSize: "25px",
            color: "#FFFFFF",
            align: "center",
            padding: {
                top: 5,
                bottom: 5
            },
        }
        this.add.text(gameWidth / 2, gameHeight / 2.1, "GAME OVER", textConfig).setOrigin(0.5)
        this.add.text(gameWidth / 2, gameHeight / 1.9, "press UP to go to MENU", textConfig).setOrigin(0.5)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyUP)){
            this.scene.start('menuScene')
        }
    }
}