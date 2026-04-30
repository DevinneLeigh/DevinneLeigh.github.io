<template>
  <div ref="gameContainer" class="game-container"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import * as Phaser from "phaser";

import background from "@/assets/images/game/background/background.png";
import layer1 from "@/assets/images/game/background/layer1.png";
import layer2 from "@/assets/images/game/background/layer2.png";
import layer3 from "@/assets/images/game/background/layer3.png";
import layer4 from "@/assets/images/game/background/layer4.png";
import mist1 from "@/assets/images/game/background/mist1.png";
import mist2 from "@/assets/images/game/background/mist2.png";
import mist3 from "@/assets/images/game/background/mist3.png";
import ground from "@/assets/images/game/background/ground.png";

import foxWalk from "@/assets/images/game/fox/Fox_Walk.png";
import foxRun from "@/assets/images/game/fox/Fox_Run.png";
import foxJump from "@/assets/images/game/fox/Fox_Jump.png";
import foxSit from "@/assets/images/game/fox/Fox_Sit.png";
import foxIdle from "@/assets/images/game/fox/Fox_Idle.png";
import foxAttack from "@/assets/images/game/fox/Fox_Attack.png";
import foxDeath from "@/assets/images/game/fox/Fox_Death.png";

import log from "@/assets/images/game/platforms/log.png"

import tree1 from "@/assets/images/game/platforms/trees/tree1.png"
import tree2 from "@/assets/images/game/platforms/trees/tree2.png"
import tree3 from "@/assets/images/game/platforms/trees/tree3.png"

import bearTrap from "@/assets/images/game/obstacles/bear-trap.png"
import spike from "@/assets/images/game/obstacles/spike.png"

import hole from "@/assets/images/game/obstacles/hole.png"

const gameContainer = ref(null);
let game = null;

