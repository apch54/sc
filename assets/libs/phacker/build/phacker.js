(function() {
  this.Phacker = {};

}).call(this);

(function() {
  this.ge = {};

  Phacker.Game = (function() {
    function Game() {
      this.gameState = Phacker.GameState;
      this.countGCSRelaunch = 0;
      if (gameOptions.gcs) {
        this.GCSElig = true;
      } else {
        this.GCSElig = false;
      }
      if (!gameOptions.fullscreen) {
        this.game = new Phaser.Game(768, 500, Phaser.CANVAS, 'game-container', null, true);
        if (detectmob()) {
          setInterval(function() {
            return jQuery('.rowTextHaut').height(jQuery(window).height() - jQuery('#game-container').height() - jQuery('.iphone-slider').height() - 100);
          }, 100);
          jQuery('.rowTextHaut').height(jQuery(window).height() - jQuery('#game-container').height() - jQuery('.iphone-slider').height() - 100);
        }
      } else {
        this.game = new Phaser.Game(375, 559, Phaser.CANVAS, 'game-container', null, true);
      }
      this.game.state.add('loader', Phacker.LoaderState);
      this.game.state.add('intro', Phacker.StartState);
      this.game.state.add('jeu', this.gameState);
      this.game.state.add('gameOver', Phacker.GameOverState);
      this.game.state.add('win', Phacker.WinState);
      this.game.state.add('nextLevel', Phacker.NextLevelState);
    }

    Game.prototype.setGameState = function(state) {
      this.gameState = state;
      return this.game.state.add('jeu', this.gameState);
    };

    Game.prototype.setSpecificAssets = function(cb) {
      Phacker.LoaderState.prototype.specificAssets = cb;
      return this.game.state.add('loader', Phacker.LoaderState);
    };

    Game.prototype.setTextColorGameOverState = function(color) {
      return Phacker.GameOverState.prototype.textColor = color;
    };

    Game.prototype.setTextColorWinState = function(color) {
      return Phacker.WinState.prototype.textColor = color;
    };

    Game.prototype.setTextColorStatus = function(color) {
      return Phacker.GameState.prototype.statusBarTextColor = color;
    };

    Game.prototype.setOneTwoThreeColor = function(color) {
      Phacker.LoaderState.prototype.OneTwoThreeColor = color;
      return Phacker.StartState.prototype.OneTwoThreeColor = color;
    };

    Game.prototype.setLoaderColor = function(color) {
      return Phacker.LoaderState.prototype.loaderColor = color;
    };

    Game.prototype.setTimerColor = function(color) {
      return Phacker.GameState.prototype.timerColor = color;
    };

    Game.prototype.setTimerBgColor = function(color) {
      return Phacker.GameState.prototype.timerBgColor = color;
    };

    Game.prototype.GCSNotElig = function() {
      return this.GCSElig = false;
    };

    Game.prototype.GCSRelaunch = function() {
      if (this.GCSElig) {
        if (this.countGCSRelaunch === 0) {
          gameOptions.duration = gameOptions.duration_refill;
          gameOptions.life = gameOptions.life_refill;
          this.game.state.start('jeu');
          return this.countGCSRelaunch++;
        }
      }
    };

    Game.prototype.run = function() {
      return this.game.state.start('loader');
    };

    return Game;

  })();

}).call(this);

