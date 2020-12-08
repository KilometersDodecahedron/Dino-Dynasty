export default class oader extends Phaser.Scene {
    constructor() {
        super("preloader");
    }

    preload() {
        //the map
        this.load.image('tiles', "../rogueblitz/assets/img/Tiles/dungeonPack_extruded.png");
        this.load.tilemapTiledJSON('dungeon', '../rogueblitz/assets/json/tilemaps/fourth-tiles.json');

        //the player
        this.load.atlas("knight", "../rogueblitz/assets/img/player/knight.png", "../rogueblitz/assets/json/player/knight.json");
        this.load.image("tombstone", "../rogueblitz/assets/img/player/tombstone.png");

        //weapons
        this.load.image("knife", "../rogueblitz/assets/img/player/weapons/weapon_knife.png")
        this.load.image("axe", "../rogueblitz/assets/img/player/weapons/weapon_axe.png")

        //enemies
        this.load.atlas("goblin", "../rogueblitz/assets/img/enemies/goblin.png", "../rogueblitz/assets/json/enemies/goblin.json");
        this.load.atlas("ogre", "../rogueblitz/assets/img/enemies/ogre.png", "../rogueblitz/assets/json/enemies/ogre.json");
        this.load.atlas("demon", "../rogueblitz/assets/img/enemies/demon.png", "../rogueblitz/assets/json/enemies/demon.json");
        this.load.atlas("demon-small", "../rogueblitz/assets/img/enemies/demon-small.png", "../rogueblitz/assets/json/enemies/demon-small.json");
        this.load.atlas("necromancer", "../rogueblitz/assets/img/enemies/necromancer.png", "../rogueblitz/assets/json/enemies/necromancer.json");
        this.load.atlas("ooze-swampy", "../rogueblitz/assets/img/enemies/ooze-swampy.png", "../rogueblitz/assets/json/enemies/ooze-swampy.json");
        this.load.atlas("ooze-muddy", "../rogueblitz/assets/img/enemies/ooze-muddy.png", "../rogueblitz/assets/json/enemies/ooze-muddy.json");
        this.load.atlas("zombie-ice", "../rogueblitz/assets/img/enemies/zombie-ice.png", "../rogueblitz/assets/json/enemies/zombie-ice.json");
        this.load.atlas("skeleton", "../rogueblitz/assets/img/enemies/skeleton.png", "../rogueblitz/assets/json/enemies/skeleton.json");
        this.load.atlas("zombie", "../rogueblitz/assets/img/enemies/zombie.png", "../rogueblitz/assets/json/enemies/zombie.json");
        this.load.atlas("orc-masked", "../rogueblitz/assets/img/enemies/orc-masked.png", "../rogueblitz/assets/json/enemies/orc-masked.json");
        this.load.atlas("demon-big", "../rogueblitz/assets/img/enemies/demon-big.png", "../rogueblitz/assets/json/enemies/demon-big.json");
        this.load.atlas("wogol", "../rogueblitz/assets/img/enemies/wogol.png", "../rogueblitz/assets/json/enemies/wogol.json");
        this.load.atlas("zombie-big", "../rogueblitz/assets/img/enemies/zombie-big.png", "../rogueblitz/assets/json/enemies/zombie-big.json");
        this.load.atlas("orc-warrior", "../rogueblitz/assets/img/enemies/orc-warrior.png", "../rogueblitz/assets/json/enemies/orc-warrior.json");

        //attacks
        this.load.atlas("energy-ball", "../rogueblitz/assets/img/enemies/attacks/energy_ball.png", "../rogueblitz/assets/json/enemies/attacks/energy_ball.json");
        this.load.image("rusty-sword", "../rogueblitz/assets/img/enemies/attacks/weapon_rusty_sword.png");
        this.load.image("spiked-club", "../rogueblitz/assets/img/enemies/attacks/weapon_baton_with_spikes.png");
        this.load.image("spear", "../rogueblitz/assets/img/enemies/attacks/weapon_spear.png");

        //hearts for health
        this.load.image("ui-heart-full", "../rogueblitz/assets/img/ui/ui_heart_full.png");
        this.load.image("ui-heart-half", "../rogueblitz/assets/img/ui/ui_heart_half.png");
        this.load.image("ui-heart-empty", "../rogueblitz/assets/img/ui/ui_heart_empty.png");

        //ui and backgrounds
        this.load.image("Menubackground", "../rogueblitz/assets/img/pics/Menubackground.png");
        this.load.image("mana-bar-chunk", "../rogueblitz/assets/img/ui/mana-bar-rectangle.png");
        this.load.image("mana-bar-chunk-empty", "../rogueblitz/assets/img/ui/mana-bar-rectangle-empty.png");

        //effects
        this.load.atlas("explosion-sample", "../rogueblitz/assets/img/effects/explosion-sample.png", "../rogueblitz/assets/json/effects/explosion-sample.json");
        this.load.atlas("color-particles", "../rogueblitz/assets/img/effects/colored-particles.png", "../rogueblitz/assets/json/effects/colored-particles.json");
        this.load.image("black-circle", "../rogueblitz/assets/img/effects/black-circle.png")
        this.load.image("shouting-mouth", "../rogueblitz/assets/img/effects/shouting-mouth.png")
    }

    create() {
        this.scene.start('menu');
    }
}