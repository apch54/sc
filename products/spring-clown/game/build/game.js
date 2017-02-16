(function() {
  Phacker.Game.Socle = (function() {
    function Socle(gm) {
      this.gm = gm;
      this._fle_ = 'Socle';
      this.glob = {
        bg: {
          x0: 0,
          y0: 48,
          w: gameOptions.fullscreen ? 375 : 768,
          h: gameOptions.fullscreen ? 559 - 48 : 500 - 48
        },
        deco_2: {
          y0: gameOptions.fullscreen ? 559 - 360 : 500 - 360
        },
        deco_1: {
          y0: gameOptions.fullscreen ? 559 - 360 + 42 : 500 - 360 + 42
        },
        sea: {
          y01: gameOptions.fullscreen ? 559 - 34 : 500 - 34,
          y02: gameOptions.fullscreen ? 559 - 41 : 500 - 41,
          y03: gameOptions.fullscreen ? 559 - 51 : 500 - 51,
          l3: 15,
          v3: .15
        },
        col: {
          body: {
            w: 34,
            h: 25
          },
          top: {
            w: 34,
            h: 36
          }
        },
        cloud: {
          vx: 0.15,
          dx: 0,
          lx: 50
        }
      };
      this.draw_bg();
    }

    Socle.prototype.draw_bg = function() {
      this.bg = this.gm.add.sprite(this.glob.bg.x0, this.glob.bg.y0, 'bg_gameplay');
      this.bg.fixedToCamera = true;
      this.bg_input = this.gm.add.sprite(this.glob.bg.x0, this.glob.bg.y0, 'bg_gameplay');
      this.bg_input.fixedToCamera = true;
      this.bg_input.alpha = 0;
      this.bg_input.inputEnabled = true;
      this.bg_input.bringToTop();
      this.deco_2 = this.gm.add.sprite(0, this.glob.deco_2.y0, 'deco_2');
      this.deco_2.fixedToCamera = true;
      this.cloud = this.gm.add.sprite(-this.glob.cloud.lx, this.glob.bg.y0, 'cloud');
      this.cloud_tween = this.gm.add.tween(this.cloud);
      this.cloud_tween.to({
        y: [this.glob.bg.y0 + 25, this.glob.bg.y0]
      }, 8333, Phaser.Easing.Linear.None, true, 0, -1);
      this.deco_1 = this.gm.add.sprite(0, this.glob.deco_1.y0, 'deco_1');
      this.deco_1.fixedToCamera = true;
      this.sea3 = this.gm.add.sprite(0, this.glob.sea.y03, 'sea3');
      this.sea3_tween = this.gm.add.tween(this.sea3);
      this.sea3_tween.to({
        y: [this.glob.sea.y03 - 10, this.glob.sea.y03]
      }, 3000, Phaser.Easing.Linear.None, true, 0, -1);
      this.sea2 = this.gm.add.sprite(0, this.glob.sea.y02, 'sea2');
      this.sea2_tween = this.gm.add.tween(this.sea2);
      this.sea2_tween.to({
        y: [this.glob.sea.y02 - 10, this.glob.sea.y02]
      }, 2300, Phaser.Easing.Linear.None, true, 0, -1);
      this.sea1 = this.gm.add.sprite(0, this.glob.sea.y01, 'sea1');
      this.sea1_tween = this.gm.add.tween(this.sea1);
      return this.sea1_tween.to({
        y: [this.glob.sea.y01 + 5, this.glob.sea.y01]
      }, 1600, Phaser.Easing.Linear.None, true, 0, -1);
    };

    Socle.prototype.destroy_last_sea = function() {
      return this.sea1.destroy();
    };

    Socle.prototype.move_with_cam = function(camx) {
      this.glob.cloud.dx += this.glob.cloud.vx;
      if (this.glob.cloud.dx > this.glob.cloud.lx) {
        this.glob.cloud.vx *= -1;
      } else if (this.glob.cloud.dx < 0) {
        this.glob.cloud.vx *= -1;
      }
      this.sea3.x = camx;
      this.sea2.x = camx;
      if (this.sea1 != null) {
        this.sea1.x = camx;
      }
      return this.cloud.x = camx + this.glob.cloud.dx - this.glob.cloud.lx;
    };

    return Socle;

  })();

}).call(this);

