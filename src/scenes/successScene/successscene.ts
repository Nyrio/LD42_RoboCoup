import * as ex from 'excalibur';
import { Resource } from '../../resource';
import { Player } from '../../actors/player/player';
import { GameSettings } from '../../gamesettings';


class SuccessScene extends ex.Scene {

    public onInitialize(engine: ex.Engine) {
        this.camera.pos = new ex.Vector(GameSettings.WIDTH/2,
                                        GameSettings.HEIGHT/2);

        var mainSprite = new ex.Actor();
        mainSprite.addDrawing(Resource.WellDone);
        mainSprite.anchor.setTo(0, 0);
        this.add(mainSprite);
        mainSprite.z = 0;

        // Paper effect
        var paper_effect = new ex.Actor();
        paper_effect.addDrawing(Resource.PaperEffect);
        paper_effect.anchor.setTo(0, 0);
        this.add(paper_effect);
        paper_effect.z = 20;
    }

    public update(engine: ex.Engine, delta: number) {
        super.update(engine, delta);
    }

    public onActivate() {}
    public onDeactivate() {}
}

export { SuccessScene };