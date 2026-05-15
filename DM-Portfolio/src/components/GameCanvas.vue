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
// import bearIdle from "@/assets/images/game/bear/Bear_Idle.png";
import bearRun from "@/assets/images/game/bear/Bear_Run.png";
import bearSit from "@/assets/images/game/bear/Bear_Sit.png";
import bearStandUp from "@/assets/images/game/bear/Bear_Stand_Up.png";
import bearWalk from "@/assets/images/game/bear/Bear_Walk.png";
import bearYawn from "@/assets/images/game/bear/Bear_Yawn.png";

import log1 from "@/assets/images/game/platforms/logs/log1.png"
import log2 from "@/assets/images/game/platforms/logs/log2.png"
import log2_2 from "@/assets/images/game/platforms/logs/log2_2.png"
import rock from "@/assets/images/game/platforms/logs/rock.png"

import tree1 from "@/assets/images/game/platforms/trees/tree1.png"
import tree2 from "@/assets/images/game/platforms/trees/tree2.png"
import leaves1 from "@/assets/images/game/platforms/trees/leaves1.png"
import leaves2 from "@/assets/images/game/platforms/trees/leaves2.png"


import bearTrap from "@/assets/images/game/obstacles/bear-trap.png"

import hole from "@/assets/images/game/obstacles/hole.png"

const gameContainer = ref(null);
let game = null;

class Bear {
  constructor(scene, x, y) {
    this.scene = scene;

    // -----------------------------
    // STATE SYSTEM
    // -----------------------------
    this.state = "idle"; // idle | intro | patrol | chase | attack | hurt | dead

    // ARENA
    this.arenaLeft = x - 1200;
    this.arenaRight = x + 100;

    // ACTIVATION
    this.isActivated = false;
    this.activationRange = 1000;

    // ATTACK CONFIG
    this.activeHitFrames = [6, 7];
    this.attackRange = 150;
    this.detectionRange = 500;

    this.attackBox = {
      width: 180,
      height: 120,
      offsetX: 100,
      offsetY: 100
    };

    this.hasDealtDamage = false;

    // HEALTH
    this.health = 5;
    this.isDead = false;
    this.isInvincible = false;
    this.invincibleTime = 800;

    // SPRITE
    this.hasStarted = false;

    this.sprite = scene.physics.add.sprite(x, y, "bear_sit")
      .setScale(4)
      .setDepth(9);

    this.sprite.setFlipX(true);
    this.sprite.setCollideWorldBounds(true);

    this.sprite.body.setSize(70, 50);
    this.sprite.body.setOffset(30, 38);

    // MOVEMENT
    this.patrolSpeed = 80;
    this.chaseSpeed = 350;
    this.direction = -1;
    this.moveMode = "walk";
    this.nextMoveSwitch = 0;
  }

  // -----------------------------
  // ATTACK BOX POSITION
  // -----------------------------
  getAttackBox() {
    const body = this.sprite.body;

    return {
      x: body.center.x + (this.sprite.flipX ? -this.attackBox.offsetX : this.attackBox.offsetX),
      y: body.center.y + this.attackBox.offsetY
    };
  }

  // -----------------------------
  // STATE SWITCH
  // -----------------------------
  setState(newState) {
    if (this.state === "dead") return;
    if (this.state === newState) return;

    this.state = newState;

    const s = this.sprite;

    switch (newState) {

      case "chase":
        this.nextMoveSwitch = this.scene.time.now;
        this.moveMode = Math.random() < 0.5 ? "run" : "walk";

        this.nextMoveSwitch = this.scene.time.now;
        break;

      case "hurt":
        s.setVelocityX(0);
        s.play("bear_hurt", true);

        s.once("animationcomplete-bear_hurt", () => {
          this.setState("chase");
        });
        break;

      case "attack":
        s.setVelocityX(0);
        s.play("bear_attack", true);
        s.on("animationupdate", this.handleAttackFrame, this);

        s.once("animationcomplete-bear_attack", () => {
          this.finishAttack();
          this.setState("chase");
        });
        break;

      case "intro":
        s.setVelocityX(0);
        break;

      case "dead":
        s.setVelocity(0, 0);
        s.body.enable = false;
        s.play("bear_death");

        s.once("animationcomplete-bear_death", () => {
          this.scene.handleWin();
        });
        break;
    }
  }

