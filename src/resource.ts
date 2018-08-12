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
    RobotOnPC: new ex.Texture("assets/robot_on_pc.png"),
    WomanReading: new ex.Texture("assets/woman_reading.png"),
    WomanReadingDead: new ex.Texture("assets/woman_reading_dead.png"),
    WomanPlaying: new ex.Texture("assets/woman_playing.png"),
    WomanSitting: new ex.Texture("assets/woman_sitting.png"),
    ManSofa: new ex.Texture("assets/man_sofa.png"),
    ManSofaDead: new ex.Texture("assets/man_sofa_dead.png"),
    ManPainting: new ex.Texture("assets/man_painting.png"),
    ManPaintingDead: new ex.Texture("assets/man_painting_dead.png"),

    // intro
    IntroJson: new ex.Resource('assets/intro.json', 'json'),
    Conference: new ex.Texture("assets/conference.png"),
    WindoseUpdate: new ex.Texture("assets/windose_update.png"),
    Hrlf: new ex.Texture("assets/hrlf.png"),

    // UI
    PaperEffect: new ex.Texture("assets/paper_effect.png"),
    InteractionSprite: new ex.Texture("assets/interaction_sprite.png"),
    DialogueBackground: new ex.Texture("assets/dialogue_background.png"),
    GameOver: new ex.Texture("assets/game_over.png"),
    WellDone: new ex.Texture("assets/well_done.png"),

    // sounds
    GunShot: new ex.Sound('assets/gun_shot.mp3', '/assets/gun_shot.wav'),
    ElevatorBeep: new ex.Sound('assets/elevator_beep.mp3', '/assets/elevator_beep.wav')
}
for(var apart_nb = 0; apart_nb < 2*GameSettings.FLOORS; apart_nb++) {
    Resource["Apartment" + (apart_nb) + "Back"] = new ex.Texture("assets/apartment" + (apart_nb) + "_back.png");
    Resource["Apartment" + (apart_nb) + "Fore"] = new ex.Texture("assets/apartment" + (apart_nb) + "_fore.png");
}

export { Resource };