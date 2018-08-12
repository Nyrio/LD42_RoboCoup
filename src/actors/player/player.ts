import * as ex from 'excalibur';
import { Resource } from '../../resource';
import { GameSettings } from '../../gamesettings';
import { GameScene } from '../../scenes/gameScene/gamescene';


// This class handles the player animation and movement.
// It listens to clicks on the canvas to detect player input.
class Player extends ex.Actor {
    protected gameScene: GameScene;

    public sprite: ex.Actor;
    protected walkAnimationLeft: ex.Animation;
    protected walkAnimationRight: ex.Animation;
    protected killAnimationLeft: ex.Animation;
    protected killAnimationRight: ex.Animation;
    protected idleSprite: ex.Sprite;

    public lastdir: number;
    public talking: boolean;
    protected moving: boolean;
    protected killing: boolean;
    protected humans_killed: number;

    constructor(scene: GameScene) {
        super();

        this.gameScene = scene;

        this.setWidth(GameSettings.PLAYER_WIDTH);
        this.setHeight(GameSettings.PLAYER_HEIGHT);
        this.anchor.setTo(0, 1);

        this.x = (GameSettings.WIDTH - GameSettings.PLAYER_WIDTH) / 2;
        this.y = GameSettings.HEIGHT;
        this.lastdir = 1;
        this.moving = false;

        this.killing = false;
        this.humans_killed = 0;

        this.sprite = new ex.Actor();
        this.idleSprite = Resource.PlayerIdle.asSprite();
        this.sprite.addDrawing("idle", this.idleSprite);
        this.sprite.anchor.setTo(0, 1);
        this.sprite.setWidth(GameSettings.PLAYER_WIDTH);
        this.sprite.setHeight(GameSettings.PLAYER_HEIGHT);
        this.add(this.sprite);
        this.sprite.setDrawing("idle");
    }

    public onInitialize(engine: ex.Engine) {
        const playerWalkSheetLeft = new ex.SpriteSheet(Resource.PlayerWalkLeft, 14, 1, 58, 127);
        const playerWalkSheetRight = new ex.SpriteSheet(Resource.PlayerWalkRight, 14, 1, 58, 127);
        const playerKillSheetLeft = new ex.SpriteSheet(Resource.PlayerKillLeft, 15, 1, 53, 127);
        const playerKillSheetRight = new ex.SpriteSheet(Resource.PlayerKillRight, 15, 1, 53, 127);
        this.walkAnimationLeft = playerWalkSheetLeft.getAnimationBetween(engine, 1, 14, 80);
        this.sprite.addDrawing("walkLeft", this.walkAnimationLeft);
        this.walkAnimationRight = playerWalkSheetRight.getAnimationBetween(engine, 1, 14, 80);
        this.sprite.addDrawing("walkRight", this.walkAnimationRight);
        this.killAnimationLeft = playerKillSheetLeft.getAnimationBetween(engine, 1, 15, 125);
        this.sprite.addDrawing("killLeft", this.killAnimationLeft);
        this.killAnimationRight = playerKillSheetRight.getAnimationBetween(engine, 1, 15, 125);
        this.sprite.addDrawing("killRight", this.killAnimationRight);
    }

    public update(engine: ex.Engine, delta: number) {
        super.update(engine, delta); // call base update logic

        if(this.killing) return;

        // Walk
        let left: boolean = engine.input.keyboard.isHeld(ex.Input.Keys.Left) || engine.input.keyboard.isHeld(ex.Input.Keys.A);
        let right: boolean = engine.input.keyboard.isHeld(ex.Input.Keys.Right) || engine.input.keyboard.isHeld(ex.Input.Keys.D);

        var hdir = (left && !right) ? -1 : ((right && !left) ? 1 : 0);
        if(this.talking) hdir = 0;
        if(hdir == 0) {
            this.sprite.setDrawing("idle");
            this.moving = false;
        }
        else {
            this.lastdir = hdir;
            if(hdir < 0 && !this.moving) this.sprite.setDrawing("walkLeft");
            if(hdir > 0 && !this.moving) this.sprite.setDrawing("walkRight");
            this.moving = true;
            if(hdir < 0) this.idleSprite.flipHorizontal = true;
            if(hdir > 0) this.idleSprite.flipHorizontal = false;
        }

        this.x += delta * hdir * GameSettings.HSPEED / 1000;
        this.y = this.gameScene.camera.y + GameSettings.HEIGHT/2;

        if(this.gameScene.elevator.locked) {
            if(this.x < 350) {
                this.x = 350;
                this.sprite.setDrawing("idle");
                this.moving = false;
            }
            if(this.x + this.getWidth() > 450) {
                this.x = 450 - this.getWidth();
                this.sprite.setDrawing("idle");
                this.moving = false;
            }
        }
        if(this.x < 10) {
            this.x = 10;
            this.sprite.setDrawing("idle");
            this.moving = false;
        }
        if(this.x + this.getWidth() > 788) {
            this.x = 788 - this.getWidth();
            this.sprite.setDrawing("idle");
            this.moving = false;
        }
    }

    public startKill() {
        this.killing = true;
        this.moving = false;
        if(this.lastdir < 0) this.sprite.setDrawing("killLeft");
        else this.sprite.setDrawing("killRight");
    }

    public endKill(engine: ex.Engine) {
        this.sprite.setDrawing("idle");
        this.killing = false;

        this.humans_killed++;
        if(this.humans_killed == GameSettings.NB_HUMANS) engine.goToScene('successScene');
    }
}

export { Player };