  // -----------------------------
  // UPDATE LOOP
  // -----------------------------
  update(player) {
    if (this.state === "dead") return;

    const s = this.sprite;

    const distance = Phaser.Math.Distance.Between(
      s.x, s.y,
      player.x, player.y
    );

    // -----------------------------
    // INTRO ACTIVATION
    // -----------------------------
    if (!this.isActivated) {
      s.setVelocityX(0);

      if (distance < this.activationRange) {
        this.startIntro();
      }

      return;
    }

    // -----------------------------
    // LOCKED STATES
    // -----------------------------
    if (this.state === "intro" || this.state === "attack" || this.state === "hurt") {
      s.setVelocityX(0);
      return;
    }

    // -----------------------------
    // ATTACK CHECK
    // -----------------------------
    const inAttackRange =
      Math.abs(player.x - s.x) < this.attackRange &&
      Math.abs(player.y - s.y) < 120;

    if (inAttackRange) {
      this.setState("attack");
      return;
    }

    // -----------------------------
    // BEAR MOVEMENT 
    // -----------------------------
    if (this.state === "chase") {

      // random walk/run switching
      if (this.scene.time.now > this.nextMoveSwitch) {
        this.moveMode = Math.random() < 0.5 ? "run" : "walk";
        this.nextMoveSwitch = this.scene.time.now + Phaser.Math.Between(800, 2000);
      }

      this.direction = player.x < s.x ? -1 : 1;

      const speed = this.moveMode === "run"
        ? this.chaseSpeed
        : this.patrolSpeed;

      s.setVelocityX(this.direction * speed);

      const anim = this.moveMode === "run" ? "bear_run" : "bear_walk";

      if (s.anims.currentAnim?.key !== anim) {
        s.play(anim, true);
      }

    } else if (this.state === "patrol") {

      if (s.x <= this.arenaLeft) this.direction = 1;
      if (s.x >= this.arenaRight) this.direction = -1;

      s.setVelocityX(this.direction * this.patrolSpeed);

      if (s.anims.currentAnim?.key !== "bear_walk") {
        s.play("bear_walk", true);
      }
    } else {
      s.setVelocityX(0);
    }

    s.setFlipX(this.direction < 0);
  }

  // -----------------------------
  // INTRO SEQUENCE
  // -----------------------------
  startIntro() {
    if (this.isActivated) return;

    this.isActivated = true;
    this.setState("intro");

    const s = this.sprite;

    s.play("bear_yawn");

    s.once("animationcomplete-bear_yawn", () => {
      s.play("bear_get_up");

      s.once("animationcomplete-bear_get_up", () => {
        s.play("bear_stand_up");

        s.once("animationcomplete-bear_stand_up", () => {
          s.play("bear_attack2");

          s.once("animationcomplete-bear_attack2", () => {

            this.setState("chase");
            this.nextMoveSwitch = this.scene.time.now;
          });
        });
      });
    });
  }

  // -----------------------------
  // ATTACK FRAME LOGIC
  // -----------------------------
  handleAttackFrame(animation, frame) {
    if (animation.key !== "bear_attack") return;
    if (!this.activeHitFrames.includes(frame.index)) return;

    const player = this.scene.player;
    const s = this.sprite;

    const { x: boxX, y: boxY } = this.getAttackBox();

    const px = player.body.center.x;
    const py = player.body.center.y;

    const halfW = this.attackBox.width / 2;
    const halfH = this.attackBox.height / 2;

    const inBox =
      px >= boxX - halfW &&
      px <= boxX + halfW &&
      py >= boxY - halfH &&
      py <= boxY + halfH;

    if (inBox && !this.hasDealtDamage) {
      this.hasDealtDamage = true;
      this.scene.takeDamage(20, s.x);
    }
  }

  finishAttack() {
    this.hasDealtDamage = false;
    this.sprite.off("animationupdate", this.handleAttackFrame, this);
  }

