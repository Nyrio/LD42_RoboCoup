import * as ex from 'excalibur';
import { Resource } from '../../resource';
import { GameSettings } from '../../gamesettings';
import { GameScene } from '../../scenes/gameScene/gamescene';


// This class is for the elevator
class ElevatorOut extends ex.Actor {
    protected gameScene: GameScene;

    protected sprite: ex.Actor;

    constructor(scene: GameScene, floor: number) {
        super();
        this.gameScene = scene;

        this.setWidth(100);
        this.setHeight(150);

        this.x = 350;
        this.y = 600 - 150 * floor;

        this.sprite = new ex.Actor();
        this.sprite.addDrawing(Resource.ElevatorOut.asSprite());
        this.sprite.anchor.setTo(0, 1);
        this.sprite.setWidth(this.getWidth());
        this.sprite.setHeight(this.getHeight());
        this.add(this.sprite);
    }

    public onInitialize(engine: ex.Engine) {
    }

    public update(engine: ex.Engine, delta: number) {
        super.update(engine, delta); // call base update logic

        if(this.sprite.collides(this.gameScene.player.sprite)) {
            this.sprite.opacity = Math.max(0,
                Math.max(
                    this.x - this.gameScene.player.x,
                    this.gameScene.player.x + this.gameScene.player.getWidth() - this.x - this.getWidth()
                ) / this.gameScene.player.getWidth());
        }
        else {
            this.sprite.opacity = 1;
        }
    }
}

export { ElevatorOut };