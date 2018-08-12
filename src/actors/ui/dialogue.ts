import * as ex from 'excalibur';
import { Resource } from '../../resource';
import { GameSettings } from '../../gamesettings';
import { GameScene } from '../../scenes/gameScene/gamescene';


// A class to abstract dialogues
class Dialogue extends ex.Actor {
    protected gameScene: ex.Scene;

    protected background_sprite: ex.Actor;
    protected y_from_cam: number;

    public line1: string;
    public line2: string;
    public line3: string;

    public textMode: number;

    protected label1: ex.Label;
    protected label2: ex.Label;
    protected label3: ex.Label;

    constructor(scene: ex.Scene, y_from_cam: number) {
        super();

        this.gameScene = scene;
        this.y_from_cam = y_from_cam;

        this.x = GameSettings.WIDTH / 2;
        this.y = this.gameScene.camera.y - this.y_from_cam;

        this.anchor.setTo(0.5, 1);

        this.background_sprite = new ex.Actor();
        this.background_sprite.addDrawing(Resource.DialogueBackground);
        this.background_sprite.anchor.setTo(0.5, 1);
        this.add(this.background_sprite);

        this.label1 = new ex.Label("", -340, -95, "Arial");
        this.label1.textAlign = ex.TextAlign.Left;
        this.label1.baseAlign = ex.BaseAlign.Middle;
        this.label1.fontSize = 24;
        this.label1.color = ex.Color.Black;
        this.add(this.label1);

        this.label2 = new ex.Label("", -340, -60, "Arial");
        this.label2.textAlign = ex.TextAlign.Left;
        this.label2.baseAlign = ex.BaseAlign.Middle;
        this.label2.fontSize = 24;
        this.label2.color = ex.Color.Black;
        this.add(this.label2);

        this.label3 = new ex.Label("", -340, -25, "Arial");
        this.label3.textAlign = ex.TextAlign.Left;
        this.label3.baseAlign = ex.BaseAlign.Middle;
        this.label3.fontSize = 24;
        this.label3.color = ex.Color.Black;
        this.add(this.label3);

        this.clean();
    }

    public onInitialize(engine: ex.Engine) {
    }

    public clean() {
        this.line1 = "";
        this.line2 = "";
        this.line3 = "";

        this.textMode = 0;

        this.visible = false;
    }

    public update(engine: ex.Engine, delta: number) {
        super.update(engine, delta); // call base update logic

        this.y = this.gameScene.camera.y + this.y_from_cam;

        this.label1.text = this.line1;
        this.label2.text = this.line2;
        this.label3.text = this.line3;
    }
}

export { Dialogue };