(function() {
  Phacker.BaseState = (function() {
    function BaseState() {}

    BaseState.prototype.create = function() {
      var fullscreen;
      if (gameOptions.fullscreen === false && detectmob()) {
        fullscreen = this.game.add.button(0, 0, 'view_full', function() {
          return onClickBackgroundHack();
        }, this, 0, 0, 0);
        fullscreen.x = this.game.width - fullscreen.width - 50;
        fullscreen.y = 50;
        return fullscreen.fixedToCamera = true;
      }
    };

    return BaseState;

  })();

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Phacker.GameOverState = (function(superClass) {
    extend(GameOverState, superClass);

    function GameOverState() {
      return GameOverState.__super__.constructor.apply(this, arguments);
    }

    GameOverState.prototype.textColor = '#ffffff';

    GameOverState.prototype.create = function() {
      var area, background, character, closeButton, duration, finalScoreTitle, gameOverStateSound, logo, replayButton;
      gameOverStateSound = this.game.add.audio('gameOverStateSound');
      gameOverStateSound.play();
      this.game.input.touch.preventDefault = false;
      duration = Math.round((ge.generalTimer._now - ge.generalTimer._started) / 1000);
      callback(gameOptions.loseCallback, ge.score, ge.nb_replay, ge.heart.length, duration, gameOptions.pointToLevel1, false);
      ge.level = 0;
      background = this.game.add.image(0, 0, "gameover_bg");
      area = this.game.add.image(0, 0, "gameover_area");
      logo = this.game.add.image(0, 0, "gameover_logo");
      character = this.game.add.image(0, 0, "gameover_character");
      replayButton = this.game.add.button(0, 0, 'retry_button', (function() {
        ge.score = 0;
        if (gameOptions.pub_ads_game) {
          console.log("AFG");
          afg();
          ge.nb_replay++;
        }
        return this.game.state.start('jeu');
      }), 0, 1, 2);
      closeButton = this.game.add.button(0, 0, 'close_btn', (function() {
        return window.location = gameOptions.closeRedirectLose;
      }), 0, 1, 0);
      area.x = this.game.width * 0.5 - area.width * 0.5;
      area.y = this.game.height * 0.5 - area.height * 0.5;
      replayButton.x = this.game.width * 0.5 - replayButton.width * 0.5;
      replayButton.y = this.game.height - replayButton.height - 22;
      logo.x = this.game.width * 0.5 - logo.width * 0.5;
      logo.y = area.y * 0.5 - logo.height * 0.5;
      character.x = this.game.width * 0.5 - character.width * 0.5;
      character.y = area.y + area.height - character.height;
      closeButton.x = area.x + area.width - (closeButton.width * 0.5);
      closeButton.y = area.y - closeButton.height * 0.5;
      finalScoreTitle = this.game.add.text(0, 0, "Score :\n" + ge.score, {
        font: 'normal 36pt Helvetica',
        fill: this.textColor,
        align: 'center'
      });
      finalScoreTitle.x = this.game.width * 0.5 - finalScoreTitle.width * 0.5;
      finalScoreTitle.y = area.y + (character.y - area.y) * 0.5 - finalScoreTitle.height * 0.5;
      return GameOverState.__super__.create.call(this);
    };

    return GameOverState;

  })(Phacker.BaseState);

}).call(this);

