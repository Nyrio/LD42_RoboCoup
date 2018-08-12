import * as ex from 'excalibur';
import { Resource } from '../../resource';
import { GameSettings } from '../../gamesettings';
import { GameScene } from '../../scenes/gameScene/gamescene';


// This class is for an apartment
// It's called 3 times for the 3 image layers because oof the way ExcaliburJS is
// made (actors have a z index, not sprites within an actor)
class Apartment extends ex.Actor {
    protected gameScene: GameScene;

    protected sprite: ex.Actor;
    protected layer: number;
    protected leftorright: number;

    constructor(scene: GameScene, floor: number, leftorright: number, layer: number) {
        super();
        this.gameScene = scene;
        this.layer = layer;
        this.leftorright = leftorright;

        this.setWidth(325);
        this.setHeight(150);
        this.anchor.setTo(0, 1);

        this.x = 25 + 425 * leftorright;
        this.y = GameSettings.HEIGHT - 150 * floor;

        this.sprite = new ex.Actor();
        switch(layer) {
            // The background is behing the characters
            case -5:
                this.sprite.addDrawing(
                    Resource["Apartment" + (2*floor + leftorright) + "Back"].asSprite());
                break;

            // The foreground is between the characters and the camera
            case 5:
                this.sprite.addDrawing(
                    Resource["Apartment" + (2*floor + leftorright) + "Fore"].asSprite());
                break;

            // The outdoor is shown when the player is not inside the apartment
            case 10:
                var sprite = Resource.ApartmentOut.asSprite().clone();
                if(leftorright) sprite.flipHorizontal = true;
                this.sprite.addDrawing(sprite);
                break;
        }
        this.sprite.anchor.setTo(0, 1);
        this.sprite.setWidth(this.getWidth());
        this.sprite.setHeight(this.getHeight());
        this.add(this.sprite);
    }

    public onInitialize(engine: ex.Engine) {
    }

    public update(engine: ex.Engine, delta: number) {
        super.update(engine, delta); // call base update logic

        if(this.layer > 5 && this.sprite.collides(this.gameScene.player.sprite)) {
            this.sprite.opacity = Math.max(0, 1 -
                ((this.leftorright == 0) ?
                    this.x + this.getWidth() - this.gameScene.player.x :
                    this.gameScene.player.x + this.gameScene.player.getWidth() - this.x
                ) / this.gameScene.player.getWidth());
        }
        else {
            this.sprite.opacity = 1;
        }
    }
}

export { Apartment };