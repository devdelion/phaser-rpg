import Prefab from '../Prefab.js';
import MessageBox from '../HUD/MessageBox.js';

class NPC extends Prefab {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
        
        this.message = this.scene.cache.text.get(properties.message);
        
        this.body.immovable = true;
        
        this.MESSAGE_BOX_POSITION = {x: 0, y: 360};
        
        this.scene.physics.add.collider(this, this.scene.groups.players, this.talk, null, this);
    }
    
    talk(npc, player) {
        player.stop();
        
        this.scene.current_message_box = new MessageBox(this.scene, this.name + '_message_box', this.MESSAGE_BOX_POSITION, {texture: 'message_box_image', group: 'hud', message: this.message});
        
        this.scene.user_input.set_input(this.scene.user_inputs.talking_user_input);
    }
}

export default NPC;