(function() {
  Phacker.Game.One_column = (function() {
    function One_column(gm, socleO, prms) {
      this.gm = gm;
      this.socleO = socleO;
      this.prms = prms;
      this._fle_ = 'One column';
      this.prms.body = this.socleO.glob.col.body;
      this.prms.top = this.socleO.glob.col.top;
      this.prms.y = this.prms.y0;
      this.col = this.gm.add.physicsGroup();
      this.col.enableBody = true;
      this.make_col(this.prms.h, this.prms.x0);
      this.make_bird();
    }

    One_column.prototype.make_col = function(h, x0) {
      var bdy, elm, foo, i, ref, scl, top;
      if (this.gm.rnd.integerInRange(0, 1) === 0) {
        bdy = 'platform1_body';
        top = 'platform1_top';
      } else {
        bdy = 'platform2_body';
        top = 'platform2_top';
      }
      scl = this.col.create(x0, this.prms.y0, bdy);
      scl.anchor.x = .5;
      for (foo = i = 0, ref = h - 2; 0 <= ref ? i <= ref : i >= ref; foo = 0 <= ref ? ++i : --i) {
        this.prms.y -= this.prms.body.h;
        elm = this.col.create(x0, this.prms.y, bdy);
        elm.anchor.x = .5;
        elm.body.immovable = true;
        elm.alt = this.f_alt();
      }
      this.prms.y -= this.prms.top.h;
      this.hat = this.col.create(x0, this.prms.y, top);
      this.hat.anchor.x = .5;
      this.hat.body.immovable = true;
      this.hat.alt = this.f_alt();
      this.socleO.sea1.bringToTop();
      return this.socleO.bg_input.bringToTop();
    };

    One_column.prototype.make_bird = function() {
      var send_prm;
      send_prm = {
        x0: this.prms.x0,
        y0: this.f_alt()
      };
      return this.bird = new Phacker.Game.Bird(this.gm, send_prm);
    };

    One_column.prototype.destroy = function() {
      this.col.destroy();
      return this.bird.destroy();
    };

    One_column.prototype.f_alt = function() {
      return this.prms.y0 - 25 * this.prms.h - 11;
    };

    return One_column;

  })();

}).call(this);

(function() {
  Phacker.Game.Columns = (function() {
    function Columns(gm, socleO) {
      var foo, i, ref;
      this.gm = gm;
      this.socleO = socleO;
      this._fle_ = 'Columns';
      this.prms = {
        x0: gameOptions.fullscreen ? 60 : 100,
        y0: gameOptions.fullscreen ? 559 - 37 : 500 - 37,
        x: 60,
        h: 8,
        col: this.socleO.glob.col,
        nb: gameOptions.fullscreen ? 4 : 6
      };
      this.cols = [];
      this.last_col = {
        x: 0,
        y: 0
      };
      this.col_to_destroy = [];
      for (foo = i = 0, ref = this.prms.nb; 0 <= ref ? i <= ref : i >= ref; foo = 0 <= ref ? ++i : --i) {
        this.make_one_col();
      }
    }

    Columns.prototype.make_one_col = function() {
      var sended_p;
      if (this.cols.length === 0) {
        this.prms.x = this.prms.x0;
      } else {
        this.prms.x += this.column_dx_dy().dx;
        this.prms.h = this.column_dx_dy().h;
      }
      sended_p = {
        x0: this.prms.x,
        y0: this.prms.y0,
        h: this.prms.h
      };
      return this.cols.push(new Phacker.Game.One_column(this.gm, this.socleO, sended_p));
    };

    Columns.prototype.column_dx_dy = function() {
      var ddh, ddx, max_dx, max_h, min_dx, min_h;
      if (ge.score < 49) {
        min_dx = 0;
        max_dx = 2;
        min_h = 8;
        max_h = 8;
      } else if (ge.score < 120) {
        min_dx = 0;
        max_dx = 2;
        min_h = 7;
        max_h = 9;
      } else {
        min_dx = 1;
        max_dx = 3;
        min_h = 6;
        max_h = 9;
      }
      ddx = this.gm.rnd.integerInRange(min_dx, max_dx);
      ddh = this.gm.rnd.integerInRange(min_h, max_h);
      return {
        dx: (3.5 + ddx) * this.prms.col.body.w,
        h: ddh
      };
    };

    Columns.prototype.destroy_create = function(x) {
      var results;
      while (x > this.cols[0].col.getAt(0).x) {
        this.col_to_destroy.push(this.cols[0]);
        this.cols.splice(0, 1);
        this.make_one_col();
      }
      results = [];
      while ((this.col_to_destroy[0] != null) && this.gm.camera.x > this.col_to_destroy[0].col.getAt(0).x + 100) {
        this.col_to_destroy[0].col.destroy();
        this.col_to_destroy[0].bird.brd.destroy();
        results.push(this.col_to_destroy.splice(0, 1));
      }
      return results;
    };

    Columns.prototype.dist_birds = function(sptO) {
      return console.log(this.cols[0].bird.dist(sptO));
    };

    return Columns;

  })();

}).call(this);