(function() {
  var pointToLevel,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  pointToLevel = function(x) {
    if (x === 1) {
      return gameOptions.pointToLevel1;
    }
    return pointToLevel(x - 1) + (pointToLevel(x - 1) * gameOptions.percentToNextLevel);
  };

  Phacker.GameState = (function(superClass) {
    extend(GameState, superClass);

    function GameState() {
      return GameState.__super__.constructor.apply(this, arguments);
    }

    GameState.prototype.statusBarTextColor = 'white';

    GameState.prototype.timerColor = 0x666666;

    GameState.prototype.timerBgColor = 0xffffff;

    GameState.prototype.create = function() {
      GameState.__super__.create.call(this);
      this.game.input.touch.preventDefault = true;
      if (gameOptions.pub_ads_game) {
        this.game.paused = true;
      }
      ge.generalTimer = this.game.time.create();
      ge.generalTimer.add(gameOptions.duration * 1000, (function() {
        if (ge.level >= gameOptions.winningLevel && gameOptions.timingTemps === true && ge.generalTimer.duration === 0 && ge.nowinagain === true) {
          ge.nowinagain = false;
          return this.game.state.start('win');
        } else {
          return this.game.state.start('gameOver');
        }
      }).bind(this));
      ge.generalTimer.start();
      this.statusBar = this.game.add.image(0, 0, 'status_bar');
      this.statusBar.fixedToCamera = true;
      this.timerBase = this.game.add.graphics(0, 0);
      this.timerBase.beginFill(this.timerBgColor, 1);
      this.timerBase.drawRect(0, 0, this.statusBar.width * 0.25, 10);
      this.timerBase.graphicsData[0].shape.x = this.statusBar.width * 0.5 - this.timerBase.graphicsData[0].shape.width * 0.5;
      this.timerBase.graphicsData[0].shape.y = this.statusBar.height * 0.5 - this.timerBase.graphicsData[0].shape.height * 0.5;
      this.timerBase.fixedToCamera = true;
      this.remainingTime = this.game.add.graphics(0, 0);
      this.remainingTime.beginFill(this.timerColor, 1);
      this.remainingTime = this.remainingTime.drawRect(0, 0, 0, this.timerBase.graphicsData[0].shape.height);
      this.remainingTime.graphicsData[0].shape.x = this.timerBase.graphicsData[0].shape.x;
      this.remainingTime.graphicsData[0].shape.y = this.timerBase.graphicsData[0].shape.y;
      this.remainingTime.fixedToCamera = true;
      this.chronos = this.game.add.image(0, 0, 'chronos');
      this.chronos.x = this.timerBase.graphicsData[0].shape.x - this.chronos.width - 5;
      this.chronos.y = this.statusBar.height * 0.5 - this.chronos.height * 0.5;
      this.chronos.fixedToCamera = true;
      this.scoreIcon = this.game.add.image(0, 0, 'scoreicon');
      this.scoreIcon.x = this.statusBar.x + 20;
      this.scoreIcon.y = this.statusBar.height * 0.5 - this.scoreIcon.height * 0.5;
      this.scoreIcon.fixedToCamera = true;
      this.scoreText = this.game.add.text(0, 0, ge.score, {
        font: 'bold 18pt Lobster',
        fill: this.statusBarTextColor
      });
      this.scoreText.x = this.scoreIcon.x + this.scoreIcon.width + 10;
      this.scoreText.y = this.statusBar.height * 0.5 - this.scoreText.height * 0.5;
      this.scoreText.fixedToCamera = true;
      this.levelText = this.game.add.text(0, 0, ge.level, {
        font: 'bold 18pt Lobster',
        fill: this.statusBarTextColor
      });
      this.levelText.x = this.statusBar.x + this.statusBar.width - this.levelText.width - 20;
      this.levelText.y = this.statusBar.height * 0.5 - this.levelText.height * 0.5;
      this.levelText.fixedToCamera = true;
      this.levelIcon = this.game.add.image(0, 0, 'statusbarpump');
      this.levelIcon.x = this.levelText.x - this.levelIcon.width - 10;
      this.levelIcon.y = this.statusBar.height * 0.5 - this.levelIcon.height * 0.5;
      this.levelIcon.fixedToCamera = true;
      if (gameOptions.fullscreen) {
        this.timerBase.graphicsData[0].shape.y = 10;
        this.remainingTime.graphicsData[0].shape.y = 10;
      }
      this.deadlifeInit();
      return this.lifeInit();
    };

    GameState.prototype.update = function() {
      this.remainingTime.graphicsData[0].shape.width = ge.generalTimer.duration * this.statusBar.width / 4 / (gameOptions.duration * 1000);
      if (ge.level >= gameOptions.winningLevel && gameOptions.timingTemps === false && ge.nowinagain === true) {
        ge.nowinagain = false;
        this.game.state.start('win');
      }
      if (ge.level === 0) {
        if (ge.score >= gameOptions.pointToLevel1) {
          ge.level++;
          return this.levelText.setText(ge.level);
        }
      } else {
        if (ge.score >= pointToLevel(ge.level + 1)) {
          ge.level++;
          return this.levelText.setText(ge.level);
        }
      }
    };

    GameState.prototype.win = function() {
      var winSound;
      winSound = this.game.add.audio('winSound');
      winSound.play();
      ge.score += gameOptions.pointEarned;
      this.scoreText.setText(ge.score);
      this.scoreText.x = this.scoreIcon.x + this.scoreIcon.width + 10;
      return this.scoreText.y = this.statusBar.height * 0.5 - this.scoreText.height * 0.5;
    };

    GameState.prototype.winBonus = function() {
      var bonusSound;
      bonusSound = this.game.add.audio('bonusSound');
      bonusSound.play();
      ge.score += gameOptions.pointBonus;
      this.scoreText.setText(ge.score);
      this.scoreText.x = this.scoreIcon.x + this.scoreIcon.width + 10;
      return this.scoreText.y = this.statusBar.height * 0.5 - this.scoreText.height * 0.5;
    };

    GameState.prototype.lost = function() {
      var lostSound;
      lostSound = this.game.add.audio('lostSound');
      lostSound.play();
      ge.score = Math.max(0, ge.score - gameOptions.pointLost);
      this.scoreText.setText(ge.score);
      this.scoreText.x = this.scoreIcon.x + this.scoreIcon.width + 10;
      return this.scoreText.y = this.statusBar.height * 0.5 - this.scoreText.height * 0.5;
    };

    GameState.prototype.lostLife = function() {
      var lastElement;
      lastElement = ge.heart[ge.heart.length - 1];
      lastElement.destroy();
      ge.heart.pop();
      this.lost();
      if (ge.heart.length === 0) {
        this.game.time.events.add(Phaser.Timer.SECOND * 2, this.endGame, this);
      } else {
        this.game.time.events.add(Phaser.Timer.SECOND * 2, this.resetPlayer, this);
      }
    };

    GameState.prototype.endGame = function() {
      return this.game.state.start('gameOver');
    };

    GameState.prototype.lifeInit = function() {
      var heartImg;
      var heartImg, i, lastElement;
      ge.heart = [];
      i = 0;
      while (i < gameOptions.life) {
        if (gameOptions.fullscreen === false) {
          if (ge.heart.length === 0) {
            heartImg = this.game.add.image(0, this.statusBar.y + 15, 'heart');
            heartImg.x = this.timerBase.graphicsData[0].shape.x + this.timerBase.graphicsData[0].shape.width + 20;
            heartImg.y = this.statusBar.height * 0.5 - heartImg.height * 0.5;
          } else {
            lastElement = ge.heart[ge.heart.length - 1];
            heartImg = this.game.add.image(0, 0, 'heart');
            heartImg.x = lastElement.x + lastElement.width + 5;
            heartImg.y = lastElement.y;
            lastElement.fixedToCamera = true;
          }
          heartImg.fixedToCamera = true;
          ge.heart.push(heartImg);
          i++;
        } else {
          if (ge.heart.length === 0) {
            heartImg = this.game.add.image(0, 28, 'heart');
            heartImg.scale.setTo(0.7, 0.7);
            heartImg.x = 140;
          } else {
            lastElement = ge.heart[ge.heart.length - 1];
            heartImg = this.game.add.image(lastElement.x + lastElement.width + 2, 28, 'heart');
            lastElement.fixedToCamera = true;
          }
          heartImg.fixedToCamera = true;
          heartImg.scale.setTo(0.7, 0.7);
          ge.heart.push(heartImg);
          i++;
        }
      }
    };

    GameState.prototype.deadlifeInit = function() {
      var heartImg1;
      var heartImg1, i, lastElement;
      ge.deadheart = [];
      i = 0;
      if (gameOptions.fullscreen === false) {
        while (i < gameOptions.life) {
          if (ge.deadheart.length === 0) {
            heartImg1 = this.game.add.image(0, 0, 'dead');
            heartImg1.x = this.timerBase.graphicsData[0].shape.x + this.timerBase.graphicsData[0].shape.width + 20;
            heartImg1.y = this.statusBar.height * 0.5 - heartImg1.height * 0.5;
          } else {
            lastElement = ge.deadheart[ge.deadheart.length - 1];
            heartImg1 = this.game.add.image(0, 0, 'dead');
            heartImg1.x = lastElement.x + lastElement.width + 5;
            heartImg1.y = lastElement.y;
            lastElement.fixedToCamera = true;
          }
          heartImg1.fixedToCamera = true;
          ge.deadheart.push(heartImg1);
          i++;
        }
      } else {
        while (i < gameOptions.life) {
          if (ge.deadheart.length === 0) {
            heartImg1 = this.game.add.image(0, 28, 'dead');
            heartImg1.scale.setTo(0.7, 0.7);
            heartImg1.x = 140;
          } else {
            lastElement = ge.deadheart[ge.deadheart.length - 1];
            heartImg1 = this.game.add.image(lastElement.x + lastElement.width + 2, 28, 'dead');
            heartImg1.scale.setTo(0.7, 0.7);
            lastElement.fixedToCamera = true;
          }
          heartImg1.fixedToCamera = true;
          ge.deadheart.push(heartImg1);
          i++;
        }
      }
    };

    return GameState;

  })(Phacker.BaseState);

}).call(this);

