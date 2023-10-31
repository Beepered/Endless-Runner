class Credits extends Phaser.Scene{
    constructor(){
        super("creditScene")
    }

    create(){
        let titleConfig = {
            fontFamily: "Montserrat",
            fontSize: "35px",
            color: "#FFFFFF",
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
        this.add.text(gameWidth / 2, 40, "CREDITS", titleConfig).setOrigin(0.5)
        this.add.text(gameWidth / 2, 70, "Press DOWN for MENU", textConfig).setOrigin(0.5)
        this.add.text(gameWidth / 2, 150,
            "Menu Scene music: Wind Outside by SoundsForYou\n\n" +
            "Play Scene music: beam by sinnesloschen", textConfig).setOrigin(0.5)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyDOWN)){ 
            this.scene.start("menuScene")
        }
    }
}