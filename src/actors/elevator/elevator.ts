import * as ex from 'excalibur';
import { Resource } from '../../resource';
import { GameSettings } from '../../gamesettings';
import { GameScene } from '../../scenes/gameScene/gamescene';


// This class is for the elevator
class Elevator extends ex.Actor {
    protected gameScene: GameScene;

    protected sprite: ex.Actor;

    protected player_in: boolean;
    protected moving: number;
    protected target: number;
    public locked: boolean;
    public floor: number;

    constructor(scene: GameScene) {
        super();
        this.gameScene = scene;

        this.player_in = true;
        this.moving = 0;
        this.locked = false;
        this.floor = 0;
        this.target = this.gameScene.camera.y;

        this.setWidth(100);
        this.setHeight(150);
        this.anchor.setTo(0, 1);

        this.x = 350;
        this.y = 600;

        this.sprite = new ex.Actor();
        this.sprite.addDrawing(Resource.Elevator.asSprite());
        this.sprite.anchor.setTo(0, 1);
        this.sprite.setWidth(this.getWidth());
        this.sprite.setHeight(this.getHeight());
        this.add(this.sprite);
    }

    public onInitialize(engine: ex.Engine) {
    }

    public update(engine: ex.Engine, delta: number) {
        super.update(engine, delta); // call base update logic

        this.y = this.gameScene.camera.y + GameSettings.HEIGHT/2;

        this.player_in = (this.gameScene.player.x >= this.x
            && this.gameScene.player.x + this.gameScene.player.getWidth() <= this.x + this.getWidth());

        let up: boolean = engine.input.keyboard.isHeld(ex.Input.Keys.Up) || engine.input.keyboard.isHeld(ex.Input.Keys.W);
        let down: boolean = engine.input.keyboard.isHeld(ex.Input.Keys.Down) || engine.input.keyboard.isHeld(ex.Input.Keys.S);
        var wanted_dir = (down && !up) ? -1 : ((up && !down) ? 1 : 0);

        this.gameScene.camera.y -= this.moving * GameSettings.ELEVATOR_SPEED * delta / 1000;

        if(this.player_in
           && wanted_dir != 0
           && (this.moving == 0
               || (this.moving == wanted_dir
                   && (this.moving == 1 && this.gameScene.camera.y <= this.target
                       || this.moving == -1 && this.gameScene.camera.y >= this.target)))
           && !(wanted_dir == -1 && this.floor == 0 || wanted_dir == 1 && this.floor == GameSettings.FLOORS-1)) {
            this.moving = wanted_dir;
            this.floor += wanted_dir;
            this.target -= 150 * wanted_dir;
            this.locked = true;
        }
        else if(this.moving == 1 && this.gameScene.camera.y <= this.target
                || this.moving == -1 && this.gameScene.camera.y >= this.target) {
            this.gameScene.camera.y = this.target;
            this.moving = 0;
            this.locked = false;
        }
    }
}

export { Elevator };