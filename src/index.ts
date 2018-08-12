import * as ex from 'excalibur';
import { IntroScene } from './scenes/introScene/introscene';
import { GameScene } from './scenes/gameScene/gamescene';
import { SuccessScene } from './scenes/successScene/successscene';
import { GameOverScene } from './scenes/gameOverScene/gameoverscene';
import { Player } from './actors/player/player';
import { Resource } from './resource';
import { GameSettings } from './gamesettings';

class Game extends ex.Engine {
    constructor() {
        super({ width: GameSettings.WIDTH,
                height: GameSettings.HEIGHT,
                displayMode: ex.DisplayMode.Fixed,
                pointerScope: ex.Input.PointerScope.Canvas });
    }

    public start(loader?: ex.ILoader) {
        return super.start(loader);
    }
}

// All the resources are pre-loaded
var loader = new ex.Loader();
for(var resource in Resource){
    loader.addResource(Resource[resource]);
}

// Creating the game and the scenes
const game = new Game();
const introScene = new IntroScene();
game.add('introScene', introScene);
const gameScene = new GameScene();
game.add('gameScene', gameScene);
const successScene = new SuccessScene();
game.add('successScene', successScene);
const gameOverScene = new GameOverScene();
game.add('gameOverScene', gameOverScene);

game.backgroundColor = ex.Color.White;

game.start(loader).then(() => {
    game.goToScene('gameScene');
});
