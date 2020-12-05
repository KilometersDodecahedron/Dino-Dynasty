export default class Preloader extends Phaser.Scene {
    constructor() {
        //scene name
        super("preloader");
    }

    //calls in the platformer/assets
    preload() {
        //test
        this.load.image("test", "../platformer/assets/img/player/individual/dino-blue-hurt-1.png")
        this.load.image("Menubackground", "../platformer/assets/img/Menubackground.png")

        //levels
        this.load.image("sand-tiles", "../platformer/assets/img/tilesets/sand-tiles.png")
        this.load.tilemapTiledJSON("practice-level", "../platformer/assets/json/tilesets/platformer-02.json")
        this.load.tilemapTiledJSON("small-level", "../platformer/assets/json/tilesets/platformer-01.json")


        //dungeon level
        this.load.image("dungeon-tiles", "../platformer/assets/img/tilesets/dungeonTiles.png")
        this.load.image("dungeon-background", "../platformer/assets/img/tilesets/dungeonBackground.png")
        this.load.tilemapTiledJSON("dungeon-level", "../platformer/assets/json/tilesets/dungeonMap.json")

        //dungeon level
        this.load.image("temple-background", "../platformer/assets/img/tilesets/templeBackground.png")
        this.load.tilemapTiledJSON("temple-level", "../platformer/assets/json/tilesets/templeMap.json")

        this.load.image("background", "../platformer/assets/img/tilesets/background.png")
        this.load.image("block", "../platformer/assets/img/tilesets/block.png")
        this.load.image("bush", "../platformer/assets/img/tilesets/bush.png")
        this.load.image("darkblock", "../platformer/assets/img/tilesets/darkblock.png")
        this.load.image("darkgrass", "../platformer/assets/img/tilesets/darkgrass.png")
        this.load.image("dungeon", "../platformer/assets/img/tilesets/dungeon.png")
        this.load.image("forestbackground", "../platformer/assets/img/tilesets/forestbackground.png")
        this.load.image("grass", "../platformer/assets/img/tilesets/grass.png")
        this.load.image("platform-long", "../platformer/assets/img/tilesets/platform-long.png")
        this.load.image("small-platform", "../platformer/assets/img/tilesets/small-platform.png")
        //this.load.image("sand", "../platformer/assets/img/tilesets/sand.png")
        this.load.image("small-platformGOLD", "../platformer/assets/img/tilesets/small-platformGOLD.png")
        // this.load.image("spikes", "../platformer/assets/img/tilesets/spikes.png")
        // this.load.image("spikes-top", "../platformer/assets/img/tilesets/spikes-top.png")
        this.load.image("tree", "../platformer/assets/img/tilesets/tree.png")
        this.load.tilemapTiledJSON("level1", "../platformer/assets/json/tilesets/level1.json")
        this.load.tilemapTiledJSON("level2", "../platformer/assets/json/tilesets/level2.json")

        //blocks and platforms
        this.load.image("block", "../platformer/assets/img/platforms/block.png");
        this.load.image("block-big", "../platformer/assets/img/tilesets/block-big.png");

        //player
        this.load.atlas("dino-green", "../platformer/assets/img/player/dino-green.png", "../platformer/assets/json/player/dino-green.json")
        this.load.atlas("dino-blue", "../platformer/assets/img/player/dino-blue.png", "../platformer/assets/json/player/dino-blue.json")
        this.load.atlas("dino-red", "../platformer/assets/img/player/dino-red.png", "../platformer/assets/json/player/dino-red.json")
        this.load.atlas("dino-yellow", "../platformer/assets/img/player/dino-yellow.png", "../platformer/assets/json/player/dino-yellow.json")

        //attacks
        this.load.atlas("fire-ball", "../platformer/assets/img/player/attacks/fire-ball.png", "../platformer/assets/json/player/attacks/fire-ball.json")

        //effects
        this.load.image("black-circle", "../platformer/assets/img/effects/black-circle.png")
        this.load.image("particles", "../platformer/assets/img/effects/whiteish-circle.png")

        //collectables
        this.load.image("coin-blue", "../platformer/assets/img/collectables/bluepotion.png")
        this.load.image("coin-red", "../platformer/assets/img/collectables/redpotion.png")
        this.load.image("coin-yellow", "../platformer/assets/img/collectables/yellowpotion.png")
        this.load.atlas("coin-anim-frames", "../platformer/assets/img/collectables/coin-frames.png", "../platformer/assets/json/collectables/coin-frames.json")
        this.load.image("coin-one", "../platformer/assets/img/collectables/coin-one.png")
        this.load.image("coin-five", "../platformer/assets/img/collectables/coin-five.png")
        this.load.image("coin-ten", "../platformer/assets/img/collectables/coin-ten.png")

        //interactables
        this.load.image("checkpoint-flag-white", "../platformer/assets/img/interactables/checkpoint-flag-white.png")
        this.load.image("checkpoint-flag-green", "../platformer/assets/img/interactables/checkpoint-flag-green.png")
        this.load.image("checkpoint-flag-blue", "../platformer/assets/img/interactables/checkpoint-flag-blue.png")
        this.load.image("checkpoint-flag-red", "../platformer/assets/img/interactables/checkpoint-flag-red.png")
        this.load.image("checkpoint-flag-yellow", "../platformer/assets/img/interactables/checkpoint-flag-yellow.png")
        this.load.atlas("goal-post", "../platformer/assets/img/interactables/goal-post.png", "../platformer/assets/json/interactables/goal-post.json")

        //enemies
        this.load.image("bat-1", "../platformer/assets/img/enemies/bat-1.png");
        this.load.image("bat-2", "../platformer/assets/img/enemies/bat-2.png");
        this.load.atlas("bigmouth", "../platformer/assets/img/enemies/bigmouth.png", "../platformer/assets/json/enemies/bigmouth.json");
        this.load.atlas("humpback", "../platformer/assets/img/enemies/humpback.png", "../platformer/assets/json/enemies/humpback.json");
        this.load.atlas("mustache", "../platformer/assets/img/enemies/mustache.png", "../platformer/assets/json/enemies/mustache.json");
        this.load.atlas("triclops", "../platformer/assets/img/enemies/triclops.png", "../platformer/assets/json/enemies/triclops.json");

        //hazards & enemy attacks
        this.load.image("cow-skull", "../platformer/assets/img/enemies/weapons/cow-skull.png")
        this.load.image("spikes", "../platformer/assets/img/enemies/hazards/spikes.png")
        this.load.atlas("lava", "../platformer/assets/img/enemies/hazards/lava.png", "../platformer/assets/json/enemies/hazards/lava.json")

        //ui
        this.load.image("dino-green-ui", "../platformer/assets/img/player/individual/dino-green-idle-1.png")
        this.load.image("dino-blue-ui", "../platformer/assets/img/player/individual/dino-blue-idle-1.png")
        this.load.image("dino-red-ui", "../platformer/assets/img/player/individual/dino-red-idle-1.png")
        this.load.image("dino-yellow-ui", "../platformer/assets/img/player/individual/dino-yellow-idle-1.png")
    }

    create() {
        //TODO have it load the main menu
        this.scene.start("menu")
    }
}