(function() {
  Phacker.Game.My_mouse = (function() {
    function My_mouse(gm, socleO) {
      this.gm = gm;
      this.socleO = socleO;
      this._fle_ = 'Mouse';
      this.reset();
      this.bg_set_mouse_event();
      this.max = gameOptions.pMaxTime;
    }

    My_mouse.prototype.bg_set_mouse_event = function() {
      this.socleO.bg_input.events.onInputDown.add(this.on_mouse_down, this);
      return this.socleO.bg_input.events.onInputUp.add(this.on_mouse_up, this);
    };

    My_mouse.prototype.set_event = function() {
      this.gm.input.onDown.add(this.on_mouse_down, this);
      return this.gm.input.onUp.add(this.on_mouse_up, this);
    };

    My_mouse.prototype.on_mouse_down = function() {
      this.mouse.down = true;
      this.mouse.down_ms = new Date().getTime();
      return this.mouse.dt = 0;
    };

    My_mouse.prototype.on_mouse_up = function() {
      this.mouse.down = false;
      this.mouse.dt = new Date().getTime() - this.mouse.down_ms;
      if (this.mouse.dt > this.mouse.pMaxTime) {
        this.mouse.dt = this.mouse.pMaxTime - 1;
      }
      return this.mouse.down_ms = 0;
    };

    My_mouse.prototype.when_down = function(spt) {
      var dt, frm;
      if (this.mouse.down) {
        dt = new Date().getTime() - this.mouse.down_ms;
        frm = Math.floor(dt / this.mouse.pMaxTime * 7);
        if (frm >= 7) {
          frm = 7;
        }
        return spt.frame = frm;
      }
    };

    My_mouse.prototype.reset = function() {
      return this.mouse = {
        x: 0,
        y: 0,
        down: false,
        down_ms: 0,
        dt: 0,
        pMaxTime: gameOptions.pMaxTime,
        min: 0
      };
    };

    My_mouse.prototype.bind_sprite = function(spriteO) {
      return this.spt = spriteO.spt;
    };

    return My_mouse;

  })();

}).call(this);

