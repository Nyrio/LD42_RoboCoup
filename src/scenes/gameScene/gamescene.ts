import * as ex from 'excalibur';
import { Resource } from '../../resource';
import { GameSettings } from '../../gamesettings';

import { Player } from '../../actors/player/player';
import { Npc } from '../../actors/npc/npc';
import { Apartment } from '../../actors/apartment/apartment';
import { Elevator } from '../../actors/elevator/elevator';
import { ElevatorOut } from '../../actors/elevator/elevatorOut';
import { Dialogue } from '../../actors/ui/dialogue'

class GameScene extends ex.Scene {
    public player: Player;
    public elevator: Elevator;
    protected paper_effect: ex.Actor;

    public dialogue: Dialogue;

    public onInitialize(engine: ex.Engine) {
        this.camera.pos = new ex.Vector(GameSettings.WIDTH/2,
                                        GameSettings.HEIGHT/2);

        // Adding UI
        this.dialogue = new Dialogue(this, -170);
        this.add(this.dialogue);
        this.dialogue.z = 15;

        // Paper effect
        this.paper_effect = new ex.Actor();
        this.paper_effect.addDrawing(Resource.PaperEffect);
        this.paper_effect.anchor.setTo(0, 0);
        this.add(this.paper_effect);
        this.paper_effect.z = 20;

        // Adding player
        this.player = new Player(this);
        this.add(this.player);
        this.player.z = 0;

        // Adding people
        var npc_data = Resource.NpcJson.getData();
        npc_data.forEach((npc_info) => {
            var npc = new Npc(this, npc_info);
            this.add(npc);
            npc.z = -1;
        });

        // Adding decor
        for(var floor = 0; floor < GameSettings.FLOORS; floor++) {
            for(var leftorright = 0; leftorright <= 1; leftorright++) {
                var layers = [-5, 5, 10];
                layers.forEach((layer: number) => {
                        var apartment_layer = new Apartment(this, floor, leftorright, layer);
                        this.add(apartment_layer);
                        apartment_layer.z = layer;
                });
            }
        }
        for(var floor = 0; floor < GameSettings.FLOORS; floor++) {
            var elevatorOut = new ElevatorOut(this, floor);
            this.add(elevatorOut);
            elevatorOut.z = 11;
        }

        this.elevator = new Elevator(this);
        this.add(this.elevator);
        this.elevator.z = -4;

        var roof = new ex.Actor();
        roof.addDrawing(Resource.Roof);
        roof.anchor.setTo(0, 1);
        roof.x = 0;
        roof.y = 600 - 150*GameSettings.FLOORS;
        roof.setWidth(800);
        roof.setHeight(450);
        this.add(roof);
    }

    public update(engine: ex.Engine, delta: number) {
        super.update(engine, delta);

        this.paper_effect.y = this.camera.y - GameSettings.HEIGHT/2;
    }

    public onActivate() {}
    public onDeactivate() {}
}

export { GameScene };