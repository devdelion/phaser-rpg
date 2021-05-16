import JSONLevelScene from './JSONLevelScene.js';
import Prefab from '../prefabs/Prefab.js';
import TextPrefab from '../prefabs/TextPrefab.js';

class TitleScene extends JSONLevelScene {
    constructor() {
        super('TitleScene');

        this.prefab_classes = {
            background: Prefab.prototype.constructor,
            text: TextPrefab.prototype.constructor
        }
    }

    start_game() {
        this.scene.start('BootScene', { scene: 'town' });
    }
}

export default TitleScene;