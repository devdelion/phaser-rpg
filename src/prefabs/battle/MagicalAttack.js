import Prefab from '../Prefab.js';

class MagicalAttack extends Prefab {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
        
        this.owner = properties.owner;
        this.mana_cost = properties.mana_cost;
    }
    
    hit (target) {
        let attack_multiplier = this.scene.rnd.realInRange(0.9, 1.3);
        let defense_multiplier = this.scene.rnd.realInRange(0.7, 1.1);
        
        let damage = Math.max(0, Math.round((attack_multiplier * this.owner.stats.magic_attack) - (defense_multiplier * target.stats.defense)));
        
        target.receive_damage(damage);
        
        this.owner.stats.mana -= this.mana_cost;
        
        this.owner.anims.play(this.owner.name + '_attack2');
    }
}

export default MagicalAttack;