class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }
  createHealthBar() {
    this.maxHealth = 100;
    this.currentHealth = 100;

    this.healthLabel = this.add.text(
      35, 22, "HP",
      {
        fontFamily: "Tahoma",
        fontSize: "30px",
        color: "#1C7850",
        fontStyle: "bold"
      }
    )
      .setScrollFactor(0)
      .setDepth(100);

    this.healthBar = this.add.graphics()
      .setScrollFactor(0)
      .setDepth(100);
    
    this.drawHealthBar();
  }

  drawHealthBar() {
    this.healthBar.clear();

    this.healthBar.fillStyle(0x1C7850, 1);
    this.healthBar.fillRect(80, 30, 200, 20);

    this.healthBar.fillStyle(0x31D68F, 1);
    this.healthBar.fillRect(
      80, 30, 200 * (this.currentHealth / this.maxHealth),
      20
    );
  }

  updateHealthBar(amount) {
    this.currentHealth -= amount;
    this.currentHealth = Math.max(this.currentHealth, 0);

    this.drawHealthBar();
  }

  attack() {
    if (this.isAttacking) return;
    this.isAttacking = true;
    this.player.play("attack", true);

    this.player.once("animationcomplete-attack", () => {
      this.isAttacking = false;
    })
  }

  takeDamage(amount, sourceX = null) {
    if (this.isDead || this.isInvincible) return;

    this.isInvincible = true;

    // --- health ---
    this.currentHealth -= amount;
    this.currentHealth = Math.max(this.currentHealth, 0);
    this.drawHealthBar();

    // --- death check ---
    if (this.currentHealth <= 0) {
      this.handleDeath();
      return;
    }

    // --- knockback ---
    this.isHurting = true;
    let dir = 0;

    if (sourceX !== null && sourceX !== undefined) {
      dir = Math.sign(this.player.x - sourceX);
    } else {
      dir = this.player.flipX ? 1 : -1;
    }

    if (dir === 0) dir = 1;

    this.isKnockedBack = true;

    // IMPORTANT: clear current velocity first
    this.player.body.setVelocity(0, 0);

    // stronger horizontal impulse
    this.player.body.setVelocityX(50 * dir);

    // consistent vertical lift
    this.player.body.setVelocityY(-250);

    // --- damage animation override ---
    this.player.play("hurt", true); 

    // --- flash effect ---
    this.tweens.add({
      targets: this.player,
      alpha: 0,
      duration: 75,
      yoyo: true,
      repeat: 5
    });

    // --- invincibility window ---
    const INVINCIBILITY_TIME = 1000; 
    const KNOCKBACK_TIME = 500;     

    // --- knockback lock ---
    this.isHurting = true;

    this.time.delayedCall(KNOCKBACK_TIME, () => {
      this.isHurting = false;
      this.isKnockedBack = false;
    });

    // --- invincibility (longer) ---
    this.time.delayedCall(INVINCIBILITY_TIME, () => {
      this.isInvincible = false;
      this.player.alpha = 1;
    }); 
  }

  handleDeath() {
    if (this.isDead) return;

    this.isDead = true;
    this.isAttacking = false;

    this.player.setVelocity(0, 0);
    this.player.body.enable = false;

    this.player.play("death", true);

    const cam = this.cameras.main;

    this.add.text(
      cam.scrollX + this.scale.width / 2,
      this.scale.height / 2,
      "GAME OVER",
      {
        fontFamily: "Tahoma",
        fontSize: "58px",
        color: "#ffffff",
        fontStyle: "bold",
      }
    )
      .setOrigin(0.5)
      .setDepth(100);

    this.time.delayedCall(2500, () => {
      this.scene.restart();
    });
  }


  preload() {
    this.load.image("background", background);
    this.load.image("layer1", layer1);
    this.load.image("mist1", mist1);
    this.load.image("layer2", layer2);
    this.load.image("mist2", mist2);
    this.load.image("layer3", layer3);
    this.load.image("mist3", mist3);
    this.load.image("ground", ground);
    this.load.image("layer4", layer4);
    this.load.image("log", log);
    this.load.image("tree1", tree1);
    this.load.image("tree2", tree2);
    this.load.image("tree3", tree3);
    this.load.image("bearTrap", bearTrap);
    this.load.image("spike", spike);
    this.load.image("hole", hole);

    this.load.spritesheet('fox_walk', foxWalk, {
      frameWidth: 80,
      frameHeight: 48
    });
    this.load.spritesheet('fox_run', foxRun, {
      frameWidth: 80,
      frameHeight: 48
    });
    this.load.spritesheet('fox_jump', foxJump, {
      frameWidth: 80,
      frameHeight: 48
    });
    this.load.spritesheet('fox_sit', foxSit, {
      frameWidth: 80,
      frameHeight: 48
    });
    this.load.spritesheet('fox_idle', foxIdle, {
      frameWidth: 80,
      frameHeight: 48
    });
    this.load.spritesheet('fox_attack', foxAttack, {
      frameWidth: 80,
      frameHeight: 48
    });
    this.load.spritesheet('fox_death', foxDeath, {
      frameWidth: 80,
      frameHeight: 48
    });
  }

  create() {
    this.input.keyboard.on("keydown-T", () => {
      this.debugEnabled = !this.debugEnabled;

      this.physics.world.debugGraphic.visible = this.debugEnabled;
    });

    this.isHurting = false;
    const { width, height } = this.scale.gameSize;

    // --- BACKGROUNDS ---
    this.background = this.add
      .tileSprite(0, 0, width, height, "background")
      .setOrigin(0)
      .setScrollFactor(0)
      .setDepth(0);

    this.layer1 = this.add
      .tileSprite(0, 0, width, height, "layer1")
      .setOrigin(0)
      .setScrollFactor(0)
      .setDepth(1);

    this.mist1 = this.add
      .tileSprite(0, 0, width, height, "mist1")
      .setOrigin(0)
      .setScrollFactor(0)
      .setDepth(2);

    this.layer2 = this.add
      .tileSprite(0, 0, width, height, "layer2")
      .setOrigin(0)
      .setScrollFactor(0)
      .setDepth(3);

    this.mist2 = this.add
      .tileSprite(0, 0, width, height, "mist2")
      .setOrigin(0)
      .setScrollFactor(0)
      .setDepth(4);

    this.layer3 = this.add
      .tileSprite(0, 0, width, height, "layer3")
      .setOrigin(0)
      .setScrollFactor(0)
      .setDepth(5);

    this.mist3 = this.add
      .tileSprite(0, 0, width, height, "mist3")
      .setOrigin(0)
      .setScrollFactor(0)
      .setDepth(8);

    this.layer4 = this.add
      .tileSprite(0, 0, width, height, "layer4")
      .setOrigin(0)
      .setScrollFactor(0)
      .setDepth(9);

    // --- WORLD ---
    const WORLD_WIDTH = 5000;
    this.physics.world.setBounds(0, 0, WORLD_WIDTH, height);
    this.physics.world.gravity.y = 1000;

    // --- GROUND ---
    const groundHeight = 200;
    const groundY = height - groundHeight

    this.ground = this.physics.add.staticImage(
      WORLD_WIDTH / 2,
      groundY + groundHeight / 2,
      null
    )
    .setDisplaySize(WORLD_WIDTH, groundHeight)
    .refreshBody(); 

    // --- OBSTACLES ---
    this.obstacle = this.physics.add.staticGroup();

    const obstacleData = [

      // bear traps
      { type: "bearTrap", circle: false, rectangle: true, x: 800, y: height - 220, scale: .25, sizeX: 120, sizeY: 1, offsetX: 10, offsetY: 50 },

      // holes
      { type: "hole", circle: true, rectangle: false, x: 1250, y: height - 210, scale: .4, radius: 160, offsetX: 50, offsetY: 60 },
    ];

    obstacleData.forEach(s => {
      const obstacleZone = this.physics.add.staticSprite(s.x, s.y, s.type)
        .setDepth(6)
        .setScale(s.scale)

      obstacleZone.refreshBody();
      if(s.circle) {
        obstacleZone.body.setCircle(s.radius);
      } else if(s.rectangle) {
        obstacleZone.body.setSize(s.sizeX, s.sizeY);
      }
      obstacleZone.body.setOffset(s.offsetX, s.offsetY)

      this.obstacle.add(obstacleZone);
    });    

    // --- WALK ANIMATION --
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('fox_walk', {
        start: 0,
        end: 8
      }),
      frameRate: 10,
      repeat: -1
    });
    // --- RUN ANIMATION --
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('fox_run', {
        start: 0,
        end: 5
      }),
      frameRate: 10,
      repeat: -1
    });
    // --- JUMP ANIMATION --
    this.anims.create({
      key: 'jump',
      frames: [
        { key: 'fox_jump', frame: 4, duration: 20},
        { key: 'fox_jump', frame: 5, duration: 150},
        { key: 'fox_jump', frame: 6, duration: 200},
        { key: 'fox_jump', frame: 7, duration: 250},
        { key: 'fox_jump', frame: 8, duration: 500},
        { key: 'fox_jump', frame: 9, duration: 500},
        { key: 'fox_jump', frame: 10, duration: 80},
      ],
      repeat: 0
    });
    // --- SIT ANIMATION --
    this.anims.create({
      key: 'sit',
      frames: this.anims.generateFrameNumbers('fox_sit', {
        start: 0,
        end: 11
      }),
      frameRate: 10,
      repeat: 0
    });
    // --- IDLE ANIMATION --
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('fox_idle', {
        start: 0,
        end: 10
      }),
      frameRate: 10,
      repeat: -1
    });
    // --- ATTACK ANIMATION --
    this.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNumbers('fox_attack', {
        start: 0,
        end: 7
      }),
      frameRate: 10,
      repeat: 0
    });
    this.isAttacking = false;
    // --- HURT ANIMATION --
    this.anims.create({
      key: 'hurt',
      frames: this.anims.generateFrameNumbers('fox_jump', {
        start: 5,
        end: 6
      }),
      frameRate: 10,
      repeat: 0
    });
    // --- DEATH ANIMATION --
    this.anims.create({
      key: 'death',
      frames: this.anims.generateFrameNumbers('fox_death', {
        start: 0,
        end: 7
      }),
      frameRate: 10,
      repeat: 0
    });

    // --- PLAYER ---
    this.player = this.physics.add
      .sprite(200, height - 295, "fox_idle")
      .setDepth(7);
    this.player.setScale(4);
    this.player.play('idle')
    this.player.body.setSize(22, 20);
    this.player.body.setOffset(32, 26);

    this.player.setCollideWorldBounds(true);


    this.player.setMaxVelocity(300, 800);

    this.physics.add.collider(this.player, this.ground);

    // --- CAMERA ---
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, height);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    // --- CONTROLS ---
    this.cursors = this.input.keyboard.createCursorKeys();

    this.keys = this.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      jump: Phaser.Input.Keyboard.KeyCodes.W,
      attack: Phaser.Input.Keyboard.KeyCodes.SPACE
    });

    // --- TAKING DAMAGE ---
    this.physics.add.overlap(
      this.player,
      this.obstacle,
      (player, obstacle) => {
        this.takeDamage(1, obstacle.x);
      },
      null,
      this
    );

    // --- HEALTH BAR ---
      this.createHealthBar();

    // Mobile: tap to jump
    this.input.on("pointerdown", () => {
      if (this.player.body.blocked.down) {
        this.player.setVelocityY(-500);
      }
    });

    // --- PLATFORMS ---

    // -- TREES --
    // this.tree = this.physics.add.staticGroup();

    // const treeData = [
    //   { x: 800, y: height - 330, scale: .43, color: "tree3", flip: false, offsetX: 0, depth: 6 },
    //   { x: 900, y: height - 480, scale: .43, color: "tree2", flip: true, offsetX: 255, depth: 5 },
    //   { x: 3800, y: height - 290, scale: .55, color: "tree2", flip: false, offsetX: 0, depth: 6 },
    // ];


    // treeData.forEach(s => {
    //   const treeZone = this.physics.add.staticSprite(s.x, s.y, s.color)
    //     .setDepth(s.depth)
    //     .setScale(s.scale)

    //   treeZone.refreshBody();

    //   const offsetX = s.flip ? s.offsetX : s.offsetX;

    //   treeZone.body.setSize(225, 1);
    //   treeZone.body.setOffset(offsetX, 60);
    //   treeZone.setFlipX(s.flip);

    //   this.tree.add(treeZone);
    // });   
    // this.treeCollider = this.physics.add.collider(
    //   this.player,
    //   this.tree,
    //   null,
    //   (player, platform) => {
    //     return player.body.velocity.y >= 0;
    //   },
    //   this
    // )
  }

  update() {
    if (this.isDead) return;
    if (this.isKnockedBack) return;
    // --- MOVEMENT ---
    const onGround = 
      this.player.body.blocked.down ||
      this.player.body.touching.down;

    const groundSpeed = 300;
    const airAccel = 500;
    const maxAirSpeed = 1000;

    let vx = this.player.body.velocity.x;

    let dir = 0;

    if (this.keys.left.isDown) dir = -1;
    else if (this.keys.right.isDown) dir = 1;

    if (dir < 0) {
      this.player.setFlipX(true);
    } else if (dir > 0) {
      this.player.setFlipX(false);
    }
    if (this.player.flipX) {
      this.player.body.setOffset(26, 26);
    } else {
      this.player.body.setOffset(32, 26)
      
    }

    // ground behavior
    if (onGround) {
      vx = dir * groundSpeed;
    } 
    // air behavior (TRUE acceleration)
    else {
      vx += dir * airAccel;
      vx = Phaser.Math.Clamp(vx, -maxAirSpeed, maxAirSpeed);
    }

    if (!this.isKnockedBack) {
      this.player.body.setVelocityX(vx);
    } 


    // --- JUMP ---
    const isJumpPressed = Phaser.Input.Keyboard.JustDown(this.keys.jump);
    if (isJumpPressed && this.player.body.blocked.down) {
      this.player.setVelocityY(-600);
    }

    // --- ATTACK ---
    if (this.isAttacking && !this.isInvincible) {
      this.player.setVelocityX(0);
    }
    const isAttackPressed = Phaser.Input.Keyboard.JustDown(this.keys.attack);
    if (isAttackPressed) {
      this.attack();
    }

    // --- PARALLAX ---
    const cam = this.cameras.main;

    this.layer1.tilePositionX = cam.scrollX * 0.2;
    this.mist1.tilePositionX = cam.scrollX * 0.4;
    this.layer2.tilePositionX = cam.scrollX * 0.6;
    this.mist2.tilePositionX = cam.scrollX * 0.8;
    this.layer3.tilePositionX = cam.scrollX * 1;
    this.mist3.tilePositionX = cam.scrollX * 1.05;
    this.layer4.tilePositionX = cam.scrollX * 1.1;

    // --- ANIMATION ---
    let anim = 'idle';

    if (this.isAttacking) {
      anim = 'attack';
    }
    else if (this.isHurting) {
      anim = 'hurt';
    }
    else if (!onGround) {
      anim = 'jump';
    }
    else if (dir !== 0) {
      anim = 'run';
    }
    else {
      anim = 'idle';
    }



    if (this.player.anims.currentAnim?.key !== anim) {
      this.player.play(anim);
    }

  }
}

onMounted(() => {
  game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 1600,
    height: 900,
    parent: gameContainer.value,
    physics: {
      default: "arcade",
      arcade: {
        debug: true,
        debugShowBody: true,
        debugShowVelocity: false,
        debugBodyColor: 0xff0000,
      },
    },
    scene: MainScene,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
  });
});

onBeforeUnmount(() => {
  if (game) {
    game.destroy(true);
    game = null;
  }
});
</script>

<style scoped>
.game-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
</style>