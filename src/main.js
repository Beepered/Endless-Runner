/*
Name: Brendan Trieu
Game Title: 
Total Hours: 1


*/

let config = {
    type: Phaser.CANVAS,
    physics:{
        default: "arcade",
        arcade:{
            debug:true
        }
    },
    width: 750,
    height: 600,
    scene: [Menu, Credits, Play, GameOver]
}

let game = new Phaser.Game(config);
let gameHeight = game.config.height
let gameWidth = game.config.width

let keyUP, keyDOWN, keyLEFT, keyRIGHT;
let player