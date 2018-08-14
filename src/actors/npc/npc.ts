import * as ex from 'excalibur';
import { Resource } from '../../resource';
import { GameSettings } from '../../gamesettings';
import { GameScene } from '../../scenes/gameScene/gamescene';


// This class handles the player animation and movement.
// It listens to clicks on the canvas to detect player input.
class Npc extends ex.Actor {
    protected gameScene: GameScene;

    protected sprite: ex.Actor;
    protected interaction_sprite: ex.Actor;
    protected npc_info;

    public action_possible: boolean;
    public alive: boolean;

    protected dialogue_position: string;
    protected being_killed: boolean;
    protected talking: boolean;
    protected kill_count: number;

    constructor(scene: GameScene, npc_info) {
        super();
        this.gameScene = scene;

        this.npc_info = npc_info;

        this.x = npc_info.x;
        this.y = npc_info.y;
        this.setWidth(npc_info.width);
        this.setHeight(npc_info.height);
        this.anchor.setTo(0.5, 1);

        this.alive = true;
        this.action_possible = false;
        this.kill_count = 0;
        this.being_killed = false;
        this.talking = false;

        this.sprite = new ex.Actor();
        this.sprite.addDrawing("alive", Resource[npc_info.asset_alive].asSprite());
        this.sprite.addDrawing("dead", Resource[npc_info.asset_dead].asSprite());
        this.sprite.anchor.setTo(0.5, 1);
        this.add(this.sprite);
        this.sprite.setDrawing("alive");

        this.interaction_sprite = new ex.Actor();
        this.interaction_sprite.addDrawing(Resource.InteractionSprite);
        this.interaction_sprite.anchor.setTo(0.5, 1);
        this.interaction_sprite.y = -this.getHeight() - 5;
        this.add(this.interaction_sprite);
    }

    public onInitialize(engine: ex.Engine) {
    }

    public update(engine: ex.Engine, delta: number) {
        super.update(engine, delta); // call base update logic

        // Being killed
        if(this.being_killed) {
            this.kill_count -= delta;
            if(this.kill_count < 1200 && this.kill_count + delta >= 1200) Resource.GunShot.play();
            if(this.kill_count < 0) {
                this.gameScene.player.endKill(engine);
                this.being_killed = false;
            }
            else if(this.kill_count < 950) {
                if(this.npc_info["type"] == "robot") engine.goToScene('gameOverScene');
                else {
                    this.sprite.setDrawing("dead");
                    this.alive = false;
                    this.interaction_sprite.visible = false;
                }
            }
            return;
        }

        // If already talking
        if(this.talking) {
            if(this.dialogue_position == "exit") {
                this.gameScene.dialogue.clean();
                this.gameScene.player.talking = false;
                this.talking = false;
            }
            else {
                var currentStep = this.npc_info.dialogue[this.dialogue_position];
                if(currentStep.type == "npcline") {
                    this.gameScene.dialogue.line1 = currentStep.text;
                    this.gameScene.dialogue.line2 = "";
                    this.gameScene.dialogue.line3 = "[space bar]";
                    this.gameScene.dialogue.textMode = 0;

                    if(engine.input.keyboard.wasPressed(ex.Input.Keys.Space))
                        this.dialogue_position = currentStep.next;
                }
                else if(currentStep.type == "choice") {
                    for(var i = 0; i < 3; i++) {
                        if(i >= currentStep.options.length) this.gameScene.dialogue["line" + (i+1)] = "";
                        else this.gameScene.dialogue["line" + (i+1)] = (i+1) + ". " + currentStep.options[i].text;
                    }
                    this.gameScene.dialogue.textMode = 1;
                    let choice : number = (engine.input.keyboard.wasPressed(ex.Input.Keys.Num1) || engine.input.keyboard.wasPressed(ex.Input.Keys.A)) ? 0 :
                                          ((engine.input.keyboard.wasPressed(ex.Input.Keys.Num2) || engine.input.keyboard.wasPressed(ex.Input.Keys.B)) ? 1 :
                                           (engine.input.keyboard.wasPressed(ex.Input.Keys.Num3) || engine.input.keyboard.wasPressed(ex.Input.Keys.C)) ? 2 : -1);
                    if(choice != -1 && choice < currentStep.options.length)
                        this.dialogue_position = currentStep.options[choice].next;
                }
            }
        }
        
        // Check possible interactions
        var zone_left = Math.min(this.x + this.npc_info.facing * this.npc_info.dist_min,
                                 this.x + this.npc_info.facing * this.npc_info.dist_max);
        var zone_right = Math.max(this.x + this.npc_info.facing * this.npc_info.dist_min,
                                  this.x + this.npc_info.facing * this.npc_info.dist_max);
        this.action_possible = (this.alive
                                && this.gameScene.player.x > zone_left
                                && this.gameScene.player.x + this.gameScene.player.getWidth() < zone_right
                                && this.gameScene.player.y > this.y - this.getHeight()
                                && this.gameScene.player.y - this.gameScene.player.getHeight() < this.y
                                && this.npc_info.facing != this.gameScene.player.lastdir);
        if(this.action_possible) {
            this.interaction_sprite.visible = true;

            if(engine.input.keyboard.isHeld(ex.Input.Keys.T)) {
                this.gameScene.player.talking = true;
                this.talking = true;
                this.dialogue_position = "r0";
                this.gameScene.dialogue.visible = true;
            }
            else if(engine.input.keyboard.isHeld(ex.Input.Keys.K)) {
                this.being_killed = true;
                this.kill_count = 1875;
                this.gameScene.player.startKill();
            }
        }
        else this.interaction_sprite.visible = false;
    }
}

export { Npc };