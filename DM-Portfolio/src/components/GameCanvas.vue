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
import layer5 from "@/assets/images/game/background/layer5.png";
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

import bearAttack from "@/assets/images/game/bear/Bear_Attack.png";
import bearAttack2 from "@/assets/images/game/bear/Bear_Attack2.png";
import bearDeath from "@/assets/images/game/bear/Bear_Death.png";
import bearGetDown from "@/assets/images/game/bear/Bear_Get_Down.png";
import bearGetUp from "@/assets/images/game/bear/Bear_Get_Up.png";
import bearIdle from "@/assets/images/game/bear/Bear_Idle.png";
import bearRun from "@/assets/images/game/bear/Bear_Run.png";
import bearSit from "@/assets/images/game/bear/Bear_Sit.png";
import bearStandUp from "@/assets/images/game/bear/Bear_Stand_Up.png";
import bearWalk from "@/assets/images/game/bear/Bear_Walk.png";
import bearYawn from "@/assets/images/game/bear/Bear_Yawn.png";

import log from "@/assets/images/game/platforms/log.png"

import tree1 from "@/assets/images/game/platforms/trees/tree1.png"
import tree2 from "@/assets/images/game/platforms/trees/tree2.png"
import leaves1 from "@/assets/images/game/platforms/trees/leaves1.png"
import leaves2 from "@/assets/images/game/platforms/trees/leaves2.png"


import bearTrap from "@/assets/images/game/obstacles/bear-trap.png"
import spike from "@/assets/images/game/obstacles/spike.png"

import hole from "@/assets/images/game/obstacles/hole.png"

const gameContainer = ref(null);
let game = null;

class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  setState(newState) {
    if (this.state === "dead") return;

    const lockedStates = ["attack", "hurt"];
    if (this.locked && lockedStates.includes(this.state)) return;

    if (this.state === newState) return;

    this.state = newState;

    if (newState === "sit") {
      this.locked = true;
      this.isSitting = true;
    }

