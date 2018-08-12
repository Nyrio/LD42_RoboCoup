import * as ex from 'excalibur';
import { GameSettings } from './gamesettings';

// Image and sound resources to be pre-loaded
var Resource = {
    NpcJson: new ex.Resource('assets/npc.json', 'json'),

    // decor
    ApartmentOut: new ex.Texture("assets/apartment_out.png"),
    Elevator: new ex.Texture("assets/elevator.png"),
    ElevatorOut: new ex.Texture("assets/elevator_out.png"),
    Roof: new ex.Texture("assets/roof.png"),

    // player
    PlayerIdle: new ex.Texture("assets/player_idle.png"),
    PlayerWalkLeft: new ex.Texture("assets/player_walk_left.png"),
    PlayerWalkRight: new ex.Texture("assets/player_walk_right.png"),
    PlayerKillLeft: new ex.Texture("assets/player_kill_left.png"),
    PlayerKillRight: new ex.Texture("assets/player_kill_right.png"),

    // characters
    OldMan: new ex.Texture("assets/old_man.png"),
    OldManDead: new ex.Texture("assets/old_man_dead.png"),

    // UI
    InteractionSprite: new ex.Texture("assets/interaction_sprite.png"),
    DialogueBackground: new ex.Texture("assets/dialogue_background.png")
}
for(var apart_nb = 0; apart_nb < 2*GameSettings.FLOORS; apart_nb++) {
    Resource["Apartment" + (apart_nb) + "Back"] = new ex.Texture("assets/apartment" + (apart_nb) + "_back.png");
    Resource["Apartment" + (apart_nb) + "Fore"] = new ex.Texture("assets/apartment" + (apart_nb) + "_fore.png");
}

export { Resource };