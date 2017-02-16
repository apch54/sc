(function() {
  this.Phacker = {};

  Phacker.StartState = (function() {
    function StartState() {}

    StartState.prototype.create = function() {
      this.game.elements.fullscreen = this.game.add.button(0, 0, 'fullscreen', function() {
        var topGame;
        topGame = $("#game-container").offset().top;
        return $(window).scrollTop(topGame);
      }, this, 0, 0, 0);
      this.game.elements.fullscreen.scale.x = 0.4;
      this.game.elements.fullscreen.scale.y = 0.4;
      this.game.elements.fullscreen.x = this.game.width - this.game.elements.fullscreen.width;
      return this.game.elements.fullscreen.y = 0;
    };

    return StartState;

  })();

  Phacker.WinState = (function() {
    function WinState() {}

    WinState.prototype.create = function() {
      callback(game.options.winCallback, game.elements.score, true);
      if (this.game.options.gold !== '' && this.game.options.facebook) {
        this.game.elements.goldButton = this.game.add.button(10, 10, 'goldButton', function() {
          return window.location = this.game.options.gold;
        }, this, 0, 1, 0);
        this.game.elements.goldButton.x = game.width * 0.5 + 15;
        this.game.elements.goldButton.y = 10;
        this.game.elements.facebookButton = this.game.add.button(10, 10, 'facebookButton', function() {
          return this.game.state.start('jeu');
        }, this, 0, 1, 0);
        this.game.elements.facebookButton.x = this.game.width * 0.5 - this.game.elements.facebookButton.width - 15;
        this.game.elements.facebookButton.y = 50;
      } else if (game.options.gold !== '') {
        this.game.elements.goldButton = game.add.button(10, 10, 'goldButton', function() {
          return window.location = this.game.options.gold;
        }, this, 0, 1, 0);
        this.game.elements.goldButton.x = game.width * 0.5 - game.elements.goldButton.width / 2;
        this.game.elements.goldButton.y = 250;
      } else if (game.options.facebook) {
        this.game.elements.facebookButton = game.add.button(10, 10, 'facebookButton', function() {
          return FB.ui({
            method: 'share',
            href: game.options.fbShareURL
          });
        }, this, 0, 1, 0);
        this.game.elements.facebookButton.x = game.width * 0.5 - game.elements.facebookButton.width / 2;
        this.game.elements.facebookButton.y = 50;
      }
      this.game.elements.replayButton = game.add.button(10, 10, 'retry', function() {
        return this.game.state.start('jeu');
      }, this, 0, 1, 0);
      this.game.elements.replayButton.x = game.width * 0.5 - game.elements.replayButton.width / 2;
      return this.game.elements.replayButton.y = game.height * 0.80 + 20;
    };

    return WinState;

  })();

  Phacker.LoaderState = (function() {
    function LoaderState() {}

    LoaderState.prototype.loaderColor = 0xea4335;

    LoaderState.prototype.nextState = 'intro';

    LoaderState.prototype.preload = function() {
      this.game.load.enableParallel = false;
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.compatibility.scrollTo = false;
      this.game.elements.loaderFiles = this.game.add.graphics();
      this.game.elements.loaderFiles.beginFill(0x646464, 0);
      this.game.elements.loaderFiles.drawRect(this.game.width / 2 - (this.game.width * 0.75) / 2, this.game.height * 0.5, this.game.width * 0.75, 30);
      this.game.elements.loaderFilesProgress = this.game.add.graphics();
      this.game.elements.loaderFilesProgress.beginFill(0x646464, 1);
      this.game.elements.loaderFilesProgress.drawRect(this.game.width / 2 - (game.width * 0.75) / 2, game.height * 0.5, 0, 30);
      this.game.elements.signalFile = this.game.load.onFileComplete.add((function(eta, key) {
        var style1, style2, style3, t1, t2, t3, text1, text2, text3;
        if (key === "loadinghack") {
          this.game.elements.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'loadinghack');
        }
        if (key === "tuto") {
          this.game.elements.tuto = this.game.add.sprite(0, 0, 'tuto');
          this.game.elements.tuto.scale.x = 0.3;
          this.game.elements.tuto.scale.y = 0.3;
          this.game.elements.tuto.x = this.game.width * 0.5 - this.game.elements.tuto.width * 0.5;
          this.game.elements.tuto.y = this.game.height * 0.26 + 30;
          this.game.elements.tuto.animations.add('play', [0, 1, 2], 1, true);
          this.game.elements.tuto.play('play');
          text1 = game.options.line1;
          style1 = {
            font: game.options.Textstyleline1,
            fill: game.options.colorline1,
            align: "center"
          };
          t1 = game.add.text(game.options.line1Posx, game.options.line1Posy, text1, style1);
          text2 = game.options.line2;
          style2 = {
            font: game.options.Textstyleline2,
            fill: game.options.colorline2,
            align: "center"
          };
          t2 = game.add.text(game.options.line2Posx, game.options.line2Posy, text2, style2);
          text3 = game.options.line3;
          style3 = {
            font: game.options.Textstyleline3,
            fill: game.options.colorline3,
            align: "center"
          };
          t3 = game.add.text(game.options.line3Posx, game.options.line3Posy, text3, style3);
        }
        if (key === "fullscreen") {
          this.game.elements.fullscreen = this.game.add.button(0, 0, 'fullscreen', function() {
            var topGame;
            topGame = $("#game-container").offset().top;
            return $(window).scrollTop(topGame);
          }, this, 0, 0, 0);
          this.game.elements.fullscreen.scale.x = 0.4;
          this.game.elements.fullscreen.scale.y = 0.4;
          this.game.elements.fullscreen.x = this.game.width - this.game.elements.fullscreen.width;
          this.game.elements.fullscreen.y = 0;
        }
        if (eta === 100) {
          this.game.elements.loaderFiles.destroy();
          this.game.elements.loaderFilesProgress.destroy();
          this.game.elements.signalFile.detach();
          return this.game.state.start(this.nextState);
        } else {
          this.game.elements.loaderFilesProgress.destroy();
          this.game.elements.loaderFilesProgress = this.game.add.graphics();
          this.game.elements.loaderFilesProgress.beginFill(this.loaderColor, 1);
          return this.game.elements.loaderFilesProgress.drawRect(100, 400, this.game.elements.loaderFiles.graphicsData[0].shape.width * eta / 100, 30);
        }
      }).bind(this));
      this.game.load.image('loadinghack', root_game + 'images/loadinghack.png');
      this.game.load.spritesheet('tuto', root_game + 'images/Tuto.png', 768, 500, 3);
      return this.game.load.image('fullscreen', root_game + 'images/fullscreen.png');
    };

    return LoaderState;

  })();

}).call(this);