(function() {
  Phacker.Game.Sprite = (function() {
    function Sprite(gm, columnsO, mouseO, camO) {
      this.gm = gm;
      this.columnsO = columnsO;
      this.mouseO = mouseO;
      this.camO = camO;
      this._fle_ = 'Sprite';
      this.has_collided = true;
      this.jumping = false;
      this.hit_resp = '';
      this.too_low = false;
      this.is_reseting = true;
      this.jmp_p = {
        vy: gameOptions.spring_power * 700 / gameOptions.pMaxTime,
        vx: gameOptions.pMaxDx * .75,
        g: 530,
        dy: 4
      };
      this.check_jump_p();
      this.spt = this.gm.add.sprite(this.columnsO.prms.x0, 200, 'character_sprite', 3);
      this.gm.physics.arcade.enable(this.spt);
      this.spt.body.bounce.set(0);
      this.spt.body.gravity.y = this.jmp_p.g;
      this.spt.body.setSize(11, 60, 12, 0);
      this.spt.anchor.setTo(0.5, 1);
      this.anim_down = this.spt.animations.add('down', [0, 2, 4, 6, 7, 6, 4, 2, 0], 20, false);
      this.anim_down.onComplete.add(function() {
        return this.spt.frame = 0;
      }, this);
      this.anim_jump = this.spt.animations.add('jump', [7, 6, 5, 4, 3, 2, 1, 0], 20, false);
      this.anim_jump.onComplete.add(function() {
        return this.spt.frame = 0;
      }, this);
      this.spt.frame = 0;
    }

    Sprite.prototype.collide = function(cols) {
      var col, i, len, ref;
      ref = cols.slice(0, 4);
      for (i = 0, len = ref.length; i < len; i++) {
        col = ref[i];
        if (this.gm.physics.arcade.collide(this.spt, col.col, function() {
          return true;
        }, function(spt, col) {
          return this.when_collide(spt, col, this.jmp_p.dy);
        }, this)) {
          return this.hit_resp;
        }
      }
      return 'nothing';
    };

    Sprite.prototype.when_collide = function(spt, col, dy) {
      var ref;
      if (this.is_reseting) {
        spt.animations.play('down');
      }
      this.is_reseting = false;
      if (!this.has_collided) {
        spt.body.velocity.x = 0;
        this.has_collided = true;
        this.jumping = false;
        this.columnsO.last_col = {
          x: col.x,
          y: col.y
        };
        this.columnsO.destroy_create(this.columnsO.last_col.x);
        if ((-dy < (ref = spt.y - col.y) && ref < dy)) {
          spt.animations.play('down');
          return this.hit_resp = 'win';
        } else {
          return this.hit_resp = 'loose';
        }
      } else {
        return this.hit_resp = 'nothing';
      }
    };

    Sprite.prototype.jump = function() {
      if (!this.mouseO.mouse.down && this.mouseO.mouse.dt > 0 && !this.jumping && !this.is_reseting) {
        if (this.spt.body == null) {
          return;
        }
        this.spt.animations.play('down');
        this.jumping = true;
        this.has_collided = false;
        this.spt.body.velocity.y = -this.mouseO.mouse.dt * this.jmp_p.vy;
        this.spt.body.velocity.x = this.jmp_p.vx;
      }
      return this.mouseO.mouse.dt = 0;
    };

    Sprite.prototype.reset = function() {
      this.is_reseting = true;
      this.jumping = false;
      this.has_collided = true;
      this.too_low = false;
      this.mouseO.reset();
      this.spt.frame = 0;
      this.spt.x = this.columnsO.cols[0].col.getAt(0).x;
      this.spt.body.velocity.y = 0;
      this.spt.body.velocity.x = 0;
      return this.spt.y = 150;
    };

    Sprite.prototype.check_height = function() {
      var max;
      max = gameOptions.fullscreen ? 559 - 100 : 500 - 100;
      if (this.spt.y > max) {
        if (!this.too_low) {
          this.too_low = true;
          this.columnsO.destroy_create({
            x: this.spt.x,
            y: this.spt.y
          });
          return 'loose';
        }
      }
      this.columnsO.cols[0].bird.check_bird(this.spt);
      this.columnsO.cols[1].bird.check_bird(this.spt);
      this.columnsO.cols[2].bird.check_bird(this.spt);
      return 'nothing';
    };

    Sprite.prototype.check_jump_p = function() {
      if (gameOptions.spring_power >= 0.7) {
        this.jmp_p.vy = 0.7 * 700 / gameOptions.pMaxTime;
        return this.jmp_p.dy = 7;
      } else if (gameOptions.spring_power > 0.6) {
        return this.jump_p.dy = 7;
      }
    };

    return Sprite;

  })();

}).call(this);

(function() {
  Phacker.Game.My_camera = (function() {
    function My_camera(gm) {
      this.gm = gm;
      this._fle_ = 'Camera';
      this.offset = gameOptions.fullscreen ? 60 : 100;
      this.offset0 = gameOptions.fullscreen ? 60 : 100;
      this.speed = 2.5;
      this.to = 0;
      this.initial = 0;
      this.dxi = 0;
    }

    My_camera.prototype.move = function(spt) {
      if ((this.gm.camera.x - spt.x + this.offset) < -3) {
        return this.gm.camera.x += 3;
      } else {
        return this.gm.camera.x = spt.x - this.offset;
      }
    };

    My_camera.prototype.move_to2 = function() {
      if (this.gm.camera.x < this.to) {
        this.dxi += this.speed;
        return this.gm.camera.x = this.dxi;
      }
    };

    My_camera.prototype.setTo = function(to) {
      this.to = to - this.offset;
      this.initial = this.gm.camera.x;
      return this.dxi = this.gm.camera.x;
    };

    return My_camera;

  })();

}).call(this);

