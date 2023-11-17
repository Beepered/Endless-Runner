/*
Name: Brendan Trieu
Game Title: X-OS
Total Hours: 15

Visual Style: The game is all black, white, and red (a very simple color scheme).
The background and obstacles tell some kind of story, but it is left very vague.
I wanted the scene to look unnerving so I made the music and art follow that.
I really wanted the player to make up their own story when seeing it.
I am not even sure what some of the things I drew are.
*/

let config = {
    type: Phaser.CANVAS,
    render: {
        pixelArt: true
    },
    physics:{
        default: "arcade",
        arcade:{
            debug:false
        }
    },
    width: 800,
    height: 500,
    scene: [Menu, Credits, Play, GameOver]
}

let game = new Phaser.Game(config);
let gameHeight = game.config.height
let gameWidth = game.config.width

let keyUP, keyDOWN, keyLEFT, keyRIGHT;
let player