    if (newState !== "sit") {
      this.isSitting = false;
    }
  }

  unlockState() {
    this.locked = false;
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
    this.setState("attack");

    this.player.play("attack", true);

    this.player.once("animationcomplete-attack", () => {
      this.isAttacking = false;
      this.unlockState();
      this.setState("idle");
    });
  }

  startSitSequence() {
    if (this.locked) return;

    this.setState("sit");

    // play forward (sit down)
    this.player.play("sit", true);

    this.player.once("animationcomplete-sit", () => {
      if (this.state !== "sit") return;
      // random linger at end
      const linger = Phaser.Math.Between(500, 1500);

      this.time.delayedCall(linger, () => {
        if (this.state !== "sit") return;
        // play reverse (stand up)
        this.player.playReverse("sit", true);

        this.player.once("animationcomplete-sit", () => {
          if (this.state !== "sit") return;
          // fully reset state here
          this.unlockState();
          this.setState("idle");

          const sitDelayMin = 2500;
          const sitDelayMax = 4000;
          this.idleSitTimer = this.time.now + Phaser.Math.Between(sitDelayMin, sitDelayMax);
        });
      });
    });
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

    this.isHurting = true;

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

  handleHit(player, obstacle) {
    if (this.isInvincible) return;

    // direction: push player away from obstacle
    const dir = (player.x < obstacle.x) ? -1 : 1;

    const vx = dir * 100;   // horizontal knockback
    const vy = -200;        // vertical lift

    this.takeDamage(1, obstacle.x);

    this.isKnockedBack = true;
    player.setVelocity(vx, vy);
  }

  handleHole(player, obstacle) {
    if (this.isDead) return;

    // stop movement immediately
    player.setVelocity(0, 0);
    player.body.enable = false;

    this.tweens.add({
      targets: player,
      y: player.y + 200,
      alpha: 0,
      duration: 500,
      ease: "Power2"
    });

    this.time.delayedCall(600, () => {
      this.handleDeath();
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
    this.load.image("layer4", layer4);
    this.load.image("ground", ground);
    this.load.image("layer5", layer5);
    this.load.image("log", log);
    this.load.image("tree1", tree1);
    this.load.image("tree2", tree2);
    this.load.image("leaves1", leaves1);
    this.load.image("leaves2", leaves2);
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


    this.load.spritesheet('bear_attack', bearAttack, {
      frameWidth: 128,
      frameHeight: 96
    });
    this.load.spritesheet('bear_attack2', bearAttack2, {
      frameWidth: 128,
      frameHeight: 96
    });
    this.load.spritesheet('bear_death', bearDeath, {
      frameWidth: 128,
      frameHeight: 96
    });
    this.load.spritesheet('bear_get_down', bearGetDown, {
      frameWidth: 128,
      frameHeight: 96
    });
    this.load.spritesheet('bear_get_up', bearGetUp, {
      frameWidth: 128,
      frameHeight: 96
    });
    this.load.spritesheet('bear_idle', bearIdle, {
      frameWidth: 128,
      frameHeight: 96
    });
    this.load.spritesheet('bear_run', bearRun, {
      frameWidth: 128,
      frameHeight: 96
    });
    this.load.spritesheet('bear_sit', bearSit, {
      frameWidth: 128,
      frameHeight: 96
    });
    this.load.spritesheet('bear_stand_up', bearStandUp, {
      frameWidth: 128,
      frameHeight: 96
    });
    this.load.spritesheet('bear_walk', bearWalk, {
      frameWidth: 128,
      frameHeight: 96
    });
    this.load.spritesheet('bear_yawn', bearYawn, {
      frameWidth: 128,
      frameHeight: 96
    });
  }

  create() {
    this.isDead = false;
    this.isKnockedBack = false;
    this.isInvincible = false;
    this.isHurting = false;
    this.isAttacking = false;

    this.state = "idle"; 
    this.locked = false; 

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
      .setDepth(6);

    this.layer4 = this.add
      .tileSprite(0, 0, width, height, "layer4")
      .setOrigin(0)
      .setScrollFactor(0)
      .setDepth(8);

    this.layer5 = this.add
      .tileSprite(0, 0, width, height, "layer5")
      .setOrigin(0)
      .setScrollFactor(0)
      .setDepth(11);

    // --- WORLD ---
    const WORLD_WIDTH = 5000;
    this.physics.world.setBounds(0, 0, WORLD_WIDTH, height);
    this.physics.world.gravity.y = 1000;

    // --- GROUND ---
    const groundHeight = 250;
    const groundY = height - groundHeight

    this.ground = this.physics.add.staticImage(
      WORLD_WIDTH / 2,
      groundY + groundHeight / 2,
      null
    )
    .setDisplaySize(WORLD_WIDTH, groundHeight)
    .refreshBody(); 

    // --- OBSTACLES ---
    this.traps = this.physics.add.staticGroup();
    this.holes = this.physics.add.staticGroup();

    const obstacleData = [

      // bear traps
      { type: "bearTrap", shape: "rectangle", x: 700, y: height - 250, scale: 0.25, sizeX: 100, sizeY: 1, offsetX: 20, offsetY: 60 },
      { type: "bearTrap", shape: "rectangle", x: 3500, y: height - 250, scale: 0.25, sizeX: 100, sizeY: 1, offsetX: 20, offsetY: 60 },

      // holes
      { type: "hole", shape: "rectangle", x: 1250, y: height - 240, scale: 0.4, sizeX: 105, sizeY: 20, offsetX: 155, offsetY: 90 },
    ];

    obstacleData.forEach(s => {
      const obj = this.physics.add.staticSprite(s.x, s.y, s.type)
        .setDepth(9)
        .setScale(s.scale);

      obj.refreshBody();

      // set hitbox
      if (s.shape === "circle") {
        obj.body.setCircle(s.radius);
      } else {
        obj.body.setSize(s.sizeX, s.sizeY);
      }

      obj.body.setOffset(s.offsetX, s.offsetY);

      // assign to correct group
      if (s.type === "hole") {
        this.holes.add(obj);
      } else {
        this.traps.add(obj);
      }
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
        start: 2,
        end: 7
      }),
      frameRate: 13,
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
      .sprite(200, height - 335, "fox_idle")
      .setDepth(10);
    this.player.setScale(4);
    this.player.play('idle')
    this.player.body.setSize(22, 20);
    this.player.body.setOffset(32, 26);

    this.player.setCollideWorldBounds(true);

    this.player.setMaxVelocity(300, 800);

    this.physics.add.collider(this.player, this.ground);

    this.player.on("animationcomplete-attack", () => {
      this.unlockState();
    });

    this.player.on("animationcomplete-hurt", () => {
      this.unlockState();
      this.setState("idle");
    });


    // --- CAMERA ---
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, height);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    // --- CONTROLS ---
    this.cursors = this.input.keyboard.createCursorKeys();

    this.keys = this.input.keyboard.addKeys({
      attack: Phaser.Input.Keyboard.KeyCodes.SPACE
    });

    // --- PHYSICS INTERACTIONS ---
    // traps = solid collision + knockback
    this.physics.add.collider(
      this.player,
      this.traps,
      this.handleHit,
      null,
      this
    );

    // holes = overlap only (no collision) + instant death
    this.physics.add.overlap(
      this.player,
      this.holes,
      this.handleHole,
      null,
      this
    );

    // --- HEALTH BAR ---
      this.createHealthBar();


    this.input.on("pointerdown", () => {
      this.attack();
    });

    // --- PLATFORMS ---

    // -- TREES --
    this.tree = this.add.group();
    const treeData = [
      { x: 600, y: height - 740, scale: .75, color: "tree1", flip: true },
    ];
    treeData.forEach(s => {
      const tree = this.add.sprite(s.x, s.y, s.color)
        .setDepth(7)
        .setScale(s.scale)
      tree.setFlipX(s.flip);
      this.tree.add(tree);
    });   

    // -- LEAVES --
    this.leaves = this.physics.add.staticGroup();

    const leavesData = [
      { x: 480, y: height - 450, scale: .4, color: "leaves2", flip: false, sizeX: 350, sizeY: 1, offsetX: 75, offsetY: 80 },
      { x: 860, y: height - 655, scale: .4, color: "leaves1", flip: false, sizeX: 350, sizeY: 1, offsetX: 75, offsetY: 80 },
    ];


    leavesData.forEach(s => {
      const leavesZone = this.physics.add.staticSprite(s.x, s.y, s.color)
        .setDepth(8)
        .setScale(s.scale)

      leavesZone.refreshBody();

      leavesZone.body.setSize(s.sizeX, s.sizeY);
      leavesZone.body.setOffset(s.offsetX, s.offsetY);
      leavesZone.setFlipX(s.flip);

      this.leaves.add(leavesZone);
    });   
    this.leavesCollider = this.physics.add.collider(
      this.player,
      this.leaves,
      null,
      (player, platform) => {
        return player.body.velocity.y >= 0;
      },
      this
    )
  }


  update() {
    if (this.isDead) return;
    const sitDelayMin = 2500;
    const sitDelayMax = 4000;
    if (this.locked) {
      this.player.setVelocityX(0);
    }
    if (!this.idleSitTimer) {
      this.idleSitTimer = this.time.now + Phaser.Math.Between(sitDelayMin, sitDelayMax);
    }
    if (
      this.time.now > this.idleSitTimer &&
      this.state === "idle" &&
      !this.locked &&
      !this.isKnockedBack &&
      !this.isAttacking &&
      !this.isHurting &&
      this.player.body.velocity.x === 0 &&
      this.player.body.blocked.down
    ) {
      if (Math.random() < 0.4) {
        this.startSitSequence();
        this.idleSitTimer = this.time.now + Phaser.Math.Between(sitDelayMin, sitDelayMax);
        return;
      }
      this.idleSitTimer = this.time.now + Phaser.Math.Between(sitDelayMin, sitDelayMax);
    }

    const onGround = 
      this.player.body.blocked.down ||
      this.player.body.touching.down;
    
    let dir = 0;
    if (this.cursors.left.isDown) dir = -1;
    else if (this.cursors.right.isDown) dir = 1;

    // --- INTERRUPT SIT ---
    if (this.state === "sit" && (dir !== 0 || !onGround)) {
      this.unlockState();
      this.setState("idle");
    }

    if (!this.isKnockedBack) {
      const groundSpeed = 300;
      const airAccel = 500;
      const maxAirSpeed = 1000;

      let vx = this.player.body.velocity.x;

      if (dir < 0) this.player.setFlipX(true);
      else if (dir > 0) this.player.setFlipX(false);

      if (this.player.flipX) this.player.body.setOffset(26, 26);
      else this.player.body.setOffset(32, 26)

      // ground behavior
      if (onGround) {
        vx = dir * groundSpeed;
      } 
      // air behavior (TRUE acceleration)
      else {
        vx += dir * airAccel;
        vx = Phaser.Math.Clamp(vx, -maxAirSpeed, maxAirSpeed);
      }
  
      this.player.body.setVelocityX(vx);


      // --- JUMP ---
      const isJumpPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up);
      if (isJumpPressed && onGround) {
        this.player.setVelocityY(-680);
      }
    }


    // --- ATTACK ---
    if (!this.isKnockedBack && this.isAttacking && !this.isInvincible) {
      this.player.setVelocityX(0);
    }
    const isAttackPressed = Phaser.Input.Keyboard.JustDown(this.keys.attack);
    if (isAttackPressed) {
      this.attack();
    }

    // --- PARALLAX ---
    const cam = this.cameras.main;
    
    this.layer1.tilePositionX = cam.scrollX * 0.15;
    this.mist1.tilePositionX = cam.scrollX * 0.3;
    this.layer2.tilePositionX = cam.scrollX * 0.45;
    this.mist2.tilePositionX = cam.scrollX * 0.6;
    this.layer3.tilePositionX = cam.scrollX * 0.75;
    this.mist3.tilePositionX = cam.scrollX * 0.9;
    this.layer4.tilePositionX = cam.scrollX * 1;
    this.layer5.tilePositionX = cam.scrollX * 1.15;

    // --- ANIMATION ---
    let anim;

    switch (this.state) {
      case "sit":
        anim = "sit";
        break;

      case "attack":
        anim = "attack";
        break;

      case "hurt":
        anim = "hurt";
        break;

      default:
        if (!onGround) anim = "jump";
        else if (dir !== 0) anim = "run";
        else anim = "idle";
    }
    if (this.player.anims.currentAnim?.key !== anim) {
      this.player.play(anim, true);
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