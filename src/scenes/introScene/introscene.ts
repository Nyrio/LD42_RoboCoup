import * as ex from 'excalibur';
import { Resource } from '../../resource';
import { Player } from '../../actors/player/player';
import { GameSettings } from '../../gamesettings';
import { Dialogue } from '../../actors/ui/dialogue';

class IntroScene extends ex.Scene {

    protected dialogue: Dialogue;
    protected mainSprite: ex.Actor;
    protected hrlf: ex.Actor;
    protected windose_update: ex.Actor;

    protected count: number;

    protected json_data;

    public onInitialize(engine: ex.Engine) {
        this.camera.pos = new ex.Vector(GameSettings.WIDTH/2,
                                        GameSettings.HEIGHT/2);

        this.count = 0;
        this.json_data = Resource.IntroJson.getData();

        this.mainSprite = new ex.Actor();
        this.mainSprite.addDrawing(Resource.Conference);
        this.mainSprite.anchor.setTo(0, 0);
        this.add(this.mainSprite);
        this.mainSprite.z = 0;

        this.hrlf = new ex.Actor();
        this.hrlf.addDrawing(Resource.Hrlf);
        this.hrlf.anchor.setTo(1, 0);
        this.hrlf.x = 800;
        this.hrlf.y = 75;
        this.add(this.hrlf);
        this.hrlf.z = 10;

        this.windose_update = new ex.Actor();
        this.windose_update.addDrawing(Resource.WindoseUpdate);
        this.windose_update.anchor.setTo(1, 0);
        this.windose_update.x = 800;
        this.windose_update.y = 75;
        this.add(this.windose_update);
        this.windose_update.z = 10;
        this.windose_update.visible = false;

        this.dialogue = new Dialogue(this, 295);
        this.add(this.dialogue);
        this.dialogue.z = 15;
        this.dialogue.visible = true;

        // Paper effect
        var paper_effect = new ex.Actor();
        paper_effect.addDrawing(Resource.PaperEffect);
        paper_effect.anchor.setTo(0, 0);
        this.add(paper_effect);
        paper_effect.z = 20;
    }

    public update(engine: ex.Engine, delta: number) {
        super.update(engine, delta);

        if(this.count < this.json_data.length) {
            this.dialogue.line1 = this.json_data[this.count]["line1"];
            this.dialogue.line2 = this.json_data[this.count]["line2"];
            this.dialogue.line3 = this.json_data[this.count]["line3"];

            if(engine.input.keyboard.wasPressed(ex.Input.Keys.Space)) {
                this.count++;
                if(this.count == 2) {
                    this.hrlf.visible = false;
                    this.windose_update.visible = true; 
                }
            }
        }
        else if(this.count == this.json_data.length) {
            engine.goToScene('gameScene');
        }
    }

    public onActivate() {}
    public onDeactivate() {}
}

export { IntroScene };