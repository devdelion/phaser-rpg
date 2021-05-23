import Prefab from '../Prefab.js';
import MenuItem from './MenuItem.js';

class EnemyMenuItem extends MenuItem {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
        this.enemy = this.scene.prefabs[properties.enemy_name];
    }
    
    select () {
        this.scene.current_attack.hit(this.enemy);
        
        this.scene.prefabs.enemy_units_menu.enable(false);
    }
    
}

export default EnemyMenuItem;