(function() {
  Phacker.Game.Bird = (function() {
    function Bird(gm, params, spriteO) {
      this.gm = gm;
      this.spriteO = spriteO;
      this._fle_ = 'Bird';
      this.prms = {
        bg: {
          w: gameOptions.fullscreen ? 375 : 768,
          h: gameOptions.fullscreen ? 559 - 48 : 500 - 48
        },
        x0: params.x0,
        y0: params.y0
      };
      this.make_bird();
      this.make_escape();
    }

    Bird.prototype.make_bird = function() {
      var n;
      this.brd = this.gm.add.sprite(this.prms.x0 + 14, this.prms.y0, 'bird', 3);
      this.brd.anchor.setTo(0.5, 1);
      this.brd.animations.add('walk', [0, 1, 3, 0, 1], 5, true);
      this.brd.animations.add('walk2', [0, 1, 0, 3, 2, 3, 0], 5, true);
      this.brd.animations.add('fly', [3, 2], 8, true);
      n = this.gm.rnd.integerInRange(0, 3);
      switch (n) {
        case 0:
          return this.brd.animations.play('walk');
        case 1:
          return this.brd.animations.play('walk2');
        case 2:
        case 3:
          return this.brd.visible = false;
        case 2:
          this.brd.animations.play('fly');
          this.brd.y -= 50;
          this.brd.x += 50;
          this.make_fly();
          return this.fly.start();
      }
    };

    Bird.prototype.check_bird = function(spt) {
      if (this.brd.x - spt.x < 60) {
        this.brd.animations.stop();
        this.brd.animations.play('fly');
        return this.escape.start();
      }
    };

    Bird.prototype.make_escape = function() {
      var h;
      h = this.gm.rnd.integerInRange(48, this.prms.bg.h - 10);
      this.escape = this.gm.add.tween(this.brd);
      return this.escape.to({
        x: [this.brd.x + 100, this.brd.x + 1000],
        y: [this.brd.y + 30, h]
      }, 3500, Phaser.Easing.Quadratic.Out);
    };

    Bird.prototype.make_fly = function() {
      var x1, y1;
      this.brd.scale.x = -1;
      y1 = this.gm.rnd.integerInRange(this.brd.y - 20, this.brd.y + 60);
      x1 = this.brd.x;
      this.fly = this.gm.add.tween(this.brd);
      this.fly.to({
        x: x1 - 500,
        y: y1
      }, 15000, Phaser.Easing.Linear.None);
      return this.fly.onComplete.add(this.brd_destroy, this);
    };

    Bird.prototype.brd_destroy = function() {
      return this.brd.destroy();
    };

    return Bird;

  })();

}).call(this);

(function() {
  Phacker.Game.Effects = (function() {
    function Effects(gm) {
      this.gm = gm;
      this._fle_ = 'Effect';
      this.effects = ['effect1', 'effect3', 'effect2'];
    }

    Effects.prototype.play = function(spriteO) {
      var n;
      n = this.gm.rnd.integerInRange(0, 1);
      this.eff = this.gm.add.sprite(50, 100, this.effects[n], 3);
      this.eff.anchor.setTo(0.5, 0.5);
      this.eff.animations.add('explode', [2, 1, 0, 1], 8, true);
      this.eff.x = spriteO.spt.x;
      this.eff.y = spriteO.spt.y;
      return this.eff.animations.play('explode');
    };

    Effects.prototype.stop = function() {
      return this.eff.destroy();
    };

    return Effects;

  })();

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.YourGame = (function(superClass) {
    extend(YourGame, superClass);

    function YourGame() {
      return YourGame.__super__.constructor.apply(this, arguments);
    }

    YourGame.prototype.update = function() {
      var resp;
      this._fle_ = 'Update';
      YourGame.__super__.update.call(this);
      resp = this.spriteO.collide(this.cols);
      if (resp === 'win') {
        this.win();
      } else if (resp === 'loose') {
        this.spriteO.spt.destroy();
        this.effectO.play(this.spriteO);
        this.lostLife();
      }
      if (this.spriteO.check_height() === 'loose') {
        this.spriteO.spt.destroy();
        this.effectO.play(this.spriteO);
        this.lostLife();
      }
      this.spriteO.jump();
      this.camO.move(this.spriteO.spt);
      this.socleO.move_with_cam(this.game.camera.x);
      return this.mouseO.when_down(this.spriteO.spt);
    };

    YourGame.prototype.resetPlayer = function() {
      this.spriteO = new Phacker.Game.Sprite(this.game, this.columnsO, this.mouseO, this.camO);
      this.effectO.stop();
      this.bonus_sound.play();
      return this.spriteO.reset();
    };

    YourGame.prototype.create = function() {
      YourGame.__super__.create.call(this);
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.world.setBounds(0, 0, 19200000, this.game.height + 500);
      this.socleO = new Phacker.Game.Socle(this.game);
      this.glob = this.socleO.glob;
      this.mouseO = new Phacker.Game.My_mouse(this.game, this.socleO);
      this.camO = new Phacker.Game.My_camera(this.game);
      this.columnsO = new Phacker.Game.Columns(this.game, this.socleO);
      this.cols = this.columnsO.cols;
      this.effectO = new Phacker.Game.Effects(this.game);
      this.spriteO = new Phacker.Game.Sprite(this.game, this.columnsO, this.mouseO, this.camO);
      this.bonus_sound = this.game.add.audio('bonusSound');
      return this.bonus_sound.play();
    };

    return YourGame;

  })(Phacker.GameState);

}).call(this);
