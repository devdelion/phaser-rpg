import TitleScene from './scenes/TitleScene.js';
import BootScene from './scenes/BootScene.js';
import LoadingScene from './scenes/LoadingScene.js';

let titleScene = new TitleScene();
let bootScene = new BootScene();
let loadingScene = new LoadingScene();

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360
};

let game = new Phaser.Game(config);
game.scene.add('TitleScene', titleScene);
game.scene.add('BootScene', bootScene);
game.scene.add('LoadingScene', loadingScene);
game.scene.start('BootScene', { scene: 'title' });