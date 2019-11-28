import { TileType, WINDOW_HEIGHT, WINDOW_WIDTH, TILE_SIZE } from '../constants';
import { parseMapData } from '../utils/mapReader';
import { mapGenerator } from '../utils/mapGenerator';
import { Asset } from 'expo-asset';

const BALL = 'ball';

export default class Game extends Phaser.State {
  init(assets, mapJSON) {
    this.assets = assets;
    this.mapJSON = mapJSON;
  }

  preload() {
    const ball = Asset.fromModule(this.assets['ball.png']).uri;
    const basicTile = Asset.fromModule(this.assets['basic_tile.png']).uri;
    const hole = Asset.fromModule(this.assets['hole.png']).uri;
    this.game.load.image(TileType.BASIC, basicTile);
    this.game.load.image(BALL, ball);
    this.game.load.image(TileType.HOLE, hole);
  }

  create() {
    this.game.stage.backgroundColor = '#eeeeee';
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.p2.setImpactEvents(true);

    var playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
    var wallsCollisionGroup = this.game.physics.p2.createCollisionGroup();
    // this.game.physics.p2.gravity.;

    this.walls = this.game.add.group();
    this.walls.enableBody = true;
    this.walls.physicsBodyType = Phaser.Physics.P2JS;

    const mapData = parseMapData(this.mapJSON);

    // Create walls
    mapData.tiles.forEach(params => {
      const tmp = this.walls.create(...params);
      tmp.body.static = true;
      tmp.body.setCollisionGroup(wallsCollisionGroup);
      tmp.body.collides(playerCollisionGroup);
    });

    mapData.holes.forEach(params => {
      const tmp = this.game.add.sprite(...params);

      this.game.physics.p2.enable(tmp); // FIXME is this necessary?
    });

    const playerPos = mapData.start;
    this.player = this.game.add.sprite(playerPos.x, playerPos.y, BALL);
    this.player.scale.set(0.9);
    this.game.physics.p2.enable(this.player);
    this.player.body.bounce = 0.2;
    this.player.body.setCircle(TILE_SIZE / 2);

    this.player.body.setCollisionGroup(playerCollisionGroup);
    this.player.body.collides(wallsCollisionGroup);

    this.game.camera.follow(this.player);
    this.game.world.setBounds(
      -TILE_SIZE / 2,
      -TILE_SIZE / 2,
      mapData.bounds.right,
      mapData.bounds.bottom,
    );

    this.cursors = this.game.input.keyboard.createCursorKeys();
  }

  update(time, delta) {
    this.player.body.setZeroVelocity();
    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -100;
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = 100;
    } else if (this.cursors.down.isDown) {
      this.player.body.velocity.y = 100;
    } else if (this.cursors.up.isDown) {
      this.player.body.velocity.y = -100;
    }
  }
}
