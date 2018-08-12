import * as ex from 'excalibur';
import { Resource } from '../../resource';
import { Player } from '../../actors/player/player';
import { GameSettings } from '../../gamesettings';


class GameOverScene extends ex.Scene {

    public onInitialize(engine: ex.Engine) {
        this.camera.pos = new ex.Vector(GameSettings.WIDTH/2,
                                        GameSettings.HEIGHT/2);
    }

    public update(engine: ex.Engine, delta: number) {
        super.update(engine, delta);
    }

    public onActivate() {}
    public onDeactivate() {}
}

export { GameOverScene };