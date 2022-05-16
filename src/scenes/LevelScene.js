import Entities from "../Entities";

const WORLD_WIDTH = 36000;
const WORLD_HEIGHT = 1080;

const layers = {
  BACKGROUND: 1000,
  FLOOR: 1010,
  PLATFORMS: 1020,
  ENTITIES: 1030,
  BUBBLES: 1040,
  PLAYER: 1050,
  QUEST: 1060,
  CONTROLS: 1070,
};

const DIALOG_ZOOM_EASING = "Power2";
const DIALOG_ZOOM_DURATION = 500;
const DIALOG_ZOOM_AMOUNT = 0.3;

export default class LevelScene extends Phaser.Scene {
  constructor() {
    super("level-scene");
    window.levelscene = this;
  }

  create() {
    this.isLandscape = false;
    this.isMobile = false;
    this.shouldResizeStaticObjects = true;
    this.nearbyEntityName = null;
    this.additionalZoom = 0;
    this.correctAnswers = 0;

    this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    this.physics.world.setBoundsCollision(true, true, false, true);
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

    this.input.addPointer(4);

    this.createBackground();
    this.createFloor();
    this.createPlatforms();
    this.createPlayer();
    this.createEntities();
    this.createControls();

    this.pointerDebugText = this.add
      .rexBBCodeText({
        x: 0,
        y: 0,
        text: "debug",
        origin: { x: 0, y: 0 },
        style: {
          fontFamily: "DigitalStrip",
          fontSize: 20,
          lineSpacing: 8,
          color: "#404",
          // wordWrap: { width: 400, useAdvancedWrap: true },
          wrap: {
            mode: "word",
            width: 400,
          },
          stroke: "#ffffff",
          strokeThickness: 4,
        },
      })
      .setDepth(9999)
      .setVisible(false);
    this.pointerDebugX = this.add
      .line(0, 0, 0, 0, 0, 0, 0x00000, 1)
      .setOrigin(0, 0)
      .setDepth(9999)
      .setVisible(false);
    this.pointerDebugY = this.add
      .line(0, 0, 0, 0, 0, 0, 0x00000, 1)
      .setOrigin(0, 0)
      .setDepth(9999)
      .setVisible(false);
    this.correctAnswersText = this.add
      .rexBBCodeText({
        x: 15,
        y: 15,
        text: "Correct answers: 0",
        origin: { x: 0, y: 0 },
        style: {
          fontFamily: "DigitalStrip",
          fontSize: 16,
          lineSpacing: 8,
          color: "#404",
          // wordWrap: { width: 400, useAdvancedWrap: true },
          wrap: {
            mode: "word",
            width: 400,
          },
          stroke: "#ffffff",
          strokeThickness: 4,
        },
      })
      .setDepth(9999)
      .setScrollFactor(0, 0);

    this.floor.children.iterate((entry) => {
      this.children.bringToTop(entry);
    });
    Object.values(this.entities).forEach((entry) => {
      this.children.bringToTop(entry);
    });
    this.children.bringToTop(this.player);
    this.children.bringToTop(this.quest);

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.floor);

    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