(function() {
  Phacker.LoaderState = (function() {
    function LoaderState() {}

    LoaderState.prototype.loaderColor = 0x666666;

    LoaderState.prototype.OneTwoThreeColor = 'white';

    LoaderState.prototype.nextState = 'intro';

    LoaderState.prototype.specificAssets = function() {};

    LoaderState.prototype.preload = function() {
      var loaderFiles, loaderFilesProgress, signalFile, type;
      this.game.load.enableParallel = false;
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.input.touch.preventDefault = false;
      if (gameOptions.fullscreen === true) {
        type = "mobile";
      } else {
        type = "desktop";
      }
      this.game.load.spritesheet('loadinghack', root_design + type + '/' + type + '_states/' + type + '_loading/' + type + '_loading_sprite.jpg', this.game.width, this.game.height);
      this.game.load.image('intro_bg', root_design + type + '/' + type + '_states/' + type + '_intro/intro_bg.jpg');
      this.game.load.image('intro_logo', root_design + type + '/' + type + '_states/' + type + '_intro/intro_logo.png');
      this.game.load.image('intro_area', root_design + type + '/' + type + '_states/' + type + '_intro/intro_area.png');
      this.game.load.image('intro_vig', root_design + type + '/' + type + '_states/' + type + '_intro/intro_vig.jpg');
      this.game.load.spritesheet('startButton', root_design + type + '/' + type + '_states/' + type + '_intro/start_btn.png', 200, 58);
      this.game.load.image('gameover_bg', root_design + type + '/' + type + '_states/' + type + '_gameover/gameover_bg.jpg');
      this.game.load.image('gameover_area', root_design + type + '/' + type + '_states/' + type + '_gameover/gameover_area.png');
      this.game.load.image('gameover_logo', root_design + type + '/' + type + '_states/' + type + '_gameover/gameover_txt.png');
      this.game.load.image('gameover_character', root_design + type + '/' + type + '_states/' + type + '_gameover/gameover_character.png');
      this.game.load.spritesheet('retry_button', root_design + type + '/' + type + '_states/' + type + '_gameover/retry_btn.png', 200, 58);
      this.game.load.image('close_btn', root_design + type + '/' + type + '_states/close_btn.png');
      this.game.load.image('view_full', root_design + type + '/' + type + '_states/view_full.png');
      this.game.load.image('win_bg', root_design + type + '/' + type + '_states/' + type + '_win/win_bg.jpg');
      this.game.load.image('win_area', root_design + type + '/' + type + '_states/' + type + '_win/win_area.png');
      this.game.load.image('win_logo', root_design + type + '/' + type + '_states/' + type + '_win/win_txt.png');
      this.game.load.image('win_character', root_design + type + '/' + type + '_states/' + type + '_win/win_reward_txt.png');
      this.game.load.spritesheet('continue_button', root_design + type + '/' + type + '_states/' + type + '_win/continue_btn.png', 200, 58);
      this.game.load.image('status_bar', root_design + type + '/' + type + '_gameplay/statusbar_bg.png');
      this.game.load.image('scoreicon', root_design + type + '/' + type + '_gameplay/score_icon.png');
      this.game.load.image('chronos', root_design + type + '/' + type + '_gameplay/timer.png');
      this.game.load.image('statusbarpump', root_design + type + '/' + type + '_gameplay/level_icon.png');
      this.game.load.image('heart', root_design + type + '/' + type + '_gameplay/remaining_life.png');
      this.game.load.image('dead', root_design + type + '/' + type + '_gameplay/used_life.png');
      this.specificAssets();
      loaderFiles = this.game.add.graphics();
      loaderFiles.beginFill(0x00c6ff, 0);
      loaderFiles.drawRect(this.game.width / 2 - (this.game.width * 0.75) / 2, this.game.height * 0.5, this.game.width * 0.75, 30);
      loaderFilesProgress = this.game.add.graphics();
      loaderFilesProgress.beginFill(0x00c6ff, 1);
      loaderFilesProgress.drawRect(this.game.width / 2 - (this.game.width * 0.75) / 2, this.game.height * 0.5, 0, 30);
      return signalFile = this.game.load.onFileComplete.add((function(eta, key) {
        var background, fullscreen, style, txt1, txt2, txt3;
        if (key === "loadinghack") {
          background = this.game.add.sprite(0, 0, 'loadinghack');
          background.animations.add('play', [0, 1, 2, 3], 5, true);
          background.play('play');
          style = {
            font: 'Arial',
            fill: this.OneTwoThreeColor,
            align: 'center',
            fontSize: "16px"
          };
          txt1 = this.game.add.text(0, 0, tutoTexts.first, style);
          txt1.x = this.game.width * 0.5 - txt1.width * 0.5;
          txt1.y = 315;
          txt2 = this.game.add.text(0, 0, tutoTexts.second, style);
          txt2.x = this.game.width * 0.5 - txt2.width * 0.5;
          txt2.y = 340;
          txt3 = this.game.add.text(0, 0, tutoTexts.third, style);
          txt3.x = this.game.width * 0.5 - txt3.width * 0.5;
          txt3.y = 365;
        }
        if (key === "view_full") {
          if (gameOptions.fullscreen === false && detectmob()) {
            fullscreen = this.game.add.button(0, 0, 'view_full', function() {
              return onClickBackgroundHack();
            }, this, 0, 0, 0);
            fullscreen.x = this.game.width - fullscreen.width - 50;
            fullscreen.y = 50;
          }
        }
        if (eta === 100) {
          loaderFiles.destroy();
          loaderFilesProgress.destroy();
          signalFile.detach();
          return this.game.state.start(this.nextState);
        } else {
          loaderFilesProgress.destroy();
          loaderFilesProgress = this.game.add.graphics();
          loaderFilesProgress.beginFill(this.loaderColor, 1);
          if (gameOptions.fullscreen === false) {
            return loaderFilesProgress.drawRect(100, 400, loaderFiles.graphicsData[0].shape.width * eta / 100, 30);
          } else {
            return loaderFilesProgress.drawRect(50, 450, loaderFiles.graphicsData[0].shape.width * eta / 100, 20);
          }
        }
      }).bind(this));
    };

    return LoaderState;

  })();

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Phacker.StartState = (function(superClass) {
    extend(StartState, superClass);

    function StartState() {
      return StartState.__super__.constructor.apply(this, arguments);
    }

    StartState.prototype.OneTwoThreeColor = 'white';

    StartState.prototype.create = function() {
      var area, background, logo, startButton, style, txt1, txt2, txt3, vignette;
      ge.nb_replay = 0;
      ge.score = 0;
      ge.level = 0;
      ge.nowinagain = true;
      this.game.input.touch.preventDefault = false;
      background = this.game.add.image(0, 0, 'intro_bg');
      logo = this.game.add.image(0, 0, 'intro_logo');
      area = this.game.add.image(0, 0, 'intro_area');
      vignette = this.game.add.sprite(0, 0, 'intro_vig');
      area.x = this.game.width * 0.5 - area.width * 0.5;
      area.y = this.game.height * 0.5 - area.height * 0.5;
      logo.x = this.game.width * 0.5 - logo.width * 0.5;
      logo.y = area.y * 0.5 - logo.height * 0.5;
      vignette.x = this.game.width * 0.5 - vignette.width * 0.5;
      vignette.y = area.y + 22;
      startButton = this.game.add.button(0, 0, 'startButton', function() {
        if (detectmob()) {
          onClickBackgroundHack();
        }
        if (gameOptions.pub_ads_game) {
          console.log("AFG");
          afg();
        }
        return this.game.state.start('jeu');
      }, this, 1, 0, 1);
      startButton.x = this.game.width * 0.5 - startButton.width * 0.5;
      startButton.y = this.game.height - startButton.height - 22;
      startButton.onInputOver.add((function() {
        return this.game.canvas.style.cursor = "pointer";
      }).bind(this));
      startButton.onInputOut.add((function() {
        return this.game.canvas.style.cursor = "default";
      }).bind(this));
      style = {
        font: 'Arial',
        fill: this.OneTwoThreeColor,
        align: 'center',
        fontSize: "16px"
      };
      txt1 = this.game.add.text(0, 0, tutoTexts.first, style);
      txt1.x = this.game.width * 0.5 - txt1.width * 0.5;
      txt1.y = vignette.y + vignette.height + 10;
      txt2 = this.game.add.text(0, 0, tutoTexts.second, style);
      txt2.x = this.game.width * 0.5 - txt2.width * 0.5;
      txt2.y = txt1.y + txt1.height + 5;
      txt3 = this.game.add.text(0, 0, tutoTexts.third, style);
      txt3.x = this.game.width * 0.5 - txt3.width * 0.5;
      txt3.y = txt2.y + txt2.height + 5;
      return StartState.__super__.create.call(this);
    };

    return StartState;

  })(Phacker.BaseState);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Phacker.WinState = (function(superClass) {
    extend(WinState, superClass);

    function WinState() {
      return WinState.__super__.constructor.apply(this, arguments);
    }

    WinState.prototype.textColor = '#ffffff';

    WinState.prototype.isSubid = function() {
      var isSubid, s;
      isSubid = false;
      if (location.search !== "") {
        s = location.search.replace('?', '');
        s = s.split('&');
        s.forEach(function(param) {
          if (param.split('=')[0] === 'subid') {
            return isSubid = true;
          }
        });
      }
      return isSubid;
    };

    WinState.prototype.create = function() {
      var area, background, character, closeButton, duration, finalScoreTitle, logo, replayButton, winStateSound;
      winStateSound = this.game.add.audio('winStateSound');
      winStateSound.play();
      duration = Math.round((ge.generalTimer._now - ge.generalTimer._started) / 1000);
      this.game.input.touch.preventDefault = false;
      if (this.isSubid()) {
        if (!ge.heart) {
          ge.heart = [];
        }
        callback(gameOptions.winCallback, ge.score, ge.nb_replay, ge.heart.length, duration, gameOptions.pointToLevel1, true);
      }
      ge.resultTitle = this.game.add.text(0, 0, 'Score : ', {
        font: 'normal 17pt Helvetica',
        fill: '#585858'
      });
      ge.resultTitle.x = 200;
      ge.resultTitle.y = 200;
      background = this.game.add.image(0, 0, "win_bg");
      area = this.game.add.image(0, 0, "win_area");
      logo = this.game.add.image(0, 0, "win_logo");
      character = this.game.add.image(0, 0, "win_character");
      replayButton = this.game.add.button(0, 0, 'continue_button', (function() {
        if (gameOptions.pub_ads_game) {
          console.log("AFG");
          afg();
        }
        ge.nb_replay++;
        return this.game.state.start('jeu');
      }), 0, 1, 0);
      closeButton = this.game.add.button(0, 0, 'close_btn', (function() {
        return window.location = gameOptions.closeRedirectWin;
      }), 0, 1, 0);
      area.x = this.game.width * 0.5 - area.width * 0.5;
      area.y = this.game.height * 0.5 - area.height * 0.5;
      replayButton.x = this.game.width * 0.5 - replayButton.width * 0.5;
      replayButton.y = this.game.height - replayButton.height - 22;
      logo.x = this.game.width * 0.5 - logo.width * 0.5;
      logo.y = area.y * 0.5 - logo.height * 0.5;
      character.x = this.game.width * 0.5 - character.width * 0.5;
      character.y = area.y + area.height - character.height - 50;
      closeButton.x = area.x + area.width - (closeButton.width * 0.5);
      closeButton.y = area.y - closeButton.height * 0.5;
      finalScoreTitle = this.game.add.text(0, 0, "Score :\n" + ge.score, {
        font: 'normal 36pt Helvetica',
        fill: this.textColor,
        align: 'center'
      });
      finalScoreTitle.x = this.game.width * 0.5 - finalScoreTitle.width * 0.5;
      finalScoreTitle.y = area.y + (character.y - area.y) * 0.5 - finalScoreTitle.height * 0.5;
      return WinState.__super__.create.call(this);
    };

    return WinState;

  })(Phacker.BaseState);

}).call(this);
