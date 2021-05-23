import JSONLevelScene from './JSONLevelScene.js';
import Prefab from '../prefabs/Prefab.js';
import TextPrefab from '../prefabs/TextPrefab.js';
import Unit from '../prefabs/battle/Unit.js';
import PlayerUnit from '../prefabs/battle/PlayerUnit.js';
import EnemyUnit from '../prefabs/battle/EnemyUnit.js';
import MenuItem from '../prefabs/HUD/MenuItem.js';
import PhysicalAttackMenuItem from '../prefabs/HUD/PhysicalAttackMenuItem.js';
import MagicalAttackMenuItem from '../prefabs/HUD/MagicalAttackMenuItem.js';
import RunMenuItem from '../prefabs/HUD/RunMenuItem.js';
import EnemyMenuItem from '../prefabs/HUD/EnemyMenuItem.js';
import Menu from '../prefabs/HUD/Menu.js';

class BattleScene extends JSONLevelScene {
    constructor() {
        super('BattleScene');
        
        this.prefab_classes = {
            background: Prefab.prototype.constructor,
            player_unit: PlayerUnit.prototype.constructor,
            enemy_unit: EnemyUnit.prototype.constructor,
            menu_item: MenuItem.prototype.constructor,
            physical_attack_menu_item: PhysicalAttackMenuItem.prototype.constructor,
            magical_attack_menu_item: MagicalAttackMenuItem.prototype.constructor,
            run_menu_item: RunMenuItem.prototype.constructor,
            enemy_menu_item: EnemyMenuItem.prototype.constructor,
            menu: Menu.prototype.constructor
        }
        
        this.rnd = new Phaser.Math.RandomDataGenerator();
    }
    
    init (data) {
        super.init(data);
        
        this.previous_level = data.extra_parameters.previous_level;
        
        this.encounter = data.extra_parameters.encounter;
    }
    
    create () {
        super.create();
        
        for (let enemy_unit_name in this.encounter.enemy_data) {
            this.create_prefab(enemy_unit_name, this.encounter.enemy_data[enemy_unit_name]);
        }
        
        this.units = new PriorityQueue({comparator: function (unit_a, unit_b) {
            return unit_a.act_turn - unit_b.act_turn;
        }});

        
        this.groups.player_units.children.each(function (unit) {
            unit.calculate_act_turn(0);
            this.units.queue(unit);
        }, this);
        
        this.groups.enemy_units.children.each(function (unit) {
            unit.calculate_act_turn(0);
            this.units.queue(unit);
        }, this);
        
                
        this.next_turn();
    }
    
    next_turn () {
        this.current_unit = this.units.dequeue();
        if (this.current_unit.active) {
            this.current_unit.act();
            this.current_unit.calculate_act_turn(this.current_unit.act_turn);
            this.units.queue(this.current_unit);
        } else {
            this.next_turn();
        }
    }
    
    back_to_world () {
        this.scene.start('BootScene', {scene: this.previous_level});
    }

}

export default BattleScene;