    this.key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    this.key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    this.key3 = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.THREE
    );
    this.key4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);

    this.keyPlus = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.PLUS
    );
    this.keyMinus = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.MINUS
    );

    this.touchState = {
      left: false,
      right: false,
      jump: false,
      action: false,
    };

    this.playerFlags = {
      canMove: true,
    };

    this.physics.world.drawDebug = false;
    this.physics.world.debugGraphic.clear();

    this.safeAreaLeft = 0;
    this.safeAreaRight = 0;

    console.log("listen to resize");
    this.events.on("resize", () => {
      console.log("scene resize");
      this.onResize();
    });
    this.events.once("postupdate", () => {
      console.log("scene postupdate");
      this.onResize();
    });
  }

  onResize() {
    console.log("scene on resize");
    this.isLandscape = window.innerWidth > window.innerHeight;
    this.isMobile = this.isLandscape && window.innerWidth <= 1024;

    this.cameras.main.zoom = this.getScaledZoom() + this.additionalZoom;
    this.safeAreaLeft =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--safe-area-left"
        )
      ) || 0;
    this.safeAreaRight =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--safe-area-right"
        )
      ) || 0;

    this.shouldResizeStaticObjects = true;
  }

  getScaledZoom() {
    return (
      Math.round((window.innerHeight / 1080) * (this.isMobile ? 2 : 1) * 128) /
      128
    );
  }

  createPlayer() {
    const player = this.physics.add.sprite(2000, 230);
    player.body.setSize(40, 200);
    player.setScale(0.4, 0.4);
    player.body.setOffset(120, 40);
    player.setCollideWorldBounds(true);
    player.setAccelerationY(2000);

    this.anims.create({
      key: "still",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [15],
      }),
      repeat: -1,
    });
    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [14],
      }),
      repeat: -1,
    });
    this.anims.create({
      key: "fall",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [13],
      }),
      repeat: -1,
    });
    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      }),
      repeat: -1,
    });
    this.anims.create({
      key: "thinking",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [12],
      }),
      repeat: -1,
    });

    player.play("still");

    this.quest = this.add
      .sprite(0, 0, "quest")
      .setOrigin(0.5, 1)
      .setVisible(false);

    this.player = player;
  }

  /**
   * @returns {Phaser.Physics.Arcade.StaticGroup}
   */
  createFloor() {
    const floor = this.physics.add.staticGroup();
    this.createLargePlatform(floor, 0, 930, 350);
    this.floor = floor;
  }

  createBackground() {
    const bgLayer = this.add.layer();
    const mountains = this.add
      .tileSprite(
        0,
        1080,
        window.innerWidth,
        this.textures.get("mountains").getSourceImage().height,
        "mountains"
      )
      .setOrigin(0, 1)
      .setScrollFactor(0, 1);
    bgLayer.add([mountains]);
    this.bg = {
      layer: bgLayer,
      mountains,
    };
  }

  createPlatforms() {
    const platforms = this.physics.add.staticGroup();
    this.createLargePlatform(
      platforms,
      310,
      190,
      1
    ); /** Место для самолюбования */

    this.createLargePlatform(platforms, 1140, 400, 3); /** Бабули */

    this.createLargePlatform(platforms, 3050, 300, 1); /** Свинка */
    this.createLargePlatform(platforms, 5060, 200, 1); /** Тетрис */

    this.createLargePlatform(platforms, 5800, 400, 2); /** Касперский */
    this.createLargePlatform(platforms, 6600, 600, 1); /** Около Рифа */

    this.createLargePlatform(platforms, 7400, 350, 1); /** Мейл.ру */

    this.createLargePlatform(platforms, 8700, 250, 1); /** Телевизор */
    this.createLargePlatform(platforms, 9500, 450, 1); /** Интернет Эксплорер */
    this.createLargePlatform(platforms, 10250, 250, 1); /** Живой журнал */
    this.createLargePlatform(platforms, 10900, 510, 1); /** Ру центр */
    this.createLargePlatform(platforms, 11600, 650, 1); /** Яндекс */
    this.createLargePlatform(platforms, 13300, 650, 1); /** Кинопоиск */
    this.createLargePlatform(platforms, 12850, 350, 1); /** Мамба */
    this.createLargePlatform(platforms, 14600, 650, 1); /** Лепрозорий */
    this.createLargePlatform(platforms, 16400, 500, 4); /** Хабр */
    this.createLargePlatform(platforms, 18200, 440, 1); /** Одноклассники */
    this.createLargePlatform(platforms, 18900, 290, 1); /** Тэглайн */
    this.createLargePlatform(platforms, 19600, 480, 1); /** На пенёк сел */
    this.createLargePlatform(platforms, 20600, 400, 2); /** Упячка */
    this.createLargePlatform(platforms, 21500, 300, 2);
    this.createLargePlatform(platforms, 22400, 500, 2); /** Путин краб */
    this.createLargePlatform(platforms, 23300, 340, 2); /** Госуслуги */
    this.createLargePlatform(platforms, 24400, 340, 2); /** Трольфейс */
    this.createLargePlatform(platforms, 25250, 480, 1); 
    this.createLargePlatform(platforms, 26300, 500, 1); /** Точка рф */
    this.createLargePlatform(platforms, 29100, 520, 1); 
    this.createLargePlatform(platforms, 29770, 700, 3); /** Тян РНК */
    this.createLargePlatform(platforms, 29700, 250, 1); /** Лиса */
    this.createLargePlatform(platforms, 31680, 350, 1); /** Медуза */
    this.createLargePlatform(platforms, 32400, 630, 1); /** Золотой сайт */
    this.createLargePlatform(platforms, 32900, 340, 1); 
    this.createLargePlatform(platforms, 33600, 340, 1); /** Алиса */

    this.platforms = platforms;
  }

  createLargePlatform(group, x, y, width = 0, height = 0) {
    let offsetX = 0;
    let offsetY = 0;
    this.createPlatform(group, x + offsetX, y + offsetY, "floor-left");
    offsetX += 115;
    for (let i = 0; i < width; i++) {
      this.createPlatform(group, x + offsetX, y + offsetY, "floor");
      offsetX += 120;
    }
    this.createPlatform(group, x + offsetX, y + offsetY, "floor-right");
    offsetY += 66;

    for (let i = 0; i < height; i++) {
      let wallOffsetX = 0;
      this.createPlatform(group, x + wallOffsetX, y + offsetY, "wall-left");
      wallOffsetX += 115;
      for (let i = 0; i < width; i++) {
        this.createPlatform(group, x + wallOffsetX, y + offsetY, "wall");
        wallOffsetX += 120;
      }
      this.createPlatform(group, x + wallOffsetX, y + offsetY, "wall-right");
      offsetY += 60;
    }
  }

  createPlatform(group, x, y, key) {
    /** @type {Phaser.Physics.Arcade.Sprite} */
    const platform = group.create(x, y, key);
    platform.setOrigin(0, 0);
    platform.body.updateFromGameObject();
    if (key === "floor") {
      platform.body.setSize(120, 54);
      platform.body.setOffset(0, 12);
    } else if (key === "floor-left") {
      platform.body.setSize(115, 54);
      platform.body.setOffset(9, 12);
    } else if (key === "floor-right") {
      platform.body.setSize(110, 54);
      platform.body.setOffset(0, 12);
    } else if (key === "wall") {
      platform.body.setSize(120, 60);
      platform.body.setOffset(0, 0);
    } else if (key === "wall-left") {
      platform.body.setSize(120, 60);
      platform.body.setOffset(9, 0);
    } else if (key === "wall-right") {
      platform.body.setSize(120, 60);
      platform.body.setOffset(0, 0);
    }
    return platform;
  }

  createEntities() {
    const entities = {};
    Object.entries(Entities).forEach(([entityName, entityData]) => {
      const entity = this.physics.add
        .sprite(entityData.x, entityData.y, entityData.sprite)
        .setOrigin(0, 1);

      if (entityData.quiz) {
        entity.quizArea = this.physics.add.existing(
          this.add
            .rectangle(
              entityData.quiz.area.x,
              entityData.quiz.area.y,
              entityData.quiz.area.width,
              entityData.quiz.area.height,
              0xff0000,
              0
            )
            .setOrigin(
              entityData.quiz.area.origin?.x ?? 0,
              entityData.quiz.area.origin?.y ?? 0
            )
        );
        this.physics.add.overlap(this.player, entity.quizArea);

        entity.quizData = entityData.quiz;
        entity.quizState = {
          started: false,
          shown: false,
          answered: false,
          solved: false,
          gameObjects: null,
          currentLine: null,
          finished: false,
        };
      }

      if (entityData.popup) {
        entity.popupArea = this.physics.add.existing(
          this.add
            .rectangle(
              entityData.popup.area.x,
              entityData.popup.area.y,
              entityData.popup.area.width,
              entityData.popup.area.height,
              0xffff00,
              0
            )
            .setOrigin(
              entityData.popup.area.origin?.x ?? 0,
              entityData.popup.area.origin?.y ?? 0
            )
        );
        this.physics.add.overlap(this.player, entity.popupArea);

        entity.popupData = entityData.popup;
        entity.popupState = {
          shown: false,
          gameObjects: null,
        };
      }

      if (entityData.dialogue) {
        entity.dialogueArea = this.physics.add.existing(
          this.add
            .rectangle(
              entityData.dialogue.area.x,
              entityData.dialogue.area.y,
              entityData.dialogue.area.width,
              entityData.dialogue.area.height,
              0xffff00,
              0
            )
            .setOrigin(
              entityData.dialogue.area.origin?.x ?? 0,
              entityData.dialogue.area.origin?.y ?? 0
            )
        );
        this.physics.add.overlap(this.player, entity.dialogueArea);

        entity.dialogueData = entityData.dialogue;
        entity.dialogueState = {
          started: false,
          shown: false,
          gameObjects: null,
          currentLine: null,
          isPlayer: false,
          finished: false,
        };
      }

      if (entityData.colliders) {
        entity.colliders = [];
        entityData.colliders.forEach((collider) => {
          const colliderBody = this.physics.add.existing(
            this.add
              .rectangle(
                collider.x,
                collider.y,
                collider.width,
                collider.height,
                0x0000ff,
                0
              )
              .setOrigin(0, 1),
            true
          );
          this.physics.add.collider(this.player, colliderBody);
          entity.colliders.push(colliderBody);
        });
      }

      entities[entityName] = entity;
    });
    this.entities = entities;
  }

  /**
   * @param {Phaser.Physics.Arcade.Sprite} entity
   */
  showQuiz(entity) {
    const container = this.add.container(0, 0);
    const questionBubble = this.add.image(0, 0, "bubble-line").setOrigin(0, 0);
    const questionText = this.add
      .text(15, questionBubble.getBounds().centerY, entity.quizData.quiestion, {
        fontFamily: "DigitalStrip",
        fontSize: 16,
        lineSpacing: 10,
        color: "#000",
      })
      .setOrigin(0, 0.5);
    container.add(questionBubble);
    container.add(questionText);
    let offsetX = 0;
    let offsetY = questionBubble.getBounds().height + 15;

    const answers = [];
    entity.quizData.answers.forEach((answer, answerIndex) => {
      const answerBubble = this.add
        .image(offsetX, offsetY, `answer-${answerIndex + 1}`)
        .setOrigin(0, 0);
      const answerNumberText = this.add
        .text(
          offsetX + 15,
          offsetY + Math.round(answerBubble.getBounds().height / 2),
          answerIndex + 1,
          {
            fontFamily: "DigitalStrip",
            fontSize: 16,
            lineSpacing: 10,
            color: "#666",
          }
        )
        .setOrigin(0, 0.5);
      const answerText = this.add
        .text(
          offsetX + answerNumberText.getBounds().width + 30,
          offsetY + Math.round(answerBubble.getBounds().height / 2),
          answer,
          {
            fontFamily: "DigitalStrip",
            fontSize: 16,
            lineSpacing: 10,
            color: "#000",
          }
        )
        .setOrigin(0, 0.5);
      container.add(answerBubble);
      container.add(answerNumberText);
      container.add(answerText);
      if ((answerIndex + 1) % 2 === 1) {
        offsetX += answerBubble.getBounds().width + 15;
      } else {
        offsetX = 0;
        offsetY += answerBubble.getBounds().height + 15;
      }
      answers.push({
        answerBubble: answerBubble,
        answerNumberText: answerNumberText,
        answerText: answerText,
      });
    });
    container.setPosition(
      entity.quizData.x -
        container.getBounds().width * entity.quizData.origin?.x ?? 0,
      entity.quizData.y -
        container.getBounds().height * entity.quizData.origin?.y ?? 0
    );
    entity.quizState.gameObjects = {
      container: container,
      questionBubble: questionBubble,
      questionText: questionText,
      answers: answers,
    };
    entity.quizState.started = true;
    entity.quizState.shown = true;
    this.applyCameraAdditionalZoom(DIALOG_ZOOM_AMOUNT);
  }

  hideQuiz(entity) {
    console.log("hideQuiz");
    if (entity.quizState.gameObjects) {
      console.log("cleanup gameObjects");
      entity.quizState.gameObjects.container.destroy();
      entity.quizState.gameObjects = null;
      this.applyCameraAdditionalZoom(0);
    }
    entity.quizState.shown = false;
  }

  applyCameraAdditionalZoom(additionalZoom) {
    console.log("applyCameraAdditionalZoom:", additionalZoom);
    this.additionalZoom = additionalZoom;
    const newZoom = this.getScaledZoom() + this.additionalZoom;
    this.cameras.main.zoomEffect.reset();
    this.cameras.main.zoomTo(
      newZoom,
      DIALOG_ZOOM_DURATION,
      DIALOG_ZOOM_EASING,
      false,
      (camera, progress, camX, camY) => {
        this.resizeStaticObjects();
      }
    );
  }

  answerQuiz(entity, number) {
    if (entity.quizData.correctNumber === number) {
      entity.quizState.answered = true;
      entity.quizState.solved = true;
      entity.quizState.gameObjects.answers[number - 1].answerText.setColor(
        "#3F3"
      );
      console.log("correct!");
      this.correctAnswers++;
      this.correctAnswersText.text = `Correct answers: ${this.correctAnswers}`;
    } else {
      entity.quizState.answered = true;
      entity.quizState.gameObjects.answers[number - 1].answerText.setColor(
        "#F33"
      );
      console.log("fail!!!");
    }
    setTimeout(() => {
      this.advanceQuizDialogue(entity);
    }, 750);
  }

  advanceQuizDialogue(entity) {
    console.log("advanceQuizDialogue start");
    if (entity.quizState.gameObjects) {
      console.log("cleanup gameObjects");
      // cleanup previous text bubbles
      entity.quizState.gameObjects.container.destroy();
      entity.quizState.gameObjects = null;
    }
    let lines = entity.quizState.solved
      ? entity.quizData.correctAnswerLines
      : entity.quizData.wrongAnswerLines;
    let currentLine =
      entity.quizState.currentLine == null ? 0 : entity.quizState.currentLine;
    if (lines && lines.length > currentLine) {
      const line = lines[currentLine];
      console.log(`showQuizLine ${currentLine}`);
      this.showQuizLine(entity, line);
      entity.quizState.currentLine = currentLine + 1;
      this.applyCameraAdditionalZoom(DIALOG_ZOOM_AMOUNT);
      entity.quizState.shown = true;
    } else {
      console.log("No more lines of dialogue");
      entity.quizState.finished = true;
      entity.quizState.shown = false;
      this.applyCameraAdditionalZoom(0);
    }
    console.log("advanceQuizDialogue end");
  }

  hideQuizDialogue(entity) {
    console.log("hideQuizDialogue");
    if (entity.quizState.gameObjects) {
      console.log("cleanup gameObjects");
      entity.quizState.gameObjects.container.destroy();
      entity.quizState.gameObjects = null;
      this.applyCameraAdditionalZoom(0);
    }
    entity.quizState.shown = false;
  }

  showQuizLine(entity, line) {
    const container = this.add.container(0, 0);
    const lineText = this.add.rexBBCodeText({
      x: 0,
      y: 0,
      text: line,
      origin: { x: 0, y: 0.5 },
      style: {
        fontFamily: "DigitalStrip",
        fontSize: 16,
        lineSpacing: 10,
        color: "#000",
        // wordWrap: { width: 385, useAdvancedWrap: true },
        wrap: {
          mode: "word",
          width: 385,
        },
      },
    });
    const bubbleSpriteKey =
      lineText.getBounds().height < 38
        ? "bubble-line"
        : lineText.getBounds().height < 86
        ? "bubble-medium"
        : "bubble-large";
    const lineBubble = this.add.image(0, 0, bubbleSpriteKey).setOrigin(0, 0);
    lineText.setPosition(25, lineBubble.getBounds().centerY);
    container.add(lineBubble);
    container.add(lineText);
    container.setPosition(
      entity.quizData.x -
        container.getBounds().width * entity.quizData.origin?.x ?? 0,
      entity.quizData.y -
        container.getBounds().height * entity.quizData.origin?.y ?? 0
    );
    entity.quizState.gameObjects = {
      container: container,
      lineBubble: lineBubble,
      lineText: lineText,
    };
  }

  showPopup(entity) {
    if (entity.popupState.gameObjects) {
      return;
    }
    const popupData = entity.popupData;
    const container = this.add.container(popupData.x, popupData.y);
    const lineText = this.add.rexBBCodeText({
      x: 0,
      y: 0,
      text: popupData.text,
      origin: { x: 0, y: 0.5 },
      style: {
        fontFamily: "DigitalStrip",
        fontSize: 16,
        lineSpacing: 10,
        color: "#000",
        // wordWrap: { width: 385, useAdvancedWrap: true },
        wrap: {
          mode: "word",
          width: 385,
        },
      },
    });
    const bubbleSpriteKey =
      lineText.getBounds().height < 38
        ? "bubble-line"
        : lineText.getBounds().height < 86
        ? "bubble-medium"
        : "bubble-large";
    const lineBubble = this.add.image(0, 0, bubbleSpriteKey).setOrigin(0, 0);
    lineText.setPosition(25, lineBubble.getBounds().centerY);
    container.add(lineBubble);
    container.add(lineText);
    container.setPosition(
      popupData.x - container.getBounds().width * popupData.origin?.x ?? 0,
      popupData.y - container.getBounds().height * popupData.origin?.y ?? 0
    );
    entity.popupState.gameObjects = {
      container: container,
      lineBubble: lineBubble,
      lineText: lineText,
    };
    entity.popupState.shown = true;
  }

  hidePopup(entity) {
    if (entity.popupState.gameObjects) {
      entity.popupState.gameObjects.container.destroy();
      entity.popupState.gameObjects = null;
    }
    entity.popupState.shown = false;
  }

  advanceDialogue(entity) {
    console.log("advanceDialogue start");
    entity.dialogueState.started = true;
    if (entity.dialogueState.gameObjects) {
      console.log("cleanup gameObjects");
      // cleanup previous text bubbles
      entity.dialogueState.gameObjects.container.destroy();
      entity.dialogueState.gameObjects = null;
    }
    let lines = entity.dialogueData.lines;
    let currentLine =
      entity.dialogueState.currentLine == null
        ? 0
        : entity.dialogueState.currentLine;
    if (lines && lines.length > currentLine) {
      const line = lines[currentLine];
      console.log(`showDialogueLine ${currentLine}`);
      this.showDialogueLine(entity, line);
      entity.dialogueState.isPlayer = line.player;
      entity.dialogueState.currentLine = currentLine + 1;
      entity.dialogueState.shown = true;
      this.applyCameraAdditionalZoom(DIALOG_ZOOM_AMOUNT);
    } else {
      console.log("No more lines of dialogue");
      entity.dialogueState.started = false;
      entity.dialogueState.finished = true;
      entity.dialogueState.shown = false;
      entity.dialogueState.currentLine = null;
      this.applyCameraAdditionalZoom(0);
    }
    console.log("advanceDialogue end");
  }

  hideDialogue(entity) {
    console.log("hideDialogue");
    if (entity.dialogueState.gameObjects) {
      console.log("cleanup gameObjects");
      // cleanup previous text bubbles
      entity.dialogueState.gameObjects.container.destroy();
      entity.dialogueState.gameObjects = null;
      this.applyCameraAdditionalZoom(0);
    }
    entity.dialogueState.shown = false;
  }

  showDialogueLine(entity, line) {
    const container = this.add.container(0, 0);
    const lineText = this.add.rexBBCodeText({
      x: 0,
      y: 0,
      text: line.text,
      origin: { x: 0, y: 0.5 },
      style: {
        fontFamily: "DigitalStrip",
        fontSize: 16,
        lineSpacing: 10,
        color: "#000",
        // wordWrap: { width: 385, useAdvancedWrap: true },
        wrap: {
          mode: "word",
          width: 385,
        },
      },
    });
    const bubbleSpriteKey =
      lineText.getBounds().height < 38
        ? "bubble-line"
        : lineText.getBounds().height < 86
        ? "bubble-medium"
        : "bubble-large";
    const lineBubble = this.add.image(0, 0, bubbleSpriteKey).setOrigin(0, 0);
    lineText.setPosition(25, lineBubble.getBounds().centerY);
    container.add(lineBubble);
    container.add(lineText);
    if (!line.player) {
      container.setPosition(
        entity.dialogueData.x -
          container.getBounds().width * entity.dialogueData.origin?.x ?? 0,
        entity.dialogueData.y -
          container.getBounds().height * entity.dialogueData.origin?.y ?? 0
      );
    }
    entity.dialogueState.gameObjects = {
      container: container,
      lineBubble: lineBubble,
      lineText: lineText,
    };
  }

  handleInput() {
    if (this.playerFlags.canMove) {
      if (
        this.cursors.left.isDown ||
        this.keyA.isDown ||
        this.touchState.left
      ) {
        if (!this.player.body.blocked.left) {
          this.player.setVelocityX(-500);
          this.checkFlip(this.player);
        }
      } else if (
        this.cursors.right.isDown ||
        this.keyD.isDown ||
        this.touchState.right
      ) {
        if (!this.player.body.blocked.right) {
          this.player.setVelocityX(500);
          this.checkFlip(this.player);
        }
      } else {
        this.player.setVelocityX(0);
      }
      if (
        (this.cursors.up.isDown || this.keyW.isDown || this.touchState.jump) &&
        this.player.body.blocked.down
      ) {
        this.player.setVelocityY(-1200);
      }
    }

    const nearbyEntity = this.nearbyEntityName
      ? this.entities[this.nearbyEntityName]
      : null;

    if (nearbyEntity) {
      if (nearbyEntity.quizData) {
        if (!nearbyEntity.quizState.started) {
          if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            this.player.setVelocityX(0);
            this.player.play("thinking");
            this.showQuiz(nearbyEntity);
          }
        } else {
          if (!nearbyEntity.quizState.answered) {
            [1, 2, 3, 4].forEach((number) => {
              if (Phaser.Input.Keyboard.JustDown(this[`key${number}`])) {
                this.answerQuiz(nearbyEntity, number);
              }
            });
          } else {
            if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
              this.advanceQuizDialogue(nearbyEntity);
            }
          }
        }
      } else if (nearbyEntity.dialogueData) {
        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
          this.player.setVelocityX(0);
          this.player.play("thinking");
          this.advanceDialogue(nearbyEntity);
        }
      }
    }

    if (
      Phaser.Input.Keyboard.JustDown(this.keyPlus) ||
      (this.keyPlus.isDown &&
        !Phaser.Input.Keyboard.DownDuration(this.keyPlus, 500))
    ) {
      this.cameras.main.zoom += 0.1;
      this.shouldResizeStaticObjects = true;
    } else if (
      Phaser.Input.Keyboard.JustDown(this.keyMinus) ||
      (this.keyMinus.isDown &&
        !Phaser.Input.Keyboard.DownDuration(this.keyMinus, 500))
    ) {
      this.cameras.main.zoom -= 0.1;
      this.shouldResizeStaticObjects = true;
    }

    if (Phaser.Input.Keyboard.JustDown(this.keyF)) {
      if (this.physics.world.drawDebug) {
        this.physics.world.drawDebug = false;
        this.physics.world.debugGraphic.clear();
      } else {
        this.physics.world.drawDebug = true;
      }
    }

    if (Phaser.Input.Keyboard.JustDown(this.keyP)) {
      if (this.pointerDebugText.visible) {
        this.pointerDebugText.setVisible(false);
        this.pointerDebugX.setVisible(false);
        this.pointerDebugY.setVisible(false);
      } else {
        this.pointerDebugText.setVisible(true);
        this.pointerDebugX.setVisible(true);
        this.pointerDebugY.setVisible(true);
      }
    }
  }

  update() {
    if (this.player.body.velocity.y < 0) {
      this.player.play("jump", true);
    } else if (this.player.body.velocity.y > 100) {
      this.player.play("fall", true);
    } else {
      if (Math.abs(this.player.body.velocity.x) > 0) {
        this.player.play("run", true);
      } else {
        if (
          ["jump", "fall", "run"].includes(this.player.anims.currentAnim.key)
        ) {
          this.player.play("still", true);
        }
      }
    }

    let nearbyEntityName = null;
    Object.entries(this.entities).forEach(([entityName, entity]) => {
      if (
        (entity.quizArea && !entity.quizArea.body.touching.none) ||
        (entity.popupArea && !entity.popupArea.body.touching.none) ||
        (entity.dialogueArea && !entity.dialogueArea.body.touching.none)
      ) {
        nearbyEntityName = entityName;
      }

      if (entity.popupArea) {
        if (!entity.popupArea.body.touching.none && !entity.popupState.shown) {
          this.showPopup(entity);
        } else if (
          entity.popupArea.body.touching.none &&
          entity.popupState.shown
        ) {
          this.hidePopup(entity);
        }
      }

      if (entity.quizArea && entity.quizState) {
        if (entity.quizState.shown && entity.quizArea.body.touching.none) {
          // out of range of active quiz area
          if (!entity.quizState.answered) {
            this.hideQuiz(entity);
          } else {
            this.hideQuizDialogue(entity);
          }
        } else if (
          entity.quizState.started &&
          !entity.quizState.finished &&
          !entity.quizState.shown &&
          !entity.quizArea.body.touching.none
        ) {
          // in range if active quiz
          if (!entity.quizState.answered) {
            this.showQuiz(entity);
          } else {
            if (entity.quizState.currentLine > 0) {
              entity.quizState.currentLine--;
            }
            this.advanceQuizDialogue(entity);
          }
        }
      }

      if (entity.dialogueArea && entity.dialogueState) {
        if (
          entity.dialogueState.shown &&
          entity.dialogueArea.body.touching.none
        ) {
          this.hideDialogue(entity);
        } else if (
          entity.dialogueState.started &&
          !entity.dialogueState.shown &&
          !entity.dialogueArea.body.touching.none
        ) {
          if (entity.dialogueState.currentLine > 0) {
            entity.dialogueState.currentLine--;
          }
          this.advanceDialogue(entity);
        }

        if (entity.dialogueState.shown && entity.dialogueState.isPlayer) {
          const container = entity.dialogueState.gameObjects.container;
          container.setPosition(
            this.player.getBounds().centerX -
              Math.round(container.getBounds().width / 2),
            this.player.getBounds().y - container.getBounds().height - 15
          );
        }
      }
    });

    let nearbyEntity = nearbyEntityName
      ? this.entities[nearbyEntityName]
      : null;

    if (this.nearbyEntityName !== nearbyEntityName) {
      this.nearbyEntityName = nearbyEntityName;
    }

    const showQuest =
      nearbyEntity &&
      ((nearbyEntity.quizState && !nearbyEntity.quizState.started) ||
        (nearbyEntity.dialogueState &&
          !nearbyEntity.dialogueState.started &&
          !nearbyEntity.dialogueState.finished));
    if (showQuest) {
      this.quest.setPosition(
        this.player.getBounds().centerX,
        this.player.getBounds().top - 20
      );
    }
    if (this.quest.visible !== showQuest) {
      this.quest.setVisible(showQuest);
    }

    this.bg.mountains.setTilePosition(this.cameras.main.scrollX * 0.5, 0);

    if (
      this.cameras.main.worldView.width > 0 &&
      this.shouldResizeStaticObjects
    ) {
      this.resizeStaticObjects();
      this.shouldResizeStaticObjects = false;
    }

    const pointerX = this.input.mousePointer.positionToCamera(
      this.cameras.main
    ).x;
    const pointerY = this.input.mousePointer.positionToCamera(
      this.cameras.main
    ).y;
    this.pointerDebugText.setText([
      `X: ${pointerX.toFixed(2)}`,
      `Y: ${pointerY.toFixed(2)}`,
    ]);
    this.pointerDebugText.setPosition(pointerX + 20, pointerY + 20);
    this.pointerDebugX.setTo(pointerX, 0, pointerX, WORLD_HEIGHT);
    this.pointerDebugY.setTo(0, pointerY, WORLD_WIDTH, pointerY);

    if (this.isMobile && !this.controls.layer.visible) {
      this.controls.layer.setVisible(true);
    } else if (!this.isMobile && this.controls.layer.visible) {
      this.controls.layer.setVisible(false);
    }

    this.handleInput();
  }

  resizeStaticObjects() {
    console.log("resizeStaticObjects");
    const camZoom = this.cameras.main.zoom;
    const camWidth = Math.ceil(this.cameras.main.worldView.width);
    const camHeight = Math.ceil(this.cameras.main.worldView.height);
    const unscaledWidth = Math.ceil(camWidth * camZoom);
    const unscaledHeight = Math.ceil(camHeight * camZoom);
    const topX = Math.round((unscaledWidth - camWidth) / 2);
    const topY = Math.round((unscaledHeight - camHeight) / 2);

    // console.log("camZoom:", camZoom);
    // console.log("camWidth:", camWidth);
    // console.log("camHeight:", camHeight);
    // console.log("unscaledWidth:", unscaledWidth);
    // console.log("unscaledHeight:", unscaledHeight);
    // console.log("topX:", topX);
    // console.log("topY:", topY);

    this.bg.mountains.setSize(camWidth, this.bg.mountains.height);
    this.bg.mountains.setPosition(topX, this.bg.mountains.y);

    this.correctAnswersText.setPosition(topX + 15, topY + 15);

    this.controls.layer.each((item) => {
      item.setScale(0.5 / camZoom);
    });
    this.controls.left.setPosition(
      topX + this.safeAreaLeft * camZoom + 32,
      topY + camHeight - 32
    );
    this.controls.right.setPosition(
      topX +
        this.safeAreaLeft * camZoom +
        32 +
        this.controls.left.displayWidth +
        32,
      topY + camHeight - 32
    );
    this.controls.jump.setPosition(
      topX + camWidth - this.safeAreaRight * camZoom - 32,
      topY + camHeight - 32
    );
    this.controls.speak.setPosition(
      topX + camWidth - this.safeAreaRight * camZoom - 32,
      topY + camHeight - 32 - this.controls.jump.displayHeight - 32
    );
  }

  checkFlip(sprite) {
    if (sprite.body.velocity.x < 0) {
      sprite.setFlipX(false);
    } else {
      sprite.setFlipX(true);
    }
  }

  createControls() {
    const controlsLayer = this.add.layer();
    const left = this.add.image(0, 0, "control-left").setOrigin(0, 1);
    const right = this.add.image(0, 0, "control-right").setOrigin(0, 1);
    const jump = this.add.image(0, 0, "control-jump").setOrigin(1, 1);
    const speak = this.add.image(0, 0, "control-speak").setOrigin(1, 1);
    controlsLayer.add([left, right, jump, speak]);
    controlsLayer.each((item) => {
      item.setScrollFactor(0, 0);
      item.setInteractive();
    });
    controlsLayer.setDepth(layers.CONTROLS);
    const buttons = { left, right, jump, speak };
    Object.entries(buttons).forEach(([keyName, key]) => {
      key.on("pointerdown", () => {
        key.setAlpha(0.5);
        this.touchState[keyName] = true;
      });
      key.on("pointerup", () => {
        key.setAlpha(1);
        this.touchState[keyName] = false;
      });
    });
    this.controls = { layer: controlsLayer, left, right, jump, speak };
  }
}