  // -----------------------------
  // DAMAGE
  // -----------------------------
  takeHit(damage = 1) {
    if (this.state === "dead") return;
    if (this.isInvincible) return;

    this.isInvincible = true;
    this.health -= damage;

    if (this.health <= 0) {
      this.setState("dead");
      return;
    }

    this.setState("hurt");

    this.scene.time.delayedCall(this.invincibleTime, () => {
      this.isInvincible = false;
      this.sprite.alpha = 1;
    });

    this.scene.tweens.add({
      targets: this.sprite,
      alpha: 0,
      duration: 75,
      yoyo: true,
      repeat: 5
    });
  }
}

class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  updateParallax(camX) {
    this.layer1.tilePositionX = camX * 0.15;
    this.mist1.tilePositionX = camX * 0.3;
    this.layer2.tilePositionX = camX * 0.45;
    this.mist2.tilePositionX = camX * 0.6;
    this.layer3.tilePositionX = camX * 0.75;
    this.mist3.tilePositionX = camX * 0.9;
    this.layer4.tilePositionX = camX * 1;
    this.layer5.tilePositionX = camX * 1.15;
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
      38, 16, "HP",
      {
        fontFamily: "VT323, monospace",
        fontSize: "45px",
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
    this.hasHitBear = false;

    this.setState("attack");

    this.player.play("attack", true);

    // APPLY DAMAGE IMMEDIATELY
    this.checkPlayerAttackHit();

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
  this.isHurting = true;
  this.isKnockedBack = true;

  // --- health ---
  this.currentHealth -= amount;
  this.currentHealth = Math.max(this.currentHealth, 0);
  this.drawHealthBar();

  // --- death check ---
  if (this.currentHealth <= 0) {
    this.handleDeath();
    return;
  }

  // --- hurt state ---
  this.setState("hurt");
  this.player.play("hurt", true);

  // --- knockback ---
  if (sourceX !== null) {
    const dir = this.player.x < sourceX ? -1 : 1;

    const knockbackX = dir * 350;
    const knockbackY = -300;

    this.player.setVelocity(knockbackX, knockbackY);
  }

  // --- flash effect ---
  this.tweens.add({
    targets: this.player,
    alpha: 0,
    duration: 75,
    yoyo: true,
    repeat: 5
  });

  const KNOCKBACK_TIME = 400;
  const INVINCIBILITY_TIME = 1000;

  // --- end knockback ---
  this.time.delayedCall(KNOCKBACK_TIME, () => {
    this.isHurting = false;
    this.isKnockedBack = false;

    if (!this.isDead) {
      this.unlockState();
      this.setState("idle");
    }
  });

  // --- invincibility ---
  this.time.delayedCall(INVINCIBILITY_TIME, () => {
    this.isInvincible = false;
    this.player.alpha = 1;
  });
}

handleHit(player, obstacle) {
  if (this.isInvincible) return;

  this.takeDamage(10, obstacle.x);
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
        fontFamily: "VT323, monospace",
        fontSize: "64px",
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

  checkPlayerAttackHit() {
    if (this.bear.isDead) return;
    if (this.hasHitBear) return;

    const direction = this.player.flipX ? -1 : 1;

    const boxX =
      this.player.body.center.x +
      (direction * this.playerAttackBox.offsetX);

    const boxY =
      this.player.body.center.y +
      this.playerAttackBox.offsetY;

    const bearBody = this.bear.sprite.body;

    const bearX = bearBody.center.x;
    const bearY = bearBody.center.y;

    const inBox =
      bearX >= boxX - this.playerAttackBox.width / 2 &&
      bearX <= boxX + this.playerAttackBox.width / 2 &&
      bearY >= boxY - this.playerAttackBox.height / 2 &&
      bearY <= boxY + this.playerAttackBox.height / 2;

    if (inBox) {
      console.log("BEAR HIT");

      this.hasHitBear = true;
      this.bear.takeHit(1);
    }
  }

  handleWin() {
    const cam = this.cameras.main;

    this.player.setVelocity(0, 0);

    this.add.text(
      cam.scrollX + this.scale.width / 2,
      this.scale.height / 2,
      "YOU WIN",
      {
        fontFamily: "VT323, monospace",
        fontSize: "64px",
        color: "#ffffff",
        fontStyle: "bold"
      }
    )
      .setOrigin(0.5)
      .setDepth(100);
  }

  startBossSequence() {
    this.bossTriggered = true;
    this.playerLocked = true;

    const cam = this.cameras.main;

    this.player.setVelocity(0, 0);

    cam.stopFollow();

    const targetX = this.bossEndX + this.scale.width / 2;

    // slow cinematic pan
    this.tweens.add({
      targets: cam,
      scrollX: targetX,
      duration: 10000,
      ease: "Power2"
    });

    // small delay BEFORE intro starts
    this.time.delayedCall(2000, () => {
      this.bear.startIntro();
    });

    this.time.delayedCall(4000, () => {
      this.playerLocked = false;
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
    this.load.image("log1", log1);
    this.load.image("log2", log2);
    this.load.image("log2_2", log2_2);
    this.load.image("rock", rock);
    this.load.image("tree1", tree1);
    this.load.image("tree2", tree2);
    this.load.image("leaves1", leaves1);
    this.load.image("leaves2", leaves2);
    this.load.image("bearTrap", bearTrap);
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
    // this.load.spritesheet('bear_idle', bearIdle, {
    //   frameWidth: 128,
    //   frameHeight: 96
    // });
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
    this.startMessage = this.add.text(
      800, // x position on screen
      200, // y position on screen
      "Welcome to My Portfolio",
      {
        fontFamily: "Tektur, sans-serif",
        fontSize: "80px",
        color: "#1A1D2B",
        shadow: { offsetX: 2, offsetY: 2, color: '#00000053', blur: 1, fill: true },
        align: "center"
      }
    )
    .setOrigin(0.5)
    .setDepth(200);

    this.messageText = this.add.text(
      800, // x position on screen
      820, // y position on screen
      "Use ←↑→ to move/jump\n Use SPACE or LMB to attack ",
      {
        fontFamily: "VT323, monospace",
        fontSize: "34px",
        color: "#E3E1ED",
        backgroundColor: "#00000053",
        lineSpacing: 10,
        align: "center"
      }
    )
    .setOrigin(0.5)
    .setDepth(200);
    
    // this.attackDebug = this.add.graphics();
    // this.attackDebug.setDepth(9999);
    this.isDead = false;
    this.isKnockedBack = false;
    this.isInvincible = false;
    this.isHurting = false;
    this.isAttacking = false;

    this.state = "idle"; 
    this.locked = false; 

    // this.input.keyboard.on("keydown-T", () => {
    //   this.debugEnabled = !this.debugEnabled;

    //   this.physics.world.debugGraphic.visible = this.debugEnabled;
    // });

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
      .setDepth(12);

    // --- WORLD ---
    const WORLD_WIDTH = 8000;
    this.physics.world.setBounds(0, 0, WORLD_WIDTH, height);
    this.physics.world.gravity.y = 1000;
    this.bossEndX = 6400; 


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
      // find traps
      // bear traps
      { type: "bearTrap", x: 2200, y: height - 259, scale: 1 },
      { type: "bearTrap", x: 4400, y: height - 259, scale: 1 },
      { type: "bearTrap", x: 4600, y: height - 259, scale: 1 },
      { type: "bearTrap", x: 5270, y: height - 625, scale: 1 },


      // find holes
      // holes
      { type: "hole", x: 3310, y: height - 240, scale: 1.58 },
      { type: "hole", x: 5500, y: height - 255, scale: 1.58 },
    ];

    const trapSizeX = 100;
    const trapOffsetX = 20;
    const trapOffsetY = 60;

    const holeSizeX = 180;
    const holeOffsetX = 120;
    const holeOffsetY = 90;

    obstacleData.forEach(s => {
      if (s.type === "hole") {
        const scale = s.scale ?? 1;
        const holeScale = 0.4 * scale;
        
        const obj = this.physics.add.staticSprite(s.x, s.y, s.type)
          .setDepth(9)
          .setScale(holeScale);

        obj.refreshBody();
        obj.body.setSize(holeSizeX * scale, 1);
        obj.body.setOffset(holeOffsetX * scale, holeOffsetY * scale);
        this.holes.add(obj);
      } else {
          const scale = s.scale ?? 1;
          const trapScale = 0.23 * scale;
          const obj = this.physics.add.staticSprite(s.x, s.y, s.type)
            .setDepth(9)
            .setScale(trapScale);

          obj.refreshBody();
          obj.body.setSize(trapSizeX * scale, 1);
          obj.body.setOffset(trapOffsetX * scale, trapOffsetY * scale);
          this.traps.add(obj);
        }
    });


    // ---PLAYER WALK ANIMATION --
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('fox_walk', {
        start: 0,
        end: 7
      }),
      frameRate: 10,
      repeat: -1
    });
    // ---PLAYER RUN ANIMATION --
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('fox_run', {
        start: 0,
        end: 4
      }),
      frameRate: 10,
      repeat: -1
    });
    // ---PLAYER JUMP ANIMATION --
    this.anims.create({
      key: 'jump',
      frames: [
        { key: 'fox_jump', frame: 3, duration: 20},
        { key: 'fox_jump', frame: 4, duration: 150},
        { key: 'fox_jump', frame: 5, duration: 150},
        { key: 'fox_jump', frame: 6, duration: 150},
        { key: 'fox_jump', frame: 7, duration: 375},
        { key: 'fox_jump', frame: 8, duration: 400},
        { key: 'fox_jump', frame: 9, duration: 100},
      ],
      repeat: 0
    });
    // ---PLAYER SIT ANIMATION --
    this.anims.create({
      key: 'sit',
      frames: this.anims.generateFrameNumbers('fox_sit', {
        start: 0,
        end: 10
      }),
      frameRate: 6,
      repeat: 0
    });
    // ---PLAYER IDLE ANIMATION --
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('fox_idle', {
        start: 0,
        end: 9
      }),
      frameRate: 10,
      repeat: -1
    });
    // ---PLAYER ATTACK ANIMATION --
    this.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNumbers('fox_attack', {
        start: 2,
        end: 6
      }),
      frameRate: 13,
      repeat: 0
    });
    this.isAttacking = false;
    // ---PLAYER HURT ANIMATION --
    this.anims.create({
      key: 'hurt',
      frames: this.anims.generateFrameNumbers('fox_jump', {
        start: 5,
        end: 6
      }),
      frameRate: 10,
      repeat: 0
    });
    // ---PLAYER DEATH ANIMATION --
    this.anims.create({
      key: 'death',
      frames: this.anims.generateFrameNumbers('fox_death', {
        start: 0,
        end: 6
      }),
      frameRate: 10,
      repeat: 0
    });

    // --- PLAYER ---
    this.player = this.physics.add
    // find player
      .sprite(750, height - 335, "fox_idle") //player start position
      .setDepth(10);
    this.player.setScale(4);
    this.player.play('idle')
    this.player.body.setSize(22, 15);
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

    this.playerAttackBox = {
      width: 80,
      height: 80,
      offsetX: 100,
      offsetY: -30
    };

    this.hasHitBear = false;

    // ---BEAR---

    this.bear = new Bear(this, 7750, height - 410);
    this.physics.add.collider(this.bear.sprite, this.ground);

    // ---BEAR SIT ANIMATION --
    this.anims.create({
      key: "bear_sit",
      frames: this.anims.generateFrameNumbers("bear_sit", { start: 5, end: 10 }),
      frameRate: 6,
      repeat: 0
    });
    this.bear.sprite.setTexture("bear_sit", 10);

    // ---BEAR YAWN ANIMATION --
    this.anims.create({
      key: "bear_yawn",
      frames: [
        { key: 'bear_yawn', frame: 0, duration: 10},
        { key: 'bear_yawn', frame: 1, duration: 10},
        { key: 'bear_yawn', frame: 2, duration: 100},
        { key: 'bear_yawn', frame: 3, duration: 100},
        { key: 'bear_yawn', frame: 4, duration: 400},
        { key: 'bear_yawn', frame: 5, duration: 400},
        { key: 'bear_yawn', frame: 6, duration: 400},
        { key: 'bear_yawn', frame: 7, duration: 100},
        { key: 'bear_yawn', frame: 8, duration: 100},
        { key: 'bear_yawn', frame: 9, duration: 100},
      ],
      repeat: 0
    });

    // ---BEAR GET UP ANIMATION --
    this.anims.create({
      key: "bear_get_up",
      frames: this.anims.generateFrameNumbers("bear_get_up", { start: 0, end: 5 }),
      frameRate: 6,
      repeat: 0
    });

    // ---BEAR STAND UP ANIMATION --
    this.anims.create({
      key: "bear_stand_up",
      frames: this.anims.generateFrameNumbers("bear_stand_up", { start: 0, end: 5 }),
      frameRate: 6,
      repeat: 0
    });

    // ---BEAR WALK ANIMATION --
    this.anims.create({
      key: "bear_walk",
      frames: this.anims.generateFrameNumbers("bear_walk", { start: 0, end: 11 }),
      frameRate: 6,
      repeat: -1
    });

    // ---BEAR RUN ANIMATION --
    this.anims.create({
      key: "bear_run",
      frames: this.anims.generateFrameNumbers("bear_run", { start: 0, end: 4 }),
      frameRate: 6,
      repeat: -1
    });

    // ---BEAR ATTACK ANIMATION --
    this.anims.create({
      key: "bear_attack",
      frames: this.anims.generateFrameNumbers("bear_attack", { start: 0, end: 8 }),
      frameRate: 10,
      repeat: 0
    });

    // ---BEAR ATTACK 2 ANIMATION --
    this.anims.create({
      key: "bear_attack2",
      frames: [
        { key: 'bear_attack2', frame: 2, duration: 100},
        { key: 'bear_attack2', frame: 3, duration: 75},
        { key: 'bear_attack2', frame: 4, duration: 150},
        { key: 'bear_attack2', frame: 5, duration: 100},
        { key: 'bear_attack2', frame: 6, duration: 50},
        { key: 'bear_attack2', frame: 7, duration: 25},
      ],
      repeat: 0
    });

    // ---BEAR IDLE ANIMATION --
    // this.anims.create({
    //   key: "bear_idle",
    //   frames: this.anims.generateFrameNumbers("bear_idle", { start: 0, end: 9 }),
    //   frameRate: 4,
    //   repeat: -1
    // });

    // ---BEAR HURT ANIMATION --
    this.anims.create({
      key: "bear_hurt",
      frames: this.anims.generateFrameNumbers("bear_attack2", { start: 3, end: 7 }),
      frameRate: 6,
      repeat: 0
    });

    // ---BEAR DEATH ANIMATION --
    this.anims.create({
      key: "bear_death",
      frames: this.anims.generateFrameNumbers("bear_death", { start: 0, end: 5 }),
      frameRate: 6,
      repeat: 0
    });




    // --- CAMERA ---
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, height);

    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    // force correct initial camera placement
    this.cameras.main.scrollX = this.player.x - this.scale.width / 2;
    this.cameras.main.scrollY = this.player.y - this.scale.height / 2;

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

    // // --- HEALTH BAR ---
      this.createHealthBar();


    this.input.on("pointerdown", () => {
      this.attack();
    });

    // // --- PLATFORMS ---

    // // -- LOGS --
    this.log = this.physics.add.staticGroup();
    const logData = [
      //find logs
      { type: "log1", x: 160, y: height - 300, scale: 1 },
      { type: "log2", overlay: "log2_2", x: 1550, y: height - 360, scale: 1, flip: true },
      { type: "log1", x: 2600, y: height - 300, scale: 1 },
      // { type: "log2", overlay: "log2_2", x: 3800, y: height - 360, scale: 1, flip: true },
      { type: "log1", x: 5000, y: height - 300, scale: 1 },

      { type: "rock", x: 3800, y: height - 295, scale: 1 },
    ];

    const log1SizeX = 100;
    const log1SizeY = 200;
    const log1OffsetX = 90;
    const log1OffsetY = 30;

    const log2SizeX = 360;
    const log2SizeY = 70;
    const log2OffsetX = 40;
    const log2OffsetY = 120;

    const rockSizeX = 170;
    const rockSizeY = 150;
    const rockOffsetX = 45;
    const rockOffsetY = 0;

    const DEPTHS = {
      back: 8,
      front: 11,
    };

    logData.forEach(s => {
      const scale = s.scale ?? 1;

      if (s.type === "log1") {
        const logScale = 0.3 * scale; 

        const obj = this.physics.add.staticSprite(s.x, s.y, s.type)
          .setDepth(DEPTHS.back)
          .setScale(logScale);

        obj.refreshBody();

        obj.body.setSize(log1SizeX * scale, log1SizeY * scale);
        obj.body.setOffset(log1OffsetX * scale, log1OffsetY * scale);

        this.log.add(obj);

      } else if (s.type === "log2") {
          const backScale = 0.48 * scale;
          const frontScale = 0.48 * scale;
          const overlayOffsetY = 15 * scale;

          const obj = this.physics.add.staticSprite(s.x, s.y, s.type)
            .setDepth(DEPTHS.back)
            .setScale(backScale)
            .setFlipX(s.flip);

          obj.refreshBody();

          obj.body.setSize(log2SizeX * scale, log2SizeY * scale);
          obj.body.setOffset(log2OffsetX * scale, log2OffsetY * scale);

          this.log.add(obj);

          this.add.sprite(s.x, s.y + overlayOffsetY, s.overlay)
            .setDepth(DEPTHS.front)
            .setScale(frontScale)
            .setFlipX(s.flip);
        } else {
          const rockScale = 0.3 * scale; 
          const obj = this.physics.add.staticSprite(s.x, s.y, s.type)
            .setDepth(DEPTHS.back)
            .setScale(rockScale);

          obj.refreshBody();

          obj.body.setSize(rockSizeX * scale, rockSizeY * scale);
          obj.body.setOffset(rockOffsetX * scale, rockOffsetY * scale);

          this.log.add(obj);
        }
    });
    this.logCollider = this.physics.add.collider(
      this.player,
      this.log
    );



    // // -- TREES --
    this.tree = this.add.group();
    const treeData = [
      //find trees
      { x: 1000, y: height - 880, scale: .5, type: "tree2", flip: true },
      { x: 2150, y: height - 880, scale: .5, type: "tree2", flip: false },
      { x: 3100, y: height - 240, scale: .75, type: "tree1", flip: true },
      { x: 3450, y: height - 880, scale: .5, type: "tree2", flip: false },
      { x: 4450, y: height - 730, scale: .75, type: "tree1", flip: false },
      { x: 5200, y: height - 850, scale: .5, type: "tree2", flip: false },
      { x: 6000, y: height - 450, scale: .75, type: "tree1", flip: true },
    ];
    treeData.forEach(s => {
      const tree = this.add.sprite(s.x, s.y, s.type)
        .setDepth(7)
        .setScale(s.scale)
      tree.setFlipX(s.flip);
      this.tree.add(tree);
    }); 

    const leafPlatforms = [
      //find leaves
      // -------- tree 1 ---------
      { x: 900, y: height - 530, type: "leaves1", scale: 0.82, flip: true, },
      { x: 1050, y: height - 890, type: "leaves1", scale: 0.8, flip: false, },
      { x: 1240, y: height - 810, type: "leaves2", scale: 0.8, flip: false, },
      // -------- tree 2 ---------
      { x: 2250, y: height - 590, type: "leaves2", scale: 0.9, flip: false },
      { x: 2050, y: height - 850, type: "leaves1", scale: 1, flip: false },
      // -------- tree 3 ---------
      { x: 2900, y: height - 700, type: "leaves1", scale: 1, flip: true },
      // -------- tree 4 ---------
      { x: 3500, y: height - 590, type: "leaves2", scale: 1, flip: true },
      { x: 3450, y: height - 900, type: "leaves1", scale: 1.2, flip: true },
      // -------- tree 5 ---------
      { x: 4200, y: height - 650, type: "leaves1", scale: 1, flip: true },
      { x: 4500, y: height - 540, type: "leaves2", scale: 0.6, flip: false },
      // -------- tree 6 ---------
      { x: 5250, y: height - 550, type: "leaves1", scale: 0.85, flip: false },
      { x: 5100, y: height - 750, type: "leaves1", scale: 0.7, flip: true },
      // -------- tree 7 ---------
      { x: 5800, y: height - 830, type: "leaves2", scale: 1.15, flip: false },
      // // -------- bush 1 ---------
      // { x: 3830, y: height - 350, type: "leaves2", scale: 0.9, flip: false, },
      // { x: 3800, y: height - 295, type: "leaves1", scale: 0.9, flip: true, },
    ];


    this.leaves = this.physics.add.staticGroup();

    leafPlatforms.forEach(s => {

      const scale = s.scale ?? 1;
      const backScale = 0.4 * scale;
      const frontScale = 0.35 * scale;
      const overlayOffsetY = 20 * scale;
      const size1X = 430;
      const size2X = 350;
      const offsetX = 75;
      const offsetY = 80;

      const leavesZone = this.physics.add.staticSprite(
        s.x,
        s.y,
        s.type
      )
        .setDepth(DEPTHS.back)
        .setScale(backScale)
        .setFlipX(s.flip)
      
      leavesZone.refreshBody();
      if(s.type === "leaves1"){
        leavesZone.body.setSize(size1X * scale, 1);
      } else {
        leavesZone.body.setSize(size2X * scale, 1);
      }
      leavesZone.body.setOffset(offsetX * scale, offsetY * scale);

      this.leaves.add(leavesZone);

      // OVERLAY
      this.add.sprite(
        s.x,
        s.y + overlayOffsetY,
        s.type
      )
        .setDepth(DEPTHS.front)
        .setScale(frontScale)
        .setFlipX(!s.flip)
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

    //-------BOSS ZONE -------------
    this.bossTriggered = false;
    this.bossZone = this.add.zone(6570, this.scale.height - 300, 1, 1000);
    this.physics.world.enable(this.bossZone);
    this.bossZone.body.setAllowGravity(false);
    this.bossZone.body.moves = false;
    this.physics.add.overlap(this.player, this.bossZone, () => {
      if (this.bossTriggered) return;
      this.startBossSequence();
    });
    this.playerLocked = false;
  }


  update() {
    if (this.isDead) return;
    const sitDelayMin = 2500;
    const sitDelayMax = 4000;
    if (this.locked) {
      this.player.setVelocityX(0);
    }

    const cam = this.cameras.main;
    const camX = cam.midPoint.x - this.scale.width / 2;
    this.updateParallax(camX);

    // --- PLAYER LOCK ---
    if (this.playerLocked) {
      this.player.setVelocity(0, 0);

      if (this.player.anims.currentAnim?.key !== "idle") {
        this.player.play("idle", true);
      }

      return;
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
    if (!this.playerLocked) {
      if (this.cursors.left.isDown) dir = -1;
      else if (this.cursors.right.isDown) dir = 1;
    }

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
        this.player.setVelocityY(-700);
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


    if (this.bossTriggered && this.player.x < this.bossEndX) {
      this.player.x = this.bossEndX;
      this.player.setVelocityX(0);
    }


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


    //--------PLAYER ATTACK HIT BOX-------------------------------
    // this.attackDebug.clear();
    const direction = this.player.flipX ? -1 : 1;

    const boxX =
      this.player.body.center.x +
      (direction * this.playerAttackBox.offsetX);

    const boxY =
      this.player.body.center.y +
      this.playerAttackBox.offsetY;

    // this.attackDebug.lineStyle(2, 0x00ff00, 1);

    // this.attackDebug.strokeRect(
    //   boxX - this.playerAttackBox.width / 2,
    //   boxY - this.playerAttackBox.height / 2,
    //   this.playerAttackBox.width,
    //   this.playerAttackBox.height
    // );
    //-------------------------------------------------------------

    if (this.isAttacking) {
      this.checkPlayerAttackHit();
    }
    this.bear.update(this.player);

  }
}



onMounted(async () => {
  await Promise.all([
    document.fonts.load('34px "VT323"'),
    document.fonts.load('45px "VT323"'),
    document.fonts.load('64px "VT323"'),
    document.fonts.load('80px "Tektur"'),
  ]);
  game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 1600,
    height: 900,
    parent: gameContainer.value,
    physics: {
      default: "arcade",
      arcade: {
        debug: false,
        debugShowBody: false,
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
